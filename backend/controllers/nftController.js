const { create } = require('ipfs-http-client');
const { ethers } = require('ethers');
const NFTMetadata = require('../models/NFTMetadata');

// Connect to Infura IPFS (you'll need to add your projectId and secret to .env)
const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: 'Basic ' + Buffer.from(
      process.env.IPFS_PROJECT_ID + ':' + process.env.IPFS_PROJECT_SECRET
    ).toString('base64')
  }
});

const mintNFT = async (req, res) => {
  try {
    const { address, metadata } = req.body;

    // Upload metadata to IPFS
    const { cid } = await ipfs.add(JSON.stringify(metadata));
    const ipfsUrl = `ipfs://${cid}`;

    // Store metadata in database
    const nftMetadata = new NFTMetadata({
      owner: address,
      tokenId: await contract.totalSupply(),
      metadata: metadata,
      ipfsUrl
    });
    await nftMetadata.save();

    // Mint NFT with IPFS URL
    const tx = await contract.mintWithMetadata(address, ipfsUrl);
    await tx.wait();

    res.status(200).json({
      success: true,
      transactionHash: tx.hash,
      ipfsUrl
    });
  } catch (error) {
    console.error('NFT Minting error:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  mintNFT
};
