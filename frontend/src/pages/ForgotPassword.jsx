import { useState } from 'react';
import axios from 'axios';

const apiurl = import.meta.env.VITE_API_URL;
const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiurl}/api/auth/forgot-password`, { email });
      alert('Password reset link sent!');
    } catch (error) {
      alert('Error sending reset link');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400">
      <div className="p-10 rounded-xl shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-semibold text-[#000000] mb-6 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
