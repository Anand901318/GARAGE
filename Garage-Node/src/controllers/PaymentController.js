const Payment = require('../model/PaymentModel');

// Make Payment
exports.makePayment = async (req, res) => {
    try {
        const { userId, amount, status } = req.body;
        const newPayment = new Payment({ userId, amount, status });
        await newPayment.save();
        res.status(201).json({ message: "Payment successful" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Payment Status
exports.getPaymentStatus = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) return res.status(404).json({ message: "Payment not found" });
        res.json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};