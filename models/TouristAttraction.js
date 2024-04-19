const mongoose = require('mongoose');

const touristAttractionSchema = new mongoose.Schema({
  attractionId: Number,
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: String,
  image: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const TouristAttraction = mongoose.model('TouristAttraction', touristAttractionSchema);

module.exports = TouristAttraction;
