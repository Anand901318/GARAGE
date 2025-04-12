import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaWrench, FaBars, FaTimes, FaUser, FaSignOutAlt, FaCarAlt, FaTools, FaCalendarAlt, FaMoneyBillWave, FaTachometerAlt, FaUserCog } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { currentUser, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  
 

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
    setUserMenuOpen(false)
  }, [location.pathname])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-primary text-white shadow-md">
      <div className="container py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold">
          <FaWrench className="text-secondary" />
          <span>E-Garage</span>
        </Link>

        {/* Desktop Menu */}

        <div className="hidden md:flex space-x-8">
          {currentUser && currentUser.role === 'Admin' ? (
            <>
              <Link to="/" className={`hover:text-secondary transition-colors ${location.pathname === '/' ? 'text-secondary' : ''}`}>Home</Link>
              <Link to="/services" className={`hover:text-secondary transition-colors ${location.pathname === '/services' ? 'text-secondary' : ''}`}>Services</Link>
              <Link to="/service-providers" className={`hover:text-secondary transition-colors ${location.pathname.includes('/service-providers') ? 'text-secondary' : ''}`}>Service Providers</Link>
            </>
          ) : currentUser && currentUser.role === 'ServiceProvider' ? (
            <>
              <Link to="/" className={`hover:text-secondary transition-colors ${location.pathname === '/' ? 'text-secondary' : ''}`}>Home</Link>
              <Link to="/services" className={`hover:text-secondary transition-colors ${location.pathname === '/services' ? 'text-secondary' : ''}`}>Services</Link>
              <Link to="/service-providers" className={`hover:text-secondary transition-colors ${location.pathname.includes('/service-providers') ? 'text-secondary' : ''}`}>Service Providers</Link>
            </>
          ) : (
            <>
              <Link to="/" className={`hover:text-secondary transition-colors ${location.pathname === '/' ? 'text-secondary' : ''}`}>Home</Link>
              <Link to="/services" className={`hover:text-secondary transition-colors ${location.pathname === '/services' ? 'text-secondary' : ''}`}>Services</Link>
              <Link to="/service-providers" className={`hover:text-secondary transition-colors ${location.pathname.includes('/service-providers') ? 'text-secondary' : ''}`}>Service Providers</Link>
              <Link to="/about" className={`hover:text-secondary transition-colors ${location.pathname === '/about' ? 'text-secondary' : ''}`}>About Us</Link>
              <Link to="/contact" className={`hover:text-secondary transition-colors ${location.pathname === '/contact' ? 'text-secondary' : ''}`}>Contact</Link>
            </>
          )}
        </div>

        {/* User Menu (Desktop) */}
        <div className="hidden md:block">
          {currentUser ? (
            <div className="relative">
              <button 
                onClick={toggleUserMenu}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <FaUser className="text-primary" />
                </div>
                <span className="text-white font-medium">{currentUser.name}</span>
                <svg className="w-4 h-4 ml-1 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  {currentUser.role === 'Customer' && (
                    <>
                      <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                        <FaTachometerAlt className="mr-2 text-primary" />
                        Dashboard
                      </Link>
                      <Link to="/vehicles" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                        <FaCarAlt className="mr-2 text-primary" />
                        My Vehicles
                      </Link>
                      <Link to="/appointments" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                        <FaCalendarAlt className="mr-2 text-primary" />
                        Appointments
                      </Link>
                      <Link to="/payments" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                        <FaMoneyBillWave className="mr-2 text-primary" />
                        Payments
                      </Link>
                    </>
                  )}
                  {currentUser.role === 'ServiceProvider' && (
                    <>
                      <Link to="/servicedashbord" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                        <FaTachometerAlt className="mr-2 text-primary" />
                        Dashboard
                      </Link>
                      <Link to="/services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                        <FaTools className="mr-2 text-primary" />
                        My Services
                      </Link>
                      <Link to="/appointments" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                        <FaCalendarAlt className="mr-2 text-primary" />
                        Appointments
                      </Link>
                    </>
                  )}
                  {currentUser.role === 'Admin' && (
                    <>
                      <Link to="/admindashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                        <FaTachometerAlt className="mr-2 text-primary" />
                        Dashboard
                      </Link>
                      <Link to="/service-providers" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                        <FaUserCog className="mr-2 text-primary" />
                        Service Providers
                      </Link>
                      <Link to="/appointments" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                        <FaCalendarAlt className="mr-2 text-primary" />
                        Appointments
                      </Link>
                    </>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link to="/login" className="hover:text-secondary transition-colors">Login</Link>
              <Link to="/signup" className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/90 transition-colors">Sign Up</Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary border-t border-gray-700">
          <div className="container py-4 flex flex-col space-y-4">
            <Link to="/" className={`hover:text-secondary transition-colors ${location.pathname === '/' ? 'text-secondary' : ''}`}>Home</Link>
            <Link to="/services" className={`hover:text-secondary transition-colors ${location.pathname === '/services' ? 'text-secondary' : ''}`}>Services</Link>
            <Link to="/service-providers" className={`hover:text-secondary transition-colors ${location.pathname.includes('/service-providers') ? 'text-secondary' : ''}`}>Service Providers</Link>
            
            {(!currentUser || (currentUser.role !== 'Admin' && currentUser.role !== 'ServiceProvider')) && (
              <>
                <Link to="/about" className={`hover:text-secondary transition-colors ${location.pathname === '/about' ? 'text-secondary' : ''}`}>About Us</Link>
                <Link to="/contact" className={`hover:text-secondary transition-colors ${location.pathname === '/contact' ? 'text-secondary' : ''}`}>Contact</Link>
              </>
            )}

            {currentUser ? (
              <>
                <div className="border-t border-gray-700 my-2 pt-2">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <FaUser className="text-primary" />
                    </div>
                    <span className="text-white font-medium">{currentUser.name}</span>
                  </div>
                  
                  <div className="flex flex-col space-y-4 pl-2">
                    <Link to="/dashboard" className="flex items-center text-white hover:text-secondary">
                      <FaTachometerAlt className="mr-2" />
                      Dashboard
                    </Link>
                    
                    {currentUser.role === 'Customer' && (
                      <Link to="/vehicles" className="flex items-center text-white hover:text-secondary">
                        <FaCarAlt className="mr-2" />
                        My Vehicles
                      </Link>
                    )}
                    
                    {currentUser.role === 'ServiceProvider' && (
                      <Link to="/services" className="flex items-center text-white hover:text-secondary">
                        <FaTools className="mr-2" />
                        My Services
                      </Link>
                    )}
                    
                    <Link to="/appointments" className="flex items-center text-white hover:text-secondary">
                      <FaCalendarAlt className="mr-2" />
                      Appointments
                    </Link>
                    
                    <Link to="/payments" className="flex items-center text-white hover:text-secondary">
                      <FaMoneyBillWave className="mr-2" />
                      Payments
                    </Link>
                    
                    <button 
                      onClick={handleLogout}
                      className="flex items-center text-left text-red-300 hover:text-red-100"
                    >
                      <FaSignOutAlt className="mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="border-t border-gray-700 pt-4 flex flex-col space-y-4">
                <Link to="/login" className="hover:text-secondary transition-colors">Login</Link>
                <Link to="/signup" className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/90 transition-colors text-center">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar 