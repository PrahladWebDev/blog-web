import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetBlogQuery } from './blogApi';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';
import { useCheckSubscriptionStatusQuery } from '../subscriptions/subscriptionApi';
import './BlogDetail.css';  // Import the CSS file

const BlogDetail = () => {
    const { id } = useParams(); // Get blog ID from URL params
    const user = useSelector(selectCurrentUser);
    const { data: blog, error, isLoading } = useGetBlogQuery(id); // Fetch the blog by ID
    const { data: subscriptionData, isLoading: subscriptionLoading } = useCheckSubscriptionStatusQuery();
    const [message, setMessage] = useState('');

    // Show loading indicator
    if (isLoading || subscriptionLoading) {
        return <p>Loading blog details...</p>;
    }

    // Show error message if fetching fails
    if (error) {
        return <p>Failed to load blog details. Please try again later.</p>;
    }

    // Handle reading content based on subscription status
    const handleReadContent = () => {
        if (!subscriptionData?.isActive) {
            setMessage('Please subscribe to read the full content.');
        } else {
            setMessage('');
            // Show the full content of the blog
            console.log(`Displaying full blog content for blog ID: ${blog._id}`);
        }
    };

    return (
        <div className="blog-detail-container">
            <h3 className="blog-title">{blog.title}</h3>
            <p className="blog-author">Author: {blog.author}</p>
            
            {/* Conditionally render the image if it exists */}
            {blog.image && (
                <div className="blog-image-container">
                    <img src={blog.image} alt={blog.title} className="blog-image" />
                </div>
            )}

            <div className="blog-content">
                {subscriptionData?.isActive ? (
                    <div>
                        <h4>Full Content</h4>
                        <p>{blog.content}</p>
                    </div>
                ) : (
                    <p className="subscription-message">{message || 'Subscription required to read the full content'}</p>
                )}
            </div>
            {!subscriptionData?.isActive && (
                <button className="reactivate-button" onClick={handleReadContent}>
                    Reactivate Subscription
                </button>
            )}
        </div>
    );
};

export default BlogDetail;
