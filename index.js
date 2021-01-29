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

const express = require('express');
const app = express();

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


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


