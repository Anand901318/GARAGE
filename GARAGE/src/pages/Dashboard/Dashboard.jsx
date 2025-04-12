import { useAuth } from '../../context/AuthContext';
import CustomerDashboard from './CustomerDashboard';
import ServiceProviderDashboard from './ServiceProviderDashboard';
import AdminDashboard from './AdminDashboard';
import AdminHome from '../Admin/AdminHome';
import ServiceProviderHome from '../ServiceProvider/ServiceProviderHome';

const Dashboard = () => {
  const { currentUser } = useAuth();
  
  if (currentUser.role === 'Admin') {
    return <AdminHome />;
  } else if (currentUser.role === 'ServiceProvider') {
    return <ServiceProviderHome />;
  } else {
    return <CustomerDashboard />;
  }
};

export default Dashboard; 