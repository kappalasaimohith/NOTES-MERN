import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="sticky" sx={{ background: 'linear-gradient(45deg, #6e7dff, #3a4dff)' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
          Notes
        </Typography>
        <div>
          <Button
            component={Link}
            to="/"
            sx={{
              color: '#fff',
              backgroundColor: '#3a4dff',
              borderRadius: '30px',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 'medium',
              marginRight: '8px',
              padding: '8px 16px',
              '&:hover': {
                backgroundColor: '#2c3e9b',
                transform: 'translateY(-3px)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/login"
            sx={{
              color: '#fff',
              backgroundColor: '#3a4dff',
              borderRadius: '30px',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 'medium',
              marginRight: '8px',
              padding: '8px 16px',
              '&:hover': {
                backgroundColor: '#2c3e9b',
                transform: 'translateY(-3px)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/register"
            sx={{
              color: '#fff',
              backgroundColor: '#3a4dff',
              borderRadius: '30px',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 'medium',
              padding: '8px 16px',
              '&:hover': {
                backgroundColor: '#2c3e9b',
                transform: 'translateY(-3px)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            Register
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
