const express = require('express');
const { createBlog, getAllBlogs, getBlogContent } = require('../controllers/blogController');
const { protect } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');
const router = express.Router();

// Routes
router.post('/', protect, authorizeRoles('admin'), createBlog);
router.get('/', protect, getAllBlogs);
router.get('/:id', protect, getBlogContent);

module.exports = router;
