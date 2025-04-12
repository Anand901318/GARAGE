const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    make: { type: String,  required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    fueltype: { 
        type: String, 
        required: true, 
        enum: ["Petrol", "Diesel", "CNG", "Electric", "Hybrid"]
    },
    registrationNumber : { type: String, required: true, unique: true },
    
    vehicleColor: { 
        type: String, 
        required: true, 
        
    },
    customNotes: { type: String, required: false }
}, { timestamps: true });  

module.exports = mongoose.model('Vehicle', VehicleSchema);
