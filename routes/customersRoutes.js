const express = require('express');
const customersController = require('../controllers/customersController');
const router = express.Router();

router.get('/', customersController.customer_index);
router.post('/', customersController.customer_create_post);
router.put('/:id', customersController.customer_update_put);
router.delete('/:id', customersController.customer_delete);
router.get('/:id', customersController.customer_get);

module.exports = router; 