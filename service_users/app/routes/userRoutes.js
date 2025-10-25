const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');


router.get('/health', controller.health);

router.post('/users', controller.createUser);
router.get('/users', controller.getAllUsers);
router.get('/users/:userId', controller.getUserById);
router.put('/users/:userId', controller.updateUser);
router.delete('/users/:userId', controller.deleteUser);

module.exports = router;
