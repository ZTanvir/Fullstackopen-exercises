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
    expect(response.body).toHaveLength(helper.initialBlog.length);
  });
});

describe("Database default key name has been change", () => {
  test("Unique identifier property of the blog posts is named id", async () => {
    const response = await api.get("/api/blogs");
    // check for the key named id
    response.body.forEach((blog) => {
      for (let item in blog) {
        if (item.id === "id") {
          let isId = item.id;
          // check isId variable is not undefined
          expect(isId).toBeDefined();
        }
      }
    });
  });
});

describe("Addition of new blog post", () => {
  const newPost = {
    title: "Js",
    author: "Asad khan",
    url: "www.google.com",
    likes: 15,
    id: "651bb985e98300e7e1ad723b",
  };

  test("Response with status code 201", async () => {
    await api
      .post("/api/blogs")
      .send(newPost)
      .expect(201)
      .expect("Content-type", /application\/json/);
  });

  test("A new post has added", async () => {
    await api.post("/api/blogs").send(newPost);
    const blogs = await helper.notesInDb();
    const initialTotalBlog = helper.initialBlog.length;
    expect(blogs).toHaveLength(initialTotalBlog + 1);
  });

  test("Check new collection in db has title named Js", async () => {
    await api.post("/api/blogs").send(newPost);
    const blogs = await helper.notesInDb();
    const postTitle = blogs.map((blog) => blog.title);
    expect(postTitle).toContain("Js");
  });
});

afterAll(() => {
  mongoose.connection.close();
});
