import React from 'react'
import { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Img from '../Image/lgo.png';
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, Menu, MenuItem, CircularProgress,Grid } from "@mui/material";
import CategoryIcon from '@mui/icons-material/Category';
import img1 from '../Image/category.png'
import img2 from '../Image/diagram.png'
import axios from 'axios';
import img3 from '../Image/qa.png'
import Footer from '../Component/Footer';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import image from "../Image/interviews.png";
function Home() {
  const [list, setList] = useState(null);
  const [categories, setCategories] = useState(0);
  const [subcategoryCount, setSubcategoryCount] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate()
  let token = localStorage.getItem("Token")
  // const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: token };

        const [categoryRes, subcategoryRes, questionRes] = await Promise.all([
          axios.get("https://interviewback-ucb4.onrender.com/category/count", { headers }),
          axios.get("https://interviewback-ucb4.onrender.com/subcategory/count", { headers }),
          axios.get("https://interviewback-ucb4.onrender.com/questions/count", { headers }),
        ]);
        console.log(categoryRes);

        setCategories(categoryRes.data.data);
        setSubcategoryCount(subcategoryRes.data.data);
        setQuestionCount(questionRes.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    } else {
      console.error("No token found!");
      setLoading(false);
    }
  }, [token]);

  const handleMenuOpen = (event) => {
    setList(event.currentTarget);
  };

  const pages = [{ name: "Signup", path: "/signup" }, { name: "Login", path: "/login" }];
  const handleMenuClose = () => {
    setList(null);
  };
  const handleSingnup = () => {
    navigate('/signup')
  }
  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <div style={{backgroundColor:'#f2f5f4'}}>

      <AppBar position="sticky" sx={{ backgroundColor: '#E72F3E' }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: "100px" }, width: { xs: "200px" } }}>
            <img src={Img} alt="" width={'250px'} style={{ width: { xs: '100%' } }} />
          </Box>
          <Box sx={{ display: { xs: "none", md: "block" } }}>

            <Button color="inherit" onClick={handleSingnup}>Signup</Button>
            <Button color="inherit" onClick={handleLogin}>Login</Button>
          </Box>
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
            <Menu list={list} open={Boolean(list)} onClose={handleMenuClose} sx={{ position: { sm: 'absolute', xs: 'absolute', md: 'absolute' }, left: { xs: '50%', sm: '50%', md: '50%' }, top: { xs: '-100px', sm: '0px' }, width: { xs: '50%' } }}>
              {pages.map((page, i) => (
                <MenuItem key={i} onClick={handleMenuClose} sx={{ color: 'black' }}>
                  <Typography sx={{ textAlign: 'center' }} className='header-pages-res'>
                    <Link to={page.path} style={{ textDecoration: 'none', color: 'black' }}>
                      {page.name}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Hero Section */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
          <CircularProgress color="primary" size={60} />
        </Box>
      ) : (
        <>
          {/* Hero Section */}
          <Container sx={{ textAlign: "center", my: 8 }}>
            <Typography variant="h3" gutterBottom sx={{fontFamily: "Eczar, serif", fontSize: { xs: "1.5rem", sm: "3rem", md: '4.5rem' }, fontWeight: 'bold', color: '#000F38' }}>
              Get <span style={{ color: '#E72F3E' }}>Hired Faster</span> With Our Interview Website
            </Typography>
            <Typography variant="h6" color="textSecondary">
              Prepare, Schedule & Track Interviews Easily
            </Typography>
          </Container>

          {/* Category, Subcategory, Q&A Boxes */}
          <Container sx={{ display: "flex", flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', gap: '20px', paddingBottom: '30px' }}>

            {/* Category Box */}
            <Box sx={{ width: { xs: '90%', sm: '30%' }, border: '1px solid black', padding: '30px', borderRadius: '10px', textAlign: 'center' }}>
              <img src={img1} alt="Category" width="20%" style={{ paddingBottom: '20px' }} />
              <Typography variant="h4" sx={{ fontWeight: '500', color: '#000F38',fontFamily: "Eczar, serif" }}>Category</Typography>
              <Typography sx={{ color: '#000F38', fontSize: '18px' ,fontFamily: "Eczar, serif"}}>
                We provide different types of categories for IT-related interview questions.
              </Typography>
              <Typography sx={{ fontSize: '20px', fontWeight: 'bold', color: '#E72E3F', marginTop: '10px',fontFamily: "Eczar, serif" }}>
                Total:{categories} 
              
              </Typography>
            </Box>

            {/* Subcategory Box */}
            <Box sx={{ width: { xs: '90%', sm: '30%' }, border: '1px solid black', padding: '30px', borderRadius: '10px', textAlign: 'center' }}>
              <img src={img2} alt="SubCategory" width="25%" style={{ paddingBottom: '20px' }} />
              <Typography variant="h4" sx={{ fontWeight: '500', color: '#000F38',fontFamily:'Eczar' }}>SubCategory</Typography>
              <Typography sx={{ color: '#000F38', fontSize: '18px',fontFamily: "Eczar, serif",fontWeight:'100' }}>
                Subcategories provide specific topics under each category.
              </Typography>
              <Typography sx={{ fontSize: '20px', fontWeight: 'bold', color: '#E72E3F', marginTop: '10px',fontFamily: "Eczar, serif" }}>
                Total: {subcategoryCount}
              </Typography>
            </Box>

            {/* Q&A Box */}
            <Box sx={{ width: { xs: '90%', sm: '30%' }, border: '1px solid black', padding: '30px', borderRadius: '10px', textAlign: 'center' }}>
              <img src={img3} alt="Q&A" width="25%" style={{ paddingBottom: '20px' }} />
              <Typography variant="h4" sx={{ fontWeight: '500', color: '#000F38',fontFamily: "Eczar, serif" }}>Q & A</Typography>
              <Typography sx={{ color: '#000F38', fontSize: '18px',fontFamily: "Eczar, serif" }}>
                Browse interview questions & answers based on subcategories.
              </Typography>
              <Typography sx={{ fontSize: '20px', fontWeight: 'bold', color: '#E72E3F', marginTop: '10px',fontFamily: "Eczar, serif" }}>
                Total: {questionCount}
              </Typography>
            </Box>

          </Container>
          <section style={{ padding: "50px 0" }}>
        <Container>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <img
                src={image}
                alt="Learning Roadmap"
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "28px", sm: "40px", md: "50px" },
                  fontWeight: 700,
                  mb: 2,
                  letterSpacing: 1,
                }}
              >
                Develop an Enjoyable{" "}
                <span style={{ color: "#E72E3F" }}>Learning</span> Roadmap
              </Typography>
              <Typography sx={{ color: "gray", letterSpacing: 0.5 }}>
                Make your learning roadmap to prepare for various fields with
                Our Interview Portal.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </section>
          <Footer/>
        </>
      )}

    </div>
  )
}

export default Home
