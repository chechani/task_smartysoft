import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Button, Card } from "@mui/material";
import { useState } from "react";
import { TextField } from '@material-ui/core';

import { CardContent, Typography, Grid, Box, IconButton } from "@mui/material";
const ProductList = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredProducts, setFilteredProducts] = React.useState([]);
  const [Products, setProducts] = React.useState([]);
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 15,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };
  const getdata = async () => {
    let key = JSON.parse(localStorage.getItem("key"));
    let secret = JSON.parse(localStorage.getItem("secret"));

    const result = await fetch(
      "https://clients.smartysoft.in/api/method/professional.api.get_my_todo",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${key}:${secret}`,
        },
      }
    );
    const res = await result.json();
    console.log(res.data);
    setProducts(res.data);
  };

  useEffect(() => {
    getdata();
  }, []);
  return (
    <>
      <div className="product-list" style={{ marginLeft: "65px" }}>
        <div style={{ display: "inline" }}>
          <div
            style={{ float: "right", marginRight: "1px", marginTop: "24px" }}
          >
            <Link style={{ textDecoration: "none" }} to="/add">
              <Button variant="contained">Add Task</Button>
            </Link>
          </div>
        </div>
        {/* <TextField style={{marginTop:"30px"}}
          label="Search"
          variant="outlined"
          value={searchValue}
          onChange={handleSearch}
         
        /> */}
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {/* {filteredProducts.length ? (
  filteredProducts.map((product) => ( */}

            {Products.length ? (
              Products.map((product) => (
                <Grid item key={product.name} xs={12} sm={6} md={4}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Subject_matter: {product.subject_matter}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Brief_description: {product.brief_description}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        completed: {product.completed}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Creation_date: {product.creation_date}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        target_date: {product.target_date}
                      </Typography>
                      {/* <Typography variant="body1" color="text.secondary">
                        Created_by: {product.created_by}
                      </Typography> */}
                      <Typography variant="body1" color="text.secondary">
                        Allocated_to: {product.allocated_to}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Assisted_by: {product.assisted_by}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Description:{product.description}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        category: {product.category}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Priority: {product.Priority}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Status: {product.status}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Client: {product.client}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        l
                        <Link to={`/newsubtask/${product.name}`}>
                          {" "}
                          <Button
                            variant="contained"
                            style={{ float: "left", marginTop: "10px" }}
                          >
                            SubTask
                          </Button>
                        </Link>
                      </Typography>
                    </CardContent>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <IconButton
                        aria-label="edit"
                        color="primary"
                        component={Link}
                        to={`/update/${product.name}`}
                      >
                        <EditIcon />
                      </IconButton>
                    </Box>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="subtitle1">No Products Found</Typography>
            )}
          </Grid>
        </Box>
      </div>
    </>
  );
};
export default ProductList;

// const handleSearch = (event) => {
//   const value = event.target.value;
//   setSearchValue(value);
//   const filtered = Products.filter((product) =>
//     product.subject_matter.toLowerCase().includes(value.toLowerCase())
//   );
//   setFilteredProducts(filtered);
// };

{
  /* <div>
            <TextField
              margin="normal"
              style={{
                width: "500px",
               marginTop:"20px",
                
                borderRadius: "6px",
                border: "2px solid skyblue",
              }}
              placeholder="Search MyTodo..."
              value={searchValue}
              onChange={handleSearch}
            />
          </div> */
}

{
  /* <Card sx={{ width:1500, ml:2}}>
<TableContainer component={Paper}>
  <Table sx={{ minWidth: 1000 }} aria-label="customized table">
    <TableHead>
      <TableRow>
        <StyledTableCell align="center">subject_matter</StyledTableCell>
        <StyledTableCell align="center">brief_description</StyledTableCell>
        <StyledTableCell align="center">completed</StyledTableCell>
        <StyledTableCell align="center">category</StyledTableCell>
        <StyledTableCell align="center">client</StyledTableCell>
        <StyledTableCell align="center">Priority</StyledTableCell>
        <StyledTableCell align="center">Status</StyledTableCell>
        <StyledTableCell align="center">creation_date</StyledTableCell>
        <StyledTableCell align="center">target_date</StyledTableCell>
        <StyledTableCell align="center">created_by</StyledTableCell>
        <StyledTableCell align="center">allocated_to</StyledTableCell>
        <StyledTableCell align="center">assisted_by</StyledTableCell>
        <StyledTableCell align="center">description</StyledTableCell>
      </TableRow>
    </TableHead>
    <TableBody>
{Products.length ? (
Products.map((row) => (
<StyledTableRow key={row.name}>
  <StyledTableCell align="center">{row.subject_matter}</StyledTableCell>
  <StyledTableCell align="center">{row.description}</StyledTableCell>
  <StyledTableCell align="center">{row.completed}</StyledTableCell>
  <StyledTableCell align="center">{row.category}</StyledTableCell>
  <StyledTableCell align="center">{row.client}</StyledTableCell>
  <StyledTableCell align="center">{row.Priority}</StyledTableCell>
  <StyledTableCell align="center">{row.Status}</StyledTableCell>
  <StyledTableCell align="center">{row.creation_date}</StyledTableCell>
  <StyledTableCell align="center">{row.target_date}</StyledTableCell>
  <StyledTableCell align="center">{row.created_by}</StyledTableCell>
  <StyledTableCell align="center">{row.allocated_to}</StyledTableCell>
  <StyledTableCell align="center">{row.assisted_by}</StyledTableCell>
  <StyledTableCell align="center">{row.description}</StyledTableCell>
  <StyledTableCell align="center">
    <Link to={`/update/${row.name}`}>
      <EditIcon sx={{ mr: 1 }} color="primary" />
    </Link>
  </StyledTableCell>
</StyledTableRow>
))
) : (
<StyledTableRow>
<StyledTableCell align="center" colSpan={17}>
  No Products Found
</StyledTableCell>
</StyledTableRow>
)}
</TableBody>
  </Table>
</TableContainer>
</Card> */
}

// import React from "react";
// import { Link } from "react-router-dom";
// import TextField from "@mui/material/TextField";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import { styled } from "@mui/material/styles";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { Card } from "@mui/material";

// const ProductList = () => {

//   const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     [`&.${tableCellClasses.head}`]: {
//       backgroundColor: theme.palette.common.black,
//       color: theme.palette.common.white,
//     },
//     [`&.${tableCellClasses.body}`]: {
//       fontSize: 15,
//     },
//   }));

//   const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     "&:nth-of-type(odd)": {
//       backgroundColor: theme.palette.action.hover,
//     },
//     // hide last border
//     "&:last-child td, &:last-child th": {
//       border: 0,
//     },
//   }));

//   const [Products, setProducts] = React.useState([]);

//   React.useEffect(() => {
//     getProducts();
//   }, []);

//   const getProducts = async () => {
//     let result = await fetch("http://localhost:5000/products");
//     result = await result.json();
//     setProducts(result);
//   };

//   const deleteProduct = async (id) => {
//     let result = await fetch(`http://localhost:5000/product/${id}`, {
//       method: "Delete",
//     });
//     result = await result.json();
//     if (result) {
//       getProducts();
//     }
//   };

//   const searchHandle = async (event) => {
//     let key = event.target.value;
//     if (key) {
//       let result = await fetch(`http://localhost:5000/search/${key}`);
//       result = await result.json();
//       if (result) {
//         setProducts(result);
//       } else {
//         getProducts();
//       }
//     }
//   };

//   return (
//     <div className="product-list">
//       <TextField
//         margin="normal"
//         style={{
//         width: "350px",
//         marginBottom:"20px",
//         marginTop:"-10px",
//         borderRadius:"6px",
//         border:"2px solid skyblue"
//         }}
//         placeholder="Search Product..."
//         onChange={searchHandle}
//       />
//       <Card sx={{ maxWidth: 1250, ml:2}}>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 700 }} aria-label="customized table">
//           <TableHead>
//             <TableRow>
//               <StyledTableCell align="center">Name</StyledTableCell>
//               <StyledTableCell align="center">Price</StyledTableCell>
//               <StyledTableCell align="center">Category</StyledTableCell>
//               <StyledTableCell align="center">Company</StyledTableCell>
//               <StyledTableCell align="center">Operations</StyledTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//           {Products.length ? (
//   Products.map((row, index) => (
//     <StyledTableRow key={index + 1}>
//       <StyledTableCell align="center">{row.name}</StyledTableCell>
//       <StyledTableCell align="center">{row.price}</StyledTableCell>
//       <StyledTableCell align="center">{row.category}</StyledTableCell>
//       <StyledTableCell align="center">{row.company}</StyledTableCell>
//       <StyledTableCell align="center">
//         <Link to={`/update/${row._id}`}>
//           <   sx={{ mr: 1 }} color="primary" />
//         </Link>
//         <DeleteIcon color="error" onClick={() => deleteProduct(row._id)} />
//       </StyledTableCell>
//     </StyledTableRow>
//   ))
// ) : (
//   <StyledTableRow>
//     <StyledTableCell align="center" colSpan={5}>
//       No Products Found
//     </StyledTableCell>
//   </StyledTableRow>
// )}

//           </TableBody>
//         </Table>
//       </TableContainer>
//       </Card>
//     </div>
//   );
// };

// export default ProductList;
