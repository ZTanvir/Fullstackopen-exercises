const User = require("../models/user");
const loginRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

loginRouter.post("/", async (request, response) => {
  //   get username and password from request body
  const { username, password } = request.body;
  //   check both username and password valid
  const user = await User.findOne({ username });
  const isPasswordValid =
    user === null ? false : bcrypt.compareSync(password, user.passwordHash);
  //   if username or password invalid response appropriate message
  if (!(user && isPasswordValid)) {
    return response
      .status(401)
      .json({ error: "Username or Password is invalid" });
  }
  //   generate token with username and id attached
  const userForToken = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET);
  //   response with token,username,name
  response
    .status(201)
    .json({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
