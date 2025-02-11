const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
        unique: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    transactionHash: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'failed'],
        default: 'pending'
    }
});

const VerificationModel = mongoose.model('Verification', verificationSchema);
module.exports = VerificationModel;
