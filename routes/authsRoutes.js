const _ = require('lodash');
const express = require('express');
const router = express.Router();
const authsController = require('../controllers/authsController');

router.post('/', authsController.auth_create_post);


module.exports = router; 