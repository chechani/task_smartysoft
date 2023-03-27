
// import React, { useState, useEffect } from "react";
// function AssistedTo(props) {
//   let key = JSON.parse(localStorage.getItem('key'));
//     let secret = JSON.parse(localStorage.getItem('secret'));
//   const [Assisted, SetAssisted] = useState([]);
//   const [selectedAssisted, setSelectedAssisted] = useState("");

//   const AssistedData = async () => {  
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
//     SetAssisted(response.data);
 
   
//   };

//   useEffect(() => {
//     AssistedData();
//   }, []);

//   const handleSelect = (event) => {
//     const value = event.target.value;
//     setSelectedAssisted(event.target.value);
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
//     value={selectedAssisted}
//   >
//     <option value="">Assisted To</option>
//     {Assisted.map((Assisted) => (
//       <option key={Assisted.id} value={Assisted.id}>
//         {Assisted.name}
//       </option>
//     ))}
//   </select>
  
//   );
// }

// export default AssistedTo;




import React, { useState, useEffect } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'; 
function AssistedTo(props) {
  let key = JSON.parse(localStorage.getItem('key'));
  let secret = JSON.parse(localStorage.getItem('secret'));
   
  const [Assisted, SetAssisted] = useState([]);
   const [selectedAssisted, setSelectedAssisted] = useState("");

  const AssistedData = async () => {  
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
    SetAssisted(response.data);
  };

  useEffect(() => {
    AssistedData();
    setSelectedAssisted(props.value); // set selectedClient based on the value prop
  }, [props.value]);

  const handleSelect = (event) => {
    const value = event.target.value;
    setSelectedAssisted(value);
    props.onChange(value);
  };
  return (
    <FormControl sx={{ m: 1, width:300 }}>
      <InputLabel id="demo-select-small">AssistedBy</InputLabel>
      <Select
 
  value={selectedAssisted}
  label="Assisted By"
  onChange={handleSelect}
>
  {Assisted.map((Assisted) => (
    <MenuItem value={Assisted.name}>
      {Assisted.name}
    </MenuItem>
  ))}
</Select>
 </FormControl>
  );
}
export default AssistedTo;