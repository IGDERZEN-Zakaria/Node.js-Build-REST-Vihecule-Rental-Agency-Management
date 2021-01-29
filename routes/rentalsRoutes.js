const rentalsController = require('../controllers/rentalsController');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();

//Fawn.init(mongoose);
Fawn.init(mongoose, 'OJLINTTASKCOLLECTION ');

router.get('/', rentalsController.rental_index);
router.post('/', rentalsController.rental_create_post);
router.get('/:id', rentalsController.rental_get);

module.exports = router; 