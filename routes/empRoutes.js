const express = require('express');
const empController = require('../controllers/empController');

const router = express.Router();

router
  .route('/')
  .get(empController.getAllEmployees)
  .post(empController.createEmp);

router.route('/:id').get(empController.getEmployee);

module.exports = router;
