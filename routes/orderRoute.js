const express = require('express');
const orderController = require('../controllers/orderController');
const { authenticate } = require('../controllers/userAuthenController');

const router = express.Router();

router.get('/', authenticate, orderController.getAllOrders);
router.get('/:id', authenticate, orderController.getOrderById);
router.post('/', authenticate, orderController.createOrder);
router.put('/:id', authenticate, orderController.updateOrder);
router.delete('/:id', authenticate, orderController.deleteOrder);

module.exports = router;
