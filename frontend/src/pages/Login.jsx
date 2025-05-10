import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, CircularProgress, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import Navbar from '../components/Navbar';

const apiurl = import.meta.env.VITE_API_URL;

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    if (!formData.email || !formData.password) {
      setMessage('Please enter both email and password.');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${apiurl}/api/auth/login`, formData);
      localStorage.setItem('token', res.data.token);
      setMessage('Login successful');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Invalid credentials. Login failed!');
    }
    setLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(to right, #141e30, #243b55)',
        }}
      >
        <Box
          sx={{
            p: 4,
            borderRadius: 3,
            boxShadow: 4,
            width: '100%',
            maxWidth: 420,
            backgroundColor: '#ffffff',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#243b55' }}>
            Welcome Back
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: '#777' }}>
            Please login to your account to continue
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {message && (
              <Typography
                color={message.includes('successful') ? 'green' : 'error'}
                variant="body2"
                sx={{
                  mb: 2,
                  fontWeight: 'medium',
                }}
              >
                {message}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#243b55',
                color: '#fff',
                py: 1.5,
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#141e30',
                },
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Login'}
            </Button>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button variant="text" onClick={() => navigate('/forgot-password')} sx={{ color: '#243b55' }}>
                Forgot Password?
              </Button>
              <Button variant="text" onClick={() => navigate('/register')} sx={{ color: '#243b55' }}>
                Register
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
