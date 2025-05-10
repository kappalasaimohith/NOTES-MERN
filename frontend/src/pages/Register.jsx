import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {
  TextField,
  Button,
  Typography,
  Box,
  Fade,
  Alert,
  Stack,
} from '@mui/material';

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
      setSuccessMessage('🎉 Registration successful! Redirecting to login...');
      setFormData({ username: '', email: '', password: '' });
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      if (error.response?.data?.msg) {
        setErrorMessage(error.response.data.msg);
      } else {
        setErrorMessage('Registration failed. Please try again.');
      }
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
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          p: 2,
        }}
      >
        <Box
          sx={{
            p: 4,
            borderRadius: 3,
            boxShadow: 4,
            width: '100%',
            maxWidth: 420,
            backgroundColor: 'white',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" sx={{ mb: 1.5, fontWeight: 'bold', color: '#333' }}>
            Create Account
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: '#666' }}>
            Sign up to access your personal notes dashboard.
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
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />

            <Stack spacing={2} sx={{ mb: 2 }}>
              <Fade in={!!errorMessage}>
                <div>{errorMessage && <Alert severity="error">{errorMessage}</Alert>}</div>
              </Fade>
              <Fade in={!!successMessage}>
                <div>{successMessage && <Alert severity="success">{successMessage}</Alert>}</div>
              </Fade>
            </Stack>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                background: 'linear-gradient(45deg, #6a11cb, #2575fc)',
                color: '#fff',
                py: 1.5,
                fontWeight: 'bold',
                '&:hover': {
                  background: 'linear-gradient(45deg, #5a0eb1, #1d63d4)',
                },
              }}
            >
              Register
            </Button>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Typography variant="body2" sx={{ mr: 1 }}>
                Already have an account?
              </Typography>
              <Button
                variant="text"
                onClick={() => navigate('/login')}
                sx={{ color: '#2575fc', fontWeight: 'bold' }}
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
