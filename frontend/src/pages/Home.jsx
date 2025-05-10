import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import Navbar from '../components/Navbar';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          background: 'url(/path/to/your/image.jpg) no-repeat center center',
          backgroundSize: 'cover',
          color: '#fff',
        }}
      >
        <div>
          <Typography variant="h4" gutterBottom>
            Welcome to Your Notes
          </Typography>
          <Typography variant="h6" paragraph>
            Organize your thoughts, ideas, and tasks in one place.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              borderRadius: '20px',
              padding: '10px 20px',
              backgroundColor: '#6E6565',
              '&:hover': { backgroundColor: '#5a5a5a' },
              transition: 'background-color 0.3s',
            }}
            onClick={() => navigate('/login')}
          >
            Get Started
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default Home;
