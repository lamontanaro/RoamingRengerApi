const TouristAttraction = require('../models/TouristAttraction');

exports.getAllAttractions = async (req, res) => {
  try {
    const attractions = await TouristAttraction.find();
    res.json(attractions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOneAttraction = async (req, res) => {
  try{
    const attraction = await TouristAttraction.findById(req.params.id);
    res.status(200).json(attraction);
  }
  catch(error) {
    res.status(500).json({message:error.message});
  }
}

exports.createAttraction = async (req,res) => {
  try{
    const attraction = new TouristAttraction ({
      attractionId: req.body.id,
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      image: req.body.image
    })
    const newAttraction = await attraction.save()
    res.status(201).json(newAttraction);
  }
  catch(error) {
    res.status(400).json({message: error.message});
  }
}

exports.updateAttraction = async (req, res) => {
  try{
    const updateAttraction = await TouristAttraction.findByIdAndUpdate(req.params.id, req.body, {new: true});
  res.status(200).json(updateAttraction);
  }
  catch(error) {
    res.status(400).json({message:error.message});
  }
}



exports.deleteAttraction = async (req,res) => {
  try {
    const deleteAttraction = await TouristAttraction.findByIdAndDelete(req.params.id)
    res.status(201).json(deleteAttraction);
  }
  catch(error) {
    res.status(500).json({message: error.message});
  }
}
