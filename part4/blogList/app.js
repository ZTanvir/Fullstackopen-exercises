const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");

const config = require("./utils/config");
const middleware = require("./utils/middleware");
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const mongoUrl = config.MONGO_URL;

mongoose
  .connect(mongoUrl)
  .then((result) => {
    console.log("Connected to Mongodb successfully");
  })
  .catch((error) => {
    console.log("Error while connected to mongodb:", error);
  });

app.use(middleware.tokenExtractor);

app.use("/api/blogs", middleware.userExtractor, blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

app.use(middleware.errorHandler);

module.exports = app;
