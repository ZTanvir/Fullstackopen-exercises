const mongoose = require("mongoose");
const helper = require("./blog_test_helper");
const app = require("../app");
const Blog = require("../models/blog");
const supertest = require("supertest");
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  //   create new blog object
  const blogsObject = helper.initialBlog.map((blog) => new Blog(blog));
  //   save the object
  const promiseArray = blogsObject.map((blog) => blog.save());
  //   save the object to database
  Promise.all(promiseArray);
});

describe("Check get request return right ammount and right type data", () => {
  test("Get request return data type JSON", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-type", /application\/json/);
  });
  test("All blog return", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(2);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
