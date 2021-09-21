const rentalsController = require('../controllers/rentalsController');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");

import {
    queryRental,
    createRental,
    getRental
  } from '../controllers/rentalsController'


//Fawn.init(mongoose);
Fawn.init(mongoose, 'OJLINTTASKCOLLECTION ');

router.get('/', auth, queryRental);
router.post('/', auth, createRental);
router.get('/:id', [auth], getRental);

module.exports = router; 