const Joi = require('joi');
const mongoose = require('mongoose');

const Type = mongoose.model('type', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
}));

function validatetype(type) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(type, schema);
}

exports.type = type;
exports.validate = validatetype;