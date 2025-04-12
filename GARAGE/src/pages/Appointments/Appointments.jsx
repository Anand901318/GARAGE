import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  FaCalendarAlt, FaFilter, FaSearch, FaEye, FaEdit, FaTimes, FaCheck
} from 'react-icons/fa';

const Appointments = () => {
  const { currentUser } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");

        const endpoint =
          currentUser.role === 'Admin'
            ? "http://localhost:3000/appointment/all"
            : currentUser.role === 'ServiceProvider'
              ? "http://localhost:3000/appointment/provider"
              : "http://localhost:3000/appointment/user";

        const res = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch appointments");
        }

        const data = await res.json();
        console.log("Fetched appointments:", data.data);
        setAppointments(data.data);
      } catch (error) {
        console.error("Error fetching appointments: ", error);
      }
      setLoading(false);
    };

    fetchAppointments();
  }, [currentUser.role]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleStatusFilterChange = (e) => setStatusFilter(e.target.value);

  const handleViewDetails = (appointment) => {
    setCurrentAppointment(appointment);
    setShowDetailsModal(true);
  };

  const handleCancelAppointment = (appointment) => {
    setCurrentAppointment(appointment);
    setShowCancelModal(true);
  };

  const confirmCancelAppointment = () => {
    const updatedAppointments = appointments.map(appointment =>
      appointment.id === currentAppointment.id
        ? { ...appointment, status: 'cancelled' }
        : appointment
    );
    setAppointments(updatedAppointments);
    setShowCancelModal(false);
  };

  const updateAppointmentStatus = (appointmentId, newStatus) => {
    const updatedAppointments = appointments.map(appointment =>
      appointment.id === appointmentId
        ? { ...appointment, status: newStatus }
        : appointment
    );
    setAppointments(updatedAppointments);
  };

  const filteredAppointments = appointments.filter(appointment => {
    const searchFields = [
      appointment.service,
      appointment.vehicle,
      appointment.customer?.name || appointment.customer,
      appointment.provider?.name || appointment.provider,
      appointment.date,
      appointment.time
    ].filter(Boolean);

    const matchesSearch = searchTerm === '' ||
      searchFields.some(field =>
        field.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Render table headers based on user role
  const renderTableHeaders = () => {
    if (currentUser.role === 'Customer') {
      return (
        <>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sr. No.</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date / Time</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </>
      );
    } else if (currentUser.role === 'ServiceProvider') {
      return (
        <>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sr. No.</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date / Time</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </>
      );
    } else { // Admin
      return (
        <>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sr. No.</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date / Time</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </>
      );
    }
  };

  // Render table rows based on user role
  const renderTableRows = () => {
    const getName = (obj) => {
      if (!obj) return 'N/A';
      return typeof obj === 'object' ? obj.name || 'N/A' : obj;
    };

    return filteredAppointments.map((appointment, index) => {
      if (currentUser.role === 'Customer') {
        return (
          <tr key={appointment.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>
            <td className="px-6 py-4 text-sm text-gray-900">
              {getName(appointment.fullName)}
            </td>
            <td className="px-6 py-4 text-sm text-gray-500">
              {appointment.vehicle || 'N/A'}
            </td>
            <td className="px-6 py-4 text-sm text-gray-500">
              <div>{appointment.preferredDate || 'N/A'}</div>
              <div>{appointment.preferredTime || ''}</div>
            </td>
            <td className="px-6 py-4 text-sm font-medium">
              <div className="flex space-x-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewDetails(appointment);
                  }}
                  className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50 transition-colors"
                  title="View Details"
                >
                  <FaEye className="text-lg" />
                </button>
                {(appointment.status === 'pending' || appointment.status === 'confirmed') && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCancelAppointment(appointment);
                    }}
                    className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                    title="Cancel"
                  >
                    <FaTimes className="text-lg" />
                  </button>
                )}
              </div>
            </td>
          </tr>
        );
      } else if (currentUser.role === 'ServiceProvider') {
        return (
          <tr key={appointment._id} className="hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>

            {/* Customer Name */}
            <td className="px-6 py-4 text-sm text-gray-900">
              {getName(appointment.fullName)}
            </td>


            {/* Vehicle */}
            <td className="px-6 py-4 text-sm text-gray-500">
              {appointment.vehicle || 'N/A'}
            </td>


            {/* Service */}
            <td className="px-6 py-4 text-sm text-gray-500">
              {appointment.serviceType || 'N/A'}
            </td>

            {/* Date / Time */}
            <td className="px-6 py-4 text-sm text-gray-500">
              <div>{appointment.preferredDate || 'N/A'}</div>
              <div>{appointment.preferredTime || ''}</div>
            </td>


            {/* Contact */}
            <td className="px-6 py-4 text-sm text-gray-500">
              {appointment.phoneNumber || 'N/A'}
            </td>

            {/* Actions */}
            <td className="px-6 py-4 text-sm font-medium">
              <div className="flex space-x-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewDetails(appointment);
                  }}
                  className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50 transition-colors"
                  title="View Details"
                >
                  <FaEye className="text-lg" />
                </button>

                {(appointment.status === 'pending' || appointment.status === 'confirmed') && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCancelAppointment(appointment);
                    }}
                    className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                    title="Cancel"
                  >
                    <FaTimes className="text-lg" />
                  </button>
                )}
              </div>
            </td>
          </tr>

        );
      } else { // Admin
        return (
          <tr key={appointment._id} className="hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>

            {/* Customer Name */}
            <td className="px-6 py-4 text-sm text-gray-900">
              {getName(appointment.fullName)}
            </td>

            {/* Contact */}
            <td className="px-6 py-4 text-sm text-gray-500">
              {appointment.phoneNumber || 'N/A'}
            </td>

            {/* Vehicle */}
            <td className="px-6 py-4 text-sm text-gray-500">
              {appointment.vehicle || 'N/A'}
            </td>



            {/* Date / Time */}
            <td className="px-6 py-4 text-sm text-gray-500">
              <div>{appointment.preferredDate || 'N/A'}</div>
              <div>{appointment.preferredTime || ''}</div>
            </td>

            {/* Actions */}
            <td className="px-6 py-4 text-sm font-medium">
              <div className="flex space-x-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewDetails(appointment);
                  }}
                  className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50 transition-colors"
                  title="View Details"
                >
                  <FaEye className="text-lg" />
                </button>

                {(appointment.status === 'pending' || appointment.status === 'confirmed') && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCancelAppointment(appointment);
                    }}
                    className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                    title="Cancel"
                  >
                    <FaTimes className="text-lg" />
                  </button>
                )}
              </div>
            </td>
          </tr>

        );
      }
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Appointments</h1>
            <p className="text-gray-600">
              {currentUser.role === 'Customer'
                ? 'Manage your service appointments'
                : currentUser.role === 'ServiceProvider'
                  ? 'Manage Customer appointments'
                  : 'All service appointments'}
            </p>
          </div>
          {currentUser.role === 'Customer' && (
            
            <Link
              to="/booking"
              className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              <FaCalendarAlt className="mr-2" />
              Book Appointment
            </Link>
          )}
        </div>

        {/* Filters
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <div className="flex-grow mb-4 md:mb-0 relative">
              <FaSearch className="absolute top-2.5 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              <FaFilter className="mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="status">Status</label>
                <select
                  id="status"
                  value={statusFilter}
                  onChange={handleStatusFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          )}
        </div> */}

        {/* Appointments Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading appointments...</div>
          ) : filteredAppointments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {renderTableHeaders()}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {renderTableRows()}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">No appointments found.</div>
          )}
        </div>

        {/* Modals */}
        {showDetailsModal && currentAppointment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Appointment Details</h2>
                <div className="space-y-3">
                  <p><span className="font-semibold">Full name:</span> {currentAppointment.fullName || 'N/A'}</p>
                  <p><span className="font-semibold">Vehicle:</span> {currentAppointment.vehicle || 'N/A'}</p>
                  <p><span className="font-semibold">Date:</span> {currentAppointment.preferredDate || 'N/A'}</p>
                  <p><span className="font-semibold">Time:</span> {currentAppointment.preferredTime || 'N/A'}</p>
                  {/* <p><span className="font-semibold">Status:</span> 
                    <span className={`ml-2 px-2 py-1 inline-flex text-xs font-medium rounded ${
                      currentAppointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      currentAppointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {currentAppointment.status?.charAt(0)?.toUpperCase() + currentAppointment.status?.slice(1) || 'N/A'}
                    </span>
                  </p> */}
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showCancelModal && currentAppointment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Confirm Cancellation</h2>
                <p className="mb-6">Are you sure you want to cancel this appointment?</p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowCancelModal(false)}
                    className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    No, Keep It
                  </button>
                  <button
                    onClick={confirmCancelAppointment}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    Yes, Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;