const { Type, validate } = require('../models/type');


const type_index = async (req, res) => {
  const types = await Type.find().sort('name');
  res.send(types);
};

const type_create_post = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const type = new Type({ name: req.body.name });
  await type.save();

  res.send(type);
};

const type_update_put = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const type = await Type.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!type) return res.status(404).send('The type with the given ID was not found.');

  res.send(type);
};

const type_delete = async (req, res) => {
  const type = await Type.findByIdAndRemove(req.params.id);

  if (!type) return res.status(404).send('The type with the given ID was not found.');

  res.send(type);
};

const type_get = async (req, res) => {
  const type = await Type.findById(req.params.id);

  if (!type) return res.status(404).send('The type with the given ID was not found.');

  res.send(type);
};


module.exports = {
  type_index,
  type_create_post,
  type_update_put,
  type_delete,
  type_get
};