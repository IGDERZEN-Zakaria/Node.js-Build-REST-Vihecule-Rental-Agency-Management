require('express-async-errors');
const error = require('./middleware/error');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const typesRoutes = require('./routes/typesRoutes');
const customersRoutes = require('./routes/customersRoutes');
const vehiclesRoutes = require('./routes/vehiclesRoutes');
const rentalsRoutes = require('./routes/rentalsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const authsRoutes = require('./routes/authsRoutes');
const winston = require("winston");
require("winston-mongodb");



const express = require('express');
const app = express();



// winston.handleExceptions(
//   new winston.transports.File({ filename: 'uncaughtExceptions.log' })
// );

// // Only works with synchronous code
// // if we have a promess somewhere and that promess is rejected this code won't execute 
// process.on('uncaughtException', (ex) => {
//   //console.log('WE GOT AN UNCAUGHT EXCEPTION');
//   winston.error(ex.message, ex);
//   process.exit(1);
// });


// process.on('unhandledRejection', (ex) => {
//   ////console.log('WE GOT AN UNHADELED REJECTION');
//   // winston.error(ex.message, ex);
//   // process.exit(1);
//   throw ex;
// });

// winston.add(winston.transports.File, { filename: 'logfile.log' });
// winston.add(winston.transports.MongoDB, {
//   db: 'mongodb://localhost/vidly',
//   level: 'info'
// });

// //throw new Error('Something failed during startup.');

// const p = Promise.reject(new Error('Something failed miserably!'));
// p.then(() => {
//   console.log('Done');
// });


if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
  //process will exist with 0 value in case of succes
}

mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());

app.use('/api/users', usersRoutes);
app.use('/api/auth', authsRoutes);
app.use('/api/types', typesRoutes);
app.use('/api/customers', customersRoutes);
app.use('/api/vehicles', vehiclesRoutes);
app.use('/api/rentals', rentalsRoutes);
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


