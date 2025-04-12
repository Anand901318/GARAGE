import { FaOilCan, FaCog, FaTools, FaCarBattery, FaSnowflake, FaTachometerAlt, FaCar, FaWrench } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Services = () => {
  const services = [
    {
      id: "oil-change",
      icon: FaOilCan,
      title: "Oil Change",
      description: "Regular oil changes are essential for maintaining your engine's performance and longevity. Our oil change service includes:",
      features: [
        "Premium quality oil options",
        "Oil filter replacement",
        "Fluid level check and top-off",
        "Multi-point inspection",
        "Proper disposal of old oil"
      ],
      price: "From ₹299.00"
    },
    {
      id: "engine-repair",
      icon: FaCog,
      title: "Engine Repair",
      description: "Our certified mechanics can diagnose and repair any engine issue to keep your vehicle running smoothly. Our engine services include:",
      features: [
        "Complete engine diagnostics",
        "Check engine light diagnosis",
        "Engine performance tuning",
        "Timing belt replacement",
        "Engine rebuilds and replacements"
      ],
      price: "From ₹2499.00"
    },
    {
      id: "brake-service",
      icon: FaTools,
      title: "Brake Service",
      description: "Your safety is our priority. Our comprehensive brake services ensure your vehicle stops when you need it to:",
      features: [
        "Brake pad/shoe replacement",
        "Rotor/drum resurfacing or replacement",
        "Brake fluid flush",
        "Caliper repair or replacement",
        "ABS system diagnosis and repair"
      ],
      price: "From ₹899.00"
    },
    {
      id: "battery-service",
      icon: FaCarBattery,
      title: "Battery Service",
      description: "Don't get stranded with a dead battery. Our battery services keep your vehicle starting reliably:",
      features: [
        "Battery testing and diagnosis",
        "Battery replacement",
        "Charging system check",
        "Terminal cleaning and protection",
        "Recycling of old batteries"
      ],
      price: "From ₹599.00"
    },
    {
      id: "ac-repair",
      icon: FaSnowflake,
      title: "AC Repair",
      description: "Stay cool with our comprehensive air conditioning services for your vehicle:",
      features: [
        "AC system performance check",
        "Refrigerant recharge",
        "Leak detection and repair",
        "Compressor repair or replacement",
        "Evaporator and condenser service"
      ],
      price: "From ₹1499.00"
    },
    {
      id: "diagnostics",
      icon: FaTachometerAlt,
      title: "Diagnostics",
      description: "Our advanced diagnostic equipment can identify issues quickly and accurately:",
      features: [
        "Computer diagnostic scan",
        "Check engine light diagnosis",
        "Electrical system testing",
        "Sensor testing and replacement",
        "Performance testing"
      ],
      price: "From ₹699.00"
    },
    {
      id: "transmission",
      icon: FaCar,
      title: "Transmission Service",
      description: "Keep your transmission running smoothly with our comprehensive transmission services:",
      features: [
        "Transmission fluid change",
        "Filter replacement",
        "Transmission flush",
        "Clutch repair or replacement",
        "Transmission rebuilds"
      ],
      price: "From ₹3999.00"
    },
    {
      id: "tire-service",
      icon: FaWrench,
      title: "Tire Service",
      description: "Maintain optimal traction and extend tire life with our tire services:",
      features: [
        "Tire rotation and balancing",
        "Tire installation",
        "Flat tire repair",
        "Wheel alignment",
        "Tire pressure monitoring"
      ],
      price: "From ₹799.00"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container text-center">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-xl max-w-2xl mx-auto">
            We offer a comprehensive range of automotive repair and maintenance services to keep your vehicle running at its best.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16">
        <div className="container">
          <motion.div 
            className="grid grid-cols-1 gap-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {services.map((service, index) => (
              <motion.div 
                key={service.id} 
                id={service.id}
                className={`flex flex-col md:flex-row gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                variants={itemVariants}
              >
                <div className="md:w-1/3 flex justify-center items-center">
                  <div className="bg-primary/10 w-40 h-40 rounded-full flex items-center justify-center">
                    <service.icon className="text-primary text-6xl" />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="h-6 w-6 text-secondary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">{service.price}</span>
                    <a href="/booking" className="btn btn-secondary">Book Now</a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-100">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Can't Find What You Need?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We offer many more services than listed here. Contact us to discuss your specific automotive needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn btn-primary">Contact Us</a>
            <a href="/booking" className="btn btn-secondary">Book Appointment</a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services 