import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useActivateSubscriptionMutation, useCheckSubscriptionStatusQuery } from './subscriptionApi';
import { selectCurrentUser } from '../auth/authSlice';
import './ActivateSubscription.css'; // Import the CSS for styling

const ActivateSubscription = () => {
    const user = useSelector(selectCurrentUser);
    const { data: subscriptionStatus, refetch } = useCheckSubscriptionStatusQuery();
    const [activateSubscription] = useActivateSubscriptionMutation();
    const [message, setMessage] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    useEffect(() => {
        if (subscriptionStatus?.isActive) {
            setIsButtonDisabled(true);
        } else {
            setIsButtonDisabled(false);
        }
    }, [subscriptionStatus]);

    const handleActivate = async () => {
        try {
            await activateSubscription().unwrap();
            setMessage('Subscription activated successfully!');
            setIsButtonDisabled(true);
            refetch();
        } catch (err) {
            setMessage('Failed to activate subscription. Please try again.');
        }
    };

    if (!user || !user._id) {
        return <p>You need to be logged in to activate your subscription.</p>;
    }

    return (
        <div className="subscription-container">
            <div className="status-container">
                <h3>Activate Subscription</h3>
                <button 
                    onClick={handleActivate} 
                    disabled={isButtonDisabled} 
                    className={`activate-btn ${isButtonDisabled ? 'disabled' : ''}`}
                >
                    {isButtonDisabled ? 'Subscription Active' : 'Reactivate Subscription'}
                </button>
            </div>
            {message && <p className="message">{message}</p>}
            {subscriptionStatus?.isActive && (
                <div className="remaining-time">
                    <p>Time remaining: {subscriptionStatus.remainingDays} days.</p>
                </div>
            )}
        </div>
    );
};

export default ActivateSubscription;
