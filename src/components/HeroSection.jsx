import React from 'react';
import { Box, Typography } from '@mui/material';

const HeroSection = () => {
  return (
    <Box 
      sx={{ 
        textAlign: 'center', 
        mb: 6,
        py: 4,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: 4,
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
        Welcome to BlogSpace
      </Typography>
      <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
        Discover amazing stories, share your thoughts, and connect with a community of writers and readers.
      </Typography>
    </Box>
  );
};

export default HeroSection;
