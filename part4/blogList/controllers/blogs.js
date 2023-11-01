const Blog = require("../models/blog");
const User = require("../models/user");
const blogRouter = require("express").Router();
const jwt = require("jsonwebtoken");

blogRouter.get("/", async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
      id: 1,
    });
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
  // verify the user token
  const bearerToken = request.token;
  const decodeToken = jwt.verify(bearerToken, process.env.SECRET);
  if (!decodeToken.id) {
    return response.status(401).response({ error: "token invalid" });
  }

  const user = await User.findById(decodeToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  // add the blog id to blogs array in User model
  user.blogs = user.blogs.concat(blog._id);
  await user.save();

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

blogRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const body = request.body;

  if (!body.likes) {
    return response.status(400).end();
  }

  try {
    const updateBlogPost = await Blog.findByIdAndUpdate(id, body, {
      new: true,
    });
    response.status(201).json(updateBlogPost);
  } catch (error) {}
});

module.exports = blogRouter;
