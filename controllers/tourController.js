/* eslint-disable no-unused-vars */
// const fs = require('fs');
// eslint-disable-next-line import/no-useless-path-segments
const Tour = require('./../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );

// exports.checkID = (req, res, next, val) => {
//   console.log(`Tour id is: ${val}`);
//   if (req.params.id * 1 > tours.length - 1) {
//     return res.status(404).json({
//       status: 'Fail',
//       message: 'Invalid ID',
//     });
//   }
//   next();
// };

exports.checkBody = (req, res, next) => {
  console.log(`Tour body: `, req.body);
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'bad request',
      message: 'missing name or price',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  //   console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // results: tours.length,
    // data: {
    //   // tours: tours
    //   tours,
    // },
  });
};

// eslint-disable-next-line no-unused-vars
exports.getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1; // we are converting the parameter/url variable to an integer
  // const tour = tours.find((el) => el.id === id);

  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     // tours: tours
  //     tour: tour,
  //   },
  // });
};

exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    // data: {
    //   tour: newTour,
    // },
  });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
