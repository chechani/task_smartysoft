import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { json, useNavigate, useParams} from "react-router-dom";
import { Card } from "@mui/material";
import React, { useState, useEffect } from "react";
import Priority from "./priority";
import Status from "./status";
import Category from "./category";
import Client from "./client";
import "../App.css";
import AllocatedTo from "./Allocated";
import AssistedTo from "./Assisted";


const Update = () => {
  const params = useParams();
  const navigate = useNavigate();
  // const [selectedClient, setSelectedClient] = useState('');
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
    created_by: "",
    allocated_to: "",
    assisted_by: "",
    description: "",
  });

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    let key = JSON.parse(localStorage.getItem('key'));
    let secret = JSON.parse(localStorage.getItem('secret'));
    console.log("hello");
    console.log(params);
    let result = await fetch(
      `https://clients.smartysoft.in/api/method/professional.api.get_single_todo?name=${params.name}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `token ${key}:${secret}`
        },
      }
    );
    // result = await result.json();
    const res = await result.json();
    console.log(res.data[0]);
    setFormState(res.data[0]);

    // console.log(result)
  };


  const UpdateProducts = async (e) => {
    let key = JSON.parse(localStorage.getItem('key'));
    let secret = JSON.parse(localStorage.getItem('secret'));
    e.preventDefault();
    console.log(formState);

    let result = await fetch(
      `https://clients.smartysoft.in/api/method/professional.api.update_todo?${params.name}`,
      {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `token ${key}:${secret}`
        },
        body: JSON.stringify( formState ),
      
      }
    );
    let response = await result.json();
    console.log(response);
  
    if (response) {
      navigate("/");
    }
  };
  const handleChange = (e) => {
    if (e && e.target) {
      const { name, value } = e.target;
      setFormState((prevState) => ({ ...prevState, [name]: value }));
    }
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

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
     <Card sx={{ maxWidth: 800, p: 4 }}>
       <h2 style={{ marginBottom: "20px", textAlign: "center" }}>Update My Todo</h2>
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
  variant="outlined"
  disabled
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
           onClick={UpdateProducts}
         >
           update
         </Button>
       </Box>
     </Card>
   </div>
 );
};

export default Update;
