const express = require('express');
const profileController = require('../controllers/profileController');
const { authenticate } = require('../controllers/userAuthenController');
const { upload } = require('../middleware/uploadfile');
const router = express.Router();

router.get('/:id', authenticate, profileController.getProfileById);
router.put('/:id', authenticate, upload.single('picurl'), profileController.updateProfile);

module.exports = router;
