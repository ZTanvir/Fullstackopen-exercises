describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    // create a new user
    cy.request("POST", "http://localhost:3001/api/users", {
      username: "testuser",
      name: "test",
      password: "test12345",
    });
    cy.visit("http://localhost:5173/");
  });
  it.skip("Login form is shown", function () {
    cy.contains("log in to application");
    cy.contains("Username");
    cy.contains("Password");
    cy.contains("Login");
  });
  describe.skip("Login", function () {
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
  });
});
