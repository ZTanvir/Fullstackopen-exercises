import { useState } from "react";
import loginService from "../services/login";

const LoginForm = ({ getLoginData }) => {
  const [userName, setUsername] = useState("");
  const [passWord, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    let userData = null;
    let errorData = null;
    try {
      const loginData = await loginService.login({
        username: userName,
        password: passWord,
      });
      userData = loginData;
      getLoginData(userData, errorData);
      setUsername("");
      setPassword("");
    } catch (error) {
      errorData = error;
      getLoginData(userData, errorData);
      setUsername("");
      setPassword("");
    }
  };

  return (
    <>
      <form className="login-form" onSubmit={handleLogin} autoComplete="off">
        <div>
          <label htmlFor="user">Username:</label>
          <input
            type="text"
            name="user"
            id="user"
            required={true}
            value={userName}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="off"
            required={true}
            value={passWord}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button className="login-submitBtn" type="submit">
          Login
        </button>
      </form>
    </>
  );
};
export default LoginForm;
