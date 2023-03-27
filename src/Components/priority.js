// import React, { useState, useEffect } from "react";

// function Priority(props) {
//   let key = JSON.parse(localStorage.getItem('key'));
//     let secret = JSON.parse(localStorage.getItem('secret'));
   
//   const [priorityOptions, setPriorityOptions] = useState([]);
//   const [selectedValue, setSelectedValue] = useState("");

//   useEffect(() => {
//     fetch(
//       "https://clients.smartysoft.in/api/method/professional.api.get_priority",
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `token ${key}:${secret}`
//         }
//       }
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         setPriorityOptions(data.message);
//         setSelectedValue(props.value);
//       });
//   }, [props.value]);

//   const handleChange = (e) => {
//     const value = e.target.value;
//     setSelectedValue(value);
//     props.onChange(value);
//   };

//   return (
//     <div className="dropdown" style={{ marginTop: "10px", marginLeft: "5px" }}>
//       <select
//         style={{ width: "220px", height: "45px", borderRadius: "5px" }}
//         className="dropbtn"
//         value={selectedValue}
//         onChange={handleChange}
//       >
//         <option value="">Priority</option>
//         {priorityOptions.map((option) => (
//           <option key={option} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

// export default Priority;


import React, { useState, useEffect } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'; 
function Priority(props) {
  let key = JSON.parse(localStorage.getItem('key'));
  let secret = JSON.parse(localStorage.getItem('secret'));
   
  const [priority, setPriority] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState("");

  const PriorityData = async () => {  
    const result = await fetch(
      "https://clients.smartysoft.in/api/method/professional.api.get_priority",
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `token ${key}:${secret}`
        }
      }
    );
    let response = await result.json();
    setPriority(response.message);
  };

  useEffect(() => {
    PriorityData();
    setSelectedPriority(props.value); // set selectedClient based on the value prop
  }, [props.value]);

  const handleSelect = (event) => {
    const value = event.target.value;
    setSelectedPriority(value);
    props.onChange(value);
  };
  return (
    <FormControl sx={{ m: 1, width:300 }}>
      <InputLabel id="demo-select-small">Priority</InputLabel>
      <Select
 
  value={selectedPriority}
  label="Priority"
  onChange={handleSelect}
>
  
{priority && priority.length > 0 && priority.map((priority) => (
  <MenuItem value={priority}>
    {priority}
  </MenuItem>
))}
</Select>
 </FormControl>
  );
}
export default Priority;
