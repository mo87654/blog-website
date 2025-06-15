// import { AppBar, Toolbar, Typography, Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user")); // or useContext(AuthContext)

//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <Typography variant="h6" sx={{ flexGrow: 1 }} onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
//           BlogZone
//         </Typography>
//         {!user ? (
//           <Button color="inherit" onClick={() => navigate("/auth")}>Login</Button>
//         ) : (
//           <Button color="inherit" onClick={() => {
//             localStorage.removeItem("user");
//             navigate("/login");
//           }}>Logout</Button>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;

// new nav bar

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';
import { Add, AccountCircle, ExitToApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    handleClose();
    navigate('/');
  };

  return (
    <AppBar 
      position="sticky" 
      // elevation={5}
      sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Toolbar>
        <Typography 
          variant="h5" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 700,
            cursor: 'pointer',
            background: 'linear-gradient(45deg, #fff 30%, #e2e8f0 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          onClick={() => navigate('/')}
        >
          BlogSpace
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {user ? (
            <>
              {/* <Button
                startIcon={<Add />}
                variant="contained"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  },
                }}
                onClick={() => navigate('/create')}
              >
                New Post
              </Button> */}

              <IconButton onClick={handleMenu} color="inherit">
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'rgba(255, 255, 255, 0.2)' }}>
                  {user.name?.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={() => { navigate('/account'); handleClose(); }}>
                  <AccountCircle sx={{ mr: 1 }} />
                  {user.email}
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ExitToApp sx={{ mr: 1 }} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                },
              }}
              onClick={() => navigate('/auth')}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
