const { Type, validate } = require('../models/type');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const typesController = require('../controllers/typesController');

router.get('/', typesController.type_create_post);
router.post('/', typesController.type_create_post);
router.put('/:id', typesController.type_update_put);
router.delete('/:id', typesController.type_delete);
router.get('/:id', typesController.type_get);

module.exports = router;