import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt } from 'react-icons/fa';

const ServiceProviderDetails = ({ provider }) => {
  return (
    <div className="mt-6 flex justify-end">
      <Link 
        to={`/appointments/book?provider=${provider.id}`}
        className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
      >
        <FaCalendarAlt className="mr-2" />
        Book Appointment
      </Link>
    </div>
  );
};

export default ServiceProviderDetails; 