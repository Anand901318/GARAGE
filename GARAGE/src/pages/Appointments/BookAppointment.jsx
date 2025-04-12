import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaCalendarAlt, FaClock, FaCarAlt, FaTools, FaUser, FaArrowLeft } from 'react-icons/fa';

const BookAppointment = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  // Get provider and service from URL if available
  const preSelectedProviderId = queryParams.get('provider');
  const preSelectedServiceId = queryParams.get('service');
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    providerId: preSelectedProviderId || '',
    serviceId: preSelectedServiceId || '',
    vehicleId: '',
    date: '',
    time: '',
    notes: ''
  });
  
  // Data for dropdowns
  const [providers, setProviders] = useState([]);
  const [services, setServices] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    // For demo purposes, we'll use mock data
    
    const fetchData = async () => {
      setLoading(true);
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock service providers
        const mockProviders = [];
        
        // Mock services
        const mockServices = [];
        
        // Mock vehicles (only for customers)
        let mockVehicles = [];
        if (currentUser && currentUser.role === 'Customer') {
          mockVehicles = [
            { id: '1', make: 'Toyota', model: 'Camry', year: 2018, licensePlate: 'ABC123' },
            { id: '2', make: 'Honda', model: 'Civic', year: 2020, licensePlate: 'XYZ789' }
          ];
        }
        
        // Mock available times
        const mockTimes = [
          '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
          '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
        ];
        
        setProviders(mockProviders);
        setServices(mockServices);
        setVehicles(mockVehicles);
        setAvailableTimes(mockTimes);
        
        // If provider is pre-selected, filter services
        if (preSelectedProviderId) {
          setFormData(prev => ({
            ...prev,
            providerId: preSelectedProviderId
          }));
        }
        
        // If service is pre-selected
        if (preSelectedServiceId) {
          setFormData(prev => ({
            ...prev,
            serviceId: preSelectedServiceId
          }));
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load data. Please try again.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [preSelectedProviderId, preSelectedServiceId, currentUser]);
  
  // Filter services based on selected provider
  const filteredServices = formData.providerId 
    ? services.filter(service => service.providerId === formData.providerId)
    : [];
  
  // Get selected service details
  const selectedService = formData.serviceId 
    ? services.find(service => service.id === formData.serviceId)
    : null;
  
  // Get selected provider details
  const selectedProvider = formData.providerId
    ? providers.find(provider => provider.id === formData.providerId)
    : null;
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // If changing provider, reset service
    if (name === 'providerId' && value !== formData.providerId) {
      setFormData({
        ...formData,
        providerId: value,
        serviceId: ''
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    
    // Validate form
    if (!formData.providerId || !formData.serviceId || !formData.date || !formData.time) {
      setError('Please fill in all required fields');
      setSubmitting(false);
      return;
    }
    
    if (currentUser.role === 'Customer' && !formData.vehicleId) {
      setError('Please select a vehicle');
      setSubmitting(false);
      return;
    }
    
    try {
      // In a real app, you would make an API call here
      // For demo purposes, we'll simulate a successful booking
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      setSuccess(true);
      
      // Reset form
      setFormData({
        providerId: '',
        serviceId: '',
        vehicleId: '',
        date: '',
        time: '',
        notes: ''
      });
      
      // Redirect to appointments page after 2 seconds
      setTimeout(() => {
        navigate('/appointments');
      }, 2000);
      
    } catch (err) {
      setError('Failed to book appointment. Please try again.');
    }
    
    setSubmitting(false);
  };
  
  // Get tomorrow's date in YYYY-MM-DD format for min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];
  
  // Get date 3 months from now for max date
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateStr = maxDate.toISOString().split('T')[0];
  
  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
            <div className="text-center">
              <p className="text-gray-500">Loading booking form...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (success) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Appointment Booked Successfully!</h2>
              <p className="text-gray-600 mb-6">Your appointment has been scheduled. You will be redirected to the appointments page.</p>
              <Link to="/appointments" className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
                View My Appointments
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-primary py-4 px-6">
            <h2 className="text-2xl font-bold text-white">Book an Appointment</h2>
          </div>
          
          <div className="p-6">
            <Link to="/service-providers" className="inline-flex items-center text-primary hover:underline mb-6">
              <FaArrowLeft className="mr-2" />
              Back to Service Providers
            </Link>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              {/* Service Provider Selection */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="providerId">
                  Service Provider <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaTools className="text-gray-400" />
                  </div>
                  <select
                    id="providerId"
                    name="providerId"
                    value={formData.providerId}
                    onChange={handleChange}
                    className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    disabled={!!preSelectedProviderId}
                  >
                    <option value="">Select a service provider</option>
                    {providers.map(provider => (
                      <option key={provider.id} value={provider.id}>
                        {provider.name} - {provider.address}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Service Selection */}
              {formData.providerId && (
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="serviceId">
                    Service Type <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaTools className="text-gray-400" />
                    </div>
                    <select
                      id="serviceId"
                      name="serviceId"
                      value={formData.serviceId}
                      onChange={handleChange}
                      className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                      disabled={!!preSelectedServiceId}
                    >
                      <option value="">Select a service</option>
                      {filteredServices.map(service => (
                        <option key={service.id} value={service.id}>
                          {service.name} - ${service.price} ({service.duration})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
              
              {/* Vehicle Selection (only for customers) */}
              {currentUser && currentUser.role === 'Customer' && (
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="vehicleId">
                    Vehicle <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaCarAlt className="text-gray-400" />
                    </div>
                    {vehicles.length > 0 ? (
                      <select
                        id="vehicleId"
                        name="vehicleId"
                        value={formData.vehicleId}
                        onChange={handleChange}
                        className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      >
                        <option value="">Select a vehicle</option>
                        {vehicles.map(vehicle => (
                          <option key={vehicle.id} value={vehicle.id}>
                            {vehicle.make} {vehicle.model} ({vehicle.year}) - {vehicle.licensePlate}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="pl-10 px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500">
                        No vehicles found. <Link to="/vehicles/add" className="text-primary hover:underline">Add a vehicle</Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="date">
                  Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaCalendarAlt className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={minDate}
                    max={maxDateStr}
                    className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Appointments available from tomorrow up to 3 months in advance.
                </p>
              </div>
              
              {/* Time Selection */}
              {formData.date && (
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="time">
                    Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaClock className="text-gray-400" />
                    </div>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="">Select a time</option>
                      {availableTimes.map((time, index) => (
                        <option key={index} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
              
              {/* Notes */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="notes">
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Any specific issues or requests..."
                ></textarea>
              </div>
              
              {/* Appointment Summary */}
              {formData.providerId && formData.serviceId && (
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <h3 className="font-semibold text-gray-800 mb-2">Appointment Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex">
                      <span className="font-medium w-32">Provider:</span>
                      <span>{selectedProvider?.name}</span>
                    </div>
                    <div className="flex">
                      <span className="font-medium w-32">Service:</span>
                      <span>{selectedService?.name}</span>
                    </div>
                    <div className="flex">
                      <span className="font-medium w-32">Price:</span>
                      <span>${selectedService?.price}</span>
                    </div>
                    <div className="flex">
                      <span className="font-medium w-32">Duration:</span>
                      <span>{selectedService?.duration}</span>
                    </div>
                    {formData.date && formData.time && (
                      <div className="flex">
                        <span className="font-medium w-32">Date & Time:</span>
                        <span>{formData.date} at {formData.time}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  {submitting ? (
                    <span>Processing...</span>
                  ) : (
                    <>
                      <FaCalendarAlt className="mr-2" />
                      <span>Book Appointment</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment; 