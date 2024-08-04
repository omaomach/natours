const mongoose = require('mongoose');

const dotenv = require('dotenv');

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
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
