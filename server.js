const mongoose = require('mongoose');

const dotenv = require('dotenv');

// Catching Uncaught Exceptions
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! SHUTTING DOWN');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  // .connect(process.env.DATABASE_LOCAL, {
  .connect(DB, {
    // hosted database version
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful'));

// const testTour = new Tour({
//   name: 'The Park Camper',
//   price: '1000',
// });

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log('ERROR: ', err);
//   });

// console.log(app.get('env'));
// console.log(process.env);

// const port = process.env.PORT || 3000;
const port = 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// Unhandled Rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! SHUTTING DOWN');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// console.log(x); // Checking if "Uncaught Expression" error handler is working
