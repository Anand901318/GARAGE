const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

// Express Object
const app = express();
app.use(cors());
app.use(express.json());

// Database Connection 
mongoose.connect("mongodb://127.0.0.1:27017/e-Garage")
    .then(() => {
        console.log("Database connected successfully.");
       
    })
    
    .catch((error) => {
        console.error("Database connection failed:", error);
    });

// // Importing Routes
const roleRoutes = require("./src/routes/RoleRoutes");
const userRoutes = require("./src/routes/UserRouter");
const stateRoutes = require("./src/routes/StateRoutes");
const cityRoutes = require("./src/routes/CityRoutes");
const areaRoutes = require("./src/routes/AreaRoutes");
const vehicleRoutes = require("./src/routes/VehicleRoutes");
const paymentRoutes = require("./src/routes/PaymentRoutes");
const serviceproviderrouter = require("./src/routes/ServiceProviderRoutes");
const servicerouter = require("./src/routes/ServiceRoutes");
const router = require("./src/routes/AppointmentRoutes");
const authRoutes = require("./src/routes/AuthRoutes");
const dashboardRoutes = require("./src/routes/DashboardRoutes");
const messageRoutes = require("./src/routes/MessageRoutes");
const razorpayRoutes = require("./src/routes/RazorpayRoutes");


// Using Routes 
app.use("/role", roleRoutes);
app.use("/user", userRoutes);   
app.use("/state", stateRoutes);
app.use("/city", cityRoutes);
app.use("/area", areaRoutes);
app.use("/vehicle", vehicleRoutes);
app.use("/serviceProvider", serviceproviderrouter);
app.use("/service", servicerouter);
app.use("/appointment", router);
app.use("/payment", paymentRoutes);
// New Auth Routes
app.use("/api/auth", authRoutes);
app.use("/api", dashboardRoutes);
app.use("/messages", messageRoutes);
app.use("/razor",razorpayRoutes);

// Default Route
app.get("/", (req, res) => {
    res.send("🚀 E-Garage API is Running...");
});

// Server Creation
const PORT = 3000;
app.listen(PORT, () => {
    console.log(` Server started on http://localhost:${PORT}`);
});
