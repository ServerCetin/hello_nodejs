const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json());
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// firstly we created our endpoints in traditional way
// app.get('/', (req, res) => {
//   //res.status(200).send('it is done!');
//   res.json({
//     message: 'it is done!',
//     app: 'natours'
//   });
// });
//
// app.get('/api/v1/tours', (req, res) => {
//   res.json({
//     status: 'success',
//     results: tours.length,
//     data: {
//       tours
//     }
//   });
// });
//
// app.post('/api/v1/tours', (req, res) => {
//   const newId = tours[tours.length - 1].id + 1;
//   const newTour = Object.assign({ id: newId }, req.body);
//
//   tours.push(newTour);
//
//   fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
//     res.status(201).send({
//       status: 'success',
//       data: {
//         tour: newTour
//       }
//     });
//   });
// });
//
// // /api/v1/tours/:id/:name? id is required but name is nullable
// app.get('/api/v1/tours/:id', (req, res) => {
//   //const pId = req.params.id;
//
//   const id = req.params.id * 1; //converts string to int automatically
//   const tour = tours.find(t => t.id === id);
//
//   res.status(200).send({
//     status: 'success',
//     data: tour
//   });
//
//   // let wantedTour;
//   //
//   // tours.forEach(tour => {
//   //   if(tour.id == pId){wantedTour = tour}
//   // });
//   //
//   // res.status(200).send({
//   //   status: 'success',
//   //   data: {wantedTour}
//   // })
// });
//
// app.put('/api/v1/tours/:id', (req, res) => {
//   const id = req.params.id * 1; //converts string to int automatically
//   const tour = tours.find(t => t.id === id);
//
//   res.status(200).send({
//     status: 'success',
//     data: 'changed tour here'
//   });
// });
//
// app.delete('/api/v1/tours/:id', (req, res) => {
//   const id = req.params.id * 1; //converts string to int automatically
//   const tour = tours.find(t => t.id === id);
//
//   res.status(204).send({
//     status: 'success',
//     data: null
//   });
// });

// we defined our functions in variables
const getAllTours = (req, res) => {
  res.json({
    status: 'success',
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

// app.get('/api/v1/tours',getAllTours);
// app.post('/api/v1/tours',createTour);
// app.get('/api/v1/tours/:id',getTour);
// app.put('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour);

app.route('/api/v1/tours/:id')
  .get(getTour)
  .put(updateTour)
  .delete(deleteTour)

const port = 3000;

app.listen(port, () => {
  console.log('Server is listening on ${port}');
});