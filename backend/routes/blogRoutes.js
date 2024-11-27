import express from 'express';
import { createBlog, getAllBlogs, getBlogContent } from '../controllers/blogController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Routes
router.post('/', protect, authorizeRoles('admin'), createBlog);
router.get('/', protect, getAllBlogs);
router.get('/:id', protect, getBlogContent);

export default router;
