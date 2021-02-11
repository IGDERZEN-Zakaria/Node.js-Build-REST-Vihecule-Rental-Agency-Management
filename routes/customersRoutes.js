const express = require('express');
const customersController = require('../controllers/customersController');
const auth = require("../middleware/auth");

const router = express.Router();

router.get('/', auth, customersController.customer_index);
router.post('/', auth, customersController.customer_create_post);
router.put('/:id', auth, customersController.customer_update_put);
router.delete('/:id', auth, customersController.customer_delete);
router.get('/:id', auth, customersController.customer_get);

module.exports = router; 