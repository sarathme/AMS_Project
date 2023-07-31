const express = require('express');
const empController = require('../controllers/empController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.route('/').get(empController.getAllEmployees);

router.route('/:id').get(empController.getEmployee);

module.exports = router;
