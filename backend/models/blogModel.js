const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String }, // URL of the uploaded image
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
