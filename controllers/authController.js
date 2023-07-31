const jwt = require('jsonwebtoken');
const Employee = require('../models/empModel');
const catchAsync = require('../utils/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
  const newEmp = await Employee.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    empCode: req.body.empCode,
  });

  const token = jwt.sign({ id: newEmp._id });
  res.status(200).json({
    status: 'success',
    results: 1,
    data: {
      user: newEmp,
    },
  });
});
