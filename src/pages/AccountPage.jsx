import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";
import axios from "axios";

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `https://your-api-url.com/600/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(res.data);
        setName(res.data.name);
      } catch (err) {
        setError("Failed to load user info");
      }
    };
    fetchUser();
  }, [userId, token]);

  const handleUpdate = async () => {
    setSuccess("");
    setError("");
    try {
      await axios.patch(
        `https://your-api-url.com/600/users/${userId}`,
        {
          ...(name && { name }),
          ...(password && { password }),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess("Profile updated successfully");
      setPassword(""); // clear password field after update
    } catch (err) {
      setError("Failed to update profile");
    }
  };

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Account
      </Typography>

      {success && <Alert severity="success">{success}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      <Box mt={3} display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Email"
          value={user.email}
          disabled
          fullWidth
        />

        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />

        <TextField
          label="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          fullWidth
        />

        <Button variant="contained" onClick={handleUpdate}>
          Save Changes
        </Button>
      </Box>
    </Container>
  );
};

export default AccountPage;
