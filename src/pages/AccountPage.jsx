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
import { API_BASE_URL } from "../services/authService";

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setName(storedUser.name);
    }
  }, []);

  const handleUpdate = async () => {
    setSuccess("");
    setError("");

    try {
      const updatedFields = {
        ...(name && { name }),
        ...(password && { password }),
      };

      const res = await axios.patch(
        `${API_BASE_URL}/users/${user.id}`,
        updatedFields,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = { ...user, ...updatedFields };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser); // update state
      setSuccess("Profile updated successfully");
      setPassword("");
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
