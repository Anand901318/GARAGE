const AppointmentModel = require('../model/AppointmentModel');
const ServiceProvider = require('../model/ServiceProviderModel');

// 🔒 Book Appointment with Logged-in User (Customer)
exports.bookAppointment = async (req, res) => {
    try {
        const {
            fullName,
            phoneNumber,
            email,
            serviceType,
            vehicle,
            preferredDate,
            preferredTime,
            serviceProviderId,
            additionalInformation
        } = req.body;

        // ✅ Validate Service Provider ID
        const provider = await ServiceProvider.findById(serviceProviderId);
        if (!provider) {
            return res.status(404).json({ message: 'Service Provider not found' });
        }

        // ✅ Create appointment and link customer userId
        const savedAppointment = await AppointmentModel.create({
            fullName,
            phoneNumber,
            email,
            serviceType,
            vehicle,
            preferredDate,
            preferredTime,
            serviceProviderId: provider._id,
            additionalInformation,
            userId: req.user.userId  // 👈 Logged-in customer's userId
        });

        res.status(201).json({
            message: "Appointment booked successfully",
            data: savedAppointment
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🔍 Get Appointments for Logged-in User (Customer)
exports.getUserAppointments = async (req, res) => {
    try {
        const appointments = await AppointmentModel.find({ userId: req.user.userId });

        if (!appointments.length) {
            return res.status(404).json({ message: "No appointments found for this user." });
        }

        res.status(200).json({
            message: "Appointments fetched successfully",
            data: appointments
        });

    } catch (error) {
        res.status(500).json({ message: error.message });    
    }
};

// 🔍 Get All Appointments (Admin Only)
exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await AppointmentModel.find()
            .populate('userId', 'fullName email');
        res.status(200).json({
            message: "All appointments fetched successfully",
            data: appointments
        });
    } catch (error) {
        res.status(500).json({ message: error.message });  
    }
};

// 🔍 Get Appointments for Logged-in Service Provider
exports.getAppointmentsByProvider = async (req, res) => {
    try {
        const userId = req.user.userId; // 👈 This is service provider's userId from JWT

        // Find the provider record linked with this userId
        const provider = await ServiceProvider.findOne({ userId });
        if (!provider) {
            return res.status(404).json({ message: 'Service Provider not found' });
        }

        const appointments = await AppointmentModel.find({ serviceProviderId: provider._id })
            .populate('userId', 'fullName email')
            .sort({ preferredDate: 1 });

        if (!appointments.length) {
            return res.status(404).json({ message: 'No appointments found for this provider.' });
        }

        res.status(200).json({
            message: 'Appointments fetched successfully',
            data: appointments,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTotalAppointmentRevenue = async (req, res) => {
    try {
      const appointments = await AppointmentModel.find();
  
      let totalRevenue = 0;
  
      appointments.forEach(appointment => {
        // appointment.serviceType is an array of { name, price }
        if (Array.isArray(appointment.serviceType)) {
          appointment.serviceType.forEach(service => {
            totalRevenue += service.price || 0;
          });
        }
      });
  
      res.status(200).json({
        success: true,
        totalRevenue,
        totalAppointments: appointments.length
      });
  
    } catch (error) {
      console.error('Error calculating total revenue:', error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  };
