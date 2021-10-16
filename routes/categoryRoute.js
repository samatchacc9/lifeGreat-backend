const express = require('express');
const categoryController = require('../controllers/categoryController');
const { authenticate } = require('../controllers/userAuthenController');
const { checkadmin } = require('../controllers/userAuthenController');

const router = express.Router();

router.get('/', authenticate, categoryController.getAllcategorys);
router.get('/:id', authenticate, categoryController.getcategoryById);
router.post('/', authenticate, checkadmin, categoryController.createCategory);
router.put('/:id', authenticate, checkadmin, categoryController.updateCategory);
router.delete('/:id', authenticate, checkadmin, categoryController.deleteCategory);

module.exports = router;
