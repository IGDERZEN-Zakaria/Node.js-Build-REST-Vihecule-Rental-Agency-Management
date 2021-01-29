const Joi = require('joi');
const mongoose = require('mongoose');
const { carSchema } = require('./car');

const Car = mongoose.model('Cars', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  car: {
    type: carSchema,
    required: true
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  }
}));

function validateCar(car) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    // carId: Joi.string().required(),
    carId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required()
  };

  return Joi.validate(car, schema);
}

exports.Car = Car;
exports.validate = validateCar;