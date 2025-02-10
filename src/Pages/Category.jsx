
import React, { useEffect, useState } from "react";
import Drawer from "../Component/Drawer";
import TextField from "../Component/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, TableCell, Switch } from "@mui/material";
import { useFormik } from "formik";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import TableComponent from "../Component/TableComponent";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Category = () => {
  const token = localStorage.getItem("Token");
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const TableHeader = ["Index", "Category Name", "Status", "Delete", "Update"];

  const formik = useFormik({
    initialValues: {
      categoryName: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        let res;
        if (editId) {
          // Update category
          res = await axios.patch(
            `https://interviewback-ucb4.onrender.com/category/${editId}`,
            values,
            { headers: { Authorization: token } }
          );
          toast.success("Category updated successfully");
        } else {
          // Create category
          res = await axios.post(
            "https://interviewback-ucb4.onrender.com/category/create",
            values,
            { headers: { Authorization: token } }
          );
          toast.success("Category added successfully");
        }
        resetForm();
        handleClose();
        fetchCategories();
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred");
        console.error(error);
      }
    },
  });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://interviewback-ucb4.onrender.com/category", {
        headers: { Authorization: token },
      });

      const fetchCat = res.data.data;
      setCategories(fetchCat);
      localStorage.setItem("category",fetchCat.length)
    } catch (error) {
      console.error("Error fetching category data:", error);
      toast.error("Failed to fetch category data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);
    try {
      const res = await axios.get(
        `https://interviewback-ucb4.onrender.com/category/?search=${value}`,
        { headers: { Authorization: token } }
      );
      setCategories(res.data.data);
    } catch (error) {
      toast.error("Search failed");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://interviewback-ucb4.onrender.com/category/${id}`,
        { headers: { Authorization: token } }
      );
      toast.success("Category deleted successfully");
      fetchCategories();
    } catch (error) {
      toast.error("Failed to delete category");
      console.error(error);
    }
  };


  const handleUpdate = (id) => {
    const categoryToEdit = categories.find((cat) => cat._id === id);
    setEditId(id);
    formik.setValues(categoryToEdit);
    handleClickOpen();
  };

  // const handleSwitchToggle = async (id) => {
  //   const categoryToToggle = categories.find((cat) => cat._id === id);
  //   const newStatus = categoryToToggle.status === "on" ? "off" : "on";

  //   try {
  //     await axios.patch(
  //       `https://interviewback-ucb4.onrender.com/category/${id}`,
  //       { status: newStatus },
  //       { headers: { Authorization: token } }
  //     );

  //     // After toggling category status, refetch subcategories to update their visibility
  //     await axios.get("https://interviewback-ucb4.onrender.com/subcategory/", {
  //       headers: { Authorization: token },
  //     });
      
  //     fetchCategories(); // Refresh category list as well
  //   } catch (error) {
  //     toast.error("Failed to toggle status");
  //     console.error(error);
  //   }
  // };
  // const handleSwitchToggle = async (id) => {
  //   const categoryToToggle = categories.find((cat) => cat._id === id);
  //   const newStatus = categoryToToggle.status === "on" ? "off" : "on";

  //   try {
  //     await axios.patch(
  //       `https://interviewback-ucb4.onrender.com/category/${id}`,
  //       { status: newStatus },
  //       { headers: { Authorization: token } }
  //     );

      
  //     await axios.get("https://interviewback-ucb4.onrender.com/subcategory/", {
  //       headers: { Authorization: token },
  //     });
      
  //     fetchCategories(); // Refresh category list as well
  //   } catch (error) {
  //     toast.error("Failed to toggle status");
  //     console.error(error);
  //   }
  // };
  const handleSwitchToggle = async (id) => {
    const categoryToToggle = categories.find((cat) => cat._id === id);
    const newStatus = categoryToToggle.status === "on" ? "off" : "on";
  
    try {
      // Update category status
      await axios.patch(
        `https://interviewback-ucb4.onrender.com/category/${id}`,
        { status: newStatus },
        { headers: { Authorization: token } }
      );
  
      // Fetch subcategories related to this category
      const subcategoryRes = await axios.get("https://interviewback-ucb4.onrender.com/subcategory/", {
        headers: { Authorization: token },
      });
  
      const relatedSubcategories = subcategoryRes.data.data.filter(
        (sub) => sub.categoryID?._id === id
      );
  
      // Update status of all related subcategories
      for (const sub of relatedSubcategories) {
        await axios.patch(
          `https://interviewback-ucb4.onrender.com/subcategory/${sub._id}`,
          { status: newStatus },  // Set subcategory status same as category
          { headers: { Authorization: token } }
        );
      }
  
      fetchCategories(); // Refresh category list
    } catch (error) {
      toast.error("Failed to toggle status");
      console.error(error);
    }
  };
  
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Drawer>
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={12} sm={9}>
          <TextField
            label="Search category"
            variant="outlined"
            value={search}
            onChange={handleSearch}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={3} sx={{ display: "flex", alignItems:'center' }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ backgroundColor: "black" }}
            onClick={handleClickOpen}
          >
            Add Category
          </Button>
        </Grid>

        <Grid item xs={12}>
          <TableComponent
            TableHeader={TableHeader}
            TableData={categories}
            renderRow={(row, index) => (
              <>
                <TableCell component="th" scope="row" align="center">
                  {index + 1}
                </TableCell>
                <TableCell align="center">{row.categoryName}</TableCell>
                <TableCell align="center">
                  <Switch
                    checked={row.status === "on"}
                    onClick={() => handleSwitchToggle(row._id,row._id)}
                  />
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    onClick={() => handleDelete(row._id)}
                    sx={{ backgroundColor: "red" }}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    onClick={() => handleUpdate(row._id)}
                    sx={{ backgroundColor: "green" }}
                  >
                    <EditIcon />
                  </Button>
                </TableCell>
              </>
            )}
          />
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{editId ? "Update Category" : "Add Category"}</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              label="Category Name"
              name="categoryName"
              onChange={formik.handleChange}
              value={formik.values.categoryName}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" type="submit">
              {editId ? "Update" : "Add"} Category
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <ToastContainer />
    </Drawer>
  );
};

export default Category;    