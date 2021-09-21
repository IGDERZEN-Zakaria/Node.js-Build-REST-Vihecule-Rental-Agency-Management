const { Type, validate } = require('../models/type');


export const queryType = async (req, res, next) => {

  //throw new Error('Could not get the genres.');
  const types = await Type.find().sort('name');
  res.send(types);

};

export const createType = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const type = new Type({ name: req.body.name });
  await type.save();

  res.send(type);
};

export const setType = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const type = await Type.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!type) return res.status(404).send('The type with the given ID was not found.');

  res.send(type);
};

export const deleteType = async (req, res) => {
  const type = await Type.findByIdAndRemove(req.params.id);

  if (!type) return res.status(404).send('The type with the given ID was not found.');

  res.send(type);
};

export const getType = async (req, res) => {
  const type = await Type.findById(req.params.id);

  if (!type) return res.status(404).send('The type with the given ID was not found.');

  res.send(type);
};


