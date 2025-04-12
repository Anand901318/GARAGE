import { FaOilCan, FaCog, FaTools, FaCarBattery, FaSnowflake } from 'react-icons/fa'
import Hero from '../components/Hero'
import ServiceCard from '../components/ServiceCard'
import TestimonialCard from '../components/TestimonialCard'

const Home = () => {
  const services = [
    {
      icon: FaOilCan,
      title: "Oil Change",
      description: "Regular oil changes to keep your engine running smoothly and extend its life.",
      link: "/services#oil-change"
    },
    {
      icon: FaCog,
      title: "Engine Repair",
      description: "Complete engine diagnostics and repair services by certified mechanics.",
      link: "/services#engine-repair"
    },
    {
      icon: FaTools,
      title: "Brake Service",
      description: "Inspection and repair of brake systems to ensure your safety on the road.",
      link: "/services#brake-service"
    },
    {
      icon: FaCarBattery,
      title: "Battery Service",
      description: "Battery testing, charging, and replacement services for all vehicle types.",
      link: "/services#battery-service"
    },
    {
      icon: FaSnowflake,
      title: "AC Repair",
      description: "Air conditioning system diagnosis, repair, and maintenance services.",
      link: "/services#ac-repair"
    }
  ]

  const testimonials = [
    {
      name: "John Smith",
      role: "Toyota Owner",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      rating: 5,
      testimonial: "The team at E-Garage did an amazing job with my car's engine repair. Fast, efficient, and reasonably priced!"
    },
    {
      name: "Sarah Johnson",
      role: "Honda Owner",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      rating: 5,
      testimonial: "I've been taking my car here for years. Their service is always top-notch and the staff is very friendly and knowledgeable."
    },
    {
      name: "Michael Brown",
      role: "Ford Owner",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      rating: 4,
      testimonial: "Great service at a fair price. They explained everything they were doing and completed the work quickly."
    }
  ]

  return (
    <div>
      <Hero />
      
      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a wide range of automotive repair and maintenance services to keep your vehicle running at its best.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-200 max-w-2xl mx-auto">
              We're committed to providing the highest quality automotive services with honesty and integrity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Certified Mechanics</h3>
              <p className="text-gray-200">
                Our team consists of ASE-certified mechanics with years of experience.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Quick Service</h3>
              <p className="text-gray-200">
                We value your time and strive to complete all repairs as quickly as possible.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Fair Pricing</h3>
              <p className="text-gray-200">
                Transparent pricing with no hidden fees or unexpected charges.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say about our services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-secondary text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book an appointment today and experience our top-quality automotive services.
          </p>
          <a href="/booking" className="btn bg-white text-secondary hover:bg-gray-100 inline-block">
            Book Appointment Now
          </a>
        </div>
      </section>
    </div>
  )
}

export default Home 