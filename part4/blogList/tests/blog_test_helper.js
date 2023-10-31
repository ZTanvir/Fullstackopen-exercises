const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlog = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
];

const nonExistingId = async () => {
  const blogPost = new Blog({ content: "willremovethissoon" });
  await blogPost.save();
  await blogPost.deleteOne();

  return blogPost._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlog,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
