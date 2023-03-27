import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Link, useParams } from "react-router-dom";

const SubTask = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [sub_tasks, setTasks] = useState([
    {
      task: "",
      status: 0,
      time_taken: "",
      description: "",
    },
  ]);
  const handleTaskChange = (id, value) => {
    const newTasks = sub_tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          task: value,
        };
      }
      return task;
    });
    setTasks(newTasks);
  };
  const handleStatusChange = (id, value) => {
    const newTasks = sub_tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          status: value ? 1 : 0,
        };
      }
      return task;
    });
    console.log(newTasks);
    setTasks(newTasks);
  };
  const handleTimeTakenChange = (id, value) => {
    const newTasks = sub_tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          time_taken: value,
        };
      }
      return task;
    });
    setTasks(newTasks);
  };
  const handledescriptionChange = (id, value) => {
    const newTasks = sub_tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          description: value,
        };
      }
      return task;
    });
    setTasks(newTasks);
  };
  const AddSubtask = async (e) => {
    let key = JSON.parse(localStorage.getItem("key"));
    let secret = JSON.parse(localStorage.getItem("secret"));
    let my_to_do = params.id;
    e.preventDefault();
    console.log(sub_tasks);
    let result;
    try {
      const response = await fetch(
        "https://clients.smartysoft.in/api/method/professional.api.add_sub_task",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${key}:${secret}`,
          },
          body: JSON.stringify({ my_to_do: my_to_do, sub_tasks: sub_tasks }),
        }
      );
      const data = await response.json();
      console.log(data);
      result = true;
      // set result to true if the fetch was successful
      navigate(`/newsubtask/${my_to_do}`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div style={{ marginLeft: "100px", marginTop: "100px" }}>
        <h2>Sub Task</h2>
      </div>
      <div style={{ marginLeft: "100px", marginTop: "5px" }}>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Status</th>
              <th>Time Taken</th>
              <th>description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sub_tasks.map((task) => (
              <tr key={task.my_to_do}>
                <td>
                  <input
                    style={{ backgroundColor: "#f6f6f6" }}
                    type="text"
                    value={task.task}
                    onChange={(e) => handleTaskChange(task.id, e.target.value)}
                  />
                </td>
                <td>
                  <select
                    style={{ backgroundColor: "#f6f6f6" }}
                    value={task.status ? "1" : "0"}
                    onChange={(e) =>
                      handleStatusChange(task.id, e.target.value === "1")
                    }
                  >
                    <option value={1}>1</option>
                    <option value={0}>0</option>
                  </select>
                </td>
                <td>
                  <input
                    style={{ backgroundColor: "#f6f6f6" }}
                    type="text"
                    value={task.time_taken}
                    onChange={(e) =>
                      handleTimeTakenChange(task.id, e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    style={{ backgroundColor: "#f6f6f6" }}
                    type="text"
                    value={task.description}
                    onChange={(e) =>
                      handledescriptionChange(task.id, e.target.value)
                    }
                  />
                </td>
                <td>
                  <Link to={`/subtask/${task.my_to_do}`}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={(e) => AddSubtask(e, task)}
                    >
                      Add SUBTASK
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default SubTask;

// import React from "react";
// import style from "../Components/sub.module.css"

// const SubList = () =>{
//   return (
//   <>
//   <div className={style.app_container}>
//     <table>
//       <thead>
//         <tr>
//           <th>No.</th>
//           <th>Task</th>
//           <th>Status</th>
//           <th>Time-Taken</th>
//         </tr>
//       </thead>
//       <tbody>
//         <td>1</td>
//         <td>Todo Task</td>
//         <td>inprogress</td>
//         <td>3 hr</td>
//       </tbody>
//     </table>

//   </div>
//   </>
//   )
// };

// export default SubList;

// import * as React from "react";
// import { DataGrid } from "@mui/x-data-grid";

// const columns = [
//   { field: "id", headerName: "No.", width: 70 },
//   { field: "Task", headerName: "Task", width: 130 },
//   { field: "Status", headerName: "Status", width: 130 },
//   {
//     field: "TimeTaken",
//     headerName: "Time-Taken",
//     type: "number",
//     width: 90,
//   },
//   {
//     field: "setting",
//     headerName: "Setting",
//     description: "This column has a value getter and is not sortable.",
//     sortable: false,
//     width: 160,
//   },
// ];

// export default function SubList() {
//   const [rows, setRows] = React.useState([
//     { id: 1, Task: "Task 1", Status: "Pending", TimeTaken: 2 },
//   ]);

//   const handleAddRow = () => {
//     const newRows = [
//       ...rows,
//       { id: rows.length + 1, Task: "", Status: "", TimeTaken: 0 },
//     ];
//     setRows(newRows);
//   };

//   return (
//     <>
//       <div>
//         <h2>Sub Task</h2>
//       </div>
//       <div style={{ height: "calc(100vh - 120px)", width: "100%" }}>
//         <button onClick={handleAddRow}>Add Row</button>
//         <DataGrid rows={rows} columns={columns} checkboxSelection />
//       </div>
//     </>
//   );
// }

// import * as React from "react";
// import Box from "@mui/material/Box";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import Checkbox from "@mui/material/Checkbox";

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Donut", 452, 25.0, 51, 4.9),
//   createData("Eclair", 262, 16.0, 24, 6.0),
// ];

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === "desc"
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// export default function SubList() {
//   const [order, setOrder] = React.useState("asc");
//   const [orderBy, setOrderBy] = React.useState("calories");
//   const [selected, setSelected] = React.useState([]);
//   const [page, setPage] = React.useState(0);
//   const [dense, setDense] = React.useState(false);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);

//   const handleClick = (event, name) => {
//     const selectedIndex = selected.indexOf(name);
//     let newSelected = [];
//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, name);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1)
//       );
//     }

//     setSelected(newSelected);
//   };
//   const isSelected = (name) => selected.indexOf(name) !== -1;

//   return (
//   <>
//   <div>
//     <h2>Sub Task</h2>
//   </div>
//     <Box sx={{ width: "100%" }}>
//       <Paper sx={{ width: "100%", mb: 2 }}>
//         <TableContainer>
//           <Table
//             sx={{ minWidth: 750 }}
//             aria-labelledby="tableTitle"
//             size={dense ? "small" : "medium"}
//           >
//             <TableHead>
//               <TableRow>
//                 <TableCell>Task</TableCell>
//                 <TableCell align="left">NO.</TableCell>
//                 <TableCell align="left">Task</TableCell>
//                 <TableCell align="left">Status</TableCell>
//                 <TableCell align="left">TimeTaken</TableCell>
//                 <TableCell align="right">Setting</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {stableSort(rows, getComparator(order, orderBy))
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row, index) => {
//                   const isItemSelected = isSelected(row.name);
//                   const labelId = `enhanced-table-checkbox-${index}`;

//                   return (
//                     <TableRow
//                       hover
//                       onClick={(event) => handleClick(event, row.name)}
//                       role="checkbox"
//                       aria-checked={isItemSelected}
//                       tabIndex={-1}
//                       key={row.name}
//                       selected={isItemSelected}
//                     >
//                       <TableCell padding="checkbox">
//                         <Checkbox color="primary" checked={isItemSelected}  inputProps={{"aria-labelledby": labelId,  }}
//                         />
//                       </TableCell>
//                       <TableCell align="left">{row.name}</TableCell>
//                       <TableCell align="left">{row.calories}</TableCell>
//                       <TableCell padding="checkbox" align="left">
//                         <Checkbox
//                           color="primary"
//                           checked={isItemSelected}
//                           inputProps={{
//                             "aria-labelledby": labelId,
//                           }}
//                         />
//                       </TableCell>
//                       <TableCell align="left">{row.fat}</TableCell>
//                       <TableCell align="right">{row.fat}</TableCell>
//                     </TableRow>
//                   );
//                 })}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Paper>
//     </Box>
//     </>
//   );
// }
