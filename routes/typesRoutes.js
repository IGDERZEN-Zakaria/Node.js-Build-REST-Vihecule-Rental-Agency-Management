const { Type, validate } = require('../models/type');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
//const asyncMiddleware = require("../middleware/async");

import {
    queryType,
    createType,
    setType,
    deleteType,
    getType
  } from '../controllers/typesController'



router.get('/',auth,  queryType);
router.post('/', auth, createType);
router.put('/:id', auth, setType);
router.delete('/:id', [auth, admin], deleteType);
router.get('/:id', auth, getType);

module.exports = router;