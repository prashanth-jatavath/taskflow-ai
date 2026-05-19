import express from "express";

import {
  createTask,
  getTasks,
  deleteTask,
  toggleTask,
} from "../controllers/taskController.js";

const router = express.Router();



// CREATE TASK
router.post("/", createTask);



// GET USER TASKS
router.get("/:userId", getTasks);



// DELETE TASK
router.delete("/:id", deleteTask);



// TOGGLE TASK
router.put("/:id", toggleTask);

export default router;