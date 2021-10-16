const express = require('express');
const orderItemController = require('../controllers/orderItemController');
const { authenticate } = require('../controllers/userAuthenController');

const router = express.Router();

router.get('/', authenticate, orderItemController.getAllOrderItems);
router.get('/:id', authenticate, checkadmin, orderItemController.getOrderItemById);
router.post('/', authenticate, checkadmin, orderItemController.createOrderItem);
router.put('/:id', authenticate, checkadmin, orderItemController.updateOrderItem);
router.delete('/:id', authenticate, checkadmin, orderItemController.deleteOrderItem);

module.exports = router;
