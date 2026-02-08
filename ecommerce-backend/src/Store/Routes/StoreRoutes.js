const express = require('express');
const router = express.Router();
const storeController = require('../Controllers/StoreController');
const { authenticateToken } = require('../../System/Middlewares/authMiddleware');

// Product routes (public for viewing, protected for management)
router.get('/products', storeController.getAllProducts.bind(storeController));
router.get('/products/:id', storeController.getProductById.bind(storeController));
router.post('/products', authenticateToken, storeController.createProduct.bind(storeController));
router.put('/products/:id', authenticateToken, storeController.updateProduct.bind(storeController));
router.delete('/products/:id', authenticateToken, storeController.deleteProduct.bind(storeController));

// Order routes (protected)
router.post('/orders', authenticateToken, storeController.createOrder.bind(storeController));
router.get('/orders', authenticateToken, storeController.getUserOrders.bind(storeController));
router.get('/orders/:id', authenticateToken, storeController.getOrderById.bind(storeController));
router.put('/orders/:id/status', authenticateToken, storeController.updateOrderStatus.bind(storeController));

module.exports = router;
