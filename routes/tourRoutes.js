const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

// router.param('id', tourController.checkID);

// Create a checkbody middleware function
// Check if the body contains the tour name and price property
// If not, send back 400 (bad request)
// Add it to the post handler stack

// console.log(tourController.checkBody());

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
