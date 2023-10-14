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
    const blogs = await helper.blogsInDb();
    const initialTotalBlog = helper.initialBlog.length;
    expect(blogs).toHaveLength(initialTotalBlog + 1);
  });

  test("Check new collection in db has title named Js", async () => {
    await api.post("/api/blogs").send(newPost);
    const blogs = await helper.blogsInDb();
    const postTitle = blogs.map((blog) => blog.title);
    expect(postTitle).toContain("Js");
  });

  test("Check for likes property is missing from blog post", async () => {
    const testPost = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    };
    await api.post("/api/blogs").send(testPost);
    const blogs = await helper.blogsInDb();
    const postWithoutLikes = blogs.filter(
      (post) => post.title === testPost.title
    );
    // add likes and id test post
    testPost.likes = 0;
    testPost.id = postWithoutLikes[0].id;
    expect(postWithoutLikes).toContainEqual(testPost);
  });

  test("If url missing from new post get a response 400", async () => {
    const testPost = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 0,
    };
    await api.post("/api/blogs").send(testPost).expect(400);
  });

  test("If title missing from new post get a response 400", async () => {
    const testPost = {
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      author: "Edsger W. Dijkstra",
      likes: 0,
    };
    await api.post("/api/blogs").send(testPost).expect(400);
  });
});

describe("Delete a single blog post", () => {
  test("Get response 204 on delete", async () => {
    const blogsPost = await helper.blogsInDb();
    const postToDelete = blogsPost[0];
    await api.delete(`/api/blogs/${postToDelete.id}`).expect(204);
  });

  test("A post has remove from database", async () => {
    const blogsPost = await helper.blogsInDb();
    const postToDelete = blogsPost[0];

    await api.delete(`/api/blogs/${postToDelete.id}`);

    const blogsPostAfterDelete = await helper.blogsInDb();

    expect(blogsPostAfterDelete).toHaveLength(blogsPost.length - 1);
  });

  test("Check deleted blog post title is not present in db", async () => {
    const blogsPost = await helper.blogsInDb();
    const postToDelete = blogsPost[0];
    const postTitle = postToDelete.title;

    await api.delete(`/api/blogs/${postToDelete.id}`);

    const blogsPostAfterDelete = await helper.blogsInDb();
    const allPostTitle = blogsPostAfterDelete.map((post) => post.title);

    expect(allPostTitle).not.toContain(postTitle);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
