const express = require('express');
const orderItemController = require('../controllers/orderItemController');
const { authenticate } = require('../controllers/userAuthenController');

const router = express.Router();

router.get('/', authenticate, orderItemController.getAllOrderItems);
router.get('/:id', authenticate, orderItemController.getOrderItemById);
router.post('/', authenticate, orderItemController.createOrderItem);
router.put('/:id', authenticate, orderItemController.updateOrderItem);
router.delete('/:id', authenticate, orderItemController.deleteOrderItem);

module.exports = router;
