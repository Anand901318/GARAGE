import { motion } from 'framer-motion'
import { FaTools, FaUserCheck, FaHistory, FaAward } from 'react-icons/fa'

const About = () => {
  const teamMembers = [
    {
      name: "Rajesh Kumar",
      role: "Master Mechanic",
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      bio: "Rajesh has over 15 years of experience in automotive repair and is certified in multiple specialties."
    },
    {
      name: "Priya Sharma",
      role: "Service Manager",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      bio: "Priya ensures that all service operations run smoothly and that our customers receive the best possible experience."
    },
    {
      name: "Amit Patel",
      role: "Diagnostic Specialist",
      image: "https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      bio: "Amit specializes in advanced diagnostics and can troubleshoot even the most complex automotive issues."
    },
    {
      name: "Neha Gupta",
      role: "Customer Service Manager",
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      bio: "Neha is dedicated to ensuring that every customer has a positive experience with our garage."
    }
  ]

  const milestones = [
    {
      year: "2005",
      title: "Founded",
      description: "E-Garage was founded with a mission to provide honest, high-quality automotive services."
    },
    {
      year: "2010",
      title: "Expansion",
      description: "Expanded our facility to include more service bays and state-of-the-art diagnostic equipment."
    },
    {
      year: "2015",
      title: "ASE Certification",
      description: "All of our mechanics became ASE certified, ensuring the highest standards of service."
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Launched our online booking system and customer portal for a seamless service experience."
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container text-center">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Learn about our story, our team, and our commitment to providing the best automotive services.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                E-Garage was founded in 2005 with a simple mission: to provide honest, high-quality automotive repair services at fair prices. What started as a small garage with just two service bays has grown into a full-service automotive repair center.
              </p>
              <p className="text-gray-600 mb-4">
                Our founder, John Doe, had worked in various automotive repair shops for over a decade before deciding to start his own business. He was frustrated with the industry's reputation for overcharging and performing unnecessary repairs, and he wanted to create a garage that prioritized honesty, transparency, and customer education.
              </p>
              <p className="text-gray-600">
                Today, E-Garage continues to operate with those same values. We've grown in size and capabilities, but our commitment to honest service and customer satisfaction remains unchanged.
              </p>
            </motion.div>
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                alt="Garage workshop" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do at E-Garage, from how we treat our customers to how we approach repairs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTools className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quality</h3>
              <p className="text-gray-600">
                We use only high-quality parts and follow manufacturer specifications for all repairs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUserCheck className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Integrity</h3>
              <p className="text-gray-600">
                We're honest about what repairs are needed and provide transparent pricing.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHistory className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Reliability</h3>
              <p className="text-gray-600">
                We complete repairs on time and stand behind our work with solid warranties.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaAward className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expertise</h3>
              <p className="text-gray-600">
                Our ASE-certified mechanics have the training and experience to handle any repair.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team of certified mechanics and service professionals are dedicated to providing you with the best service experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-secondary font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Key milestones in our history that have shaped E-Garage into what it is today.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20"></div>

            {/* Timeline Items */}
            <div className="relative z-10">
              {milestones.map((milestone, index) => (
                <motion.div 
                  key={index}
                  className={`flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8 text-right' : 'md:pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <span className="text-secondary font-bold text-xl">{milestone.year}</span>
                      <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Our Service?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book an appointment today and see why our customers trust us with their vehicles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/booking" className="btn bg-secondary text-white hover:bg-secondary/90">
              Book Appointment
            </a>
            <a href="/contact" className="btn bg-white text-primary hover:bg-gray-100">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About 