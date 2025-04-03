import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#001f3f' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ color: '#e0f7fa', fontWeight: 'bold' }}>
          Notes
        </Typography>
        <div>
          <Button
            component={Link}
            to="/"
            sx={{
              color: '#e0f7fa',
              backgroundColor: '#004080',
              borderRadius: '30px',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 'medium',
              marginRight: '8px',
              '&:hover': {
                backgroundColor: '#003366',
                transform: 'translateY(-3px)',
              },
              position: 'relative',
              padding: '8px 16px',
            }}
          >
            Home
            <span
              style={{
                position: 'absolute',
                bottom: '-5px',
                left: 0,
                width: '100%',
                height: '3px',
                backgroundColor: '#007bff',
                transform: 'scaleX(0)',
                transition: 'transform 0.3s ease',
              }}
              className="underline-hover"
            />
          </Button>
          <Button
            component={Link}
            to="/login"
            sx={{
              color: '#e0f7fa',
              backgroundColor: '#004080',
              borderRadius: '30px',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 'medium',
              marginRight: '8px',
              '&:hover': {
                backgroundColor: '#003366',
                transform: 'translateY(-3px)',
              },
              position: 'relative',
              padding: '8px 16px',
            }}
          >
            Login
            <span
              style={{
                position: 'absolute',
                bottom: '-5px',
                left: 0,
                width: '100%',
                height: '3px',
                backgroundColor: '#007bff',
                transform: 'scaleX(0)',
                transition: 'transform 0.3s ease',
              }}
              className="underline-hover"
            />
          </Button>
          <Button
            component={Link}
            to="/register"
            sx={{
              color: '#e0f7fa',
              backgroundColor: '#004080',
              borderRadius: '30px',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 'medium',
              '&:hover': {
                backgroundColor: '#003366',
                transform: 'translateY(-3px)',
              },
              position: 'relative',
              padding: '8px 16px',
            }}
          >
            Register
            <span
              style={{
                position: 'absolute',
                bottom: '-5px',
                left: 0,
                width: '100%',
                height: '3px',
                backgroundColor: '#007bff',
                transform: 'scaleX(0)',
                transition: 'transform 0.3s ease',
              }}
              className="underline-hover"
            />
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
