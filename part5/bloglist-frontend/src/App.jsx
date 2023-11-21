import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import Toggleable from "./components/Toggleable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, SetUser] = useState(null);
  const [notice, setNotice] = useState("");
  const [isNoticeError, setIsNoticeError] = useState("");

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
    if (loginData) {
      SetUser(loginData);
      // save user details to local storage
      if (loginData && !window.localStorage.getItem("blogAppLoginUser")) {
        const stringifyUser = JSON.stringify(loginData);
        window.localStorage.setItem("blogAppLoginUser", stringifyUser);
      }
    } else if (loginError) {
      //send error msg to user if login failed
      setNotice(loginError.response.data.error);
      setIsNoticeError(true);
      setTimeout(() => {
        setNotice("");
        setIsNoticeError("");
      }, 5000);
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
      setNotice(`a new blog ${newBlog.title} by ${newBlog.author} added`);
      setIsNoticeError(false);
      setTimeout(() => {
        setNotice("");
        setIsNoticeError("");
      }, 5000);
    }
  };
  // Show a error message if new blog is not added

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        {notice && (
          <Notification notice={notice} isErrorNotice={isNoticeError} />
        )}
        <LoginForm getLoginData={getLoginDetails} />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      {notice && <Notification notice={notice} isErrorNotice={isNoticeError} />}
      <p>
        {user.username} logged in{" "}
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </p>
      <Toggleable label="create new blog">
        <BlogForm userData={user} blogData={getNewBlogData} />
      </Toggleable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} setBlog={setBlogs} />
      ))}
    </div>
  );
};
export default App;
