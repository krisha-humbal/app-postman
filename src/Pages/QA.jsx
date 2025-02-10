import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  TableCell,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import TableComponent from "../Component/TableComponent";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Drawer from "../Component/Drawer";

const QA = () => {
  const token = localStorage.getItem("Token");
  const [qaData, setQAData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentQA, setCurrentQA] = useState({
    id: null,
    questions: "",
    answer: "",
    subcategoryID: "",
  });
  const [loading, setLoading] = useState(true);

  const tableHeaders = [
    "Index",
    "Questions",
    "Answer",
    "Subcategory",
    "Category",
    "Delete",
    "Update",
  ];

  const fetchQAData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://interviewback-ucb4.onrender.com/questions/", {
        headers: { Authorization: token },
      });

      const fetchQAData = res.data.data;
      setQAData(fetchQAData);
      localStorage.setItem("question",fetchQAData.length)
    } catch (error) {
      console.error("Error fetching Q&A data:", error);
      toast.error("Failed to fetch Q&A data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://interviewback-ucb4.onrender.com/category/", {
        headers: { Authorization: token },
      });
      setCategories(res.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories.");
    }
  };

  const fetchSubcategories = async () => {
    try {
      const res = await axios.get("https://interviewback-ucb4.onrender.com/subcategory/", {
        headers: { Authorization: token },
      });
      setSubcategories(res.data.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      toast.error("Failed to fetch subcategories.");
    }
  };

  const openDialog = (qa = null) => {
    if (qa) {
      setCurrentQA({
        id: qa._id,
        questions: qa.questions,
        answer: qa.answer,
        subcategoryID: qa.subcategoryID?._id || "",
      });
    } else {
      setCurrentQA({
        id: null,
        questions: "",
        answer: "",
        subcategoryID: "",
      });
    }
    setEditMode(!!qa);
    setDialogOpen(true);
  };
 
  const closeDialog = () => {
    setDialogOpen(false);
    setCurrentQA({ id: null, questions: "", answer: "", subcategoryID: "" });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        questions: currentQA.questions,
        answer: currentQA.answer,
        subcategoryID: currentQA.subcategoryID,
      };
  
      if (editMode) {
        await axios.patch(
          `https://interviewback-ucb4.onrender.com/questions/${currentQA.id}`,
          payload,
          { headers: { Authorization: token } }
        );
        toast.success("Q&A updated successfully!");
      } else {
        await axios.post(
          "https://interviewback-ucb4.onrender.com/questions/create",
          payload,
          { headers: { Authorization: token } }
        );
        toast.success("Q&A added successfully!");
      }
  
      fetchQAData();
      closeDialog();
    } catch (error) {
      console.error("Error submitting Q&A:", error);
      toast.error("Failed to submit Q&A.");
    }
  };
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://interviewback-ucb4.onrender.com/questions/${id}`, {
        headers: { Authorization: token },
      });
      toast.success("Q&A deleted successfully!");
      fetchQAData();
    } catch (error) {
      console.error("Error deleting Q&A:", error);
      toast.error("Failed to delete Q&A.");
    }
  };

  const filteredQAData = qaData.filter(
    (item) =>
      item.questions.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase())
  ).filter(
    (item) => item.subcategoryID?.status === "on" 
  );

  useEffect(() => {
    fetchQAData();
    fetchCategories();
    fetchSubcategories();
  }, []);

  return (
    <Drawer>
      <Box sx={{ padding: 2 }}>
        <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
          <Grid item xs={12} sm={8} md={10}>
            <TextField
              label="Search Q&A"
              variant="outlined"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              fullWidth
              onClick={() => openDialog()}
              sx={{ backgroundColor: "black"}}
            >
              Add Q&A
            </Button>
          </Grid>
        </Grid>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableComponent
            TableHeader={tableHeaders}
            TableData={filteredQAData}
            renderRow={(row, index) => (
              <>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{row.questions}</TableCell>
                <TableCell align="center">{row.answer}</TableCell>
                <TableCell align="center">{row.subcategoryID?.subCategoryname || "N/A"}</TableCell>
                <TableCell align="center">{row.subcategoryID?.categoryID?.categoryName}</TableCell>
                <TableCell align="center">
                  <Button variant="contained" color="error" onClick={() => handleDelete(row._id)}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => openDialog(row)}
                  >
                    <EditIcon />
                  </Button>
                </TableCell>
              </>
            )}
          />
        )}
      </Box>

      <Dialog open={dialogOpen} onClose={closeDialog}>
        <DialogTitle>{editMode ? "Edit Q&A" : "Add Q&A"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Question"
            value={currentQA.questions}
            onChange={(e) =>
              setCurrentQA((prev) => ({ ...prev, questions: e.target.value }))
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Answer"
            value={currentQA.answer}
            onChange={(e) =>
              setCurrentQA((prev) => ({ ...prev, answer: e.target.value }))
            }
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Subcategory</InputLabel>
            <Select
              value={currentQA.subcategoryID}
              onChange={(e) =>
                setCurrentQA((prev) => ({ ...prev, subcategoryID: e.target.value }))
              }
            >
              
              {subcategories
                .filter((sub) => sub.status === "on")
                .map((sub) => (
                  <MenuItem key={sub._id} value={sub._id}>
                    {sub.subCategoryname}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </Drawer>
  );
};

export default QA;