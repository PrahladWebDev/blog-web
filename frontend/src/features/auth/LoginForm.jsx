import React, { useState, useEffect } from 'react';
import { useLoginMutation } from './authApi';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from './authSlice';
import { selectCurrentUser, selectCurrentToken } from './authSlice';
import './LoginForm.css'; // Import external CSS for styling

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();

    // Access Redux state for debugging
    const currentUser = useSelector(selectCurrentUser);
    const currentToken = useSelector(selectCurrentToken);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ email, password }).unwrap();
            const { token, ...user } = response; // Extract token and user details
            dispatch(setCredentials({ user, token })); // Dispatch properly formatted data
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    useEffect(() => {
        console.log('Current User from Redux state:', currentUser);
        console.log('Current Token from Redux state:', currentToken);
    }, [currentUser, currentToken]);

    return (
        <div className="login-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                    required
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                    required
                />
                <button type="submit" className="login-button" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
