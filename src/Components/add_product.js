import { useState } from "react";
import { Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Priority from "./priority";
import Status from "./status";
import Category from "./category";
import Client from "./client";

import "../App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Button, TextField } from "@mui/material";
import AllocatedTo from "./Allocated";
import AssistedTo from "./Assisted";
const theme = createTheme();
const AddProduct = () => {
  const [formState, setFormState] = useState({
    subject_matter: "",
    brief_description: "",
    completed: "",
    category: "",
    client: "",
    priority: "",
    status: "",
    creation_date: "",
    target_date: "",
    allocated_to: "",
    assisted_by: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleChangePriority = (priority) => {
    setFormState((prevState) => ({ ...prevState, priority: priority }));
  };

  const handleChangeCategory = (category) => {
    setFormState((prevState) => ({ ...prevState, category: category }));
  };

  const handleChangeStatus = (status) => {
    setFormState((prevState) => ({ ...prevState, status: status }));
  };

  const handleChangeClient = (client) => {
    setFormState((prevState) => ({ ...prevState, client: client }));
  };
  const handleChangeAllocated = (allocated_to) => {
    setFormState((prevState) => ({ ...prevState, allocated_to: allocated_to }));
  };
  const handleChangeAssisted = (assisted_by) => {
    setFormState((prevState) => ({ ...prevState, assisted_by: assisted_by }));
  };

  const AdddProduct = async (e) => {
    let key = JSON.parse(localStorage.getItem("key"));
    let secret = JSON.parse(localStorage.getItem("secret"));
    e.preventDefault();
    let result;
    try {
      const response = await fetch(
        "https://clients.smartysoft.in/api/method/professional.api.create_todo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${key}:${secret}`,
          },
          body: JSON.stringify(formState),
        }
      );
      let data = await response.json();
      console.log(data);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
     <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
      <Card sx={{ maxWidth: 800, p: 4 }}>
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>Add My Todo</h2>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              label="Subject Matter"
              name="subject_matter"
              value={formState.subject_matter}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              multiline
              rows={3}
              name="brief_description"
              type="text"
              label="Brief Description"
              value={formState.brief_description}
              onChange={handleChange}
              variant="outlined"
              style={{ marginTop: "20px" }}
            />
            <TextField
              id="outlined-number"
              label="Completed"
              name="completed"
              value={formState.completed}
              onChange={handleChange}
              variant="outlined"
              style={{ marginTop: "20px" }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
            <TextField
              id="creation-date"
              label="Creation Date"
              type="datetime-local"
              name="creation_date"
              value={formState.creation_date}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />

            <TextField
              id="target-date"
              label="Target Date"
              type="date"
              name="target_date"
              value={formState.target_date}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </div>

          <TextField
            multiline
            rows={3}
            style={{ marginTop: "20px" }}
            id="outlined-number"
            type="text"
            name="description"
            label="Description"
            value={formState.description}
            onChange={handleChange}
            variant="outlined"
          />

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
            <AllocatedTo
              value={formState.allocated_to}
              onChange={handleChangeAllocated}
            />
            <AssistedTo
              value={formState.assisted_by}
              onChange={handleChangeAssisted}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
            <Category
              value={formState.category}
              onChange={handleChangeCategory}
            />
            <Priority
              value={formState.priority}
              onChange={handleChangePriority}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
            <Status value={formState.status} onChange={handleChangeStatus} />
            <Client value={formState.client} onChange={handleChangeClient} />
          </div>
  
          <Button
            style={{ width: "50%", marginTop: "30px" ,marginLeft:"150px"}}
            type="submit"
            variant="contained"
            color="primary"
            onClick={AdddProduct}
          >
            Submit
          </Button>
        </Box>
      </Card>
    </div>
  );
  
};

export default AddProduct;

{
  /* <TextField
              id="outlined-number"
              type="text"
              label="Assisted By"
              name="assisted_by"
              value={formState.assisted_by}
              onChange={handleChange}
            /> */
}

{
  /* <TextField
              id="outlined-number"
              type="text"
              label="Allocated To"
              name="allocated_to"
              value={formState.allocated_to}
              onChange={handleChange}
            /> */
}
