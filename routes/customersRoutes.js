const express = require('express');
const customersController = require('../controllers/customersController');
const auth = require("../middleware/auth");

import {
    queryCustomer,
    createCustomer,
    setCustomer,
    deleteCustomer,
    getCustomer
  } from '../controllers/customersController'


const router = express.Router();

router.get('/', auth, queryCustomer);
router.post('/', auth, createCustomer);
router.put('/:id', auth, setCustomer);
router.delete('/:id', auth, deleteCustomer);
router.get('/:id', auth, getCustomer);

module.exports = router; 