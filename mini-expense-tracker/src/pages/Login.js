import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";  

const API_URL = "http://localhost:5000/api"; 

const Login = () => {
  const [username, setUsername] = useState("");  
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      const response = await axios.post(`${API_URL}/login`, { username, password });    

      if (response.data.token) {
        localStorage.setItem("token", response.data.token); 
        //alert("Login Successful!");
        navigate("/dashboard"); 
      } else {
        setError("Login failed! No token received.");
      }
    } catch (error) {
      console.error("Login Failed:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Invalid username or password!");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-dark">
      <div className="p-4 shadow-lg rounded" style={{ width: "400px", backgroundColor: "#222" }}>
        <h2 className="text-center text-warning mb-4">Login</h2>
        
        {error && <div className="alert alert-danger">{error}</div>} 

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="text-light">Username:</label> {/* 🔹 Updated label */}
            <input
              type="text"
              className="form-control bg-dark text-white border border-warning"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ transition: "0.3s" }}
              onFocus={(e) => (e.target.style.boxShadow = "0px 0px 10px #ffc107")}
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
          </div>
          <div className="mb-3">
            <label className="text-light">Password:</label>
            <input
              type="password"
              className="form-control bg-dark text-white border border-warning"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ transition: "0.3s" }}
              onFocus={(e) => (e.target.style.boxShadow = "0px 0px 10px #ffc107")}
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
          </div>
          <button
            type="submit"
            className="btn btn-warning w-100 fw-bold"
            style={{ transition: "0.3s" }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            Login
          </button>
        </form>
        <p className="text-center text-light mt-3">
          Don't have an account? <a href="/register" className="text-warning">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;