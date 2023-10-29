const userRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

userRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

userRouter.post("/", async (request, response) => {
  // get  username, name, password from post request
  const { username, name, password } = request.body;

  // encrypt the user password
  const saltRounds = 10;
  const passwordHash = bcrypt.hashSync(password, saltRounds);

  // create new user and save new user to db
  const user = new User({
    username,
    name,
    passwordHash,
  });
  const saveUser = await user.save();

  response.status(201).json(saveUser);
});

module.exports = userRouter;
