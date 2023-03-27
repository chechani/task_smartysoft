// import React, { useState, useEffect } from 'react';

// function Category(props) {
//   let key = JSON.parse(localStorage.getItem('key'));
//     let secret = JSON.parse(localStorage.getItem('secret'));
    
//   const [CategoryOptions, setCategoryOptions] = useState([]);
//   const [selectedValue, setSelectedValue] = useState('');

//   useEffect(() => {
//     fetch('https://clients.smartysoft.in/api/method/professional.api.get_category',
//     {
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `token ${key}:${secret}`
//       }
//     }
//     )
//       .then(response => response.json())
//       .then(data => {
//         setCategoryOptions(data.message);
//         setSelectedValue(props.value);
//       });
//   }, [props.value]);

//   const handleChange = (e) => {
//     const value = e.target.value;
//     setSelectedValue(value);
//     props.onChange(value);
//   }

//   return (
//     <div className='dropdown'style={{marginTop:"15px",marginLeft:"5px"}}>
//       <select style={{width:"220px",height:"45px",borderRadius:"5px"}} className='dropbtn' value={selectedValue} onChange={handleChange}>
//         <option value="">Category</option>
//         {CategoryOptions.map(option => (
//           <option key={option} value={option}>{option}</option>
//         ))}
//       </select>
//     </div>
//   );
// }

// export default Category;


import React, { useState, useEffect } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'; 
function Category(props) {
  let key = JSON.parse(localStorage.getItem('key'));
  let secret = JSON.parse(localStorage.getItem('secret'));
   
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const categoryData = async () => {  
    const result = await fetch( 
      "https://clients.smartysoft.in/api/method/professional.api.get_category",
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `token ${key}:${secret}`
        }
      }
    );
    let response = await result.json();
    setCategory(response.message);
    console.log(response.message)
   
  };
  
  useEffect(() => {
    categoryData();
    setSelectedCategory(props.value);
  }, [props.value]);
  
  const handleSelect = (event) => {
    const value = event.target.value;
    setSelectedCategory(value);
    props.onChange(value);
  };
  return (
    <FormControl sx={{ m: 1, width:300 }}>
    <InputLabel id="demo-select-small">category</InputLabel>
    <Select
      value={selectedCategory}
      label="Category"
      onChange={handleSelect}
    >
      {category && category.length > 0 && category.map((category) => (
        <MenuItem  value={category}>
          {category}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
  
  );
}
export default Category;