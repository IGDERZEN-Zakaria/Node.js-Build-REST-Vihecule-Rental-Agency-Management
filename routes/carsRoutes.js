const express = require('express');
const carsController = require('../controllers/carsController');
const router = express.Router();

router.get('/', carsController.car_index);
router.post('/', carsController.car_create_post);
router.put('/:id', carsController.car_update_put);
router.delete('/:id', carsController.car_delete);
router.get('/:id', carsController.car_get);

module.exports = router; 