const express = require('express');
const productController = require('../controllers/productController');
const { authenticate } = require('../controllers/userAuthenController');

const router = express.Router();

router.get('/', authenticate, productController.getAllProducts);
router.get('/:id', authenticate, productController.getProductById);
router.post('/', authenticate, productController.createProduct);
router.put('/:id', authenticate, productController.updateProduct);
router.delete('/:id', authenticate, productController.deleteProduct);

module.exports = router;
