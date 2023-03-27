// import React, { useState } from "react";

// function TaskForm() {
//   const [task, setTask] = useState("");
//   const [status, setStatus] = useState("");
//   const [timeTaken, setTimeTaken] = useState("");
//   const [description, setDescription] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // handle form submission here
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="task">Task:</label>
//         <input
//           type="text"
//           id="task"
//           placeholder="Enter task name"
//           value={task}
//           onChange={(event) => setTask(event.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="status">Status:</label>
//         <input
//           type="text"
//           id="status"
//           placeholder="Enter status"
//           value={status}
//           onChange={(event) => setStatus(event.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="timeTaken">Time taken:</label>
//         <input
//           type="text"
//           id="timeTaken"
//           placeholder="Enter time taken"
//           value={timeTaken}
//           onChange={(event) => setTimeTaken(event.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="description">Description:</label>
//         <textarea
//           id="description"
//           placeholder="Enter task description"
//           value={description}
//           onChange={(event) => setDescription(event.target.value)}
//         />
//       </div>
//       <button type="submit">Insert</button>
//     </form>
//   );
// }

// export default TaskForm;


import React, { useState } from "react";

function TaskForm() {
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("");
  const [timeTaken, setTimeTaken] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission here
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="task">Task:</label>
      <input
        type="text"
        id="task"
        placeholder="Enter task name"
        value={task}
        onChange={(event) => setTask(event.target.value)}
      />
      <label htmlFor="status">Status:</label>
      <input
        type="text"
        id="status"
        placeholder="Enter status"
        value={status}
        onChange={(event) => setStatus(event.target.value)}
      />
      <label htmlFor="timeTaken">Time taken:</label>
      <input
        type="text"
        id="timeTaken"
        placeholder="Enter time taken"
        value={timeTaken}
        onChange={(event) => setTimeTaken(event.target.value)}
      />
      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        placeholder="Enter task description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button type="submit">Insert</button>
    </form>
  );
}

export default TaskForm;
