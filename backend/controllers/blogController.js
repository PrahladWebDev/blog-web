import Blog from '../models/blogModel.js';
import Subscription from '../models/subscriptionModel.js';
import upload from '../utils/multerConfig.js';

// Admin: Create a Blog
const createBlog = [
    upload.single('image'), // Middleware to handle single file upload
    async (req, res) => {
        const { title, content } = req.body;
        const author = req.user.username;

        try {
            const image = req.file ? req.file.path : null; // Image URL from Cloudinary
            const blog = await Blog.create({ title, content, author, image });
            res.status(201).json(blog);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
];

// User: Get All Blogs
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({}, 'title author image').sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// User: Get Full Blog Content
const getBlogContent = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    try {
        const subscription = await Subscription.findOne({ userId });
        if (!subscription || new Date() > subscription.expiresAt) {
            return res.status(403).json({
                message: 'Your subscription has expired. Please subscribe to access this content.',
            });
        }

        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { createBlog, getAllBlogs, getBlogContent };
