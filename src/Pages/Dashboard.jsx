import React from 'react'
import ResponsiveDrawer from '../Component/Drawer'
import { useState,useEffect } from 'react';
// import BasicCard from '../Component/Card'
import { Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress, } from '@mui/material'
  import CategoryIcon from "@mui/icons-material/Category";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { useNavigate } from "react-router-dom";

// import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
function Dashboard() {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
      // return;
    }
    const categoryCount = parseInt(localStorage.getItem("category")) || 0;
    const subcategoryCount = parseInt(localStorage.getItem("subcategory")) || 0;
    const questionCount = parseInt(localStorage.getItem("question")) || 0;

    const updatedCardData = [
      {
        icon: <CategoryIcon />,
        title: "Total Categories",
        value: categoryCount,
        color: "dark",
        bgColor: "#E3F2FD",
      },
      {
        icon: <SubdirectoryArrowRightIcon />,
        title: "Total Subcategories",
        value: subcategoryCount,
        color: "dark",
        bgColor: "#E8F5E9",
      },
      {
        icon: <QuestionMarkIcon />,
        title: "Total Q/A",
        value: questionCount,
        color: "dark",
        bgColor: "#FFF3E0",
      },
    ];

    setCardData(updatedCardData);
    setLoading(false); // Data is ready, stop loading
  }, [token, navigate]);

  // const pieChartData = cardData.map((item) => ({
  //   name: item.title,
  //   value: item.value,
  // }));
  return (
    <ResponsiveDrawer >
      
      <Box sx={{ flexGrow: 1, padding: '5px' }}>
        {/* Loading Spinner */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Card Section */}
            <Grid container spacing={2}>
              {cardData.map((card, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      padding: 2,
                      backgroundColor: card.bgColor,
                      boxShadow: 2,
                      borderRadius: 2,
                    }}
                  >
                    <Box sx={{ marginRight: 2 }}>{card.icon}</Box>
                    <CardContent>
                      <Typography variant="h6">{card.title}</Typography>
                      <Typography variant="h4" fontWeight="bold">
                        {card.value}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

           
          </>
        )}
      </Box>
      
    </ResponsiveDrawer>
  )
}

export default Dashboard;
