const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: 8,
    select: false,
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
  photo: String,
});

//Works only on save and create

empSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next;
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

empSchema.methods.correctPassword = async function (
  enteredPassword,
  userPassword,
) {
  return await bcrypt.compare(enteredPassword, userPassword);
};

const Employee = mongoose.model('Employee', empSchema);

module.exports = Employee;
