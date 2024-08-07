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

// exports.checkBody = (req, res, next) => {
//   console.log(`Tour body: `, req.body);
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'bad request',
//       message: 'missing name or price',
//     });
//   }
//   next();
// };

exports.getAllTours = async (req, res) => {
  try {
    // BUILD QUERY
    // 1a) FILTERING
    const queryObject = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObject[el]);

    console.log(req.query, queryObject);

    // 1b) ADVANCED FILTERING
    let queryStr = JSON.stringify(queryObject);
    queryStr = queryStr.replace(/(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // console.log('Query String: ', JSON.parse(queryStr));

    // { difficulty: 'easy', duration: { $gte: 5 } }
    // { duration: { gte: '5' }, difficulty: 'easy' }

    let query = Tour.find(JSON.parse(queryStr));

    // 2) SORTING
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      // console.log(sortBy);
      query = query.sort(sortBy);
      // sort('price ratingsAverage')
    } else {
      // query = query.sort('-createdAt');  // I had to comment this out as it was affecting the pagination
    }

    // const tours = await Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    // 3) FIELD LIMITING
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // 4) PAGINATION
    const page = req.query.page * 1 || 1; // we are converting the page number in the query string to an integer. We are also defining a default page number
    const limit = req.query.limit * 1 || 100; // the limit is the number of items per page
    const skip = (page - 1) * limit; // these are the results that come before the page that we are requesting

    query = query.skip(skip).limit(limit);

    // EXECUTE QUERY
    const tours = await query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// eslint-disable-next-line no-unused-vars
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // Tour.findOne({ _id: req.params.id }) in mongodb the id is labelled as _id

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    // const newTour = new Tour({})
    // newTour.save()

    const newTour = await Tour.create(req.body); // we use async, await because Tour.create returns a promise that we are awaiting so that we can store then newly created tour document inside the newTour

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    // We have a try, catch because we've used an async await function
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // send the updated document back to the client
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour: updatedTour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid data sent',
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: 'Could not delete tour',
    });
  }
};
