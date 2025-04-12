const Vehicle = require('../model/VehicleModel');
// Add Vehicle
const addVehicle = async (req, res) => {
  try {
    // Get user ID from verified JWT token
    const userId = req.user.id;

    // Verify required fields (userId ko include mat karo yahan)
    const requiredFields = ['make', 'model', 'year', 'fueltype', 'registrationNumber', 'vehicleColor'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    // Create vehicle
    const vehicle = await Vehicle.create({
      userId: userId, // Assign from token
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      fueltype: req.body.fueltype,
      registrationNumber: req.body.registrationNumber,
      vehicleColor: req.body.vehicleColor,
      customNotes: req.body.customNotes || ''
    });

    res.status(201).json({
      data: vehicle,
      message: "Vehicle added successfully"
    });

  } catch (error) {
    console.error('Error adding vehicle:', error);
    if (error.code === 11000) { // Duplicate registration number
      return res.status(400).json({ message: "Registration number must be unique" });
    }
    res.status(500).json({
      message: error.message,
      errors: error.errors
    });
  }
};

// Get Vehicles by User ID
const getUserVehicles = async (req, res) => {
  try {
    const userId = req.user.id; // 🟢 Token se mila user id
    const vehicles = await Vehicle.find({ userId }); // 🔐 Only that user's vehicles
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Vehicles by User ID
const getUserById = async (req, res) => {
    try {
      // Get user ID from the token (after verifyToken middleware)
      const userId = req.user.id;
      
      const vehicles = await Vehicle.find({ userId: userId });
      res.json(vehicles);
    } catch (error) {
      res.status(500).json({ message: error.message }); 
    }
  };

// Get Vehicle by ID
const getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });  
        }
        res.json(vehicle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addVehicle,
    getUserVehicles,
    getVehicleById,
    getUserById
}