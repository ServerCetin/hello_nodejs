const express = require('express')

const tourController = require('../controllers/tourController')
const router = express.Router();

// router.param('id', (req, res, next, value) =>{
//   console.log(`your parameter has ${value}`);
//   next();
// })

router.param('id', tourController.checkId);

router.route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);

router.route('/:id')
  .get(tourController.getTour)
  .put(tourController.updateTour)
  .delete(tourController.deleteTour)

module.exports = router;
