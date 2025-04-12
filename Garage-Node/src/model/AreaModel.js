const mongoose = require('mongoose');

const AreaSchema = new mongoose.Schema({
    areaName: { type: String, required: true },
    cityId: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Area', AreaSchema);   