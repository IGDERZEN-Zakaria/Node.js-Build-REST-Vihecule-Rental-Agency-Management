const { Rental, validate } = require('../models/rental');
const { Vehicle } = require('../models/vehicle');
const { Customer } = require('../models/customer');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');

Fawn.init(mongoose);

export const queryRental = async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
};

export const createRental = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // if (!mongoose.Types.ObjectId.isValid(req.body.customerId))
  //   return res.status(400).send('invalid Customer.');

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  const car = await Car.findById(req.body.carId);
  if (!car) return res.status(400).send('Invalid car.');

  if (car.numberAvailable === 0) return res.status(400).send('car not in stock.');

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    car: {
      _id: car._id,
      title: car.title,
      dailyRentalRate: car.dailyRentalRate
    }
  });
  // rental = await rental.save();

  // car.numberAvailable--;
  // car.save();

  try {
    new Fawn.Task()
      .save('rentals', rental)
      .update('cars', { _id: car._id, }, {
        $inc: {
          numberAvailable: -1
        }
      })
      .run();

    res.send(rental);
  }

  catch (ex) {
    res.status(500).send('Something failed');
  }

};

export const getRental = async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental) return res.status(404).send('The rental with the given ID was not found.');

  res.send(rental);
};

