const express = require('express');
const { activateSubscription, checkSubscriptionStatus } = require('../controllers/subscriptionController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

// Routes
router.post('/activate', protect, activateSubscription);
router.get('/status', protect, checkSubscriptionStatus);

module.exports = router;
