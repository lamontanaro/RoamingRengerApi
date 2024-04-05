const express = require('express');
const router = express.Router();
//Controllers imports
const touristAttractionController = require('./controllers/touristAttractionController');

router.get('/touristAttractions/', touristAttractionController.getAllAttractions);
router.post('/touristAttractions/', touristAttractionController.createAttraction);
router.get('/touristAttractions/:id', touristAttractionController.getAttractionById);
router.put('/touristAttractions/:id', touristAttractionController.updateAttraction);
router.delete('/touristAttractions/:id', touristAttractionController.deleteAttraction);
module.exports = router;
