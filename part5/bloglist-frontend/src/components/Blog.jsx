import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, blogs, setBlogs }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [blogLikes, setBlogLikes] = useState(blog.likes);
  let label = showDetails ? "hide" : "view";

  const blogStyle = {
    border: "1px solid black",
    margin: ".5rem 0rem",
    padding: "0.25rem",
  };
  const handleBlogDetails = () => {
    setShowDetails(!showDetails);
  };

  // get user info along with token from localstorage
  const tokenExtactor = () => {
    const user = JSON.parse(window.localStorage.getItem("blogAppLoginUser"));
    return user;
  };

  const handleBlogLikes = async () => {
    const userToken = tokenExtactor().token;
    blogService.setToken(userToken);
    const blogId = blog.id;
    const blogData = {
      likes: blogLikes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };
    try {
      // send like data to server
      const updatedBlog = await blogService.updateBlog(blogId, blogData);
      setBlogLikes(blogLikes + 1);
    } catch (error) {
      console.log("Blog post like error:", error.message);
    }
  };

  const handleRemoveBlog = async () => {
    const blogId = blog.id;
    const userToken = tokenExtactor().token;
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        blogService.setToken(userToken);
        const deletedBlog = await blogService.deleteBlog(blogId);
        let copyBlogs = [...blogs];
        copyBlogs = copyBlogs.filter(
          (copyBlog) => copyBlog.id !== deletedBlog.id
        );
        setBlogs(copyBlogs);
      }
    } catch (error) {
      console.log("Remove post like error:", error.message);
    }
  };

  return (
    <div style={blogStyle}>
      <div onClick={handleBlogDetails}>
        {blog.title} {blog.author} <button>{label}</button>
      </div>
      {/* display addtional blog information based on user action */}
      {showDetails && (
        <div>
          <div>
            <a href="blog.url">{blog.url}</a>
          </div>
          <div>
            likes {blogLikes} <button onClick={handleBlogLikes}>like</button>
          </div>
          <div>{blog.user.name}</div>
          <div>
            <button onClick={handleRemoveBlog}>remove</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
