const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
    cityName: { type: String, required: true },
    stateId: { type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true }
}, { timestamps: true });

module.exports = mongoose.model('City', CitySchema);