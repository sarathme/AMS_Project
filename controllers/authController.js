const jwt = require('jsonwebtoken');
const Employee = require('../models/empModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.signup = catchAsync(async (req, res, next) => {
  const newEmp = await Employee.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    empCode: req.body.empCode,
  });
  const token = signToken(newEmp._id);
  res.status(200).json({
    status: 'success',
    token,
    data: {
      user: newEmp,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password exixts

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // Check if user exists & password is correct

  const employee = await Employee.findOne({ email }).select('+password');

  if (
    !employee ||
    !(await employee.correctPassword(password, employee.password))
  ) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // Generate token for the user

  const token = signToken(employee._id);

  res.status(200).json({
    status: 'success',
    token,
  });
});
