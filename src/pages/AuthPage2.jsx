import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../services/authService";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ type: "", message: "" });
  const navigate = useNavigate();

  const quote = isLogin
    ? {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt",
        highlight: ["believe", "beauty"],
        img: "/login.png",
      }
    : {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
        highlight: ["great", "love"],
        img: "/regester.png",
      };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email.includes("@")) newErrors.email = "Invalid email address";
    if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!isLogin && form.password !== form.repeatPassword)
      newErrors.repeatPassword = "Passwords do not match";
    if (!isLogin && form.name.trim().length < 2)
      newErrors.name = "Name must be at least 2 characters";
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length !== 0) return;

    try {
      if (isLogin) {
        const res = await axios.post(`${API_BASE_URL}/login`, {
          email: form.email,
          password: form.password,
        });

        localStorage.setItem("token", res.data.accessToken);

        const userRes = await axios.get(
          `${API_BASE_URL}/users?email=${form.email}`,
          {
            headers: {
              Authorization: `Bearer ${res.data.accessToken}`,
            },
          }
        );

        let userLocalData = {
          name: userRes.data[0].name,
          id: userRes.data[0].id,
          email: userRes.data[0].email,
        };
        localStorage.setItem("user", JSON.stringify(userLocalData));

        setAlert({ type: "success", message: "Logged in successfully!" });
        navigate("/");
      } else {
        await axios.post(`${API_BASE_URL}/register`, {
          email: form.email,
          password: form.password,
          name: form.name,
        });
        setAlert({ type: "success", message: "Signed up successfully!" });
        setIsLogin(true);
      }
      setForm({ name: "", email: "", password: "", repeatPassword: "" });
    } catch (err) {
      const msg =
        err.response?.data || "Something went wrong. Please try again.";
      setAlert({ type: "error", message: msg });
    }
  };

  useEffect(() => {
    setForm({ name: "", email: "", password: "", repeatPassword: "" });
    setErrors({});
    setAlert({ type: "", message: "" });
  }, [isLogin]);

  return (
    <Box display="flex" height="90vh">
      {isLogin ? (
        <>
          {/* Left Image Block */}
          <motion.div
            key="login-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: "50%" }}
          >
            <Box
              sx={{
                backgroundImage: `url(${quote.img})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "100%",
                width: "80%",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                p: 4,
                margin: "auto",
              }}
            />
          </motion.div>

          {/* Right Login Form */}
          <motion.div
            key="login-right"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              width: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 32,
            }}
          >
            <Box sx={{ width: "100%", maxWidth: 400 }}>
              <Typography variant="h5" mb={3} textAlign="center">
                Log In
              </Typography>

              <Stack spacing={2}>
                {alert.message && (
                  <Alert severity={alert.type}>{alert.message}</Alert>
                )}
                <TextField
                  label="Your email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  type="email"
                  fullWidth
                />
                <TextField
                  label="Password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  type="password"
                  fullWidth
                />
                <Button variant="contained" fullWidth onClick={handleSubmit}>
                  Log In
                </Button>
              </Stack>

              <Typography mt={2} textAlign="center">
                Don’t have an account?{" "}
                <span
                  style={{ cursor: "pointer", color: "#1976d2" }}
                  onClick={() => setIsLogin(false)}
                >
                  Sign Up
                </span>
              </Typography>
            </Box>
          </motion.div>
        </>
      ) : (
        <>
          {/* Left Signup Form */}
          <motion.div
            key="signup-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              width: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 32,
            }}
          >
            <Box sx={{ width: "100%", maxWidth: 400 }}>
              <Typography variant="h5" mb={3} textAlign="center">
                Sign Up
              </Typography>

              <Stack spacing={2}>
                {alert.message && (
                  <Alert severity={alert.type}>{alert.message}</Alert>
                )}
                <TextField
                  label="Your name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  fullWidth
                />
                <TextField
                  label="Your email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  type="email"
                  fullWidth
                />
                <TextField
                  label="Password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  type="password"
                  fullWidth
                />
                <TextField
                  label="Repeat Password"
                  name="repeatPassword"
                  value={form.repeatPassword}
                  onChange={handleChange}
                  error={!!errors.repeatPassword}
                  helperText={errors.repeatPassword}
                  type="password"
                  fullWidth
                />
                <Button variant="contained" fullWidth onClick={handleSubmit}>
                  Sign Up
                </Button>
              </Stack>

              <Typography mt={2} textAlign="center">
                Already have an account?{" "}
                <span
                  style={{ cursor: "pointer", color: "#1976d2" }}
                  onClick={() => setIsLogin(true)}
                >
                  Log In
                </span>
              </Typography>
            </Box>
          </motion.div>

          {/* Right Image Block */}
          <motion.div
            key="signup-right"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: "50%" }}
          >
            <Box
              sx={{
                backgroundImage: `url(${quote.img})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "100%",
                width: "80%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 4,
                margin: "auto",
              }}
            />
          </motion.div>
        </>
      )}
    </Box>
  );
};

export default AuthPage;
