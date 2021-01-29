const express = require('express');
const vehiclesController = require('../controllers/vehiclesController');
const router = express.Router();

router.get('/', vehiclesController.vehicle_index);
router.post('/', vehiclesController.vehicle_create_post);
router.put('/:id', vehiclesController.vehicle_update_put);
router.delete('/:id', vehiclesController.vehicle_delete);
router.get('/:id', vehiclesController.vehicle_get);

module.exports = router; 