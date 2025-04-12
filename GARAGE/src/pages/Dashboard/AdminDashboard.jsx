import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaUsers, FaTools, FaCalendarAlt, FaMoneyBillWave, FaUserCog, FaCarAlt } from 'react-icons/fa';
import axios from 'axios';

const AdminDashboard = () => {
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
        const paymentsRes = await axios.get("http://localhost:3000/appointment/total-revenue", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Update all stats at once
        setStats({
          totalCustomers: customersRes.data.data.length || 0,
          totalProviders: providersRes.data.length || 0,
          totalAppointments:appointmentsRes.data.data.length || 0,
          totalRevenue: paymentsRes.data.totalRevenue || 0,
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

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600">Loading dashboard data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {currentUser.name}</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
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
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FaTools className="text-green-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Service Providers</p>
                <h3 className="text-2xl font-bold">{stats.totalProviders}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <FaCalendarAlt className="text-purple-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Appointments</p>
                <h3 className="text-2xl font-bold">{stats.totalAppointments}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
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
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link 
            to="/payments"
            className="bg-white rounded-lg shadow p-6 flex items-center hover:bg-gray-50 transition-colors"
          >
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <FaMoneyBillWave className="text-blue-600 text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Payments</h3>
              <p className="text-gray-500 text-sm">View and manage payments</p>
            </div>
          </Link>
          
          <Link 
            to="/service-providers" 
            className="bg-white rounded-lg shadow p-6 flex items-center hover:bg-gray-50 transition-colors"
          >
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <FaUserCog className="text-green-600 text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Service Providers</h3>
              <p className="text-gray-500 text-sm">Manage service providers</p>
            </div>
          </Link>
          
          <Link 
            to="/vehicles" 
            className="bg-white rounded-lg shadow p-6 flex items-center hover:bg-gray-50 transition-colors"
          >
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <FaCarAlt className="text-purple-600 text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">All Vehicles</h3>
              <p className="text-gray-500 text-sm">View registered vehicles</p>
            </div>
          </Link>
        </div>
        
        {/* Recent Data Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Appointments */}
          <div className="bg-white rounded-lg shadow">
            <div className="border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Recent Appointments</h2>
              {/* <Link to="/appointments" className="text-primary hover:underline text-sm">View All</Link> */}
            </div>
            <div className="p-6">
              {recentAppointments.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentAppointments.map(appointment => (
                        <tr key={appointment._id}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                            {appointment.customer?.name || 'N/A'}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {appointment.service}
                            <div className="text-xs text-gray-400">{appointment.provider?.name || 'N/A'}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              appointment.status === 'confirmed' 
                                ? 'bg-blue-100 text-blue-800' 
                                : appointment.status === 'completed'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {appointment.status?.charAt(0).toUpperCase() + appointment.status?.slice(1) || 'Pending'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Link to="/appointments" className="text-primary hover:underline text-sm">View All</Link>
                </div>
              )}
            </div>
          </div>
          
          {/* Recent Payments */}
          <div className="bg-white rounded-lg shadow">
            <div className="border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Recent Payments</h2>
              <Link to="/payments" className="text-primary hover:underline text-sm">View All</Link>
            </div>
            <div className="p-6">
              {recentPayments.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentPayments.map(payment => (
                        <tr key={payment._id}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                            {payment.customer?.name || 'N/A'}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {payment.service || 'N/A'}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            ₹{payment.amount || '0'}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              payment.status === 'completed' 
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {payment.status?.charAt(0).toUpperCase() + payment.status?.slice(1) || 'Pending'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No recent payments found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;