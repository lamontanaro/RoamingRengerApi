const TouristAttraction = require('../models/TouristAttraction');

exports.getAllAttractions = async (req, res) => {
  try {
    const attractions = await TouristAttraction.find();
    res.json(attractions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAttractions = async (req, res) => {
  try {
    const attraction = new TouristAttraction({
      attractionId: req.body.id,
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      image: req.body.image
    })
    const newAttraction = await attraction.save();
    res.status(201).json(newAttraction);
  } catch (error) {
    res.status(400).json("No se pudo crear la atraccion.")
  }
}

exports.updateAttractions = async (req, res) =>{
  try {
    const updateAttractions = await TouristAttraction.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.status(201).json(updateAttractions);
  } catch (error) {
    res.status(400).json("No se pudo modificar la atraccion.");
  }
}


