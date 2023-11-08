import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [user, SetUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const getLoginDetails = (userName, passWord, loginData) => {
    setUsername(userName);
    setUserpassword(passWord);
    SetUser(loginData);
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
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
