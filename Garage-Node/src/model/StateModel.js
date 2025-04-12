const mongoose = require('mongoose');

const StateSchema = new mongoose.Schema({
    stateName: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('State', StateSchema);