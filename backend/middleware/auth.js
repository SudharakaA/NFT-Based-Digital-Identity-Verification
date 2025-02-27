const { ethers } = require('ethers');
const jwt = require('jsonwebtoken');

const verifySignature = (message, signature, address) => {
    try {
        const recoveredAddress = ethers.utils.verifyMessage(message, signature);
        return recoveredAddress.toLowerCase() === address.toLowerCase();
    } catch (error) {
        return false;
    }
};

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new Error('Authentication required');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate' });
    }
};

module.exports = { verifySignature, authMiddleware };
