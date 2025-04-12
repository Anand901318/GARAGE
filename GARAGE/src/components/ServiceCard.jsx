import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const ServiceCard = ({ icon: Icon, title, description, link }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
        <Icon className="text-primary text-2xl" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link to={link} className="text-secondary font-medium hover:underline flex items-center">
        Learn More
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </Link>
    </motion.div>
  )
}

export default ServiceCard 