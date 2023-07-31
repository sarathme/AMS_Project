const Employee = require('../models/empModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllEmployees = catchAsync(async (req, res, next) => {
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
  const employee = await Employee.findById(req.params.id);
  if (!employee) {
    return next(new AppError('No Tour found with the ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      employee,
    },
  });
});
