import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';
import { useCheckSubscriptionStatusQuery } from '../features/subscriptions/subscriptionApi';
import { logout } from '../features/auth/authSlice';
import './Navbar.css'; // Import external CSS file

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false); // State for toggling mobile menu
    const user = useSelector(selectCurrentUser);
    const { data } = useCheckSubscriptionStatusQuery();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    MyApp
                </Link>
                <button className="navbar-toggle" onClick={toggleMenu}>
                    ☰
                </button>
                <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
                    {user ? (
                        <>
                            {user.role === 'admin' ? (
                                <Link to="/admin" className="navbar-link">
                                    Admin Dashboard
                                </Link>
                            ) : (
                                data?.isActive && (
                                    <Link to="/user" className="navbar-link">
                                        User Dashboard
                                    </Link>
                                )
                            )}
                            <button className="navbar-button" onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="navbar-link">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
