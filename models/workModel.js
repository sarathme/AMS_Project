const mongoose = require('mongoose');
// const validator = require('validator');

const workSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },

  loginTime: {
    type: Number,
    required: true,
    default: Date.now,
  },

  logoutTime: {
    type: Number,
    default: Date.now,
  },
  breakHours: {
    type: Number,
  },
  totalWorkedHours: {
    type: Number,
  },
  empCode: {
    type: String,
    required: true,
  },
});

const WorkModel = mongoose.model('WorkModel', workSchema);

module.exports = WorkModel;
