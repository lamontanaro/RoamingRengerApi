const mongoose = require('mongoose');

const touristAttractionSchema = new mongoose.Schema({
  attractionId: Number,
  name: { type: String, required: true },
  description: String,
  location: String,
  image: String
});

const TouristAttraction = mongoose.model('TouristAttraction', touristAttractionSchema);

module.exports = TouristAttraction;
