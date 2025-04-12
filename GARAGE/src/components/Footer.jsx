import { Link } from 'react-router-dom'
import { FaWrench, FaFacebook, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { FaX } from 'react-icons/fa6'

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-12 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <Link to="/" className="flex items-center space-x-2 text-2xl font-bold mb-4">
              <FaWrench className="text-secondary" />
              <span>E-Garage</span>
            </Link>
            <p className="text-gray-300 mb-4">
              Your trusted partner for all automotive repair and maintenance services. Quality service guaranteed.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/"  target="_blank" 
                 rel="noopener noreferrer"   className="text-gray-300 hover:text-secondary transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="https://x.com/?lang=en"  target="_blank" 
                 rel="noopener noreferrer"   className="text-gray-300 hover:text-secondary transition-colors">
                <FaX size={20} />
              </a>
              <a href="https://www.instagram.com/"  target="_blank" 
                 rel="noopener noreferrer" className="text-gray-300 hover:text-secondary transition-colors">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-secondary transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-secondary transition-colors">Services</Link></li>
              <li><Link to="/booking" className="text-gray-300 hover:text-secondary transition-colors">Book Appointment</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-secondary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-secondary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-gray-300 hover:text-secondary transition-colors">Oil Change</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-secondary transition-colors">Brake Repair</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-secondary transition-colors">Engine Diagnostics</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-secondary transition-colors">Tire Services</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-secondary transition-colors">AC Repair</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-secondary mt-1" />
                <span className="text-gray-300">123 Garage Street, Auto City, AC 12345</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-secondary" />
                <span className="text-gray-300">+91 98765-43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-secondary" />
                <span className="text-gray-300">info@egarage.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} E-Garage. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 