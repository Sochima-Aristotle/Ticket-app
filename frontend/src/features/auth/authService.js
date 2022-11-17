import axios from "axios";
import Register from "../../pages/Register";

const API_USER = "/api/users";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_USER, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  console.log("I got here", 1);
  return response.data;
};

// Log in a user

const login = async (userData) => {
  console.log("I got here");
  const response = await axios.post(API_USER + "/login", userData);
  console.log("res", response.data);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  console.log(response.data, "this is response");
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
