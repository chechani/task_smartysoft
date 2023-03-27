import React, { useState, useEffect } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'; 
function Client(props) {
  let key = JSON.parse(localStorage.getItem('key'));
  let secret = JSON.parse(localStorage.getItem('secret'));
   
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");

  const clientData = async () => {  
    const result = await fetch(
      "https://clients.smartysoft.in/api/method/professional.api.get_client",
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `token ${key}:${secret}`
        }
      }
    );
    let response = await result.json();
    setClients(response.data);
  };

  useEffect(() => {
    clientData();
    setSelectedClient(props.value); // set selectedClient based on the value prop
  }, [props.value]);

  const handleSelect = (event) => {
    const value = event.target.value;
    setSelectedClient(value);
    props.onChange(value);
  };
  return (
    <FormControl sx={{ m: 1, width:300 }}>
      <InputLabel id="demo-select-small">Client</InputLabel>
      <Select
 
  value={selectedClient}
  label="Client"
  onChange={handleSelect}
>
  <input type="text" placeholder="search..." style={{width:"350px"}}/>
  {clients.map((client) => (
    <MenuItem value={client.name} style={{width:"350px"}}>
      {client.name}
    </MenuItem>
  ))}
</Select>
 </FormControl>
  );
}
export default Client;
