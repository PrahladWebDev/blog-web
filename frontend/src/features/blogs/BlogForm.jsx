import React, { useState } from 'react';
import { useCreateBlogMutation } from './blogApi';
import './BlogForm.css';

const BlogForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null); // State for storing the selected image
    const [createBlog] = useCreateBlogMutation();
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(); // Create a FormData object
        formData.append('title', title);
        formData.append('content', content);
        if (image) formData.append('image', image); // Add image if selected

        try {
            await createBlog(formData).unwrap(); // Pass FormData directly
            setMessage('Blog created successfully!');
            setTitle('');
            setContent('');
            setImage(null);
        } catch (err) {
            setMessage('Failed to create blog. Please try again.');
        }
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]); // Store the selected file in state
    };

    return (
        <div className="blog-form-container">
            <h3>Create Blog</h3>
            <form className="blog-form" onSubmit={handleSubmit}>
                <input
                    className="input-field"
                    type="text"
                    placeholder="Blog Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    className="input-field"
                    placeholder="Blog Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <input
                    className="input-field"
                    type="file"
                    accept="image/*" // Restrict to image files
                    onChange={handleFileChange}
                />
                <button className="submit-btn" type="submit">Create Blog</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default BlogForm;
