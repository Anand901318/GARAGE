import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import axios from 'axios';

const Login = () => {

  // const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role:'' // Default role
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
      
//         const response = await axios.post("http://localhost:3000/user/user/login", formData);
//         console.log(response.data)
//         // if (response.data.success) {
//             alert("login success")
//             navigate("/"); // Redirect to dashboard on successful signup
//         // }
//     } catch (error) {
//         console.log(error)
//         setError(error.response?.data?.message || "!!Something went wrong");
        
//     }
// };
  
const handleSubmit = async (e) => {
      e.preventDefault();
      try {
    
      const response = await axios.post("http://localhost:3000/user/user/login", formData);
      const {token,user} = response.data;

      console.log(response.data)
      console.log(response.data.user)
      console.log(response.data.user.role)
        
      localStorage.setItem("token",token);
      localStorage.setItem("user",JSON.stringify(user))

      // if (response.data.success) {
          alert("✅ Login Successful! 🎉 Welcome back.")
          navigate("/"); // Redirect to dashboard on successful signup
      // }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on selected role
      let userData;
      
      switch(user.role) {
        case 'Admin':
          userData = {
            name: user.name || user.email.split('@')[0],
            email: user.email,
            role:'Admin'
          };
          navigate('/')
          window.location.reload()
          break;
        case 'ServiceProvider':
          userData = {
            name: user.name || user.email.split('@')[0],
            email: user.email,
            role: 'ServiceProvider',
            id: user._id,
          };
          window.location.reload()
          break;
        default:
          userData = {
            name: user.name || user.email.split('@')[0],
            email: user.email,
            role: 'Customer'
          };
          navigate('/')
          window.location.reload()
      }
      
     
      // Login the user.
      login(userData, token);
    
      
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
      console.error(err);
    }
    
    setLoading(false);
  };
  
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-primary py-4 px-6">
            <h2 className="text-2xl font-bold text-white text-center">Login to E-Garage</h2>
          </div>
          
          <div className="py-8 px-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="role">
                  Login As
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="Customer">Customer</option>
                  <option value="ServiceProvider">Service Provider</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="example@gmail.com"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                
                <div className="text-sm">
                  <a href="#" className="text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {loading ? (
                  <span>Loading...</span>
                ) : (
                  <>
                    <FaSignInAlt className="mr-2" />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 