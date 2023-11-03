const mongoose = require("mongoose");
const helper = require("./blog_test_helper");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");
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

describe.only("Addition of new blog post", () => {
  let token = null;

  beforeEach(async () => {
    // delete all user and then create new user
    // generate authentication token based on new user
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("userpassword", 10);
    const user = new User({
      username: "Artoo",
      name: "arto helal",
      passwordHash,
    });
    await user.save();
    const userAndPassword = {
      username: user.username,
      password: "userpassword",
    };
    const loginResponse = await api.post("/api/login").send(userAndPassword);
    token = loginResponse.body.token;
  });

  const newPost = {
    title: "Js",
    author: "Asad khan",
    url: "www.google.com",
    likes: 15,
  };
  test("Response with status code 201 if new blog is created", async () => {
    await api
      .post("/api/blogs")
      .set({ Authorization: `Bearer ${token}` })
      .send(newPost)
      .expect(201)
      .expect("Content-type", /application\/json/);
  });

  test("Response with status code 401 if token is not provided", async () => {
    await api
      .post("/api/blogs")
      .send(newPost)
      .expect(401)
      .expect("Content-type", /application\/json/);
  });

  test("A new post has added", async () => {
    await api
      .post("/api/blogs")
      .set({ Authorization: `Bearer ${token}` })
      .send(newPost);
    const blogs = await helper.blogsInDb();
    const initialTotalBlog = helper.initialBlog.length;
    expect(blogs).toHaveLength(initialTotalBlog + 1);
  });

  test("Check new collection in db has title named Js", async () => {
    await api
      .post("/api/blogs")
      .set({ Authorization: `Bearer ${token}` })
      .send(newPost);
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
    await api
      .post("/api/blogs")
      .set({ Authorization: `Bearer ${token}` })
      .send(testPost);
    const blogs = await helper.blogsInDb();
    const postWithoutLikes = blogs.filter(
      (post) => post.title === testPost.title
    );
    // add likes and id test post
    testPost.likes = 0;
    testPost.id = postWithoutLikes[0].id;
    testPost.user = postWithoutLikes[0].user;
    expect(postWithoutLikes).toContainEqual(testPost);
  });

  test("If url missing from new post get a response 400", async () => {
    const testPost = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 0,
    };
    await api
      .post("/api/blogs")
      .set({ Authorization: `Bearer ${token}` })
      .send(testPost)
      .expect(400);
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

describe("Update blog post likes", () => {
  test("Response 201 when a blog post is updated ", async () => {
    const initialBlog = await helper.blogsInDb();
    const blogPost = initialBlog[0];
    const updatePostData = { likes: 10 };

    await api
      .put(`/api/blogs/${blogPost.id}`)
      .send(updatePostData)
      .expect(201)
      .expect("Content-type", /application\/json/);
  });

  test("Blog post likes updated", async () => {
    const initialBlog = await helper.blogsInDb();
    const blogPost = initialBlog[0];
    const blogPostAuthor = blogPost.author;
    const updatePostData = { likes: 10 };

    await api.put(`/api/blogs/${blogPost.id}`).send(updatePostData);
    const updatedBlog = await helper.blogsInDb();
    const filterBlog = updatedBlog.filter(
      (blog) => blog.author === blogPostAuthor
    );
    expect(filterBlog[0].likes).toBe(updatePostData.likes);
  });
});

describe("Check invalid users are not created", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("userpassword", 10);
    const user = new User({
      username: "Arto",
      name: "arto helal",
      passwordHash,
    });
    await user.save();
  });

  test("Username must be unique", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "Arto",
      name: "arto helal",
      password: "arto12345",
    };
    api
      .post("/api/users")
      .send(newUser)
      .expect(401)
      .expect("Content-type", /application\/json/);

    // new user has not added to database
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
  test("", async () => {});

  describe("Check for correct username and password", () => {
    test("User can't be created without giving username", async () => {
      const testUser = {
        name: "asad khan",
        password: "asad12345",
      };
      const usersAtStart = await helper.usersInDb();
      const result = await api
        .post("/api/users")
        .send(testUser)
        .expect(400)
        .expect("Content-type", /application\/json/);

      // new user has not added to database
      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length);

      // contain proper error message
      expect(result.body.error).toContain(
        "User validation failed: username: Path `username` is required."
      );
    });

    test("User can't be created without giving password", async () => {
      const testUser = {
        username: "asadkhan",
        name: "asad khan",
        password: "",
      };
      const usersAtStart = await helper.usersInDb();
      const result = await api
        .post("/api/users")
        .send(testUser)
        .expect(400)
        .expect("Content-type", /application\/json/);

      // new user has not added to database
      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length);

      // contain proper error message
      expect(result.body.error).toContain("Password is required");
    });

    test("User can't be created when username is less than 3 character", async () => {
      const testUser = {
        username: "as",
        name: "asad khan",
        password: "asad",
      };
      const usersAtStart = await helper.usersInDb();
      const result = await api
        .post("/api/users")
        .send(testUser)
        .expect(400)
        .expect("Content-type", /application\/json/);

      // new user has not added to database
      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length);

      // contain proper error message
      expect(result.body.error).toContain(
        "User validation failed: username: Path `username` (`as`) is shorter than the minimum allowed length (3)."
      );
    });

    test("User can't be created when password is less than 3 character", async () => {
      const testUser = {
        username: "asad",
        name: "asad khan",
        password: "ab",
      };
      const usersAtStart = await helper.usersInDb();
      const result = await api
        .post("/api/users")
        .send(testUser)
        .expect(400)
        .expect("Content-type", /application\/json/);

      // new user has not added to database
      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length);

      // contain proper error message
      expect(result.body.error).toContain(
        "Password must be atleast 3 character long"
      );
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
