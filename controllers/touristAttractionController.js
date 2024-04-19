const TouristAttraction = require('../models/TouristAttraction');
//POST
exports.createAttraction = async (req, res) => {
  try {
    console.log(req.user)
    const createdByUserId = req.user._id;
    const newAttraction = await TouristAttraction.create({ ...req.body, createdBy: createdByUserId });
    res.status(201).json(newAttraction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//GET
exports.getAllAttractions = async (req, res) => {
  try {
    const attractions = await TouristAttraction.find()
    res.json(attractions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//GET
exports.getAttractionbyId = async (req, res) => {
  const { id } = req.params;
  try {
    const attraction = await TouristAttraction.findById(id)
    res.json(attraction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//PUT
exports.updateAttraction = async (req, res) => {
  const { id } = req.params;
  console.log("id:", id)
  try {
    const updatedAttraction = await TouristAttraction.findByIdAndUpdate(id, req.body, { new: true });
    console.log(updatedAttraction)

    if (!updatedAttraction) {
      return res.status(404).json({ message: 'Atracción turística no encontrada' });
    }
    res.json(updatedAttraction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//DELETE
exports.deleteAttraction = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAttraction = await TouristAttraction.findByIdAndDelete(id);
    if (!deletedAttraction) {
      return res.status(404).json({ message: 'Atracción turística no encontrada' });
    }
    res.json({ message: 'Atracción turística eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
