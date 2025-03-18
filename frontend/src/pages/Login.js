import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Handle Login Input
  const handleLoginInput = (e) => {
    const { name, value } = e.target;

    const prevVal = { ...loginInfo };
    prevVal[name] = value;
    setLoginInfo(prevVal);
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return setError("email and password are required!");
    }

    try {
      let res = await fetch("https://x-login-sign-up.vercel.app/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      let result = await res.json();
      const { success, message, jwtToken, name } = result;

      if (success) {
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        alert(message);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        alert(message);
      }
    } catch (err) {
      console.log(err);
    }

    setError("");
  };

  return (
    <>
      <form className="signup-form" onSubmit={handleLogin}>
        <h1 className="signup-heading">Login Here</h1>
        <div className="signup-wrapper">
          <div className="signup-div">
            <label htmlFor="email" className="signup-label">
              Email:{" "}
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="signup-input"
              onChange={handleLoginInput}
              value={loginInfo.email}
            />
          </div>
          <div className="signup-div">
            <label htmlFor="password" className="signup-label">
              Password:{" "}
            </label>
            <input
              type="password"
              name="password"
              placeholder="Confirm a password"
              className="signup-input"
              onChange={handleLoginInput}
              value={loginInfo.password}
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="signup-wrapper-btn">
            <button type="submit" className="signup-btn">
              Login Now
            </button>
            <span className="signup-text">
              Don't have an account ? {""}
              <Link to="/signup">SignUp</Link>
            </span>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
