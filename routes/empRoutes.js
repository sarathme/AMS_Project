const express = require('express');
const empController = require('../controllers/empController');

const router = express.Router();

router
  .route('/')
  .get(empController.getAllEmployees)
  .post(empController.createEmp);

module.exports = router;
