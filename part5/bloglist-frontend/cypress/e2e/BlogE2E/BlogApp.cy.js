describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    // create a new user
    cy.request("POST", "http://localhost:3001/api/users", {
      username: "testuser",
      name: "test",
      password: "test12345",
    });
    cy.request("POST", "http://localhost:3001/api/users", {
      username: "testuser1",
      name: "test1",
      password: "test12345",
    });
    cy.visit("http://localhost:5173/");
  });
  it("Login form is shown", function () {
    cy.contains("log in to application");
    cy.contains("Username");
    cy.contains("Password");
    cy.contains("Login");
  });
  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#user").type("testuser");
      cy.get("#password").type("test12345");
      cy.get(".login-submitBtn").click();
    });
    it("fails with wrong credentials", function () {
      cy.get("#user").type("test");
      cy.get("#password").type("test");
      cy.get(".login-submitBtn").click();
      cy.get(".error")
        .should("contain", "Username or Password is invalid")
        .and("have.css", "color", "rgb(255, 0, 0)");
    });
  });
  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "testuser", password: "test12345" });
      cy.createBlog({
        title: "testBlog",
        author: "testUser",
        url: "https://testblog.com",
        user: "test",
      });
      cy.get(".blog-title").parent().find("button").as("blogDetails");
      cy.get("@blogDetails").click();
    });
    it("A blog can be created", function () {
      cy.get(".blog-title").should("contain", "testBlog");
      cy.get(".blog-author").should("contain", "testUser");
    });
    it("Users can like the blog", function () {
      cy.get(".like-btn").click();
      cy.get(".like-count").should("contain", "1");
    });
    it("Delete a blog", function () {
      cy.get(".remove-blog-btn").click();
      cy.contains("testBlog").should("not.exist");
    });
    it("Only the blog owner can remove a blog", function () {
      cy.contains("logout").click();
      cy.login({ username: "testuser1", password: "test12345" });
      cy.get(".blog-title").parent().find("button").as("blogDetails");
      cy.get("@blogDetails").click();
      cy.contains("remove").should("not.exist");
    });
  });
  describe("Exist several blog", function () {
    const blogs = [
      {
        title: "blog1",
        author: "testUser",
        url: "https://www.google.com/",
        user: "test",
      },
      {
        title: "blog2",
        author: "testUser",
        url: "https://www.google.com/",
        user: "test",
      },
      {
        title: "blog3",
        author: "testUser",
        url: "https://www.google.com/",
        user: "test",
      },
    ];
    beforeEach(function () {
      cy.login({ username: "testuser", password: "test12345" });
      cy.createBlog(blogs[0]);
      cy.createBlog(blogs[1]);
      cy.createBlog(blogs[2]);
      cy.get(".blog-title").parent().find("button").as("blogDetails");
      cy.get("@blogDetails").click({ multiple: true });
    });
    it("Most like blog appear first in the list", function () {
      cy.contains("blog1").parent().contains("like").as("blog1LikeBtn");
      cy.contains("blog2").parent().contains("like").as("blog2LikeBtn");
      cy.contains("blog3").parent().contains("like").as("blog3LikeBtn");

      cy.get("@blog1LikeBtn").click();
      cy.get("@blog2LikeBtn").click();
      cy.get("@blog3LikeBtn").click();

      cy.get("@blog2LikeBtn").click();
      cy.get("@blog3LikeBtn").click();

      cy.get("@blog3LikeBtn").click();

      cy.visit("http://localhost:5173/");
      cy.get(".blog").eq(0).should("contain", blogs[2].title);
      cy.get(".blog").eq(1).should("contain", blogs[1].title);
      cy.get(".blog").eq(2).should("contain", blogs[0].title);
    });
  });
});
