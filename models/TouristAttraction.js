const mongoose = require('mongoose');

const touristAttractionSchema = new mongoose.Schema({
  attractionId: Number,
  name: {type: String, required:true},
  description: {type: String, required:true},
  location: {type: String, required:true},
  image: {type: String, required:true},
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  belongsTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
});

touristAttractionSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'relatedTo'
});

const TouristAttraction = mongoose.model('TouristAttraction', touristAttractionSchema);


module.exports = TouristAttraction;
