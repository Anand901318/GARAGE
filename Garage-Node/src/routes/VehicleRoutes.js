const express = require('express');
const router = express.Router(); 
const vehicleController = require('../controllers/VehicleController');  
const { verifyToken } = require('../middleware/auth');

// Define routes
router.post('/add', verifyToken, vehicleController.addVehicle); 
router.get('/user', verifyToken, vehicleController.getUserVehicles);  
router.get('/user/:id', verifyToken, vehicleController.getUserById);  
router.get('/:id', verifyToken, vehicleController.getVehicleById); 
module.exports = router;     
  