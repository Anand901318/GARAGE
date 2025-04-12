import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaTachometerAlt, FaWrench, FaPlus } from 'react-icons/fa';
import { useState } from 'react';

const ServiceProviderHome = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  
  // Function to open the "Add Service Provider" form
  const handleOpenAddGarageForm = () => {
    // Navigate to service providers page with a query parameter to open the form
    navigate('/service-providers?openAddForm=true');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-5">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl w-full border border-gray-100">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-28 h-28 bg-primary/10 rounded-full -mr-14 -mt-14 hidden md:block"></div>
        <div className="absolute bottom-0 left-0 w-28 h-28 bg-secondary/10 rounded-full -ml-14 -mb-14 hidden md:block"></div>
        
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-primary to-primary/90 text-white p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10 pattern-dots pattern-size-4 pattern-opacity-10"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-5 md:mb-0">
                <h1 className="text-3xl md:text-4xl font-bold mb-3">Welcome! Service Provider</h1>
                <p className="text-xl opacity-90">
                  Hello, <span className="font-semibold">{currentUser?.businessName || currentUser?.name || 'Partner'}</span>!
                </p>
                <p className="text-lg mt-2 opacity-80">
                  Your trusted platform for managing garage services
                </p>
              </div>
              
              <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                <div className="text-center">
                  <p className="font-medium text-white/90">{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</p>
                  <p className="text-3xl font-bold">{new Date().getDate()}</p>
                  <p className="font-medium text-white/90">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Dashboard Button Section */}
        <div className="p-8 md:p-10 flex flex-col items-center justify-center">
          <div className="text-center mb-8 max-w-2xl mx-auto">
            <p className="text-gray-700 text-lg mb-6">
              Access your personalized dashboard to manage all aspects of your garage service business in one place.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <Link 
              to="/servicedashbord" 
              className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-lg flex items-center text-xl transition-all transform hover:scale-105 hover:shadow-lg"
            >
              <FaTachometerAlt className="mr-3 text-2xl" />
              Go to Dashboard
            </Link>
            
            <button 
              onClick={handleOpenAddGarageForm}
              className="bg-secondary hover:bg-secondary/90 text-white font-bold py-4 px-8 rounded-lg flex items-center text-xl transition-all transform hover:scale-105 hover:shadow-lg"
            >
              <FaPlus className="mr-3 text-2xl" />
              Add Your Garage
            </button>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-500 font-medium">E-Garage - Empowering Service Providers</p>
            <div className="flex justify-center mt-3 space-x-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span className="w-2 h-2 bg-secondary rounded-full"></span>
              <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderHome;