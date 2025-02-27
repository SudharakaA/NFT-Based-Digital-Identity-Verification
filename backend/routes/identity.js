const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const {
    verifyIdentity,
    checkVerification,
    getStats
} = require('../controllers/identityController');

router.post('/verify', verifyIdentity);
router.get('/verify/:address', checkVerification);
router.get('/stats', authMiddleware, getStats);

module.exports = router;
