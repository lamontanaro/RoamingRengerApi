const TouristAttraction = require('../models/TouristAttraction');

exports.getAllAttractions = async (req, res) => {
  try {
    const attractions = await TouristAttraction.find();
    res.json(attractions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAttractionById = async (req, res) => {
  const {id} = req.params;
  try{
    const attraction = await TouristAttraction.findById(id).populate('comments');
    res.json({attraction, comments: attraction.comments});
  }
  catch(error) {
    res.status(500).json({message:error.message});
  }
}

exports.createAttraction = async (req,res) => {
  try{
    const attraction = new TouristAttraction (req.body)
    const createByUserId = req.user._id;
    const newAttraction = await attraction.create({...req.body, createBy: createByUserId});
    res.status(201).json(newAttraction);
  }
  catch(error) {
    res.status(400).json({message: error.message});
  }
}

exports.updateAttraction = async (req, res) => {
  const {id} = req.params;

  try{
    const updateAttraction = await TouristAttraction.findByIdAndUpdate(id, req.body, {new: true});
  res.status(201).json(updateAttraction);

  if(!updateAttraction) {
    return res.status(404).json({message: 'Attraction not found!'});
  }
  res.json(updateAttraction);
  }
  catch(error) {
    res.status(400).json({message:error.message});
  }
}



exports.deleteAttraction = async (req,res) => {
  const {id} = req.params;
  try {
    const deleteAttraction = await TouristAttraction.findByIdAndDelete(id)
    if(!deleteAttraction) {
      return res.status(404).json({message: 'Attraction not found!'});
    }
    res.json({ message: 'Attraction deleted successfully!'});
  }
  catch(error) {
    res.status(500).json({message: error.message});
  }
}
