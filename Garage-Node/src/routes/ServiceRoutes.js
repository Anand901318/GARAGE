const express = require('express');
const servicerouter = express.Router();
const serviceController = require('../controllers/ServiceController');
const { verifyToken, checkRole } = require('../middleware/auth');

// Only Admin and ServiceProvider can add services
servicerouter.post('/add', verifyToken, checkRole(['Admin', 'ServiceProvider']), serviceController.addService);
// Anyone can view all services
servicerouter.get('/', serviceController.getAllServices);
// Service by ID - uncomment and protect by role
// servicerouter.get('/:id', verifyToken, checkRole(['Admin', 'ServiceProvider', 'Customer']), serviceController.getServiceById);

module.exports = servicerouter;