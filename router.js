const express = require('express');
const router = express.Router();
const authMiddleware = require('./services/authMiddleware');
const touristAttractionController = require('./controllers/touristAttractionController');
const userController = require('./controllers/userController');
const commentController = require('./controllers/commentController')
const categoryController = require('./controllers/categoryController')
//Attractions
router.get('/myAttractions/', authMiddleware.authenticateToken,userController.userAttractions);
router.get('/touristAttractions/', authMiddleware.authenticateToken,touristAttractionController.getAllAttractions);
router.get('/touristAttractions/:id',authMiddleware.authenticateToken,touristAttractionController.getAttractionbyId);
router.post('/touristAttractions/', authMiddleware.authenticateToken, touristAttractionController.createAttraction);
router.put('/touristAttractions/:id', authMiddleware.authenticateToken,touristAttractionController.updateAttraction);
router.delete('/touristAttractions/:id', authMiddleware.authenticateToken,touristAttractionController.deleteAttraction);
//Comment
router.post('/newComment/', authMiddleware.authenticateToken,commentController.createComment );
//Category
router.post('/newCategory', authMiddleware.authenticateToken, categoryController.createCategory);
router.get('/attractionsByCategory/:id', authMiddleware.authenticateToken, categoryController.attractionsByCategory);
//User routes
router.post('/register/', userController.register);
router.post('/login/', userController.login);
router.post('/logout/', userController.logout);

module.exports = router;
