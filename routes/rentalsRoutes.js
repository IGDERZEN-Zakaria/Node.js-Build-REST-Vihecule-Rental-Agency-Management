const rentalsController = require('../controllers/rentalsController');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");

//Fawn.init(mongoose);
Fawn.init(mongoose, 'OJLINTTASKCOLLECTION ');

router.get('/', auth, rentalsController.rental_index);
router.post('/', auth, rentalsController.rental_create_post);
router.get('/:id', [auth], rentalsController.rental_get);

module.exports = router; 