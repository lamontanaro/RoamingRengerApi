const TouristAttraction = require('../models/TouristAttraction');

// METODO GET 
exports.getAllAttractions = async (req, res) => {
  try {
    const attractions = await TouristAttraction.find();
    res.json(attractions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//METODO POST
exports.createAttractions = async (req, res) => {
  try {
    const createAttraction = new TouristAttraction({
      attractionId: req.body.id,
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      image: req.body.image
    })
    const newAttraction = await createAttraction.save();
    res.status(201).json(newAttraction);
  } catch (error) {
    res.status(400).json("No se pudo crear la atraccion.")
  }
}

//METODO PUT
exports.updateAttractions = async (req, res) =>{
  try {
    const updateAttraction = await TouristAttraction.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.status(201).json(updateAttraction);
  } catch (error) {
    res.status(400).json("No se pudo modificar la atraccion.");
  }
}

//METODO DELETE
exports.deleteAttractions = async (req, res) =>{
  try {
    const deleteAttraction = await TouristAttraction.findByIdAndDelete(req.params.id);
    if(!deleteAttraction){
      res.status(404).json("Atraccion no encontrada");
    }
    res.status(201).json("Atraccion borrada correctamente.");
  } catch (error) {
    res.status(400).json("No se pudo eliminar la atraccion.")
  }
}
