const express = require('express');
const router = express.Router();
//Controllers imports
const authMiddleware = require('./services/authMiddleware');
const touristAttractionController = require('./controllers/touristAttractionController');
const userController = require('./controllers/userController');

router.get('/touristAttractions/', touristAttractionController.getAllAttractions);
router.post('/touristAttractions/', touristAttractionController.createAttraction);
router.get('/touristAttractions/:id', touristAttractionController.getAttractionById);
router.put('/touristAttractions/:id', touristAttractionController.updateAttraction);
router.delete('/touristAttractions/:id', touristAttractionController.deleteAttraction);
router.get('/touristAttractions', authMiddleware.authenticateToken, touristAttractionController.getAllAttractions);
router.get('/touristAttractions/:id', authMiddleware.authenticateToken, touristAttractionController.getAttractionById);
router.post('/touristAttractions/', authMiddleware.authenticateToken, touristAttractionController.createAttraction);
router.put('/touristAttractions/:id', authMiddleware.authenticateToken,touristAttractionController.updateAttraction);
router.delete('/touristAttractions/:id', authMiddleware.authenticateToken,touristAttractionController.deleteAttraction);

router.post('/register/', userController.register);
router.post('/login/', userController.login);
router.post('/logout/', userController.logout);

module.exports = router;
