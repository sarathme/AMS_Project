const express = require('express');
const workDataController = require('../controllers/workDataController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, workDataController.getAllWorkData);
router
  .route('/:id')
  .get(authController.protect, workDataController.getWorkData);

module.exports = router;
