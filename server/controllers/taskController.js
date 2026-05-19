import Task from "../models/Task.js";



// CREATE TASK
export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      deadline,
      userId,
    } = req.body;

    const task = await Task.create({
      title,
      description,
      priority,
      deadline,
      userId,
    });

    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to create task",
    });
  }
};



// GET USER TASKS
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      userId: req.params.userId,
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
};



// DELETE TASK
export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Task deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Delete failed",
    });
  }
};



// TOGGLE TASK
export const toggleTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    task.completed = !task.completed;

    await task.save();

    res.status(200).json(task);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Toggle failed",
    });
  }
};