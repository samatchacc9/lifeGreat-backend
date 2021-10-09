const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { upload } = require('../middlewares/upload');

router.post('/register', upload.single('profilePicture'), authController.register);
router.post('/login', authController.login);

module.exports = router;
