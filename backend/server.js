const express = require('express');
const { ethers } = require('ethers');
const IdentityNFT = require('./artifacts/contracts/IdentityNFT.sol/IdentityNFT.json');

const app = express();
const port = 3000;

const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
const signer = provider.getSigner();
const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const contract = new ethers.Contract(contractAddress, IdentityNFT.abi, signer);

app.use(express.json());

app.post('/verify', async (req, res) => {
    const { address } = req.body;
    try {
        const tx = await contract.mint(address);
        await tx.wait();
        res.status(200).send({ message: 'User verified and NFT minted' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.get('/isVerified/:address', async (req, res) => {
    const { address } = req.params;
    try {
        const isVerified = await contract.isVerified(address);
        res.status(200).send({ isVerified });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
