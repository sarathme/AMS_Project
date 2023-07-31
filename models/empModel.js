const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    trim: true,
  },
  empCode: {
    type: String,
    required: [true, 'Please enter your employee code'],
    trim: true,
    unique: [true, 'Employee code already exixts'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email address'],
    unique: [true, 'Email already exixts'],
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please enter your password'],
    validate: {
      validator: function (data) {
        return data === this.password;
      },
      message: 'Confirm password should be same as your password',
    },
  },
  role: {
    type: String,
    default: 'employee',
    enum: ['employee', 'admin', 'manager'],
  },
});

const Employee = mongoose.model('Employee', empSchema);

module.exports = Employee;
