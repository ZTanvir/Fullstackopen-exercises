const userRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  });
  response.json(users);
});

userRouter.post("/", async (request, response, next) => {
  // get  username, name, password from post request
  const { username, name, password } = request.body;

  if (!password) {
    return response.status(400).json({ error: "Password is required" });
  }
  if (password && password.length < 3) {
    return response.status(400).json({
      error: "Password must be atleast 3 character long",
    });
  }

  // encrypt the user password
  const saltRounds = 10;
  const passwordHash = bcrypt.hashSync(password, saltRounds);

  try {
    // create new user and save new user to db
    const user = new User({
      username,
      name,
      passwordHash,
    });

    const saveUser = await user.save();

    response.status(201).json(saveUser);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
