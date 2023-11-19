import { useState } from "react";

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);
  let label = showDetails ? "hide" : "view";

  const blogStyle = {
    border: "1px solid black",
    margin: ".5rem 0rem",
    padding: "0.25rem",
  };
  const handleBlogDetails = () => {
    setShowDetails(!showDetails);
  };
  return (
    <div style={blogStyle}>
      <div onClick={handleBlogDetails}>
        {blog.title} {blog.author} <button>{label}</button>
      </div>
      {/* display addtional blog information based on user action */}
      {showDetails && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button>like</button>
          </div>
          <div>{blog.user.name}</div>
        </div>
      )}
    </div>
  );
};

export default Blog;
