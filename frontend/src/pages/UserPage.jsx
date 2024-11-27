import React from 'react';
import { Link } from 'react-router-dom'; // Add Link component for navigation
import BlogList from '../features/blogs/BlogList';
import SubscriptionStatus from '../features/subscriptions/SubscriptionStatus';
import ActivateSubscription from '../features/subscriptions/ActivateSubscription';

const UserPage = () => {
    return (
        <div>
            <SubscriptionStatus />
            <ActivateSubscription />
            <BlogList />
        </div>
    );
};

export default UserPage;
