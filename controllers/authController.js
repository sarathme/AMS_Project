const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const Employee = require('../models/empModel');
const Work = require('../models/workModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.signup = catchAsync(async (req, res, next) => {
  // const work = await Work.create({
  //   date: Date.now(),
  //   empCode: req.body.empCode,
  // });

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
  const token = signToken(employee._id.valueOf());
  const work = await Work.create({
    date: Date.now(),
    empCode: employee.empCode,
  });

  employee.workData.push(work);

  await Employee.findOneAndUpdate({ email }, { workData: employee.workData });

  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // Getting token and check its available
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in. Please Login to continue', 401),
    );
  }

  // Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Check if user exists

  const freshEmp = await Employee.findById(decoded.id);

  if (!freshEmp) {
    return next(new AppError('The user no longer exists', 401));
  }

  //Check if user changed password recently

  if (freshEmp.changedPassword(decoded.iat)) {
    return next(
      new AppError(
        'User recently changed the password. Please login again',
        401,
      ),
    );
  }

  req.user = freshEmp;
  next();
});
