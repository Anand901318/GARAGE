const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    subject: { type: String, required: true },
    message: { type: String, required: true },
}, { timestamps: true }); 

module.exports = mongoose.model('Message', messageSchema);
