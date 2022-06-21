const fs = require('fs')

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));


exports.checkId = (req,res,next,val) => {
  if(req.params.id * 1 > tours.length)
    return res.status(404).json({
      status: 'error',
      message: 'Invalid ID'
    });
  next()
}

exports.checkBody = (req,res,next) => {
  if(!req.body.name || !req.body.price)
    return res.status(404).json({
      status: 'fail',
      message: 'Missing name or price'
    });
  next()
}


//Route handlers

exports.getAllTours = (req, res) => {
  res.json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours
    }
  });
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