const express = require('express');
const router = express.Router();
//Controllers imports
const touristAttractionController = require('./controllers/touristAttractionController');

router.get('/touristAttractions/', touristAttractionController.getAllAttractions);
router.post('/touristAttractions/', touristAttractionController.createAttractions);
router.put('/touristAttractions/:id', touristAttractionController.updateAttractions);
router.delete('/touristAttractions/:id', touristAttractionController.deleteAttractions);
router.get('/touristAttractions/:id', touristAttractionController.getAttractionsById);

module.exports = router;
