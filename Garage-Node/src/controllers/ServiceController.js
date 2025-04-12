const Service = require('../model/ServiceModel');

// Add Service
exports.addService = async (req, res) => {
    try {
        const { name, price } = req.body;
        const newService = new Service({ name, price });
        await newService.save();
        res.status(201).json({ message: "Service added successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Services
exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });   
    }
};