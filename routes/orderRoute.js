const express = require('express');
const orderController = require('../controllers/orderController');
const { authenticate } = require('../controllers/userAuthenController');
const { upload } = require('../middleware/uploadfile');
const { checkadmin } = require('../controllers/userAuthenController');
const router = express.Router();

router.get('/', authenticate, orderController.getAllOrders);
router.get('/:id', authenticate, orderController.getOrderById);
router.post('/', authenticate, checkadmin, upload.single('picurl'), orderController.createOrder);
router.put('/:id', authenticate, checkadmin, orderController.updateOrder);
router.delete('/:id', authenticate, checkadmin, orderController.deleteOrder);

module.exports = router;
