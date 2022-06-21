const fs = require('fs');
const express = require('express');
const morgan = require('morgan') //for loggin

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

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

// routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;