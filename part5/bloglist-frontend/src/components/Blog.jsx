import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
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
  const handleBlogLikes = async () => {
    // send like data to server
    const user = JSON.parse(window.localStorage.getItem("blogAppLoginUser"));
    blogService.setToken(user.token);
    const blogId = blog.id;
    const blogData = {
      likes: blogLikes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };
    try {
      const updatedBlog = await blogService.updateBlog(blogId, blogData);
      setBlogLikes(blogLikes + 1);
    } catch (error) {}
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
        </div>
      )}
    </div>
  );
};

export default Blog;
