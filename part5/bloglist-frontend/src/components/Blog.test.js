import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import Blog from "../components/Blog";

describe("<Blog /> Component", () => {
  test("Blog component only render blog title and author", () => {
    const blog = {
      title: "Python for everyone",
      author: "Marco reus",
      url: "https://cbea.ms/git-commit/",
      likes: 10,
    };
    const { container } = render(<Blog blog={blog} />);
    // render only blog and title
    const blogElement = container.querySelector(".blog");
    expect(blogElement).toHaveTextContent("Python for everyone");
    expect(blogElement).toHaveTextContent("Marco reus");
    // does not render url or number of likes
    const blogUrl = screen.queryByText("https://cbea.ms/git-commit/");
    expect(blogUrl).toBeNull();
    const blogLikes = screen.queryByText(10);
    expect(blogLikes).toBeNull();
  });
});
