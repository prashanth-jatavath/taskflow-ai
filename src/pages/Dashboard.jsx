import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

const Dashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");

  const [description, setDescription] =
    useState("");

  const [priority, setPriority] =
    useState("Medium");

  const [deadline, setDeadline] =
    useState("");



  // FETCH TASKS
  const fetchTasks = async () => {
    try {
      const response = await API.get(
        `/tasks/${user._id}`
      );

      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };



  // ADD TASK
  const addTask = async (e) => {
    e.preventDefault();

    try {
      await API.post("/tasks", {
        title,
        description,
        priority,
        deadline,
        userId: user._id,
      });

      alert("Task Added");

      setTitle("");
      setDescription("");
      setPriority("Medium");
      setDeadline("");

      fetchTasks();
    } catch (error) {
      console.log(error);

      alert("Failed to add task");
    }
  };



  // DELETE TASK
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);

      fetchTasks();
    } catch (error) {
      console.log(error);

      alert("Delete Failed");
    }
  };



  // TOGGLE TASK
  const toggleTask = async (id) => {
    try {
      await API.put(`/tasks/${id}`);

      fetchTasks();
    } catch (error) {
      console.log(error);

      alert("Update Failed");
    }
  };



  // LOGOUT
  const logout = () => {
    localStorage.removeItem("user");

    navigate("/login");
  };



  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchTasks();
    }
  }, []);




  return (
    <div style={styles.container}>
      {/* NAVBAR */}
      <div style={styles.navbar}>
        <h1 style={styles.logo}>
          TaskFlow AI
        </h1>

        <button
          style={styles.logoutBtn}
          onClick={logout}
        >
          Logout
        </button>
      </div>



      {/* ADD TASK */}
      <div style={styles.form}>
        <h2 style={styles.heading}>
          Add New Task
        </h2>

        <form onSubmit={addTask}>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            required
            style={styles.input}
          />

          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            required
            style={styles.textarea}
          />

          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value)
            }
            style={styles.input}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <input
            type="date"
            value={deadline}
            onChange={(e) =>
              setDeadline(e.target.value)
            }
            required
            style={styles.input}
          />

          <button
            type="submit"
            style={styles.addBtn}
          >
            Add Task
          </button>
        </form>
      </div>



      {/* TASKS */}
      <div>
        <h2 style={styles.heading}>
          Recent Tasks
        </h2>

        {tasks.map((task) => (
          <div
            key={task._id}
            style={styles.taskCard}
          >
            <div>
              <h3>{task.title}</h3>

              <p>{task.description}</p>

              <p>
                Priority:{" "}
                {task.priority}
              </p>

              <p>
                Deadline:{" "}
                {task.deadline}
              </p>

              <p>
                Status:{" "}
                {task.completed
                  ? "Completed ✅"
                  : "Pending ⏳"}
              </p>
            </div>

            <div
              style={styles.buttonGroup}
            >
              <button
                style={styles.completeBtn}
                onClick={() =>
                  toggleTask(task._id)
                }
              >
                {task.completed
                  ? "Mark Pending"
                  : "Mark Complete"}
              </button>

              <button
                style={styles.deleteBtn}
                onClick={() =>
                  deleteTask(task._id)
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

const styles = {
  container: {
    minHeight: "100vh",
    background: "#0f172a",
    padding: "20px",
    color: "#fff",
    fontFamily: "Arial",
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },

  logo: {
    color: "#00ffff",
  },

  logoutBtn: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "10px",
    background: "#00ffff",
    fontWeight: "bold",
    cursor: "pointer",
  },

  form: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "15px",
    marginBottom: "30px",
  },

  heading: {
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "15px",
    marginBottom: "20px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    background: "#f8fafc",
    color: "#000",
    boxSizing: "border-box",
  },

  textarea: {
    width: "100%",
    height: "100px",
    padding: "15px",
    marginBottom: "20px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    resize: "none",
    background: "#f8fafc",
    color: "#000",
    boxSizing: "border-box",
  },

  addBtn: {
    width: "100%",
    padding: "15px",
    border: "none",
    borderRadius: "10px",
    background: "#00ffff",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer",
  },

  taskCard: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "15px",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  completeBtn: {
    padding: "10px",
    border: "none",
    borderRadius: "10px",
    background: "#00ffff",
    fontWeight: "bold",
    cursor: "pointer",
  },

  deleteBtn: {
    padding: "10px",
    border: "none",
    borderRadius: "10px",
    background: "red",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};