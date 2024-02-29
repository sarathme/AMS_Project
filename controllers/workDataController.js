const WorkData = require('../models/workModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllWorkData = catchAsync(async (req, res, next) => {
  if (req.user.role !== 'admin')
    return next(
      new AppError(`You don't have permission to access this page`, 401),
    );
  const workData = await WorkData.find();
  res.status(200).json({
    status: 'success',
    results: workData.length,
    data: {
      workData,
    },
  });
});

exports.getWorkData = catchAsync(async (req, res, next) => {
  if (req.user.id !== req.params.id)
    next(
      new AppError(
        `You don't have permission to access this page. Please login with your credentials`,
        401,
      ),
    );

  const workData = await WorkData.find({ empCode: req.user.empCode });
  res.status(200).json({
    status: 'success',
    results: WorkData.length,
    data: {
      workData,
    },
  });
});
