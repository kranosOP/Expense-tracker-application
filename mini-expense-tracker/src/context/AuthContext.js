import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get("/api/auth/me", { withCredentials: true });
        setUser(res.data);
      } catch (error) {
        setUser(null);
      }
    };
    checkUser();
  }, []);

  const login = async (email, password) => {
    try {
      await axios.post("/api/auth/login", { email, password }, { withCredentials: true });
      const res = await axios.get("/api/auth/me", { withCredentials: true });
      setUser(res.data);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  const logout = async () => {
    await axios.post("/api/auth/logout", {}, { withCredentials: true });
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
