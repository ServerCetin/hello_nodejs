const fs = require('fs');
const express = require('express');
const morgan = require('morgan') //for loggin

const app = express();

// MIDDLEWARES
app.use(morgan('dev'));

app.use(express.json());

app.use((req,res,next)=>{
  console.log('Middleware here!');
  next();
})

app.use((req,res,next)=>{
  req.requestTime = new Date().toISOString();
  next();
})


const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

//Route handlers

const getAllTours = (req, res) => {
  res.json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours
    }
  });
};

const getTour = (req, res) => {
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

const createTour = (req, res) => {
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

const updateTour = (req, res) => {
  const id = req.params.id * 1; //converts string to int automatically
  const tour = tours.find(t => t.id === id);

  res.status(200).send({
    status: 'success',
    data: 'changed tour here'
  });
};

const deleteTour = (req, res) => {
  const id = req.params.id * 1; //converts string to int automatically
  const tour = tours.find(t => t.id === id);

  res.status(204).send({
    status: 'success',
    data: null
  });
};

const getAllUsers = (req, res) => {
  res.status(500).send({
    status: 'error',
    message: 'This route is not implemented yet!',
  })
};
const createUser = (req, res) => {
  res.status(500).send({
    status: 'error',
    message: 'This route is not implemented yet!',
  })
};
const getUser = (req, res) => {
  res.status(500).send({
    status: 'error',
    message: 'This route is not implemented yet!',
  })
};
const updateUser = (req, res) => {
  res.status(500).send({
    status: 'error',
    message: 'This route is not implemented yet!',
  })
};
const deleteUser = (req, res) => {
  res.status(500).send({
    status: 'error',
    message: 'This route is not implemented yet!',
  })
};



// Routes
app.route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour);

app.route('/api/v1/tours/:id')
  .get(getTour)
  .put(updateTour)
  .delete(deleteTour)

app.route('/api/v1/users')
  .get(getAllUsers)
  .post(createUser);

app.route('/api/v1/tours/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser)

const port = 3000;

app.listen(port, () => {
  console.log('Server is listening on ${port}');
});