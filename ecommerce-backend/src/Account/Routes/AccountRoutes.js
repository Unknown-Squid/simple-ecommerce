const express = require('express');
const router = express.Router();
const accountController = require('../Controllers/AccountController');
const { authenticateToken } = require('../../System/Middlewares/authMiddleware');

// Public routes
router.post('/register', accountController.register.bind(accountController));
router.post('/login', accountController.login.bind(accountController));

// Protected routes
router.get('/profile', authenticateToken, accountController.getProfile.bind(accountController));
router.put('/profile', authenticateToken, accountController.updateProfile.bind(accountController));

module.exports = router;
