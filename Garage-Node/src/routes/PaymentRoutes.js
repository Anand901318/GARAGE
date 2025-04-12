const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/PaymentController');

router.post('/pay', paymentController.makePayment);
router.get('/status/:id', paymentController.getPaymentStatus);

module.exports = router;






