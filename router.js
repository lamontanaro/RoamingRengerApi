const express = require('express');
const router = express.Router();
const authMiddleware = require('./services/authMiddleware');

//Controllers imports
const touristAttractionController = require('./controllers/touristAttractionController');
const userController = require('./controllers/userController');

//Tourist Attractions 
router.get('/touristAttractions/', authMiddleware.authenticateToken,touristAttractionController.getAllAttractions);
router.get('/touristAttractions/:id', authMiddleware.authenticateToken,touristAttractionController.getAttractionsById);
router.post('/touristAttractions/', authMiddleware.authenticateToken,touristAttractionController.createAttractions);
router.put('/touristAttractions/:id', authMiddleware.authenticateToken,touristAttractionController.updateAttractions);
router.delete('/touristAttractions/:id', authMiddleware.authenticateToken,touristAttractionController.deleteAttractions);

//User
router.post('/register/', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);


module.exports = router;
