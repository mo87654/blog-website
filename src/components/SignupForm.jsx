// src/components/SignupForm.js
import React from 'react';
import { TextField, Button, Typography } from '@mui/material';

const SignupForm = () => {
  return (
    <form>
      <TextField
        label="Your email"
        type="email"
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Repeat Password"
        type="password"
        fullWidth
        margin="normal"
        required
      />
      <Button variant="contained" color="primary" fullWidth>
        Sign Up
      </Button>
      <Typography variant="body2" sx={{ marginTop: '1rem', textAlign: 'center' }}>
        Already have an account?
        <a href="#">Log In</a>
      </Typography>
    </form>
  );
};

export default SignupForm;