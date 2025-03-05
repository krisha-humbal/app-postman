import React, { useEffect, useState } from "react";
import Drawer from "../Component/Drawer"
import TextField from "../Component/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Switch, TableCell, MenuItem, Select, InputLabel, FormControl, Grid, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import TableComponent from "../Component/TableComponent";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme, useMediaQuery } from "@mui/material";
import * as Yup from "yup";

const SubCategory = () => {
  const token = localStorage.getItem("Token");
  const [subcategory, setSubCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [eid, setEid] = useState(null);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const TableHeader = ["Index", "SubCategory Name", "Category Name", "Status", "Delete", "Update"];

  const formik = useFormik({
    initialValues: {
      subCategoryname: "",
      categoryID: "",
    },
    validationSchema: Yup.object({
      subCategoryname: Yup.string().required("Subcategory Name is required!"),
      categoryID: Yup.string().required("Category is required!"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        let res;
        if (eid) {
          res = await axios.patch(
            `https://interviewback-ucb4.onrender.com/subcategory/${eid}`,
            values,
            { headers: { Authorization: token } }
          );
        } else {
          res = await axios.post(
            "https://interviewback-ucb4.onrender.com/subcategory/create",
            values,
            { headers: { Authorization: token } }
          );
        }
        toast.success(res.data.message);
        resetForm();
        setEid(null);
        handleClose();
        dataFetch();
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while saving the subcategory.");
      }
    },
  });


  const dataFetch = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://interviewback-ucb4.onrender.com/subcategory/", {
        headers: { Authorization: token },
      });
      const subcategories = res.data.data; 
      const categoryRes = await axios.get("https://interviewback-ucb4.onrender.com/category/", {
        headers: { Authorization: token },
      });

      const categories = categoryRes.data.data;
      setCategories(categories); 
      const updatedSubcategories = subcategories.map((sub) => {
        const parentCategory = categories.find((cat) => cat._id === sub.categoryID?._id);
        return {
          ...sub,
          status: parentCategory && parentCategory.status === "off" ? "off" : sub.status,
        };
      });

      setSubCategory(updatedSubcategories);
      localStorage.setItem("subcategory", updatedSubcategories.length);
    } catch (error) {
      toast.error("Failed to fetch subcategories.");
    } finally {
      setLoading(false);
    }
  };
  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://interviewback-ucb4.onrender.com/category/", {
        headers: { Authorization: token },
      });
      const activeCategory = res.data.data.filter((cat) => cat.status === "on")
      setCategories(activeCategory);
    } catch (error) {
      toast.error("Failed to fetch categories.");
    }
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);
    try {
      const res = await axios.get(
        `https://interviewback-ucb4.onrender.com/subcategory/?search=${value}`,
        { headers: { Authorization: token } }
      );
      setSubCategory(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const updateData = (id) => {
    setEid(id);
    const dataFind = subcategory.find((el) => el._id === id);
    formik.setValues({
      subCategoryname: dataFind.subCategoryname,
      categoryID: dataFind.categoryID?._id || "",
    });
    handleClickOpen();
  };

  const switchToggle = async (id) => {
    const findData = subcategory.find((el) => el._id === id);
    try {
      await axios.patch(
        `https://interviewback-ucb4.onrender.com/subcategory/${id}`,
        { status: findData.status === "on" ? "off" : "on" },
        { headers: { Authorization: token } }
      );
      dataFetch();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteData = async (id) => {
    try {
      const res = await axios.delete(
        `https://interviewback-ucb4.onrender.com/subcategory/${id}`,
        { headers: { Authorization: token } }
      );
      toast.success(res.data.message);
      dataFetch();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dataFetch();
    fetchCategories();
  }, []);

  return (
    <Drawer>
      <Box sx={{ padding: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={9}>
            <TextField
              fullWidth
              label="Search Subcategory"
              variant="outlined"
              value={search}
              onChange={handleSearch}
            />
          </Grid>
          <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ backgroundColor: "#000F38" }}
              onClick={() => {
                setEid(null);
                formik.resetForm();
                handleClickOpen();
              }}
            >
              Add Subcategory
            </Button>
          </Grid>
        </Grid>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ marginTop: 2, overflowX: "auto" }}>
            <TableComponent
              TableHeader={TableHeader}
              TableData={subcategory}
              renderRow={(row, index) => (
                <>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{row.subCategoryname}</TableCell>
                  <TableCell align="center">{row.categoryID?.categoryName}</TableCell>
                  <TableCell align="center">
                    <Switch
                      checked={row.status === "on"}
                      onChange={() => switchToggle(row._id)}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="contained" color="error" onClick={() => deleteData(row._id)}>
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="contained" color="success" onClick={() => updateData(row._id)}>
                      <EditIcon />
                    </Button>
                  </TableCell>
                </>
              )}
            />
          </Box>
        )}
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={isSmall ? "xs" : "sm"}>
        <DialogTitle>{eid ? "Update Subcategory" : "Add Subcategory"}</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              label="Subcategory Name"
              name="subCategoryname"
              onChange={formik.handleChange}
              value={formik.values.subCategoryname}
              error={formik.touched.subCategoryname && Boolean(formik.errors.subCategoryname)}
              helperText={formik.touched.subCategoryname && formik.errors.subCategoryname}
              sx={{ marginBottom: 2 }}
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="categoryID"
                value={formik.values.categoryID}
                onChange={formik.handleChange}
                error={formik.touched.categoryID && Boolean(formik.errors.categoryID)}
              >
                <MenuItem value="" disabled>Select a Category</MenuItem>
                {categories
                  .filter((cat) => cat.status === "on")
                  .map((cat) => (
                    <MenuItem key={cat._id} value={cat._id}>
                      {cat.categoryName}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" type="submit">
              {eid ? "Update" : "Add"} Subcategory
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <ToastContainer />
    </Drawer>
  );
};

export default SubCategory;    