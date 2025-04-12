import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaSearch, FaFilter, FaDownload, FaEye, FaMoneyBillWave } from 'react-icons/fa';

const Payments = () => {
  const { currentUser } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    // For demo purposes, we'll use mock data
    
    // Simulate API call delay
    const fetchPayments = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let mockPayments = [];
      
      // Different mock data based on user role
      if (currentUser.role === 'customer') {
        mockPayments = [
          {
            id: 1,
            invoiceNumber: 'INV-2023-001',
            service: 'Oil Change',
            provider: 'Quick Fix Garage',
            providerId: 1,
            date: '2023-10-15',
            amount: 0,
            status: 'paid',
            paymentMethod: 'Credit Card',
            appointmentId: 1
          },
          {
            id: 2,
            invoiceNumber: 'INV-2023-002',
            service: 'Engine Diagnostics',
            provider: 'Elite Auto Care',
            providerId: 3,
            date: '2023-09-15',
            amount: 0,
            status: 'paid',
            paymentMethod: 'PayPal',
            appointmentId: 3
          },
          {
            id: 3,
            invoiceNumber: 'INV-2023-003',
            service: 'Brake Inspection',
            provider: 'Smith Auto Repair',
            providerId: 2,
            date: '2023-10-30',
            amount: 0,
            status: 'pending',
            paymentMethod: null,
            appointmentId: 2
          }
        ];
      } else if (currentUser.role === 'ServiceProvider') {
        mockPayments = [
          {
            id: 1,
            invoiceNumber: 'INV-2023-001',
            service: 'Oil Change',
            customer: 'John Doe',
            customerId: 1,
            date: '2023-10-15',
            amount: 0,
            status: 'paid',
            paymentMethod: 'Credit Card',
            appointmentId: 1
          },
          {
            id: 2,
            invoiceNumber: 'INV-2023-004',
            service: 'Tire Rotation',
            customer: 'Lisa Johnson',
            customerId: 4,
            date: '2023-10-20',
            amount: 0,
            status: 'paid',
            paymentMethod: 'Debit Card',
            appointmentId: 4
          },
          {
            id: 3,
            invoiceNumber: 'INV-2023-005',
            service: 'Engine Diagnostics',
            customer: 'Michael Brown',
            customerId: 3,
            date: '2023-10-24',
            amount: 0,
            status: 'pending',
            paymentMethod: null,
            appointmentId: 3
          },
          {
            id: 4,
            invoiceNumber: 'INV-2023-006',
            service: 'Brake Inspection',
            customer: 'Sarah Wilson',
            customerId: 2,
            date: '2023-10-26',
            amount: 0,
            status: 'pending',
            paymentMethod: null,
            appointmentId: 2
          }
        ];
      } else if (currentUser.role === 'Admin') {
        mockPayments = [
          {
            id: 1,
            invoiceNumber: 'INV-2023-001',
            service: 'Oil Change',
            customer: 'John Doe',
            customerId: 1,
            provider: 'Quick Fix Garage',
            providerId: 1,
            date: '2023-10-15',
            amount: 0,
            status: 'paid',
            paymentMethod: 'Credit Card',
            appointmentId: 1
          },
          {
            id: 2,
            invoiceNumber: 'INV-2023-002',
            service: 'Engine Diagnostics',
            customer: 'John Doe',
            customerId: 1,
            provider: 'Elite Auto Care',
            providerId: 3,
            date: '2023-09-15',
            amount: 0,
            status: 'paid',
            paymentMethod: 'PayPal',
            appointmentId: 3
          },
          {
            id: 3,
            invoiceNumber: 'INV-2023-003',
            service: 'Brake Inspection',
            customer: 'Sarah Wilson',
            customerId: 2,
            provider: 'Smith Auto Repair',
            providerId: 2,
            date: '2023-10-30',
            amount: 0,
            status: 'pending',
            paymentMethod: null,
            appointmentId: 2
          },
          {
            id: 4,
            invoiceNumber: 'INV-2023-004',
            service: 'Tire Rotation',
            customer: 'Lisa Johnson',
            customerId: 4,
            provider: 'Quick Fix Garage',
            providerId: 1,
            date: '2023-10-20',
            amount: 0,
            status: 'paid',
            paymentMethod: 'Debit Card',
            appointmentId: 4
          },
          {
            id: 5,
            invoiceNumber: 'INV-2023-005',
            service: 'Engine Diagnostics',
            customer: 'Michael Brown',
            customerId: 3,
            provider: 'Elite Auto Care',
            providerId: 3,
            date: '2023-10-24',
            amount: 0,
            status: 'pending',
            paymentMethod: null,
            appointmentId: 3
          }
        ];
      }
      
      setPayments(mockPayments);
      setLoading(false);
    };
    
    fetchPayments();
  }, [currentUser]);
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };
  
  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value);
  };
  
  const handleViewDetails = (payment) => {
    setCurrentPayment(payment);
    setShowDetailsModal(true);
  };
  
  // Filter payments based on search term, status filter, and date filter
  const filteredPayments = payments.filter(payment => {
    // Search term filter
    const searchFields = [
      payment.invoiceNumber,
      payment.service,
      payment.customer,
      payment.provider,
      payment.date,
      payment.amount.toString()
    ].filter(Boolean);
    
    const matchesSearch = searchTerm === '' || 
      searchFields.some(field => 
        field.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    
    // Date filter
    let matchesDate = true;
    const paymentDate = new Date(payment.date);
    const today = new Date();
    
    if (dateFilter === 'last30days') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(today.getDate() - 30);
      matchesDate = paymentDate >= thirtyDaysAgo;
    } else if (dateFilter === 'last90days') {
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(today.getDate() - 90);
      matchesDate = paymentDate >= ninetyDaysAgo;
    } else if (dateFilter === 'thisyear') {
      matchesDate = paymentDate.getFullYear() === today.getFullYear();
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });
  
  // Calculate total amount
  const totalAmount = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0).toFixed(2);
  
  // Calculate paid amount
  const paidAmount = filteredPayments
    .filter(payment => payment.status === 'paid')
    .reduce((sum, payment) => sum + payment.amount, 0)
    .toFixed(2);
  
  // Calculate pending amount
  const pendingAmount = filteredPayments
    .filter(payment => payment.status === 'pending')
    .reduce((sum, payment) => sum + payment.amount, 0)
    .toFixed(2);
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Payment History</h1>
          <p className="text-gray-600">
            {currentUser.role === 'customer' 
              ? 'View your payment history for services' 
              : currentUser.role === 'ServiceProvider'
                ? 'View customer payment history'
                : 'All payment transactions'}
          </p>
        </div>
        
        {/* Payment Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <FaMoneyBillWave className="text-blue-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Amount</p>
                <h3 className="text-2xl font-bold">₹{totalAmount}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FaMoneyBillWave className="text-green-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Paid Amount</p>
                <h3 className="text-2xl font-bold">₹{paidAmount}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <FaMoneyBillWave className="text-yellow-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Pending Amount</p>
                <h3 className="text-2xl font-bold">₹{pendingAmount}</h3>
              </div>
            </div>
          </div>
        </div>
        
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            {/* Search Bar */}
            <div className="flex-grow mb-4 md:mb-0">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search payments..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            
            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              <FaFilter className="mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
          
          {/* Filter Options */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Status Filter */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="status">
                    Payment Status
                  </label>
                  <select
                    id="status"
                    value={statusFilter}
                    onChange={handleStatusFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="all">All Statuses</option>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                
                {/* Date Filter */}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="date">
                    Date Range
                  </label>
                  <select
                    id="date"
                    value={dateFilter}
                    onChange={handleDateFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="all">All Time</option>
                    <option value="last30days">Last 30 Days</option>
                    <option value="last90days">Last 90 Days</option>
                    <option value="thisyear">This Year</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Payments List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">Loading payment history...</p>
            </div>
          ) : filteredPayments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    {currentUser.role !== 'customer' && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    )}
                    {currentUser.role !== 'ServiceProvider' && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                    )}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPayments.map(payment => (
                    <tr key={payment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {payment.invoiceNumber}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.service}
                      </td>
                      
                      {currentUser.role !== 'customer' && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.customer}
                        </td>
                      )}
                      
                      {currentUser.role !== 'ServiceProvider' && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.provider}
                        </td>
                      )}
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.date}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₹{payment.amount.toFixed(2)}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ₹{
                          payment.status === 'paid' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </span>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewDetails(payment)}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="View Details"
                          >
                            <FaEye />
                          </button>
                          
                          {payment.status === 'paid' && (
                            <button
                              className="text-gray-600 hover:text-gray-900"
                              title="Download Invoice"
                            >
                              <FaDownload />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <FaMoneyBillWave className="text-gray-500 text-2xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No payment records found</h3>
              {searchTerm || statusFilter !== 'all' || dateFilter !== 'all' ? (
                <p className="text-gray-500">No payments match your search criteria. Try adjusting your filters.</p>
              ) : (
                <p className="text-gray-500">You don't have any payment records yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Payment Details Modal */}
      {showDetailsModal && currentPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="border-b px-6 py-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Payment Details</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{currentPayment.invoiceNumber}</h4>
                    <p className="text-gray-600">{currentPayment.service}</p>
                  </div>
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ₹{
                    currentPayment.status === 'paid' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {currentPayment.status.charAt(0).toUpperCase() + currentPayment.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="text-2xl font-bold text-gray-900">₹{currentPayment.amount.toFixed(2)}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{currentPayment.date}</p>
                </div>
                
                {currentUser.role !== 'Customer' && (
                  <div>
                    <p className="text-sm text-gray-500">Customer</p>
                    <p className="font-medium">{currentPayment.customer}</p>
                  </div>
                )}
                
                {currentUser.role !== 'ServiceProvider' && (
                  <div>
                    <p className="text-sm text-gray-500">Service Provider</p>
                    <p className="font-medium">{currentPayment.provider}</p>
                  </div>
                )}
                
                {currentPayment.paymentMethod && (
                  <div>
                    <p className="text-sm text-gray-500">Payment Method</p>
                    <p className="font-medium">{currentPayment.paymentMethod}</p>
                  </div>
                )}
                
                <div>
                  <p className="text-sm text-gray-500">Appointment ID</p>
                  <p className="font-medium">#{currentPayment.appointmentId}</p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                
                {currentPayment.status === 'paid' && (
                  <button
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                  >
                    <FaDownload className="inline mr-2" />
                    Download Invoice
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments; 