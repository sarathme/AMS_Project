const express = require('express');
const empRouter = require('./routes/empRoutes');

const workDataRouter = require('./routes/workDataRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(express.json());

// app.use((req, res, next) => {
//   console.log(req.headers);
//   next();
// });

app.use('/api/v1/employees', empRouter);
app.use('/api/v1/work-data', workDataRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
