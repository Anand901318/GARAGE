const mongoose = require('mongoose');

const ServiceProviderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNumber: { type: String, required: true },
    address: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    description: { type: String, required: true },
    specialities: { type: [String], required: true },
    mainImage: { type: String},  
    galleryImages: { type: [String] },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
      }
}, { timestamps: true });
module.exports = mongoose.model('ServiceProvider', ServiceProviderSchema);

