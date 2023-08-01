const WorkData = require('../models/workModel');
// const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllWorkData = catchAsync(async (req, res, next) => {
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
  const workData = await WorkData.find({ empCode: req.params.empCode });
  res.status(200).json({
    status: 'success',
    results: WorkData.length,
    data: {
      workData,
    },
  });
});
