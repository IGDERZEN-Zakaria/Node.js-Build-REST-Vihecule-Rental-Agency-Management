const { Car, validate } = require('../models/car');
const { Type } = require('../models/type');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const cars = await Car.find().sort('name');
  res.send(cars);
});

router.post('/', async (req, res) => {
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
});

router.put('/:id', async (req, res) => {
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
});

router.delete('/:id', async (req, res) => {
  const car = await Car.findByIdAndRemove(req.params.id);

  if (!car) return res.status(404).send('The Car with the given ID was not found.');

  res.send(car);
});

router.get('/:id', async (req, res) => {
  const car = await Car.findById(req.params.id);

  if (!car) return res.status(404).send('The Car with the given ID was not found.');

  res.send(car);
});

module.exports = router; 