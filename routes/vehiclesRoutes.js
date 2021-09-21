const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require("../middleware/admin");


import {
    queryVehicle,
    createVehicle,
    setVehicle,
    getVehicle,
    deleteVehicle,
  } from '../controllers/vehiclesController'


router.get('/', auth, queryVehicle);
router.post('/', auth, createVehicle);
router.put('/:id', auth, setVehicle);
router.delete('/:id', [auth, admin], deleteVehicle);
router.get('/:id', auth, getVehicle);

module.exports = router; 