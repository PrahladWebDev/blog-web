import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';

const ProtectedRoute = ({ children, role }) => {
    const user = useSelector(selectCurrentUser);

    if (!user) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" />;
    }

    if (role && user.role !== role) {
        // If user role doesn't match, redirect to home or another page
        return <Navigate to="/" />;
    }

    return children; // Render the children if authorized
};

export default ProtectedRoute;
