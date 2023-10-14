const Blog = require("../models/blog");
const blogRouter = require("express").Router();

blogRouter.get("/", async (request, response) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (error) {}
});

blogRouter.post("/", async (request, response) => {
  const body = request.body;
  // check likes property is available in the request body
  if (!body.likes) {
    body.likes = 0;
  }

  const blog = new Blog(body);

  try {
    const newNote = await blog.save();
    response.status(201).json(newNote);
  } catch (error) {}
});

module.exports = blogRouter;
