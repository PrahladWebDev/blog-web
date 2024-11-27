import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';
import { useCheckSubscriptionStatusQuery } from '../subscriptions/subscriptionApi';
import './SubscriptionStatus.css'; // Import the CSS for styling

const SubscriptionStatus = () => {
    const user = useSelector(selectCurrentUser);

    if (!user || !user._id) {
        return <p>You need to be logged in to check your subscription status.</p>;
    }

    const { data, error, isLoading } = useCheckSubscriptionStatusQuery();

    const [remainingTime, setRemainingTime] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        let intervalId;
        if (data?.isActive && data.expiresAt) {
            const expirationDate = new Date(data.expiresAt);

            const calculateRemainingTime = () => {
                const currentDate = new Date();
                const remainingMs = expirationDate - currentDate;

                if (remainingMs <= 0) {
                    setRemainingTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                    return;
                }

                const days = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
                const hours = Math.floor((remainingMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);

                setRemainingTime({ days, hours, minutes, seconds });
            };

            calculateRemainingTime();
            intervalId = setInterval(calculateRemainingTime, 1000);
        }

        return () => clearInterval(intervalId); // Cleanup the interval on component unmount or when data changes
    }, [data]);

    if (isLoading) {
        return <p>Loading subscription status...</p>;
    }

    if (error) {
        return <p>Failed to load subscription status. Please try again later.</p>;
    }

    if (!data?.expiresAt) {
        return <p>Failed to fetch expiration date. Please contact support.</p>;
    }

    return (
        <div className="subscription-container">
            <div className="status-container">
                <h3>Subscription Status</h3>
                {data?.isActive ? (
                    <p>
                        Your subscription is active. <br />
                        Time remaining: {remainingTime.days} days, {remainingTime.hours} hours, {remainingTime.minutes} minutes, {remainingTime.seconds} seconds.
                    </p>
                ) : (
                    <div className="expired-subscription">
                        <p>Your subscription has expired. Please reactivate it to read blogs.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubscriptionStatus;
