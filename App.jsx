// App.jsx
import React, { useState } from "react";
import "./App.css";
import TaskItem from "./components/TaskItem";

function App() {
  const [tasks, setTasks] = useState([]);
  const [formState, setFormState] = useState({
    task: "", // string
    completed: false, // boolean
    taskAssignedTo: "", // string
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    const updatedFormState = {
      ...formState,
      [name]: type === "checkbox" ? checked : value,
    };
    setFormState(updatedFormState);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formState.task || !formState.taskAssignedTo) return;
    const newTask = { ...formState };
    setTasks([...tasks, newTask]);
    setFormState({
      task: "",
      completed: false,
      taskAssignedTo: "",
    });
  }

  function handleDelete(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function handleToggle(index) {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            name="task"
            type="text"
            placeholder="Add Task"
            value={formState.task}
            onChange={handleChange}
          />
          <label>
            Completed:
            <input
              name="completed"
              type="checkbox"
              checked={formState.completed}
              onChange={handleChange}
            />
          </label>
          <select
            name="taskAssignedTo"
            value={formState.taskAssignedTo}
            onChange={handleChange}
          >
            <option value="">Select Assignee</option>
            <option value="Bruce">Bruce</option>
            <option value="Barry">Barry</option>
            <option value="Clark">Clark</option>
            <option value="Oliver">Oliver</option>
            <option value="Jina">Jina</option>
          </select>
          <button type="submit">Add Task</button>
        </form>
      </div>
      <hr />
      {tasks.map((item, index) => (
        <TaskItem
          key={index}
          item={item}
          onDelete={() => handleDelete(index)}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </>
  );
}

export default App;
