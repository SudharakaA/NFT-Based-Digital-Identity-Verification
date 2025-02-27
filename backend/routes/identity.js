const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const {
    verifyIdentity,
    checkVerification,
    getStats
} = require('../controllers/identityController');
const { mintNFT } = require('../controllers/nftController');

router.post('/verify', verifyIdentity);
router.get('/verify/:address', checkVerification);
router.get('/stats', authMiddleware, getStats);
router.post('/mint', authMiddleware, mintNFT);

module.exports = router;
