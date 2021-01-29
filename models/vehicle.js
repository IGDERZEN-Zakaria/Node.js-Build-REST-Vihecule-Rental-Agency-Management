const Joi = require('joi');
const mongoose = require('mongoose');
const { typeSchema } = require('./type');

const vehicleSchema = new mongoose.Schema({
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
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

function validateVehicle(vehicleSchema) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    // vehicleSchemaId: Joi.string().required(),
    vehicleSchemaId: Joi.objectId().required(),
    numberAvailable: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required()
  };

  return Joi.validate(vehicleSchema, schema);
}

exports.vehicleSchema = vehicleSchema;
exports.VehicleSchema = Vehicle;
exports.validate = validateVehicle;