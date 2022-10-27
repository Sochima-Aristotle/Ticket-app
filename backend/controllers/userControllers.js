const asyncHandler = require("express-async-Handler");
const bcrypt = require("bcryptjs");

const User = require("../models/userModels");
// @desc Register a user
// @route /api/users
// @access public

const registerUser = asyncHandler(async (req, res) => {
  const { name, profession, password, email } = req.body;
  console.log("body", req.body);

  //   Validation
  if (!name || !profession || !password || !email) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  // check if user exist
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    work,
    email,
    hashedPassword
  });

  res.send("Get it done now, by registering users");
});

// @desc Login a user
// @route /api/users/login
// @access public

const loginUser = asyncHandler(async (req, res) => {
  res.send("Get it done now");
});

module.exports = {
  registerUser,
  loginUser
};
