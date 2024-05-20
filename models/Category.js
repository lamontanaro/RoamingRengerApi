const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryId: Number,
    categoryName: {
        type: String,
        required: true
    }
});

categorySchema.virtual('attractions', {
    ref: 'TouristAttraction',
    localField: '_id',
    foreignField: 'belongsTo'
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;