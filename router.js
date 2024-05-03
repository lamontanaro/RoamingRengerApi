const express = require('express');
const router = express.Router();
const authMiddleware = require('./services/authMiddleware');
const touristAttractionController = require('./controllers/touristAttractionController');
const userController = require('./controllers/userController');
const adminController = require('./controllers/adminController');
const commentController = require('./controllers/commentController')
const categoryController = require('./controllers/categoryController')
const bookingController = require('./controllers/bookingController')
//Attractions
router.get('/touristAttractions/', authMiddleware.authenticateToken, touristAttractionController.getAllAttractions);
router.get('/touristAttractions/:id', authMiddleware.authenticateToken, touristAttractionController.getAttractionbyId);
router.post('/touristAttractions/', authMiddleware.authenticateToken, touristAttractionController.createAttraction);
router.put('/touristAttractions/:id', authMiddleware.authenticateToken, touristAttractionController.updateAttraction);
router.delete('/touristAttractions/:id', authMiddleware.authenticateToken, touristAttractionController.deleteAttraction);
//Comment
router.post('/newComment/', authMiddleware.authenticateToken, commentController.createComment);
//Category
router.get('/attractionsByCategory/:id', authMiddleware.authenticateToken, categoryController.attractionsByCategory);
//Booking
router.post('/booking', authMiddleware.authenticateToken, bookingController.createBooking);
router.get('/booking/:id', authMiddleware.authenticateToken, bookingController.bookingById);
//User routes
router.get('/myAttractions/', authMiddleware.authenticateToken, userController.userAttractions);
router.post('/register/', userController.register);
router.post('/login/', userController.login);
router.post('/logout/', userController.logout);
//Admin routes
router.post('/admin/register/', adminController.register);
router.post('/admin/login/', adminController.login);
//Category - Admin
router.post('/admin/newCategory', authMiddleware.authenticateAdminToken, categoryController.createCategory);

module.exports = router;
