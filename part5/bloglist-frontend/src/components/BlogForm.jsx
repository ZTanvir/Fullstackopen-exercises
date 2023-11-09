import { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({ userData, blogData }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleForm = async (event) => {
    event.preventDefault();
    blogService.setToken(userData.token);
    let newBlog = null;
    let newBlogError = null;
    try {
      const data = await blogService.create({ title, author, url });
      newBlog = data;
      blogData(newBlog, newBlogError);
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (error) {
      newBlogError = error.response.data;
      blogData(newBlog, newBlogError);
    }
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleForm}>
        <div>
          <label htmlFor="blog-title">title:</label>
          <input
            type="text"
            name="title"
            id="blog-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required={true}
          />
        </div>
        <div>
          <label htmlFor="blog-author">author:</label>
          <input
            type="text"
            name="author"
            id="blog-author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            required={true}
          />
        </div>
        <div>
          <label htmlFor="blog-url">url:</label>
          <input
            type="text"
            name="url"
            id="blog-url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            required={true}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
