import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';
import { TextField, Button, IconButton, InputAdornment, Typography, Box, CircularProgress } from '@mui/material';

const apiurl = import.meta.env.VITE_API_URL;

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
      console.error(error);
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
          background: 'linear-gradient(to right, #1e3c72, #2a5298)',
        }}
      >
        <Box
          sx={{
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            width: '100%',
            maxWidth: 400,
            backgroundColor: 'white',
          }}
        >
          <Typography variant="h4" align="center" sx={{ mb: 4 }}>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility}>
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
                  fontWeight: message.includes('successful') ? 'bold' : 'normal',
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
                backgroundColor: 'gray',
                '&:hover': { backgroundColor: 'gray', opacity: 0.8 },
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Login'}
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button
                variant="text"
                color="primary"
                onClick={() => navigate('/forgot-password')}
              >
                Forgot Password?
              </Button>
              <Button
                variant="text"
                color="primary"
                onClick={() => navigate('/register')}
              >
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
