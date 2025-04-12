import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaTools, FaCalendarAlt, FaUserCheck, FaMoneyBillWave, FaPlus } from 'react-icons/fa';
import axios from 'axios';

const ServiceProviderDashboard = () => {
  const { currentUser, token } = useAuth();
  const [stats, setStats] = useState({
    totalServices: 0,
    pendingAppointments: 0,
    completedAppointments: 0,
    totalRevenue: 0
  });

  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch services for provider
        const res = await axios.get("http://localhost:3000/serviceProvider/get", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setServices(res.data);

        // 2. Set service count in stats
        setStats(prevStats => ({
          ...prevStats,
          totalServices: res.data.length
        }));

        // 3. Fetch provider-specific appointments
        const appointmentRes = await axios.get("http://localhost:3000/appointment/provider", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const providerAppointments = appointmentRes.data.data || [];

        setAppointments(providerAppointments);

        // 4. Filter pending ones
        const pending = providerAppointments.filter(app => app.status === 'pending' || !app.status);

        setStats(prevStats => ({
          ...prevStats,
          pendingAppointments: pending.length
        }));

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Service Provider Dashboard</h1>
          <p className="text-gray-600">Welcome back, {currentUser.businessName || currentUser.name}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <FaTools className="text-primary text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Service Stations</p>
                <h3 className="text-2xl font-bold">{stats.totalServices}</h3>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <FaCalendarAlt className="text-yellow-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Appointments</p>
                <h3 className="text-2xl font-bold">{stats.pendingAppointments}</h3>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FaUserCheck className="text-green-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Completed Jobs</p>
                <h3 className="text-2xl font-bold">{stats.completedAppointments}</h3>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-secondary/10 p-3 rounded-full mr-4">
                <FaMoneyBillWave className="text-secondary text-xl" />
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
            to="/service-providers?openAddForm=true"
            className="bg-white rounded-lg shadow p-6 flex items-center hover:bg-gray-50 transition-colors"
          >
            <div className="bg-primary/10 p-3 rounded-full mr-4">
              <FaPlus className="text-primary text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Add Service Stations</h3>
              <p className="text-gray-500 text-sm">Create a new service offering</p>
            </div>
          </Link>

          <Link
            to="/appointments"
            className="bg-white rounded-lg shadow p-6 flex items-center hover:bg-gray-50 transition-colors"
          >
            <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <FaCalendarAlt className="text-yellow-600 text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Manage Appointments</h3>
              <p className="text-gray-500 text-sm">View and update appointments</p>
            </div>
          </Link>

          <Link
            to="/servicedashbord"
            className="bg-white rounded-lg shadow p-6 flex items-center hover:bg-gray-50 transition-colors"
          >
            <div className="bg-secondary/10 p-3 rounded-full mr-4">
              <FaTools className="text-secondary text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Business Profile</h3>
              <p className="text-gray-500 text-sm">Update your garage details</p>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Your Services */}
          <div className="bg-white rounded-lg shadow">
            <div className="border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Your Service Stations</h2>
              <Link to="/service-providers" className="text-primary hover:underline text-sm">Manage Service Stations</Link>
            </div>
            <div className="p-6">
              {services.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Stations</th>

                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {services.map(service => (
                        <tr key={service.id}>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{service.name}</div>
                            <div className="text-sm text-gray-500">{service.description}</div>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">You haven't added any services yet.</p>
                  <Link
                    to="/services/add"
                    className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                  >
                    <FaPlus className="mr-2" />
                    Add Service
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white rounded-lg shadow">
            <div className="border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Upcoming Appointments</h2>
            </div>
            <div className="p-6">
              {appointments.length > 0 ? (
                <div className="overflow-x-auto flex justify-center">
                  <Link to="/appointments" className="text-primary hover:underline text-lg font-medium">
                    View All
                  </Link>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">You don't have any upcoming appointments.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderDashboard; 