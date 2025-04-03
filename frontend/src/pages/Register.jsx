import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { TextField, Button, Typography, Box } from '@mui/material';

const apiurl = import.meta.env.VITE_API_URL;

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiurl}/api/auth/register`, formData);
      console.log(res.data);
      setSuccessMessage('Registration successful! You can now log in.');
      setFormData({ username: '', email: '', password: '' });
      setTimeout(() => navigate('/login'), 5000);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        setErrorMessage(error.response.data.msg);
      } else {
        setErrorMessage('Registration failed! Please try again.');
      }
      console.error('Registration error:', error);
    }
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
          background: 'linear-gradient(to right, #2196f3, #00bcd4)',
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
            Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            {errorMessage && (
              <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                {errorMessage}
              </Typography>
            )}
            {successMessage && (
              <Typography color="success" variant="body2" sx={{ mb: 2 }}>
                {successMessage}
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
            >
              Register
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Typography variant="body2" sx={{ mr: 1 }}>
                Already have an account?
              </Typography>
              <Button
                variant="text"
                color="primary"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </div>
  );
};

export default Register;
