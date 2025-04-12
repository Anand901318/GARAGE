import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaPlus, FaSearch, FaMapMarkerAlt, FaStar, FaTools, FaFilter, FaTimes, FaWrench } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const ServiceProviders = () => {
  const [serviceProviders, setServiceProviders] = useState([]);
  const { currentUser, token } = useAuth();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    state: '',
    city: '',
    speciality: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    state: '',
    city: '',
    email: '',
    contactNumber: '',
    description: '',
    specialities: []
  });

  // Available filter options
  const states = ['All States', "Gujarat"];
  const cities = ['All Cities',  "Ahmedabad","Palanpur","Surat","Vadodara","Bhavnagar"];
  const specialities = ['All Specialities', 'Oil Change', 'Brake Repair', 'Engine Repair', 'Transmission', 'Electrical', 'AC Repair', 'Tire Service', 'Battery Service', 'Suspension', 'Alignment', 'Diagnostics'];

  // Check for query parameter to open the form
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('openAddForm') === 'true') {
      handleAddServiceProviders();
    }
  }, [location.search]);

  // Fetch service providers
  useEffect(() => {
    const fetchServiceProviders = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/serviceProvider/get');
        console.log(response.data)
        setServiceProviders(response.data);
      } catch (error) {
        console.error('Error fetching service providers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceProviders();
  }, []);

  const handleAddServiceProviders = () => {
    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSpecialityChange = (speciality) => {
    setFormData(prev => {
      if (prev.specialities.includes(speciality)) {
        return {
          ...prev,
          specialities: prev.specialities.filter(s => s !== speciality)
        };
      } else {
        return {
          ...prev,
          specialities: [...prev.specialities, speciality]
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Prepare the data for submission
    const submissionData = {
      name: formData.name,
      address: formData.address,
      state: formData.state,
      city: formData.city,
      email: formData.email,
      contactNumber: formData.contactNumber,
      description: formData.description,
      specialities: formData.specialities
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/serviceProvider/register",
        submissionData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(response.data)
      if (response.data) {
        setServiceProviders([...serviceProviders, response.data]);
        setShowAddForm(false);
        alert('Service provider registered successfully!');
        window.location.reload()
      }
    } catch (error) {
      console.error('Error registering service provider:', error);
      if (error.response) {
        alert(`Error: ${error.response.data.message || 'Failed to register service provider'}`);
      } else {
        alert('Network error or server is not responding');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      state: '',
      city: '',
      speciality: ''
    });
  };

  const filteredProviders = serviceProviders.filter(provider => {
    const matchesSearch = ""
    //   provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   provider.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   provider.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesState = !filters.state || filters.state === 'All States' || provider.state === filters.state;
    const matchesCity = !filters.city || filters.city === 'All Cities' || provider.city === filters.city;
    const matchesSpeciality = !filters.speciality ||
      filters.speciality === 'All Specialities' ||
      provider.specialities.includes(filters.speciality);

    return matchesSearch && matchesState && matchesCity && matchesSpeciality;
  });

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Service Providers</h1>
            <p className="text-gray-600">Find the best automotive service providers in your area</p>
          </div>

          {currentUser && currentUser.role === 'ServiceProvider' && (
            <button
              onClick={handleAddServiceProviders}
              className="mt-4 md:mt-0 inline-flex items-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 shadow-lg transform transition-transform hover:scale-105 font-medium"
            >
              <FaWrench className="mr-2" />
              Add Your Garage
            </button>
          )}
        </div>

        {/* Add Service Provider Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
                <h2 className="text-xl font-bold text-gray-800">Add Your Garage</h2>
                <button
                  onClick={handleCloseForm}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <h3 className="text-lg font-medium text-gray-800 mb-3 border-b pb-2">Basic Information</h3>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                      Garage Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <h3 className="text-lg font-medium text-gray-800 mb-3 border-b pb-2 mt-4">Contact Information</h3>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                      Email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="contactNumber">
                      Contact Number*
                    </label>
                    <input
                      type="tel"
                      id="contactNumber"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <h3 className="text-lg font-medium text-gray-800 mb-3 border-b pb-2 mt-4">Location</h3>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="address">
                      Address*
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="state">
                      State*
                    </label>
                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="">Select State</option>
                      {states.slice(1).map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="city">
                      City*
                    </label>
                    <select
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="">Select City</option>
                      {cities.slice(1).map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-2">
                    <h3 className="text-lg font-medium text-gray-800 mb-3 border-b pb-2 mt-4">Garage Details</h3>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="description">
                      Description*
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      rows="3"
                      required
                    ></textarea>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Available Services* (select at least one)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {specialities.slice(1).map(speciality => (
                        <div key={speciality} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`speciality-${speciality}`}
                            checked={formData.specialities.includes(speciality)}
                            onChange={() => handleSpecialityChange(speciality)}
                            className="mr-2"
                          />
                          <label htmlFor={`speciality-${speciality}`} className="text-sm text-gray-700">
                            {speciality}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                    disabled={submitting || !formData.name || !formData.address || !formData.state || !formData.city || !formData.description || formData.specialities.length === 0 || !formData.email || !formData.contactNumber}
                  >
                    {submitting ? 'Registering...' : 'Add Your Garage'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <div className="flex-grow mb-4 md:mb-0">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name, service, or location..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              <FaFilter className="mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="state">
                    State
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={filters.state}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">All States</option>
                    {states.slice(1).map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="city">
                    City
                  </label>
                  <select
                    id="city"
                    name="city"
                    value={filters.city}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">All Cities</option>
                    {cities.slice(1).map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="speciality">
                    Speciality
                  </label>
                  <select
                    id="speciality"
                    name="speciality"
                    value={filters.speciality}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">All Specialities</option>
                    {specialities.slice(1).map(speciality => (
                      <option key={speciality} value={speciality}>{speciality}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Service Providers List */}
        <div className="space-y-6">
          {serviceProviders.length > 0 ? (
            serviceProviders.map(provider => (
              <div key={provider._id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div className="flex items-start">
                      <div className="bg-primary text-white p-4 rounded-lg mr-4 flex-shrink-0">
                        <FaWrench size={24} />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-1">{provider.name}</h2>
                        <div className="flex items-start mb-2">
                          <FaMapMarkerAlt className="text-gray-400 mt-1 mr-1 flex-shrink-0" />
                          <span className="text-gray-600 text-sm">{provider.address}, {provider.city}, {provider.state}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                            Available
                          </span>
                          <span className="text-gray-600 text-sm">
                            Contact: {provider.contactNumber}
                          </span>
                        </div>
                      </div>
                    </div>
                    <a
                      href={`tel:${provider.contactNumber}`}
                      className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                    >
                      Call Now
                    </a>
                  </div>

                  <p className="text-gray-600 mb-4 mt-3">{provider.description}</p>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Specialities:</h3>
                    <div className="flex flex-wrap gap-2">
                      {provider.specialities.map(speciality => (
                        <span
                          key={speciality}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          <FaTools className="mr-1 text-gray-500" size={12} />
                          {speciality}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <FaTools className="text-gray-500 text-2xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No service providers found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || filters.state || filters.city || filters.speciality
                  ? "No service providers match your search criteria. Try adjusting your filters."
                  : "There are no service providers available at this time."}
              </p>
              {(searchTerm || filters.state || filters.city || filters.speciality) && (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  Reset Filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceProviders;