const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json()); // this (express.json) here is called middleware
// middleware is a function that can modify the incoming request data, its literally stands in the middle of the request and response, its a step that the request goes through while its being processed

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
// console.log(tours);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      // tours: tours
      tours,
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1; // we are converting the parameter/url variable to an integer
  const tour = tours.find((el) => el.id === id);

  // if (id > tours.length) { // here we are checking if the parameter is greater than the tours.length, if it is, we'll return the fail status
  if (!tour) {
    // here we are checking to see if the tour is undefined i.e if the tour has been found, if its undefined, we return the fail status
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      // tours: tours
      tour: tour,
    },
  });
};

const createTour = (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body); // The 'Object.assign allows us to create a new object by merging 2 objects together i.e the 'newId' object and the 'req.body' object

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length - 1) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length - 1) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

// app.get('/api/v1/tours', getAllTours);

// app.get('/api/v1/tours/:id/:x/:y', (req, res) => { // you define multiple parameters/url variables
// app.get('/api/v1/tours/:id/:x/:y?', (req, res) => { // you can also define an optional parameter
app.get('/api/v1/tours/:id', getTour);

// app.post('/api/v1/tours', createTour);

app.patch('/api/v1/tours/:id', updateTour);

app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
