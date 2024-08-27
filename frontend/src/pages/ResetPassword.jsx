import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const apiurl = import.meta.env.VITE_API_URL;
const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiurl}/api/auth/reset-password/${token}`, { password });
      alert('Password successfully reset!');
      navigate('/login');
    } catch (error) {
      alert('Error resetting password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400">
      <div className="p-10 rounded-xl shadow-2xl max-w-md w-full bg-white">
        <h2 className="text-3xl font-semibold text-[#000000] mb-6 text-center">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter new password"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
