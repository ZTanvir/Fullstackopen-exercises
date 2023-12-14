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
});
