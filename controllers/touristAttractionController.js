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
    const createAttraction = new TouristAttraction(req.body)
    const newAttraction = await createAttraction.save();
    res.status(201).json(newAttraction);
  } catch (error) {
    res.status(400).json("No se pudo crear la atraccion.")
  }
}

//METODO PUT
exports.updateAttractions = async (req, res) =>{
  try {
    const updatedAttraction = await TouristAttraction.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if(!updatedAttraction){
      res.status(404).json("Atraccion no encontrada");
    }
    res.status(201).json(updatedAttraction);
  } catch (error) {
    res.status(400).json("No se pudo modificar la atraccion.");
  }
}

//METODO DELETE
exports.deleteAttractions = async (req, res) =>{
  try {
    const deletedAttraction = await TouristAttraction.findByIdAndDelete(req.params.id);
    if(!deletedAttraction){
      res.status(404).json("Atraccion no encontrada");
    }
    res.status(201).json("Atraccion borrada correctamente.");
  } catch (error) {
    res.status(400).json("No se pudo eliminar la atraccion.")
  }
}


//METODO GET byID
exports.getAttractionsById = async (req, res) =>{
  try {
    const attraction = await TouristAttraction.findById(req.params.id);
    res.status(201).json(attraction);
  } catch (error) {
    res.status(400).json("No se encontro la atraccion")
  }
}
