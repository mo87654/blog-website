// src/components/AuthPage.js
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { Box, Grid, Typography } from '@mui/material';

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      <Grid container spacing={0} sx={{ height: '100%' }}>
        {/* Left Panel */}
        <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem' }}>
          <Typography variant="h5" gutterBottom>
            {isSignup ? 'Sign Up' : 'Log In'}
          </Typography>
          {isSignup ? <SignupForm /> : <LoginForm />}
          <Typography variant="body2" sx={{ marginTop: '1rem', textAlign: 'center' }}>
            {isSignup ? (
              <span>
                Already have an account?{' '}
                <a href="#" onClick={toggleForm}>
                  Log In
                </a>
              </span>
            ) : (
              <span>
                Don't have an account?{' '}
                <a href="#" onClick={toggleForm}>
                  Sign Up
                </a>
              </span>
            )}
          </Typography>
        </Grid>

        {/* Right Panel */}
        <Grid item xs={6} sx={{ position: 'relative', overflow: 'hidden' }}>
          <img
            src={isSignup ? '/images/signup-background.jpg' : '/images/login-background.jpg'}
            alt="Background"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease-in-out',
              transform: isSignup ? 'translateX(-100%)' : 'translateX(0)',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthPage;