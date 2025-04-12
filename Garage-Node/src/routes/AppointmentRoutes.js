const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/AppointmentController');
const { verifyToken, checkRole } = require('../middleware/auth'); // 🔒 Token Middleware

// ✅ Book appointment (only logged-in user can)
router.post('/book', verifyToken, appointmentController.bookAppointment);

// ✅ Get appointments for logged-in user only
router.get('/user', verifyToken, appointmentController.getUserAppointments);

router.get('/all', verifyToken, checkRole(['Admin']), appointmentController.getAllAppointments);

router.get( '/provider',verifyToken,checkRole(['ServiceProvider']),appointmentController.getAppointmentsByProvider);

router.get('/total-revenue', appointmentController.getTotalAppointmentRevenue);


module.exports = router;  
