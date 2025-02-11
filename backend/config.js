require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/nft-identity',
    RPC_URL: process.env.RPC_URL || 'http://localhost:8545',
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
    JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key'
};
