import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

// Service prices mapping
const SERVICE_PRICES = {
  "Oil Change": 299,
  "Engine Repair": 2499,
  "Brake Service": 899,
  "Battery Service": 599,
  "AC Repair": 1499,
  "Diagnostics": 699,
  "Transmission Service": 3999,
  "Tire Service": 799,
  "Other": 999
}

// Simple function to extract userId from token
const extractUserIdFromToken = (token) => {
  try {
    // Basic JWT structure is: header.payload.signature
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))

    const payload = JSON.parse(jsonPayload)
    return payload.userId || payload.id || ""
  } catch (error) {
    console.error("Failed to decode token:", error)
    return ""
  }
}

const Booking = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    vehicle: '',
    serviceProviderId: '',
    preferredDate: '',
    preferredTime: '',
    additionalInformation: '',
    serviceType:'',
    userId: '',
    amount: '',
  })

  // State for selected services
  const [selectedServices, setSelectedServices] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [serviceProviders, setServiceProviders] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchServiceProviders = async () => {
      setLoading(true)
      try {
        const response = await axios.get('http://localhost:3000/serviceProvider/get')
        setServiceProviders(response.data)
      } catch (error) {
        console.error('Error fetching service providers:', error)
      } finally {
        setLoading(false)
      }
    }

    // 👇 Set userId from JWT token
    const token = localStorage.getItem("token")
    if (token) {
      const userId = extractUserIdFromToken(token)
      setFormData((prev) => ({
        ...prev,
        userId: userId
      }))
    }

    // Add Razorpay script to document
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)

    fetchServiceProviders()

    // Cleanup function
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle service selection (checkbox)
  const handleServiceChange = (service) => {
    setSelectedServices(prev => {
      const updatedServices = prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service];
  
      setFormData(prevForm => ({
        ...prevForm,
        serviceType: updatedServices.join(', '), // or keep as array
      }));
  
      return updatedServices;
    });
  };
  

  // Get total price based on selected services
  const getTotalPrice = () => {
    return selectedServices.reduce((total, service) => {
      return total + SERVICE_PRICES[service]
    }, 0)
  }

  // Initialize Razorpay payment
  const initiatePayment = () => {
    const totalPrice = getTotalPrice()
    if (selectedServices.length === 0) {
      toast.error("Please select at least one service")
      return
    }

    const token = localStorage.getItem("token")
    if (!token) {
      toast.error("You must be logged in to book an appointment")
      return
    }

    // Validate form fields
    if (!formData.fullName || !formData.email || !formData.phoneNumber ||
      !formData.vehicle || !formData.serviceProviderId ||
      !formData.preferredDate || !formData.preferredTime) {
      toast.error("Please fill in all required fields")
      return
    }

    const options = {
      key: "rzp_test_acUDpLGfdOSofa", // Replace with your actual Razorpay key
      amount: totalPrice * 100, // Razorpay amount is in paisa
      currency: "INR",
      name: "E-Garage",
      description: `Payment for ${selectedServices.join(", ")}`,
      image: "/logo.png", // Replace with your company logo
      handler: function (response) {
        // Payment was successful
        const paymentData = {
          ...formData,
          services: selectedServices,
          paymentId: response.razorpay_payment_id,
          amount: totalPrice,
          paymentStatus: "paid"
        }

        // Submit the booking with payment details
        submitBookingWithPayment(paymentData)
      },
      prefill: {
        name: formData.fullName,
        email: formData.email,
        contact: formData.phoneNumber
      },
      notes: {
        serviceType: selectedServices.join(", "),
        address: "E-Garage Service Center"
      },
      theme: {
        color: "#3399cc"
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const submitBookingWithPayment = async (paymentData) => {
    const token = localStorage.getItem("token")

    try {
      const response = await axios.post(
        "http://localhost:3000/appointment/book",

        paymentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )


      console.log(response.data)
      setIsSubmitted(true)
      toast.success("Appointment booked and payment completed successfully!")
      // Redirect to appointment details or payment receipt
      setTimeout(() => {
        navigate('/appointments')
        window.location.reload();
      }, 2000)
    } catch (error) {
      console.error("Error creating appointment:", error)
      toast.error("Error creating appointment with payment")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Build serviceType array and total amount
    const selectedServiceDetails = selectedServices.map(service => ({
      name: service,
      price: SERVICE_PRICES[service]
    }));
  
    const totalAmount = selectedServiceDetails.reduce((sum, item) => sum + item.price, 0);
  
    // Create updated payload for submission
    const payload = {
      ...formData,
      serviceType: selectedServiceDetails,
      amount: totalAmount
    };
  
    try {
      const token = localStorage.getItem("token");
      console.log("Payload being sent:", payload);
  
      const response = await axios.post(
        "http://localhost:3000/appointment/book",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Response from server:", response.data);
      setFormData(prev => ({
        ...prev,
        amount: totalAmount,
        serviceType: selectedServiceDetails // optional if you want to store it
      }));
       // Optional: You might want to reset instead
      initiatePayment(); // 💳 Only call this if booking succeeded
    } catch (error) {
      console.error("Error submitting appointment:", error);
    }
  };
  

  const services = [
    "Oil Change", "Engine Repair", "Brake Service", "Battery Service",
    "AC Repair", "Diagnostics", "Transmission Service", "Tire Service", "Other"
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container text-center">
          <h1 className="text-4xl font-bold mb-4">Book an Appointment</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Schedule your service appointment online and we'll get back to you to confirm the details.
          </p>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              {isSubmitted ? (
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Appointment Request Submitted!</h2>
                  <p className="text-gray-600 mb-6">
                    Thank you for booking with us. We'll contact you shortly to confirm your appointment.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="btn btn-primary"
                  >
                    Book Another Appointment
                  </button>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Appointment Details</h2>

                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Personal Information */}
                      <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="fullName">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="phoneNumber">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="vehicle">
                          Vehicle (Make, Model, Year) *
                        </label>
                        <input
                          type="text"
                          id="vehicle"
                          name="vehicle"
                          value={formData.vehicle}
                          onChange={handleChange}
                          placeholder="e.g. Toyota Camry 2019"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>

                      {/* Service Provider Field */}
                      <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="serviceProviderId">
                          Service Provider *
                        </label>
                        <select
                          id="serviceProviderId"
                          name="serviceProviderId"
                          value={formData.serviceProviderId}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        >
                          <option value="">Select a service provider</option>
                          {serviceProviders.map((provider) => (
                            <option key={provider._id} value={provider._id}>
                              {provider.name || "Unnamed Provider"}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Appointment Details */}
                      <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="preferredDate">
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          id="preferredDate"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="preferredTime">
                          Preferred Time *
                        </label>
                        <select
                          id="preferredTime"
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        >
                          <option value="">Select a time</option>
                          <option value="8:00 AM">8:00 AM</option>
                          <option value="9:00 AM">9:00 AM</option>
                          <option value="10:00 AM">10:00 AM</option>
                          <option value="11:00 AM">11:00 AM</option>
                          <option value="12:00 PM">12:00 PM</option>
                          <option value="1:00 PM">1:00 PM</option>
                          <option value="2:00 PM">2:00 PM</option>
                          <option value="3:00 PM">3:00 PM</option>
                          <option value="4:00 PM">4:00 PM</option>
                        </select>
                      </div>
                    </div>

                    {/* Multiple Service Selection */}
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2">
                        Services Required * (Select all that apply)
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {services.map((service, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              id={`service-${index}`}
                              name='serviceType'
                              checked={selectedServices.includes(service)}
                              onChange={() => handleServiceChange(service)}
                              value={formData.serviceType}
                              className="h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded"
                            />
                            <label htmlFor={`service-${index}`} className="flex flex-1 justify-between">
                              <span>{service}</span>
                              <span className="font-medium">₹{SERVICE_PRICES[service]}/-</span>
                            </label>
                          </div>
                        ))}
                      </div>
                      {selectedServices.length === 0 && (
                        <p className="mt-2 text-sm text-red-600">Please select at least one service</p>
                      )}
                    </div>

                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="additionalInformation">
                        Additional Information
                      </label>
                      <textarea
                        id="additionalInformation"
                        name="additionalInformation"
                        value={formData.additionalInformation}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Please provide any additional details about your service needs..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      ></textarea>
                    </div>

                    {/* Payment Summary */}
                    {selectedServices.length > 0 && (
                      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-lg font-semibold mb-2">Payment Summary</h3>
                        {selectedServices.map((service, index) => (
                          <div key={index} className="flex justify-between items-center mb-1">
                            <span>{service}</span>
                            <span className="font-medium">₹{SERVICE_PRICES[service]}/-</span>
                          </div>
                        ))}
                        <div className="border-t mt-2 pt-2 flex justify-between font-semibold">
                          <span>Total Amount</span>
                          <span>₹{getTotalPrice()}/-</span>
                        </div>
                      </div>
                    )}

                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn btn-primary px-8 py-3"
                        disabled={selectedServices.length === 0}
                      >
                        Book Appointment & Pay
                      </button>
                    </div>
                  </form>

                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-primary text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Business Hours</h3>
              <ul className="space-y-1 text-gray-600">
                <li className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>8:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday:</span>
                  <span>9:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-primary text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Contact Information</h3>
              <ul className="space-y-1 text-gray-600">
                <li>Phone: (555) 123-4567</li>
                <li>Email: service@egarage.com</li>
                <li>Address: 123 Garage Street, Auto City, AC 12345</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-primary text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Booking Information</h3>
              <ul className="space-y-1 text-gray-600">
                <li>We'll confirm your appointment within 24 hours</li>
                <li>Please arrive 10 minutes before your appointment</li>
                <li>Cancellations should be made at least 24 hours in advance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Booking 