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
  if (!body.title || !body.url) {
    return response.status(400).end();
  }

  const blog = new Blog(body);

  try {
    const newNote = await blog.save();
    response.status(201).json(newNote);
  } catch (error) {}
});

blogRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  try {
    await Blog.findByIdAndRemove(id);
    response.status(204).end();
  } catch (error) {}
});

module.exports = blogRouter;
