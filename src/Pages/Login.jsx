// import { Box, Button, Typography } from "@mui/material";
// import React from "react";
// import TextField from "../Component/TextField";
// import { useFormik } from "formik";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// const Signup = () => {
//     let navigate = useNavigate()
//   const formik = useFormik({
//     initialValues: {
//       firstname: "",
//       lastname: "",
//       contact: "",
//       email: "",
//       password: "",
//     },
//     onSubmit: async (values,{resetForm}) => {
//       try {
//         let res = await axios.post(
//           "https://interviewback-ucb4.onrender.com/admin/login",
//           values
//         );
//         toast.success(res.data.message);
//         resetForm()
//         navigate("/dashboard")
//       } catch (error) {
//         console.log(error);
//       }
//     },
//   });

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         height: "100vh",
//         backgroundColor: "#006bd6",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Box
//         sx={{
//           width: "300px",
//           padding: "20px",
//           borderRadius: "10px",
//           backgroundColor: "white",
//         }}
//       >
//         <Typography
//           variant="h6"
//           component={"h1"}
//           sx={{ textAlign: "center", marginBottom: "10px" }}
//         >
//           Welcome to Login
//         </Typography>
//         <form onSubmit={formik.handleSubmit}>
         
//           <TextField
//             label="Email"
//             name="email"
//             type="email"
//             onChange={formik.handleChange}
//             value={formik.values.email}
//           />
//           <TextField
//             label="Password"
//             name="password"
//             type="password"
//             onChange={formik.handleChange}
//             value={formik.values.password}
//           />
//           <Button
//             variant="contained"
//             type="submit"
//             sx={{ width: "100%", margin: "10px 0px" }}
//           >
//             Login
//           </Button>
//         </form>
      
//       </Box>
//       <Toaster />
//     </Box>
//   );
// };

// export default Signup;
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

  // Formik setup
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
        localStorage.setItem("Token",response.data.token)
        navigate("/dashboard");
      } catch (error) {
        console.error("Login failed:", error.response?.data?.message || error.message);
        toast.error("Login failed. Please check your credentials.");
      } finally {
        setLoader(false);
      }
    },
  });

  // Redirect if already logged in
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
        // background: "linear-gradient(135deg, #ff9a9e, #fecfef)",
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "400px" },
          p: { xs: 3, sm: 5 },
          borderRadius: 3,
          boxShadow: "0px 8px 24px rgba(232, 231, 238, 0.99)",
          backgroundColor: "rgba(255, 255, 255, 0)",
        
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

          {/* Submit Button */}
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