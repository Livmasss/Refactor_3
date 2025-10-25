const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// 🩺 Health and Status
router.get('/orders/health', orderController.health);
router.get('/orders/status', orderController.status);

// 📦 CRUD operations
router.get('/orders', orderController.getAllOrders);            // Get all orders (optionally filter by userId)
router.post('/orders', orderController.createOrder);            // Create new order
router.get('/orders/:orderId', orderController.getOrderById);   // Get order by ID
router.put('/orders/:orderId', orderController.updateOrder);    // Update existing order
router.delete('/orders/:orderId', orderController.deleteOrder); // Delete order

module.exports = router;
