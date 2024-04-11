const mongoose = require('mongoose');

const touristAttractionSchema = new mongoose.Schema({
  attractionId: Number,
  name: {type: String, required:true},
  description: {type: String, required:true},
  location: {type: String, required:true},
  image: {type: String, required:true}
});

const TouristAttraction = mongoose.model('TouristAttraction', touristAttractionSchema);


module.exports = TouristAttraction;
