const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');


router.get('/me', auth, usersController.user_get);
router.post('/', usersController.user_create_post);

module.exports = router; 
