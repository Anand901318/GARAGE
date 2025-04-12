const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');


const serviceProviderController = require('../controllers/ServiceProviderController');

router.post('/register', verifyToken, serviceProviderController.register);

router.get('/get', serviceProviderController.getAllProviders);
// router.get('/:id', serviceProviderController.getProviderById);

module.exports = router; 