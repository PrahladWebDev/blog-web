import express from 'express';
import { activateSubscription, checkSubscriptionStatus } from '../controllers/subscriptionController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Routes
router.post('/activate', protect, activateSubscription);
router.get('/status', protect, checkSubscriptionStatus);

export default router;
