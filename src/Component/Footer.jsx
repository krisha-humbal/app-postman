import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Container, Grid } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#f8f9fa" }}>
      <Box sx={{ padding: "15px" }}>
        <Container>
          <Grid container spacing={4}>
            {/* Left Section */}
            <Grid item xs={12} md={6}>
              <Typography
                component="a"
                href="#"
                sx={{
                  fontSize: { xs: "24px", md: "32px" },
                  color: "#000F38",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  display: "inline-block",
                  mb: 2,
                  textDecoration: "none",
                }}
              >
                QuickStart
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "14px", sm: "15px" },
                  color: "gray",
                  lineHeight: 1.8,
                }}
              >
                QuickStart is an online practice platform <br />
                that has been operating since 2024 until now.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mt: 3,
                  "& .icon": {
                    fontSize: "28px",
                    color: "#000F38",
                    cursor: "pointer",
                    transition: "transform 0.2s",
                  },
                  "& .icon:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              >
                <a href="#"><TwitterIcon className="icon" /></a>
                <a href="#"><FacebookIcon className="icon" /></a>
                <a href="#"><LinkedInIcon className="icon" /></a>
                <a href="#"><GitHubIcon className="icon" /></a>
              </Box>
            </Grid>

            {/* Right Section */}
            
          </Grid>
        </Container>
      </Box>

      {/* Bottom Section */}
      <Box sx={{ textAlign: "center", py: 3, backgroundColor: "#E72E3F", color: "#fff", padding: "15px" }}>
        <Typography
          sx={{
            fontSize: { xs: "14px", sm: "16px" },
            mb: 1,
          }}
        >
          © <strong>QuickStart</strong> <span>All Rights Reserved</span>
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "14px", sm: "16px" },
          }}
        >
          Designed by{" "}
          <a href="/" style={{ color: "#eef7fd", fontSize:"20px", textDecoration: "none" }}>
            Krisha Humbal
          </a>
        </Typography>
      </Box>
    </footer>
  );
};

export default Footer;