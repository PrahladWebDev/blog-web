import React, { useState } from 'react';
import { useGetBlogsQuery } from './blogApi';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';
import { useCheckSubscriptionStatusQuery } from '../subscriptions/subscriptionApi';
import { Link } from 'react-router-dom';
import './BlogList.css';

const BlogList = () => {
    const user = useSelector(selectCurrentUser);
    const { data: blogs, error, isLoading } = useGetBlogsQuery();
    const { data: subscriptionData, isLoading: subscriptionLoading } = useCheckSubscriptionStatusQuery();
    const [message, setMessage] = useState('');

    if (isLoading || subscriptionLoading) {
        return <p>Loading blogs...</p>;
    }

    if (error) {
        return <p>Failed to load blogs. Please try again later.</p>;
    }

    return (
        <div className="blog-list-container">
            <h3 className="blog-list-title">Blog List</h3>
            {message && <p className="subscription-message">{message}</p>}
            <ul className="blog-list">
                {blogs.map((blog) => (
                    <li key={blog._id} className="blog-item">
                        {blog.image && <img src={blog.image} alt={blog.title} className="blog-image" />} {/* Display image */}
                        <h4 className="blog-title">{blog.title}</h4>
                        <p className="blog-author">Author: {blog.author}</p>
                        {subscriptionData?.isActive ? (
                            <Link to={`/blogs/${blog._id}`} className="read-blog-link">
                                Read Full Blog
                            </Link>
                        ) : (
                            <p className="subscription-required">Subscription required to read content</p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogList;
