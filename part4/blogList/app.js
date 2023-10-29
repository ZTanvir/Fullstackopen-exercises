const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");

const config = require("./utils/config");
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const mongoUrl = config.MONGO_URL;

mongoose.connect(mongoUrl);

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);

module.exports = app;
