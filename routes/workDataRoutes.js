const express = require('express');
const workDataController = require('../controllers/workDataController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/').get(workDataController.getAllWorkData);
router
  .route('/:empCode')
  .get(authController.protect, workDataController.getWorkData);

module.exports = router;
