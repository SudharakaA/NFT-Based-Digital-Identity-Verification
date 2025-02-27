const { ethers } = require('ethers');
const VerificationModel = require('../models/Verification');
const { verifySignature } = require('../middleware/auth');
const { broadcastToClients } = require('../websocket');

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL || 'http://localhost:8545');
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || '', provider);
const contractABI = require('../contracts/IdentityNFT.json').abi;
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, wallet);

const verifyIdentity = async (req, res) => {
    try {
        const { address, signature, message } = req.body;
        
        if (!ethers.utils.isAddress(address)) {
            return res.status(400).json({ error: 'Invalid Ethereum address' });
        }

        if (!verifySignature(message, signature, address)) {
            return res.status(401).json({ error: 'Invalid signature' });
        }

        const existingVerification = await VerificationModel.findOne({ address });
        if (existingVerification) {
            return res.status(400).json({ error: 'Address already verified' });
        }

        const tx = await contract.mint(address);
        await tx.wait();

        const verification = new VerificationModel({
            address,
            transactionHash: tx.hash,
            status: 'confirmed'
        });
        await verification.save();

        broadcastToClients({
            type: 'VERIFICATION',
            address,
            transactionHash: tx.hash
        });

        res.status(200).json({
            message: 'Verification successful',
            transactionHash: tx.hash
        });
    } catch (error) {
        console.error('Verification error:', error);
        res.status(500).json({ error: error.message });
    }
};

const checkVerification = async (req, res) => {
    try {
        const { address } = req.params;
        if (!ethers.utils.isAddress(address)) {
            return res.status(400).json({ error: 'Invalid Ethereum address' });
        }

        const isVerified = await contract.isVerified(address);
        const verificationDetails = await VerificationModel.findOne({ address });

        res.status(200).json({
            isVerified,
            details: verificationDetails
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getStats = async (req, res) => {
    try {
        const totalVerifications = await VerificationModel.countDocuments();
        const recentVerifications = await VerificationModel
            .find()
            .sort({ timestamp: -1 })
            .limit(10);

        res.status(200).json({
            totalVerifications,
            recentVerifications
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    verifyIdentity,
    checkVerification,
    getStats
};
