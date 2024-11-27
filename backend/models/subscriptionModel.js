const mongoose = require('mongoose');

const subscriptionSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    expiresAt: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);
