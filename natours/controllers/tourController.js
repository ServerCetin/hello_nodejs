const fs = require('fs');
const APIFeatures = require('../utils/apiFeatures');

let tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.checkId = (req, res, next, val) => {
  if (req.params.id * 1 > tours.length)
    return res.status(404).json({
      status: 'error',
      message: 'Invalid ID'
    });
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price)
    return res.status(404).json({
      status: 'fail',
      message: 'Missing name or price'
    });
  next();
};


//Route handlers

//GET /api/v1/tours?test=testval&Price[gte]=132 200 31.125 ms - 8741
//get price > 132
// greater than equal gte, gt, lte, lt

exports.alisTopTours = (req, res, next) => { // we manipulate req and query will change
  req.query.limit = 5;
  req.query.sort = 'name,price';
  req.query.fields = 'name,price,difficulty';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    // const features = new APIFeatures(tours.find(), req.query)
    //   .filter()
    //   .sort()
    //   .limitFields()
    //   .paginate();
    //
    // const t = await features.query;

    res.json({
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (e) {
    console.log(e)
    res.json({
      status: 'fail',
      requestedAt: req.requestTime,
      error: {
        e
      }
    });
  }


};

exports.getTour = (req, res) => {
  //const pId = req.params.id;

  const id = req.params.id * 1; //converts string to int automatically
  const tour = tours.find(t => t.id === id);

  res.status(200).send({
    status: 'success',
    data: tour
  });

  // let wantedTour;
  //
  // tours.forEach(tour => {
  //   if(tour.id == pId){wantedTour = tour}
  // });
  //
  // res.status(200).send({
  //   status: 'success',
  //   data: {wantedTour}
  // })
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).send({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  });
};

exports.updateTour = (req, res) => {
  const id = req.params.id * 1; //converts string to int automatically
  const tour = tours.find(t => t.id === id);

  res.status(200).send({
    status: 'success',
    data: 'changed tour here'
  });
};

exports.deleteTour = (req, res) => {
  const id = req.params.id * 1; //converts string to int automatically
  const tour = tours.find(t => t.id === id);

  res.status(204).send({
    status: 'success',
    data: null
  });
};