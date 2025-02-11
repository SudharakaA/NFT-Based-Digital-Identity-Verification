const express = require('express');
const { ethers } = require('ethers');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const WebSocket = require('ws');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/nft-identity', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Blockchain configuration
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL || 'http://localhost:8545');
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || '', provider);
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(
    contractAddress,
    require('../artifacts/contracts/IdentityNFT.sol/IdentityNFT.json').abi,
    wallet
);

// WebSocket server
const wss = new WebSocket.Server({ port: 8080 });
const clients = new Set();

wss.on('connection', (ws) => {
    clients.add(ws);
    ws.on('close', () => clients.delete(ws));
});

// Broadcast verification updates
function broadcastVerification(verification) {
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(verification));
        }
    });
}

// Add signature verification function
function verifySignature(message, signature, address) {
    try {
        const recoveredAddress = ethers.utils.verifyMessage(message, signature);
        return recoveredAddress.toLowerCase() === address.toLowerCase();
    } catch (error) {
        return false;
    }
}

// Routes
app.post('/verify', async (req, res) => {
    try {
        const { address, signature, message } = req.body;
        
        if (!ethers.utils.isAddress(address)) {
            return res.status(400).json({ error: 'Invalid Ethereum address' });
        }

        // Verify signature
        if (!verifySignature(message, signature, address)) {
            return res.status(401).json({ error: 'Invalid signature' });
        }

        // Check if already verified
        const existingVerification = await VerificationModel.findOne({ address });
        if (existingVerification) {
            return res.status(400).json({ error: 'Address already verified' });
        }

        // Mint NFT
        const tx = await contract.mint(address);
        await tx.wait();

        const verification = {
            address,
            timestamp: new Date(),
            transactionHash: tx.hash,
            status: 'confirmed'
        };

        // Save to database and broadcast
        await new VerificationModel(verification).save();
        broadcastVerification(verification);

        res.status(200).json({
            message: 'Verification successful',
            transactionHash: tx.hash
        });
    } catch (error) {
        console.error('Verification error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/isVerified/:address', async (req, res) => {
    try {
        const { address } = req.params;
        if (!ethers.utils.isAddress(address)) {
            return res.status(400).json({ error: 'Invalid Ethereum address' });
        }

        const isVerified = await contract.isVerified(address);
        res.status(200).json({ isVerified });
    } catch (error) {
        console.error('Verification check error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/recent-verifications', async (req, res) => {
    try {
        const verifications = await VerificationModel
            .find()
            .sort({ timestamp: -1 })
            .limit(10);
        res.status(200).json(verifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    server.close(() => {
        mongoose.connection.close();
    });
});
