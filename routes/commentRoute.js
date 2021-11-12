const express = require('express');
const productController = require('../controllers/productController');
const { authenticate } = require('../controllers/userAuthenController');
const { upload } = require('../middleware/uploadfile');
const { checkadmin } = require('../controllers/userAuthenController');
const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:id', authenticate, productController.getProductById);
router.post('/', authenticate, checkadmin, upload.single('picurl'), productController.createProduct);
router.put('/:id', authenticate, checkadmin, upload.single('picurl'), productController.updateProduct);
router.delete('/:id', authenticate, checkadmin, productController.deleteProduct);

module.exports = router;
