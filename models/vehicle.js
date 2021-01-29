const Joi = require('joi');
const mongoose = require('mongoose');
const { typeSchema } = require('./type');

const Vehicle = mongoose.model('Vehicles', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  type: {
    type: typeSchema,
    required: true
  },
  numberAvailable: {
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

function validateVehicle(vehicle) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    // typeId: Joi.string().required(),
    typeId: Joi.objectId().required(),
    numberAvailable: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required()
  };

  return Joi.validate(vehicle, schema);
}

exports.Vehicle = Vehicle;
exports.validate = validateVehicle;