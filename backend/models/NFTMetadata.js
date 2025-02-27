const mongoose = require('mongoose');

const NFTMetadataSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
    lowercase: true
  },
  tokenId: {
    type: Number,
    required: true
  },
  metadata: {
    type: Object,
    required: true
  },
  ipfsUrl: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('NFTMetadata', NFTMetadataSchema);
