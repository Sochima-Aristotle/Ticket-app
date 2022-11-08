const asyncHandler = require("express-async-Handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModels");
// @desc Register a user
// @route /api/users
// @access public

const registerUser = asyncHandler(async (req, res) => {
  const { name, password, email } = req.body;
  console.log("body", req.body);

  //   Validation
  if (!name || !password || !email) {
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
    email,
    password: hashedPassword
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Login a user
// @route /api/users/login
// @access public

const loginUser = asyncHandler(async (req, res) => {
  const { password, email } = req.body;

  const user = await User.findOne({ email });
  // check if password match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } else {
    res.status(401);
    throw new Error("Unauthorized user");
  }

  // res.send("Get it done now");
});

// @desc current user
// @route /api/users/me
// @access private

const getme = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name
  };

  // res.send("Here I am");
  res.status(200).json(user);
});

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETE, {
    expiresIn: "45d"
  });
};

module.exports = {
  registerUser,
  loginUser,
  getme
};
