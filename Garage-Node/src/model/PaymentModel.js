const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
    amountPaid: { type: Number, required: true },
    paymentDate: { type: Date, default: Date.now },
    paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);
