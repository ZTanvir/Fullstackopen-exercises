const Blog = require("../models/blog");
const User = require("../models/user");
const blogRouter = require("express").Router();

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
  const user = await User.findById(request.user);

  if (user) {
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
  } else {
    response.status(401).json({ error: "username not found" });
  }
});

blogRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;

  const user = await User.findById(request.user);
  if (!user) {
    return response.status(401).json({ error: "User or token invalid" });
  }
  const blog = await Blog.findById(id);

  try {
    /* 
      delete a blog only possible if the user who created the blog 
      and the user who want to delete the blog are the same user
     */
    if (user._id.toString() === blog.user.toString()) {
      await Blog.findByIdAndRemove(id);
      response.status(204).end();
    }
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
