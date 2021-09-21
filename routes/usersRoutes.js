const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

import {
    getUser,
    createUser,
  } from '../controllers/usersController'


router.get('/me', auth, getUser);
router.post('/', createUser);

module.exports = router; 
