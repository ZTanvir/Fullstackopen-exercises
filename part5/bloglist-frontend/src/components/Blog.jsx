import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, blogs, setBlogs, updateBlogLikes }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [blogLikes, setBlogLikes] = useState(blog.likes);
  let label = showDetails ? "hide details" : "view details";

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
    const user = tokenExtactor();
    const userToken = user.token;
    const blogId = blog.id;
    const blogData = {
      likes: blogLikes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };
    updateBlogLikes(userToken, blogId, blogData, blogLikes, setBlogLikes);
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
    <div className="blog" style={blogStyle}>
      <label>
        <span className="blog-title">{blog.title}</span>
        <span className="blog-author">{blog.author}</span>
        <button onClick={handleBlogDetails}>{label}</button>
      </label>
      {/* display addtional blog information based on user action */}
      {showDetails && (
        <div className="blog-details">
          <div>
            <a href="blog.url">{blog.url}</a>
          </div>
          <div className="like-blog">
            likes <span className="like-count">{blogLikes}</span>
            <button className="like-btn" onClick={handleBlogLikes}>
              like
            </button>
          </div>
          <div>{blog.user.name}</div>
          <div>
            {/* only the user who created the blog can remove the blog */}
            {blog.user.name === tokenExtactor().name && (
              <button className="remove-blog-btn" onClick={handleRemoveBlog}>
                remove
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
