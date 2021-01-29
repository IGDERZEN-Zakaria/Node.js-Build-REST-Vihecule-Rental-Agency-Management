const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const types = require('./routes/types');
const customers = require('./routes/customers');
const cars = require('./routes/cars');
const rentals = require('./routes/rentals');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/types', types);
app.use('/api/customers', customers);
app.use('/api/cars', cars);
app.use('/api/rentals', rentals);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));