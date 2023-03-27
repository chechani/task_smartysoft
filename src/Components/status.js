// import React, { useState, useEffect } from "react";

// function Status(props) {
//   let key = JSON.parse(localStorage.getItem('key'));
//     let secret = JSON.parse(localStorage.getItem('secret'));
   
//   const [statusOptions, setStatusOptions] = useState([]);
//   const [selectedValue, setSelectedValue] = useState("");

//   useEffect(() => {
//     fetch(
//       "https://clients.smartysoft.in/api/method/professional.api.get_status",
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `token ${key}:${secret}`
//         }
//       }
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         setStatusOptions(data.message);
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
//         <option value="">Status</option>
//         {statusOptions.map((option) => (
//           <option key={option} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

// export default Status;


import React, { useState, useEffect } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'; 
function Status(props) {
  let key = JSON.parse(localStorage.getItem('key'));
  let secret = JSON.parse(localStorage.getItem('secret'));
   
  const [Status, setStatus] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");

  const statusData = async () => {  
    const result = await fetch(
      "https://clients.smartysoft.in/api/method/professional.api.get_status",
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `token ${key}:${secret}`
        }
      }
    );
    let response = await result.json();
    setStatus(response.message);
  };

  useEffect(() => {
    statusData();
    setSelectedStatus(props.value); // set selectedClient based on the value prop
  }, [props.value]);

  const handleSelect = (event) => {
    const value = event.target.value;
    setSelectedStatus(value);
    props.onChange(value);
  };
  return (
    <FormControl sx={{ m: 1, width:300 }}>
      <InputLabel id="demo-select-small">status</InputLabel>
      <Select
 
  value={selectedStatus}
  label="status"
  onChange={handleSelect}
>
{Status && Status.length > 0 && Status.map((Status) => (
  <MenuItem  value={Status}>
    {Status}
  </MenuItem>
))}
</Select>
 </FormControl>
  );
}
export default Status;

