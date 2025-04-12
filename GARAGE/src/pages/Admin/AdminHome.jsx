import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  FaUsers, 
  FaTools, 
  FaCalendarAlt, 
  FaMoneyBillWave, 
  FaUserCog, 
  FaCar,
  FaChartLine,
  FaTachometerAlt
} from 'react-icons/fa';
import axios from 'axios';

const AdminHome = () => {
  const { currentUser, token } = useAuth();
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalProviders: 0,
    totalAppointments: 0,
    totalRevenue: 0
  });
  
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch service providers
        const providersRes = await axios.get("http://localhost:3000/serviceProvider/get", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Fetch customers (fixed the duplicate http:// in your URL)
        const customersRes = await axios.get("http://localhost:3000/user/all", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Fetch appointments (example - add your actual endpoint)
        const appointmentsRes = await axios.get("http://localhost:3000/appointment/all", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Fetch recent payments (example - add your actual endpoint)
        const paymentsRes = ""
        
        // Update all stats at once
        setStats({
          totalCustomers: customersRes.data.data.length || 0,
          totalProviders: providersRes.data.length || 0,
          totalAppointments: appointmentsRes.data.data.length || 0,
          totalRevenue: 0
        });
        
        // Set recent data
        setRecentAppointments( []);
        setRecentPayments([]);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [token]);
  return (
    <div className="bg-gray-50 min-h-screen p-8">
      {/* E-Garage Themed Welcome Header */}
      <div className="bg-primary text-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Profile!</h1>
            <p className="text-white/80">Welcome back, <span className="font-semibold">{currentUser?.name || 'Admin'}</span>!</p>
            <p className="text-sm text-white/70 mt-1">Manage your garage services and customers from one place</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 px-4 py-3 rounded">
              <p className="text-sm">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats with E-Garage Theme */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <FaUsers className="text-blue-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Customers</p>
              <h3 className="text-2xl font-bold">{stats.totalCustomers}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <FaUserCog className="text-green-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Service Providers</p>
              <h3 className="text-2xl font-bold">{stats.totalProviders}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <FaCalendarAlt className="text-purple-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Appointments</p>
              <h3 className="text-2xl font-bold">{stats.totalAppointments}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-yellow-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <FaMoneyBillWave className="text-yellow-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <h3 className="text-2xl font-bold">₹{stats.totalRevenue}</h3>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Access Links with E-Garage Theme */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-primary mb-6">Quick Access</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/admindashboard" className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-primary/5 transition-colors text-center">
            <div className="bg-blue-100 p-4 rounded-full mb-3">
              <FaTachometerAlt className="text-blue-600 text-xl" />
            </div>
            <h3 className="font-medium">Dashboard</h3>
          </Link>
          
          <Link to="/service-providers" className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-primary/5 transition-colors text-center">
            <div className="bg-green-100 p-4 rounded-full mb-3">
              <FaUserCog className="text-green-600 text-xl" />
            </div>
            <h3 className="font-medium">Service Providers</h3>
          </Link>
          
          <Link to="/vehicles" className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-primary/5 transition-colors text-center">
            <div className="bg-yellow-100 p-4 rounded-full mb-3">
              <FaCar className="text-yellow-600 text-xl" />
            </div>
            <h3 className="font-medium">Vehicles</h3>
          </Link>
          
          <Link to="/appointments" className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-primary/5 transition-colors text-center">
            <div className="bg-purple-100 p-4 rounded-full mb-3">
              <FaCalendarAlt className="text-purple-600 text-xl" />
            </div>
            <h3 className="font-medium">Appointments</h3>
          </Link>
          
          <Link to="/services" className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-primary/5 transition-colors text-center">
            <div className="bg-red-100 p-4 rounded-full mb-3">
              <FaTools className="text-red-600 text-xl" />
            </div>
            <h3 className="font-medium">Services</h3>
          </Link>
          
          <Link to="/payments" className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-primary/5 transition-colors text-center">
            <div className="bg-green-100 p-4 rounded-full mb-3">
              <FaMoneyBillWave className="text-green-600 text-xl" />
            </div>
            <h3 className="font-medium">Payments</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHome; 