import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
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

  const getLoginDetails = (loginData, error) => {
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
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
