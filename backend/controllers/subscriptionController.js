import Subscription from '../models/subscriptionModel.js';

// Activate Subscription (or renew it)
const activateSubscription = async (req, res) => {
    const userId = req.user._id;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 2); // Subscription valid for 2 days

    try {
        const subscription = await Subscription.findOneAndUpdate(
            { userId },
            { expiresAt },
            { upsert: true, new: true }
        );
        res.json(subscription);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Check Subscription Status
const checkSubscriptionStatus = async (req, res) => {
    const userId = req.user._id;

    try {
        const subscription = await Subscription.findOne({ userId });

        if (!subscription) {
            return res.json({ isActive: false, remainingDays: 0, expiresAt: null });
        }

        const currentDate = new Date();
        const expirationDate = subscription.expiresAt;

        if (currentDate > expirationDate) {
            return res.json({ isActive: false, remainingDays: 0, expiresAt: expirationDate });
        }

        const remainingTime = expirationDate.getTime() - currentDate.getTime();
        const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24)); // Convert ms to days

        return res.json({ isActive: true, remainingDays, expiresAt: expirationDate });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { activateSubscription, checkSubscriptionStatus };
