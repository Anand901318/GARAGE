import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth, AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Dashboard from './pages/Dashboard/Dashboard'
import Vehicles from './pages/Customer/Vehicles'
import ServiceProviders from './pages/ServiceProviders/ServiceProviders'
import ServiceProviderDetails from './pages/ServiceProviders/ServiceProviderDetails'
import Appointments from './pages/Appointments/Appointments'
import Payments from './pages/Payments/Payments'
import NotFound from './pages/NotFound'
import Booking from './pages/Booking'
import AdminDashboard from './pages/Dashboard/AdminDashboard'
import ServiceProviderDashboard from './pages/Dashboard/ServiceProviderDashboard'
import CustomerDashboard from './pages/Dashboard/CustomerDashboard'
import AdminHome from './pages/Admin/AdminHome'
import ServiceProviderHome from './pages/ServiceProvider/ServiceProviderHome'
import { useEffect, useState } from 'react'
import BookAppointment from './pages/Appointments/BookAppointment'

// Protected Route Component

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" replace />; 
  }


  return children;
};



function AppContent() {


  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("Parsed User:", parsedUser);
        setUserRole(parsedUser.role);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    setLoading(false);
  }, []);

  if (loading) {
    return <div className="flex h-screen items-center justify-center text-lg">Loading...</div>;
  }


  return (
    <div className="flex flex-col min-h-screen">

      <Navbar />

      <main className="flex-grow">
        {/* Public Routes */}
        <Routes>
          {!userRole ? <Route path='/' element={<Navigate to='/login' />} /> : ""}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />


          {userRole === "Admin" && (
            <Route> 
            <Route path='/' element={<AdminHome />} />
            <Route path='/admindashboard' element={<AdminDashboard />}> </Route>
            <Route path='/adminhome' element={<AdminHome />} />
            <Route path="/services" element={<Services />} />
            <Route path='/service-providers' element={<ServiceProviders/>}></Route>

           
            </Route>
            
          )}

          {userRole === "ServiceProvider" && (
            <Route>
              <Route path="/" element={<ServiceProviderHome />} />
              <Route path="/services" element={<Services />} />
              <Route path="/service-providers" element={<ServiceProviders />} />
              <Route path="/service-providers/:id" element={<ServiceProviderDetails />} />
              <Route path='/servicedashbord' element={<ServiceProviderDashboard />}></Route>
              <Route path='/providerhome' element={<ServiceProviderHome />}></Route>
            </Route>
          )}

          {userRole === "Customer" && (
            <Route>

              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path='/booking' element={<Booking/>}> </Route> 
              <Route path="/contact" element={<Contact />} />
              <Route path="/service-providers" element={<ServiceProviders />} />
              <Route path="/service-providers/:id" element={<ServiceProviderDetails />} />
              <Route path='/customerdashboard' element={<CustomerDashboard />}></Route>


            </Route>
          )}

     

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
            <Route
              path="/booking"
              element={
                <ProtectedRoute allowedRoles={['Customer',]}>
                  <Booking />
                </ProtectedRoute>
              }
            />
          <Route
            path="/vehicles"
            element={
              <ProtectedRoute allowedRoles={['Customer', "Admin"]}>
                <Vehicles />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoute allowedRoles={["Customer","ServiceProvider", "Admin"]}>
                <Appointments />
              </ProtectedRoute>
            }
          />

          {/* <Route
            path="/appointments/book"
            element={
              <ProtectedRoute allowedRoles={['customer', "ServiceProvider"]}>
                <BookAppointment />
              </ProtectedRoute>
            }
          /> */}

          <Route
            path="/payments"
            element={
              <ProtectedRoute allowedRoles={["Customer", "ServiceProvider", "Admin"]}>
                <Payments />
              </ProtectedRoute>
            }
          />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App 