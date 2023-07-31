const Employee = require('../models/empModel');

exports.getAllEmployees = async (_, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({
      status: 'success',
      results: employees.length,
      data: {
        employees,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createEmp = async (req, res) => {
  try {
    const newEmp = await Employee.create(req.body);
    res.status(200).json({
      status: 'success',
      results: 1,
      data: {
        newEmp,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
