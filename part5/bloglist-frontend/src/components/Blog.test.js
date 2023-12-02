import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { screen, render } from "@testing-library/react";
import Blog from "../components/Blog";
import BlogForm from "./BlogForm";

describe("<Blog /> Component", () => {
  let container = null;
  beforeEach(() => {
    const blogs = [
      {
        title: "Python for everyone",
        author: "Marco reus",
        url: "https://cbea.ms/git-commit/",
        user: {
          username: "Hellas",
          name: "Arto Hellas",
          id: "6540edb2f38654a382da62aa",
        },
        likes: 10,
        id: "654c71272ea1204676d2ff39",
      },
    ];

    container = render(<Blog blog={blogs[0]} blogs={blogs} />);
  });
  test("Blog component only render blog title and author", async () => {
    // render only blog and title
    const blogTitle = screen.getByText("Python for everyone", { exact: false });
    expect(blogTitle).toHaveTextContent("Python for everyone");
    const blogAuthor = screen.getByText("Marco reus", {
      exact: false,
    });
    expect(blogAuthor).toHaveTextContent("Marco reus");
    // does not render url or number of likes
    const blogUrl = screen.queryByText("https://cbea.ms/git-commit/");
    expect(blogUrl).toBeNull();
    const blogLikes = screen.queryByText(10);
    expect(blogLikes).toBeNull();
  });

  test("Blog url and likes are shown on button click", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view details");
    await user.click(button);
    // after click render url and number of likes
    const blogUrl = screen.queryByText("https://cbea.ms/git-commit/");
    expect(blogUrl).toHaveTextContent("https://cbea.ms/git-commit/");
    const blogLikes = screen.getByText(10, { exact: false });
    expect(blogLikes).toHaveTextContent(10);
  });
});

describe.skip("<Blog /> Component like test", () => {
  test("Click on like button twice run the event handler function twice", async () => {
    const blogs = [
      {
        title: "Python for everyone",
        author: "Marco reus",
        url: "https://cbea.ms/git-commit/",
        user: {
          username: "Hellas",
          name: "Arto Hellas",

          id: "6540edb2f38654a382da62aa",
        },
        likes: 10,
        id: "654c71272ea1204676d2ff39",
      },
    ];
    const updateBlogLikesFn = jest.fn();
    const user = userEvent.setup();

    render(
      <Blog blog={blogs[0]} blogs={blogs} updateBlogLikes={updateBlogLikesFn} />
    );
    const button = screen.getByText("view details");
    await user.click(button);
    const likeBtn = screen.getByText("like");
    await user.click(likeBtn);
    // console.log(updateBlogLikesFn.mock.calls);
    expect(updateBlogLikesFn.mock.calls).toHaveLength(2);
  });
});

describe.skip("<BlogForm /> Component", () => {
  test("Blog created using Blog form match with new blog", async () => {
    let userInfo = {
      username: "Hellas",
      name: "Arto Hellas",
    };
    const mockBlogDataFn = jest.fn();
    const { container } = render(
      <BlogForm userData={userInfo} blogData={mockBlogDataFn} />
    );
    const titleInput = container.querySelector("#blog-title");
    const titleAuthor = container.querySelector("#blog-author");
    const titleUrl = container.querySelector("#blog-url");
    const submitBtn = screen.getByText("Create");
    const user = userEvent.setup();

    await user.type(titleInput, "How to Give Yourself Good Advice");
    await user.type(titleAuthor, "Adrienne Gibbs");
    await user.type(
      titleUrl,
      "https://blog.medium.com/how-to-give-yourself-good-advice-9c4fb0b24cbf"
    );
    await user.click(submitBtn);
    console.log(mockBlogDataFn.mock.calls);
    expect(mockBlogDataFn.mock.calls).toHaveLength(1);
  });
});
