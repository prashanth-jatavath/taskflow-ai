import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      if (
        error.response?.data?.message
      ) {
        alert(
          error.response.data.message
        );
      } else {
        alert("Login Failed");
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>
          Login
        </h1>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />

          <div
            style={
              styles.passwordContainer
            }
          >
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              style={
                styles.passwordInput
              }
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              style={styles.showBtn}
            >
              {showPassword
                ? "Hide"
                : "Show"}
            </button>
          </div>

          <button
            type="submit"
            style={styles.button}
          >
            Login
          </button>
        </form>

        <p style={styles.text}>
          Don’t have an account?{" "}
          <Link
            to="/signup"
            style={styles.link}
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(to right, #0f172a, #111827)",
  },

  card: {
    width: "350px",
    background: "#1e293b",
    padding: "30px",
    borderRadius: "12px",
  },

  title: {
    color: "#22d3ee",
    textAlign: "center",
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "20px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    boxSizing: "border-box",
    background: "white",
    color: "black",
    fontSize: "16px",
  },

  passwordContainer: {
    display: "flex",
    background: "white",
    borderRadius: "10px",
    overflow: "hidden",
    marginBottom: "20px",
  },

  passwordInput: {
    flex: 1,
    padding: "14px",
    border: "none",
    outline: "none",
    background: "white",
    color: "black",
    fontSize: "16px",
  },

  showBtn: {
    border: "none",
    padding: "14px",
    cursor: "pointer",
    background: "#e2e8f0",
    fontWeight: "bold",
  },

  button: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "#22d3ee",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px",
  },

  text: {
    color: "white",
    textAlign: "center",
    marginTop: "20px",
  },

  link: {
    color: "#22d3ee",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Login;