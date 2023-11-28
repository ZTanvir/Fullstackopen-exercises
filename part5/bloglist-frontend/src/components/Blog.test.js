import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { screen, render } from "@testing-library/react";
import Blog from "../components/Blog";

describe("<Blog /> Component", () => {
  let container = null;
  beforeEach(() => {
    const blog = {
      title: "Python for everyone",
      author: "Marco reus",
      url: "https://cbea.ms/git-commit/",
      likes: 10,
    };
    container = render(<Blog blog={blog} />);
  });
  test("Blog component only render blog title and author", async () => {
    // render only blog and title
    screen.debug();
    const blogTitle = screen.getByText("Python for everyone", { exact: false });
    expect(blogTitle).toHaveTextContent("Python for everyone");
    const blogAuthor = screen.getByText("Marco reus", {
      exact: false,
    });
    expect(blogAuthor).toHaveTextContent("Marco reus");
    // expect(blogElement).toHaveTextContent("Marco reus");
    // does not render url or number of likes
    const blogUrl = screen.queryByText("https://cbea.ms/git-commit/");
    expect(blogUrl).toBeNull();
    const blogLikes = screen.queryByText(10);
    expect(blogLikes).toBeNull();
  });
});
