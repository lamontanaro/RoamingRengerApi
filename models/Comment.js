const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    commentId: Number,
    commentText: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true,
        min: [1, 'Min value is 1, got {VALUE}'],
        max: [5, 'Max value is 5, got {VALUE}'],
    },
    commentedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    relatedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'TouristAttraction' },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;