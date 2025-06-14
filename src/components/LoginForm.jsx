// src/components/LoginForm.js
import React from 'react';
import { TextField, Button, Typography } from '@mui/material';

const LoginForm = () => {
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
      <Button variant="contained" color="primary" fullWidth>
        Log In
      </Button>
      <Typography variant="body2" sx={{ marginTop: '1rem', textAlign: 'center' }}>
        Forgot password?
      </Typography>
    </form>
  );
};

export default LoginForm;