const { Type, validate } = require('../models/type');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const typesController = require('../controllers/typesController');
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get('/', auth, typesController.type_create_post);
router.post('/', auth, typesController.type_create_post);
router.put('/:id', auth, typesController.type_update_put);
router.delete('/:id', [auth, admin], typesController.type_delete);
router.get('/:id', auth, typesController.type_get);

module.exports = router;