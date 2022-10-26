const res = require("express/lib/response");
// @desc Register a user
// @route /api/users
// @access public

const registerUser = (req, res) => {
  const { name, profession, password, email } = req.body;
  console.log(req.body);

  //   Validation
  if (!name || !profession || !password || !email) {
    return res.status(400);
    throw new Error("Please include all fields");
  }

  res.send("Get it done now, by registering users");
};

// @desc Register a user
// @route /api/users/login
// @access public

const loginUser = (req, res) => {
  res.send("Get it done now, by register users");
};

module.exports = {
  registerUser,
  loginUser
};
