import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, SetUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  // check is the user already login
  useEffect(() => {
    const userData = JSON.parse(
      window.localStorage.getItem("blogAppLoginUser")
    );
    SetUser(userData);
  }, []);

  const getLoginDetails = (loginData, loginError) => {
    SetUser(loginData);
    // save user details to local storage
    if (loginData && !window.localStorage.getItem("blogAppLoginUser")) {
      const stringifyUser = JSON.stringify(loginData);
      window.localStorage.setItem("blogAppLoginUser", stringifyUser);
    }
  };

  // logout user from the blog
  const handleLogout = () => {
    window.localStorage.removeItem("blogAppLoginUser");
    SetUser(null);
  };

  const getNewBlogData = (newBlog, newBlogError) => {
    if (newBlog) {
      setBlogs(blogs.concat(newBlog));
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <LoginForm getLoginData={getLoginDetails} />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.username} logged in{" "}
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </p>
      <BlogForm userData={user} blogData={getNewBlogData} />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
