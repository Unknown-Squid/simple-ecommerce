const express = require('express');
const router = express.Router();
const paymentController = require('../Controllers/PaymentController');
const { authenticateToken } = require('../../System/Middlewares/authMiddleware');

// Payment routes (protected)
router.post('/', authenticateToken, paymentController.createPayment.bind(paymentController));
router.get('/:id', authenticateToken, paymentController.getPaymentById.bind(paymentController));
router.get('/order/:orderId', authenticateToken, paymentController.getPaymentsByOrderId.bind(paymentController));
router.put('/:id/status', authenticateToken, paymentController.updatePaymentStatus.bind(paymentController));

module.exports = router;
