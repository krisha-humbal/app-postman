import { Box, Button, Typography } from "@mui/material";
import React from "react";
import TextField from "../Component/TextField";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const Signup = () => {
  let navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      contact: "",
      email: "",
      password: "",
    },
    
    onSubmit: async (values, { resetForm }) => {
      try {
        let res = await axios.post(
          "https://interviewback-ucb4.onrender.com/admin/signup",
          values
        );
        toast.success(res.data.message);
        resetForm()
        navigate("/login")
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        // backgroundColor: "#006bd6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "300px",
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "white",
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
        }}
      >
        <Typography
          variant="h6"
          component={"h1"}
          sx={{ textAlign: "center", marginBottom: "10px" }}
        >
          Welcome to Signup
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Firstname"
            name="firstname"
            onChange={formik.handleChange}
            value={formik.values.firstname}
          />
          <TextField
            label="Lastname"
            name="lastname"
            onChange={formik.handleChange}
            value={formik.values.lastname}
          />
          <TextField
            label="Contact"
            name="contact"
            onChange={formik.handleChange}
            value={formik.values.contact}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ width: "100%", margin: "10px 0px" }}
          >
            Signup
          </Button>
        </form>
        <Typography sx={{ textAlign: "center" }}>
          Already Signup...! Click to{" "}
          <Link
            to={"/login"}
            style={{
              textDecoration: "none",
              color: "#006bd6",
              fontWeight: "bold",
            }}
          >
            Login
          </Link>
        </Typography>
      </Box>
      <Toaster />
    </Box>
  );
};

export default Signup;
