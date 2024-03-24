import express from "express";
import {
  createTask,
  updateTask,
  getTask,
  getTasks,
  deleteTask,
} from "./src/model/TaskModel.js";

import { connectMongo } from "./src/config/dbConfig.js";
const app = express();
const PORT = 8000;

// connect to database
connectMongo();

// middleware to parse request
app.use(express.json());

// get all tasks || index route of the task
app.get("/tasks", (req, res) => {
  const tasks = getTasks();

  res.json({
    status: "success",
    message: "List of all tasks",
    data: tasks,
  });
});

// show the task
app.get("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const task = await getTask(id);
  res.json({
    message: "success",
    data: task,
  });
});

// create task
app.post("/tasks", async (req, res) => {
  const result = await createTask(req.body);
  reult?._id
    ? res.json({
        message: "success",
      })
    : res.json({
        message: "error",
      });
});

// update task
app.patch("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const result = await updateTask(id, req.body);
  result?._id
    ? res.json({
        message: "success",
      })
    : res.json({
        message: "error",
      });
});

// delete task
app.delete("/tasks", async (req, res) => {
  const { id } = req.body;
  const deleted = await deleteTask(id);
  deleted?._id
    ? res.json({
        message: "Task deleted successfully",
      })
    : res.json({
        error: "Could not delete the task",
      });
});

// start a server
app.listen(PORT, (error) => {
  error
    ? console.log("Error", error)
    : console.log("Your server is running at http://localhost:" + PORT);
});
