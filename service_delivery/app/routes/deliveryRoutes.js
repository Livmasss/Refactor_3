const express = require('express');
const router = express.Router();
const controller = require('../controllers/deliveryController');

router.get('/delivery/health', controller.healthCheck);

router.post('/delivery', controller.createDelivery);
router.get('/delivery', controller.getAllDeliveries);
router.get('/delivery/:id', controller.getDeliveryById);
router.put('/delivery/:id', controller.updateDelivery);
router.delete('/delivery/:id', controller.deleteDelivery);

module.exports = router;
