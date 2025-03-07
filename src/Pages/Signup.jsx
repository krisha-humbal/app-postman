// // import { Box, Button, Typography } from "@mui/material";
// // import React from "react";
// // import TextField from "../Component/TextField";
// // import { useFormik } from "formik";
// // import { Link, useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import toast, { Toaster } from "react-hot-toast";
// // const Signup = () => {
// //   let navigate = useNavigate()
// //   const formik = useFormik({
// //     initialValues: {
// //       firstname: "",
// //       lastname: "",
// //       contact: "",
// //       email: "",
// //       password: "",
// //     },
    
// //     onSubmit: async (values, { resetForm }) => {
// //       try {
// //         let res = await axios.post(
// //           "https://interviewback-ucb4.onrender.com/admin/signup",
// //           values
// //         );
// //         toast.success(res.data.message);
// //         resetForm()
// //         navigate("/login")
// //       } catch (error) {
// //         console.log(error);
// //       }
// //     },
// //   });

// //   return (
// //     <Box
// //       sx={{
// //         width: "100%",
// //         height: "100vh",
// //         // backgroundColor: "#006bd6",
// //         display: "flex",
// //         alignItems: "center",
// //         justifyContent: "center",
// //       }}
// //     >
// //       <Box
// //         sx={{
// //           width: "300px",
// //           padding: "20px",
// //           borderRadius: "10px",
// //           backgroundColor: "white",
// //           boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
// //         }}
// //       >
// //         <Typography
// //           variant="h6"
// //           component={"h1"}
// //           sx={{ textAlign: "center", marginBottom: "10px" }}
// //         >
// //           Welcome to Signup
// //         </Typography>
// //         <form onSubmit={formik.handleSubmit}>
// //           <TextField
// //             label="Firstname"
// //             name="firstname"
// //             onChange={formik.handleChange}
// //             value={formik.values.firstname}
// //           />
// //           <TextField
// //             label="Lastname"
// //             name="lastname"
// //             onChange={formik.handleChange}
// //             value={formik.values.lastname}
// //           />
// //           <TextField
// //             label="Contact"
// //             name="contact"
// //             onChange={formik.handleChange}
// //             value={formik.values.contact}
// //           />
// //           <TextField
// //             label="Email"
// //             name="email"
// //             type="email"
// //             onChange={formik.handleChange}
// //             value={formik.values.email}
// //           />
// //           <TextField
// //             label="Password"
// //             name="password"
// //             type="password"
// //             onChange={formik.handleChange}
// //             value={formik.values.password}
// //           />
// //           <Button
// //             variant="contained"
// //             type="submit"
// //             sx={{ width: "100%", margin: "10px 0px" }}
// //           >
// //             Signup
// //           </Button>
// //         </form>
// //         <Typography sx={{ textAlign: "center" }}>
// //           Already Signup...! Click to{" "}
// //           <Link
// //             to={"/login"}
// //             style={{
// //               textDecoration: "none",
// //               color: "#006bd6",
// //               fontWeight: "bold",
// //             }}
// //           >
// //             Login
// //           </Link>
// //         </Typography>
// //       </Box>
// //       <Toaster />
// //     </Box>
// //   );
// // };

// // export default Signup;
// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   InputAdornment,
//   FormControl,
//   TextField,
//   IconButton,
// } from "@mui/material";
// import EmailIcon from "@mui/icons-material/Email";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import { useFormik } from "formik";
// import axios from "axios";
// import { useNavigate } from "react-router";
// import * as Yup from "yup";
// // import Image from '../../images/bg.jpg';

// const Signup = () => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = React.useState(false);

//   const handleClickShowPassword = () => setShowPassword((prev) => !prev);
//   const handleMouseDownPassword = (event) => event.preventDefault();

//   const SignupSchema = Yup.object().shape({
//     password: Yup.string()
//       // .min(5, "Too Short!")
//       // .max(10, "Too Long!")
//       .required("Required"),
//     email: Yup.string().email("Invalid email").required("Required"),
//   });

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: SignupSchema,
//     onSubmit: async (values, { setSubmitting }) => {
//       console.log("Submitting form values:", values);
//       try {
//         const response = await axios.post(
//           "https://interviewback-ucb4.onrender.com/admin/signup",
//           values
//         );
//         console.log("Signup successful:", response.data);
//         navigate("/login");
//       } catch (error) {
//         console.error("Signup failed:", error.message);
//         alert("Signup failed. Please try again.");
//       } finally {
//         setSubmitting(false);
//       }
//     },
//   });

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: `linear-gradient(135deg, rgba(255, 126, 95, 0.7), rgba(254, 180, 123, 0.7)), url(${Image})`, // Added background image
//         backgroundSize: 'cover', // Ensure it covers the whole screen
//         backgroundPosition: 'center', // Center the background
//         overflow: "hidden",
//         padding: 2,
//       }}
//     >
//       <Box
//         sx={{
//           width: { xs: "100%", sm: "400px" },
//           p: { xs: 3, sm: 5 },
//           borderRadius: 3,
//           boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
//           backgroundColor: "rgba(255, 255, 255, 0.54)",
//           backdropFilter: "blur(10px)",
//           mx: { xs: 2, sm: 0 },
//         }}
//       >
//         <Typography
//           variant="h4"
//           align="center"
//           gutterBottom
//           sx={{
//             fontWeight: "bold",
//             color: "#333",
//             textShadow: "1px 1px 2px rgba(251, 249, 249, 0.79)",
//           }}
//         >
//           Create Account
//         </Typography>
//         <Typography
//           variant="body2"
//           align="center"
//           sx={{ color: "#555", mb: 3 }}
//         >
//           Sign up to get started
//         </Typography>

//         <form onSubmit={formik.handleSubmit}>
//           {/* Email Field */}
//           <FormControl variant="outlined" fullWidth sx={{ mb: 3 }}>
//   {/* Firstname Field */}
//   <TextField
//     id="firstname"
//     name="firstname"
//     label="Firstname"
//     variant="outlined"
//     type="text"
//     fullWidth
//     value={formik.values.firstname}
//     onChange={formik.handleChange}
//     onBlur={formik.handleBlur}
//     error={formik.touched.firstname && Boolean(formik.errors.firstname)}
//     helperText={formik.touched.firstname && formik.errors.firstname}
//     sx={{ mb: 3 }}
//   />

//   {/* Lastname Field */}
//   <TextField
//     id="lastname"
//     name="lastname"
//     label="Lastname"
//     variant="outlined"
//     type="text"
//     fullWidth
//     value={formik.values.lastname}
//     onChange={formik.handleChange}
//     onBlur={formik.handleBlur}
//     error={formik.touched.lastname && Boolean(formik.errors.lastname)}
//     helperText={formik.touched.lastname && formik.errors.lastname}
//     sx={{ mb: 3 }}
//   />

//   {/* Contact Field */}
//   <TextField
//     id="contact"
//     name="contact"
//     label="Contact"
//     variant="outlined"
//     type="text"
//     fullWidth
//     value={formik.values.contact}
//     onChange={formik.handleChange}
//     onBlur={formik.handleBlur}
//     error={formik.touched.contact && Boolean(formik.errors.contact)}
//     helperText={formik.touched.contact && formik.errors.contact}
//     sx={{ mb: 3 }}
//   />

//   {/* Email Field */}
//   <Box sx={{ display: "flex", alignItems: "flex-end", mb: 3 }}>
//     <TextField
//       id="email"
//       name="email"
//       label="Email"
//       variant="outlined"
//       type="email"
//       fullWidth
//       value={formik.values.email}
//       onChange={formik.handleChange}
//       onBlur={formik.handleBlur}
//       error={formik.touched.email && Boolean(formik.errors.email)}
//       helperText={formik.touched.email && formik.errors.email}
//     />
//   </Box>
// {/* </FormControl> */}

// {/* Password Field */}
// <Box variant="outlined" fullWidth sx={{ mb: 3 }}>
//   <TextField
//     id="password"
//     name="password"
//     label="Password"
//     type={showPassword ? "text" : "password"}
//     fullWidth
//     value={formik.values.password}
//     onChange={formik.handleChange}
//     onBlur={formik.handleBlur}
//     error={formik.touched.password && Boolean(formik.errors.password)}
//     helperText={formik.touched.password && formik.errors.password}
//     InputProps={{
//       endAdornment: (
//         <InputAdornment position="end">
//           <IconButton
//             onClick={handleClickShowPassword}
//             onMouseDown={handleMouseDownPassword}
//           >
//             {showPassword ? <VisibilityOff /> : <Visibility />}
//           </IconButton>
//         </InputAdornment>
//       ),
//     }}
//   />
//   </Box>
// </FormControl>


//           {/* Submit Button */}
//           <Button
//             type="submit"
//             variant="contained"
//             disabled={formik.isSubmitting}
//             sx={{
//               width: "100%",
//               py: 1.5,
//               fontWeight: "bold",
//               textTransform: "uppercase",
//              backgroundColor:'#E72E3F'
//             }}
//           >
//             {formik.isSubmitting ? "Signing up..." : "Sign Up"}
//           </Button>
//         </form>
//       </Box>
//     </Box>
//   );
// };

// export default Signup;


import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  InputAdornment,
  FormControl,
  TextField,
  IconButton,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router";
import * as Yup from "yup";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const SignupSchema = Yup.object().shape({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    contact: Yup.string().required("Contact number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      contact: "",
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        console.log("Submitting form values:", values);
        const response = await axios.post(
          "https://interviewback-ucb4.onrender.com/admin/signup",
          values
        );
        console.log("Signup successful:", response.data);
        navigate("/login");
      } catch (error) {
        console.error("Signup failed:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Signup failed. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // background: "linear-gradient(135deg, rgba(255, 126, 95, 0.7), rgba(254, 180, 123, 0.7))",
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "400px" },
          p: { xs: 3, sm: 5 },
          borderRadius: 3,
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          mx: { xs: 2, sm: 0 },
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
          Create Account
        </Typography>
        <Typography variant="body2" align="center" sx={{ color: "#555", mb: 3 }}>
          Sign up to get started
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="firstname"
            name="firstname"
            label="First Name"
            variant="outlined"
            fullWidth
            value={formik.values.firstname}
            onChange={formik.handleChange}
            error={formik.touched.firstname && Boolean(formik.errors.firstname)}
            helperText={formik.touched.firstname && formik.errors.firstname}
            sx={{ mb: 2 }}
          />
          <TextField
            id="lastname"
            name="lastname"
            label="Last Name"
            variant="outlined"
            fullWidth
            value={formik.values.lastname}
            onChange={formik.handleChange}
            error={formik.touched.lastname && Boolean(formik.errors.lastname)}
            helperText={formik.touched.lastname && formik.errors.lastname}
            sx={{ mb: 2 }}
          />
          <TextField
            id="contact"
            name="contact"
            label="Contact"
            variant="outlined"
            fullWidth
            value={formik.values.contact}
            onChange={formik.handleChange}
            error={formik.touched.contact && Boolean(formik.errors.contact)}
            helperText={formik.touched.contact && formik.errors.contact}
            sx={{ mb: 2 }}
          />
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ mb: 2 }}
            
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ mb: 3 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ py: 1.5, fontWeight: "bold",backgroundColor:'#E72E3F' }}>
            {formik.isSubmitting ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;
