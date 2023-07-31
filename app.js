const express = require('express');
const empRouter = require('./routes/empRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(express.json());

app.use('/api/v1/employees', empRouter);

app.all('*', (req, res, next) => {
  console.log('In this middleware');
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// app.use(globalErrorHandler);

app.use(globalErrorHandler);

module.exports = app;
