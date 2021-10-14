const express = require('express');
const productController = require('../controllers/productController');
const { authenticate } = require('../controllers/userAuthenController');
const { upload } = require('../middleware/uploadfile');
const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:id', authenticate, productController.getProductById);
router.post('/', authenticate, upload.single('picurl'), productController.createProduct);
router.put('/:id', authenticate, upload.single('picurl'), productController.updateProduct);
router.delete('/:id', authenticate, productController.deleteProduct);

module.exports = router;
