import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { json, useNavigate, useParams } from "react-router-dom";

export default function NewSubTask() {
  const params = useParams();
  const { my_to_do } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formState, setFormState] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [deletedRows, setDeletedRows] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    let key = JSON.parse(localStorage.getItem('key'));
    let secret = JSON.parse(localStorage.getItem('secret'));
    const getDetails = async () => {
      try {
        const response = await fetch(
          `https://smartysoftware.in/api/method/professional.api.get_sub_tasks?my_to_do=${my_to_do}`,
          {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `token ${key}:${secret}`
          },
        }
        );
        console.log(response);
        const data = await response.json();
        const subTasks = data.message;
        setFormState(subTasks);
        setLoading(false);
      } catch (error) {
        console.error(error); // log any errors to the console
        setError(error);
        setLoading(false);
      }
    };
    console.log(my_to_do); // log the my_to_do parameter to the console
    getDetails();
  }, [my_to_do]);
  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };
  const handleEdit = (index) => {
    setEditIndex(index);
  };
  const handleSave = async (index) => {
    let key = JSON.parse(localStorage.getItem('key'));
    let secret = JSON.parse(localStorage.getItem('secret'));
    const updatedRow = {
      ...formState[index],
      task: document.getElementById(`task-${index}`).value,
      description: document.getElementById(`description-${index}`).value,
      time_taken: document.getElementById(`time_taken-${index}`).value,
      status: document.getElementById(`status-${index}`).value,
    };
    const subTaskName = updatedRow.name;

    try {
      const response = await fetch(
        `https://clients.smartysoft.in/api/method/professional.api.update_sub_task?sub_task_name=${subTaskName}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `token ${key}:${secret}`
          },
          body: JSON.stringify(updatedRow),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error updating data:", error);
    }

    const updatedFormState = [...formState];
    updatedFormState[index] = updatedRow;
    setFormState(updatedFormState);
    setEditIndex(-1);
  };

  const handleDelete = (index) => {
    let key = JSON.parse(localStorage.getItem('key'));
    let secret = JSON.parse(localStorage.getItem('secret'));
    const subTaskName = formState[index].name;
    fetch(
      `https://clients.smartysoft.in/api/method/professional.api.delete_sub_task?sub_task_name=${subTaskName}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `token ${key}:${secret}`
        },
      }
    )
      .then((result) => {
        result.json().then((resp) => {
          console.log(resp);
        });
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
    if (!deletedRows.includes(index)) {
      const newDeletedRows = [...deletedRows, index];
      setDeletedRows(newDeletedRows);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <Card sx={{ maxWidth: 1400, margin: "auto", marginTop: 10 }}>
      <CardContent>
        <Typography variant="h4" component="h1" gutterBottom>
          Sub Tasks
        </Typography>
        <TextField
          label="Search"
          variant="outlined"
          value={searchValue}
          onChange={handleSearch}
          sx={{ marginBottom: 2 }}
        />
        <div style={{ float: "right", marginRight: "13px" }}>
          <Link style={{ textDecoration: "none" }}  to={`/subtask/${my_to_do}`}>
            <Button variant="contained">Add SubTask</Button>
          </Link>
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Task</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Time Taken</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formState &&
                formState
                  .filter(
                    (row, index) =>
                      !deletedRows.includes(index) &&
                      row.task.toLowerCase().includes(searchValue.toLowerCase())
                  )
                  .map((row, index) =>
                    editIndex === index ? (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          <input
                            defaultValue={row.task}
                            id={`task-${index}`}
                            className="form-control"
                            style={{
                              width: 400,
                              height: "50px",
                              fontSize: "large",
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <input
                            defaultValue={row.description}
                            id={`description-${index}`}
                            className="form-control"
                            style={{
                              width: 500,
                              height: "50px",
                              fontSize: "large",
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <input
                            defaultValue={row.time_taken}
                            id={`time_taken-${index}`}
                            className="form-control"
                            style={{
                              width: 50,
                              height: "50px",
                              fontSize: "large",
                              textAlign: "center",
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <input
                            defaultValue={row.status}
                            id={`status-${index}`}
                            className="form-control"
                            style={{
                              width: 50,
                              height: "50px",
                              fontSize: "large",
                              textAlign: "center",
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            onClick={() => handleSave(index)}
                          >
                            Save
                          </Button>
                        </TableCell>
                      </TableRow>
                    ) : (
                      <TableRow key={row.name}>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ fontSize: "large" }}
                        >
                          {row.task}
                        </TableCell>
                        <TableCell style={{ fontSize: "large" }}>
                          {row.description}
                        </TableCell>
                        <TableCell style={{ fontSize: "large" }}>
                          {row.time_taken}
                        </TableCell>
                        <TableCell style={{ fontSize: "large" }}>
                          {row.status}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            onClick={() => handleEdit(index)}
                          >
                            Edit
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            onClick={() => handleDelete(index)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
