const mongoose = require('mongoose');
const dotenv = require('dotenv');

// process.on('uncaughtException', (err) => {
//   console.log('UNCAUGHT EXCEPTION! 💥 Shutting down....');
//   console.log(err.message, err.name);
//   process.exit(1);
// });

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DB_CONNECT.replace(
  '<PASSWORD>',
  process.env.DB_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// process.on('unhandledRejection', (err) => {
//   console.log('Shutting down server....');
//   console.log(err.name, err.message);
//   server.close(() => {
//     process.exit(1);
//   });
// });
