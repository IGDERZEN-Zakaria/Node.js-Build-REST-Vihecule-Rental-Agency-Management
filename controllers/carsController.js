const { Car, validate } = require('../models/car');
const { Type } = require('../models/type');

const car_index = async (req, res) => {
  const cars = await Car.find().sort('name');
  res.send(cars);
};

const car_create_post = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const type = await Type.findById(req.body.typeId);
  if (!type) return res.status(400).send('Invalid type.');

  const car = new Car({
    title: req.body.title,
    type: {
      _id: type._id,
      name: type.name
    },
    numberAvailable: req.body.numberAvailable,
    dailyRentalRate: req.body.dailyRentalRate
  });
  await car.save();

  res.send(car);
};

const car_update_put = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const type = await Type.findById(req.body.typeId);
  if (!type) return res.status(400).send('Invalid type.');

  const car = await Car.findByIdAndUpdate(req.params.id,
    {
      title: req.body.title,
      type: {
        _id: type._id,
        name: type.name
      },
      numberAvailable: req.body.numberAvailable,
      dailyRentalRate: req.body.dailyRentalRate
    }, { new: true });

  if (!car) return res.status(404).send('The Car with the given ID was not found.');

  res.send(car);
};

const car_delete = async (req, res) => {
  const car = await Car.findByIdAndRemove(req.params.id);

  if (!car) return res.status(404).send('The Car with the given ID was not found.');

  res.send(car);
};

const car_get = async (req, res) => {
  const car = await Car.findById(req.params.id);

  if (!car) return res.status(404).send('The Car with the given ID was not found.');

  res.send(car);
};

module.exports = {
  car_index,
  car_create_post,
  car_update_put,
  car_delete,
  car_get
};