const _ = require('lodash');
const express = require('express');
const router = express.Router();

import {
    createAuth,
  } from '../controllers/authsController'

router.post('/', createAuth);


module.exports = router;