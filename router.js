const express = require('express');
const router = express.Router();
//Controllers imports
const authMiddleware = require('./services/authMiddleware');
const touristAttractionController = require('./controllers/touristAttractionController');
const userController = require('./controllers/userController');
const adminController = require('./controllers/adminController');
const commentController = require('./controllers/commentController');
const bookingController = require('./controllers/bookingController');
const categoryController = require('./controllers/categoryController');

router.get('/touristAttractions/', authMiddleware.authenticateToken, touristAttractionController.getAllAttractions);
router.post('/touristAttractions/', authMiddleware.authenticateToken, touristAttractionController.createAttraction);
router.get('/touristAttractions/:id', authMiddleware.authenticateToken, touristAttractionController.getAttractionById);
router.put('/touristAttractions/:id', authMiddleware.authenticateToken, touristAttractionController.updateAttraction);
router.delete('/touristAttractions/:id', authMiddleware.authenticateToken, touristAttractionController.deleteAttraction);

router.post('/newComment/', authMiddleware.authenticateToken, commentController.createComment);

router.get('/touristAttractions/category/:id', authMiddleware.authenticateToken, categoryController.attractionsByCategory);

router.post('/booking/', authMiddleware.authenticateToken, bookingController.createBooking);
router.get('/booking/:id/', authMiddleware.authenticateToken, bookingController.bookingById);

router.get('/myAttractions/', authMiddleware.authenticateToken, userController.userAttractions);
router.post('/register/', userController.register);
router.post('/login/', userController.login);
router.post('/logout/', userController.logout);

router.post('/admin/register/', adminController.register);
router.post('/admin/login/', adminController.login);

router.post('/admin/newCategory', authMiddleware.authenticateAdminToken, categoryController.createCategory);

module.exports = router;
