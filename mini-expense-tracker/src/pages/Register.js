import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/apiService"; 

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Password Validation: At least 6 characters, 1 number, 1 special char
    // const passwordRegex = /^(?=.[0-9])(?=.[!@#$%^&])[a-zA-Z0-9!@#$%^&]{6,}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

    if (!passwordRegex.test(formData.password)) {
      alert("Password must be at least 6 characters and include a number & special character.");
      return;
    }

    setLoading(true);
    try {
      const response = await registerUser(formData); // Send username directly
     alert(response.message);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message || "Registration failed! Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-dark">
      <div className="p-4 shadow-lg rounded" style={{ width: "400px", backgroundColor: "#222" }}>
        <h2 className="text-center text-warning mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="text-light">Username:</label>
            <input
              type="text"
              className="form-control bg-dark text-white border border-warning"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="text-light">Email:</label>
            <input
              type="email"
              className="form-control bg-dark text-white border border-warning"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="text-light">Password:</label>
            <input
              type="password"
              className="form-control bg-dark text-white border border-warning"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-warning w-100 fw-bold"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center text-light mt-3">
          Already have an account? <a href="/login" className="text-warning">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
