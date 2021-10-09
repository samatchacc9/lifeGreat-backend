const express = require('express');
const profileController = require('../controllers/profileController');
const { authenticate } = require('../controllers/userAuthenController');

const router = express.Router();

router.get('/:id', authenticate, profileController.getProfileById);
router.put('/:id', authenticate, profileController.updateProfile);

module.exports = router;
