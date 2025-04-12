const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const ServiceProvider = require("../models/ServiceProviderModel");

// POST: Register a new service provider
router.post("/register", upload.single("mainImage"), async (req, res) => {
    try {
        const {
            name,
            email,
            contactNumber,
            address,
            state,
            city,
            description,
            specialities
        } = req.body;

        let uploadedImage = null;

        // Upload main image to Cloudinary
        if (req.file) {
            const filePath = req.file.path;
            const cloudinaryResult = await UploadFileToCloudinary(filePath);
            uploadedImage = cloudinaryResult.secure_url;
        }

        const newProvider = new ServiceProvider({
            name,
            email,
            contactNumber,
            address,
            state,
            city,
            description,
            specialities: specialities?.split(","),
            mainImage: uploadedImage
        });

        await newProvider.save();

        res.status(201).json({
            success: true,
            message: "Service provider registered successfully",
            data: newProvider
        });

    } catch (error) {
        console.error("Service Provider Register Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to register service provider",
            error: error.message
        });
    }
});

module.exports = router;