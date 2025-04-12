import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-primary to-primary/80 text-white">
      <div className="container relative py-20 md:py-32">
        <div className="max-w-2xl">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Professional Auto Repair & Maintenance Services
          </motion.h1>
          
          <motion.p 
            className="text-xl mb-8 text-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Your trusted partner for all automotive needs. Quality service guaranteed by certified mechanics.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/booking" className="btn btn-secondary text-center">
              Book Appointment
            </Link>
            <Link to="/services" className="btn bg-white text-primary hover:bg-gray-100 text-center">
              Our Services
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Hero 