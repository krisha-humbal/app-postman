
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  FormControl,
  CircularProgress,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import TextField from "../Component/TextField";
import * as Yup from "yup";

const Login = () => {
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Show or hide password
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => event.preventDefault();

  // Validation schema for form
  const loginSchema = Yup.object().shape({
    password: Yup.string()
      // .min(8, "Too Short!")
      // .max(10, "Too Long!")
      .required("Password is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoader(true);
      try {
        const response = await axios.post(
          "https://interviewback-ucb4.onrender.com/admin/login",
          values
        );
        toast.success(response.data.message, { theme: "dark" });
        localStorage.setItem("Token", response.data.token)
        navigate("/dashboard");
      } catch (error) {
        console.error("Login failed:", error.response?.data?.message || error.message);
        toast.error("Login failed. Please check your credentials.");
      } finally {
        setLoader(false);
      }
    },
  });

 
  useEffect(() => {
    const Token = localStorage.getItem("Token");
    if (Token) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg,rgb(47, 104, 184),rgb(129, 147, 173))",
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "400px" },
          p: { xs: 3, sm: 5 },
          borderRadius: 3,
          boxShadow: "0px 8px 24px rgba(232, 231, 238, 0.99)",
          backgroundColor: "rgba(255, 255, 255, 0.85)",

          mx: { xs: 2, sm: 0 },
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#333",
            mb: { xs: 2, sm: 3 },
          }}
        >
          Welcome Back
        </Typography>
        <Typography
          variant="body2"
          align="center"
          sx={{ color: "#555", mb: 3 }}
        >
          Log in to access your account
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          {/* Email Field */}
          <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
            {/* <EmailIcon sx={{ color: "#6a11cb", mr: 1 }} /> */}
            <TextField
              id="email"
              name="email"
              label="Email"
              variant="standard"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Box>

          {/* Password Field */}
          <FormControl variant="standard" fullWidth sx={{ mb: 3 }}>
            <TextField
              id="password"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

      
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={formik.isSubmitting || loader}
            sx={{
              py: 1.5,
              fontWeight: "bold",
              background: "linear-gradient(90deg, #43cea2, #185a9d)",
              color: "#fff",
              "&:hover": {
                background: "linear-gradient(90deg, #185a9d, #43cea2)",
              },
            }}
          >
            {loader ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </form>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default Login;