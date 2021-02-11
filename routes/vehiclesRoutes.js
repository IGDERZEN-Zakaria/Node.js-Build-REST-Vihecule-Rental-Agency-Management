const express = require('express');
const vehiclesController = require('../controllers/vehiclesController');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require("../middleware/admin");

router.get('/', auth, vehiclesController.vehicle_index);
router.post('/', auth, vehiclesController.vehicle_create_post);
router.put('/:id', auth, vehiclesController.vehicle_update_put);
router.delete('/:id', [auth, admin], vehiclesController.vehicle_delete);
router.get('/:id', auth, vehiclesController.vehicle_get);

module.exports = router; 