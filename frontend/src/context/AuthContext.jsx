import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  // Persist user session from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = JSON.parse(atob(token.split(".")[1])); 
      setUser(userData);
    }
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://localhost:4000/api/auth/login", { username, password });
      const { token } = response.data;
      const userData = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
      setUser(userData);
      localStorage.setItem("token", token); // Store token in localStorage
      return { success: true}; // Indicate success
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const signup = async (username, password, role) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://localhost:4000/api/auth/register", { 
      username, 
      password, 
      role 
    });
      const { token } = response.data; // Extract the token from the response
      const userData = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
      setUser(userData); // Set the authenticated user in state
      localStorage.setItem("token", token); // Save token to localStorage
      return { success: true, role: userData.role }; // Indicate success with role
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong"); // Handle errors
      return { success: false }; // Indicate failure
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
