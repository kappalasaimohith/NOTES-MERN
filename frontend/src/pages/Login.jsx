import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';

const apiurl = import.meta.env.VITE_API_URL;

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiurl}/api/auth/login`, formData);
      localStorage.setItem('token', res.data.token);
      setMessage('Login successful! Redirecting to dashboard...');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (error) {
      console.error(error);
      setMessage('Invalid Credentials. Login failed!');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-blue-400">
        <div className="p-8 rounded-2xl shadow-lg max-w-sm w-full hover:shadow-2xl">
          <h2 className="text-[#fff] text-3xl font-extrabold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6 relative flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            {message && (
              <p className={`text-sm mb-4 ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
                {message}
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Login
            </button>
            <div className="flex justify-between items-center mt-4">
              <button
                className="text-[#fff]"
                onClick={() => navigate('/forgot-password')}
              >
                Forgot Password?
              </button>
              <button 
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                onClick={() => navigate('/register')}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
