import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [signUpFormData, setSignUpFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Handle SignUp Input
  const handleSignUpInput = (e) => {
    const { name, value } = e.target;

    const prevValue = { ...signUpFormData };
    prevValue[name] = value;
    setSignUpFormData(prevValue);
  };

  // Handle SignUp Submit
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = signUpFormData;
    console.log(signUpFormData, "------ ");

    if (!name || !email || !password) {
      return setError("All filed are required!");
    }

    try {
      let response = await fetch("https://x-login-sign-up.vercel.app/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpFormData),
      });

      let result = await response.json();
      const {success, message} = result;
      
      if(success){
        alert(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000)
      } else if(!success){
        alert(message);
      }
    } catch (err) {
      console.log(err, "error from catch");
    }
    setError("");
  };

  return (
    <>
      <form className="signup-form" onSubmit={handleSignUpSubmit}>
        <h1 className="signup-heading">SignUp Here</h1>
        <div className="signup-wrapper">
          <div className="signup-div">
            <label htmlFor="name" className="signup-label">
              Name:{" "}
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="signup-input"
              onChange={handleSignUpInput}
              value={signUpFormData.name}
            />
          </div>
          <div className="signup-div">
            <label htmlFor="email" className="signup-label">
              Email:{" "}
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="signup-input"
              onChange={handleSignUpInput}
              value={signUpFormData.email}
            />
          </div>
          <div className="signup-div">
            <label htmlFor="password" className="signup-label">
              Password:{" "}
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              className="signup-input"
              onChange={handleSignUpInput}
              value={signUpFormData.password}
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="signup-wrapper-btn">
            <button type="submit" className="signup-btn">
              SignUp Fast
            </button>
            <span className="signup-text">
              Already have an account ? {""}
              <Link to="/login">Login</Link>
            </span>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignUp;
