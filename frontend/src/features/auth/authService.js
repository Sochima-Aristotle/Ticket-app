import axios from "axios";
import Register from "../../pages/Register";

const API_USER = "/api/users/";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_USER, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Log in a user
const login = async (userData) => {
  const response = await axios.post(API_USER + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Logout user
const logout = () => localStorage.removeItem("user");

const authService = {
  register,
  login,
  logout
};

export default authService;
