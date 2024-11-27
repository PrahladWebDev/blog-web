import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginForm from './features/auth/LoginForm';
import RegistrationForm from './features/auth/RegistrationForm';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import BlogDetail from './features/blogs/BlogDetails';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegistrationForm />} />

                {/* Protected Routes */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute role="admin">
                            <AdminPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/user"
                    element={
                        <ProtectedRoute role="user">
                            <UserPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/blogs/:id"
                    element={
                        <ProtectedRoute role="user">
                            <BlogDetail />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
