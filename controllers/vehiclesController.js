const { Vehicle, validate } = require('../models/vehicle');
const { Type } = require('../models/type');

const vehicle_index = async (req, res) => {
  const vehicles = await Vehicle.find().sort('name');
  res.send(vehicles);
};

const vehicle_create_post = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const type = await Type.findById(req.body.typeId);
  if (!type) return res.status(400).send('Invalid type.');

  const vehicle = new Vehicle({
    title: req.body.title,
    type: {
      _id: type._id,
      name: type.name
    },
    numberAvailable: req.body.numberAvailable,
    dailyRentalRate: req.body.dailyRentalRate
  });
  await vehicle.save();

  res.send(vehicle);
};

const vehicle_update_put = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const type = await Type.findById(req.body.typeId);
  if (!type) return res.status(400).send('Invalid type.');

  const vehicle = await Vehicle.findByIdAndUpdate(req.params.id,
    {
      title: req.body.title,
      type: {
        _id: type._id,
        name: type.name
      },
      numberAvailable: req.body.numberAvailable,
      dailyRentalRate: req.body.dailyRentalRate
    }, { new: true });

  if (!vehicle) return res.status(404).send('The vehicle with the given ID was not found.');

  res.send(vehicle);
};

const vehicle_delete = async (req, res) => {
  const vehicle = await Vehicle.findByIdAndRemove(req.params.id);

  if (!vehicle) return res.status(404).send('The vehicle with the given ID was not found.');

  res.send(vehicle);
};

const vehicle_get = async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);

  if (!vehicle) return res.status(404).send('The vehicle with the given ID was not found.');

  res.send(vehicle);
};

module.exports = {
  vehicle_index,
  vehicle_create_post,
  vehicle_update_put,
  vehicle_delete,
  vehicle_get
};