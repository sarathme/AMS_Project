const Employee = require('../models/empModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllEmployees = catchAsync(async (req, res, next) => {
  if (req.user.role !== 'admin')
    return next(
      new AppError(`You don't have permission to access this page`, 401),
    );
  const employees = await Employee.find();
  res.status(200).json({
    status: 'success',
    results: employees.length,
    data: {
      employees,
    },
  });
});

exports.getEmployee = catchAsync(async (req, res, next) => {
  if (req.params.id !== req.user._id.valueOf()) {
    return next(
      new AppError('Invalid entry Please login with your credentials', 400),
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      employee: req.user,
    },
  });
});
