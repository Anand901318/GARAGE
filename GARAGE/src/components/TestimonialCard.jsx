import { FaStar } from 'react-icons/fa'

const TestimonialCard = ({ name, role, image, rating, testimonial }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <img 
          src={image} 
          alt={name} 
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-bold">{name}</h4>
          <p className="text-gray-600 text-sm">{role}</p>
        </div>
      </div>
      
      <div className="flex text-yellow-400 mb-3">
        {[...Array(5)].map((_, i) => (
          <FaStar 
            key={i} 
            className={i < rating ? "text-yellow-400" : "text-gray-300"} 
          />
        ))}
      </div>
      
      <p className="text-gray-700 italic">"{testimonial}"</p>
    </div>
  )
}

export default TestimonialCard 