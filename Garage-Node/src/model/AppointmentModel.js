const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    // required: true
  },
  vehicle: {
    type: String,
    required: true
  },
  preferredDate: {
    type: Date,
    required: true
  },
  preferredTime: {
    type: String,
    required: true
  },
  serviceProviderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  additionalInformation: {
    type: String,
    required: true
  },

  serviceType: [
    {
      name: String,
      price: Number
    }
  ],
  amount: {
    type: Number,
    // required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', 
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);
