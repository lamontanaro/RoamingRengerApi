const Comment = require('../models/Comment');

exports.createComment = async (req, res) => {
    try {
        const commentedByUserId = req.user._id;
        const newComment = await Comment.create({ ...req.body, commentedBy: commentedByUserId })
        res.status(201).json(newComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
