const ServiceProvider = require('../model/ServiceProviderModel');

exports.register = async (req, res) => {
    try {
        // Extract Data from req.body
        const {
            name,
            email,
            contactNumber,
            address,
            state,
            city,
            description,
            specialities,
            mainImage,
            galleryImages
        } = req.body; 
   
        const userId = req.user.userId;

        //Check if email already exists (optional)
        const existingProvider = await ServiceProvider.findOne({ email });
        if (existingProvider) {
            return res.status(400).json({ message: "Email already registered!" }); 
        }

        //Create a new service provider
        const newProvider = new ServiceProvider({
            name,
            email,
            contactNumber,
            address,
            state,
            city,
            description,
            specialities,
            mainImage,
            galleryImages,
            userId
        });

        //Save to MongoDB
        await newProvider.save();

        // Send success response
        res.status(201).json({ message: "Service provider registered successfully!", data: newProvider });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get All Service Providers
exports.getAllProviders = async (req, res) => {
    try {
        const providers = await ServiceProvider.find();
        res.json(providers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};