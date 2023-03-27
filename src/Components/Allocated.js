
// import React, { useState, useEffect } from "react";
// function AllocatedTo(props) {
//   let key = JSON.parse(localStorage.getItem('key'));
//     let secret = JSON.parse(localStorage.getItem('secret'));
 
//   const [Allocated, setAllocated] = useState([]);
//   const [selectedAllocated, setSelectedAllocated] = useState("");

//   const AllocatedData = async () => {  
//     const result = await fetch(
//       "https://clients.smartysoft.in/api/method/professional.api.get_user",
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `token ${key}:${secret}`
//         }
//       }
//     );
//     let response = await result.json();
//     // console.log(response.data);
//     setAllocated(response.data);
 
   
//   };

//   useEffect(() => {
//     AllocatedData();
//   }, []);

//   const handleSelect = (event) => {
//     const value = event.target.value;
//     setSelectedAllocated(event.target.value);
//     props.onChange(value);
  

//   };

//   return (
//     <select
//     style={{
//       width: "220px",
//       height: "45px",
//       borderRadius: "5px",
//       marginTop: "15px",
//       marginLeft: "5px"
//     }}
//     onChange={handleSelect}
//     value={selectedAllocated}
//   >
//     <option value="">Allocated To</option>
//     {Allocated.map((Allocated) => (
//       <option key={Allocated.id} value={Allocated.id}>
//         {Allocated.name}
//       </option>
//     ))}
//   </select>
  
//   );
// }

// export default AllocatedTo;



import React, { useState, useEffect } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'; 
function AllocatedTo(props) {
  let key = JSON.parse(localStorage.getItem('key'));
  let secret = JSON.parse(localStorage.getItem('secret'));
   
  const [Allocated, setAllocated] = useState([]);
  const [selectedAllocated, setSelectedAllocated] = useState("");

  const AllocatedData = async () => {  
    const result = await fetch(
      "https://clients.smartysoft.in/api/method/professional.api.get_user",
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `token ${key}:${secret}`
        }
      }
    );
    let response = await result.json();
    setAllocated(response.data);
  };

  useEffect(() => {
    AllocatedData();
    setSelectedAllocated(props.value); // set selectedClient based on the value prop
  }, [props.value]);

  const handleSelect = (event) => {
    const value = event.target.value;
    setSelectedAllocated(value);
    props.onChange(value);
  };
  return (
    <FormControl sx={{ m: 1, width:300 }}>
      <InputLabel id="demo-select-small">AllocatedTo</InputLabel>
      <Select
 
  value={selectedAllocated}
  label="Allocated"
  onChange={handleSelect}
>
  {Allocated.map((Allocated) => (
    <MenuItem value={Allocated.name}>
      {Allocated.name}
    </MenuItem>
  ))}
</Select>
 </FormControl>
  );
}
export default AllocatedTo;