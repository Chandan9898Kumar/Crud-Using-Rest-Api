import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./login.css";
const AccountLogin = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleChange = () => {};

  return (
    <div className="login-container">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <div className="form">
        <h3>Login Here</h3>
        <div className="user-name">UserName</div>

        <div className="input-filed">
          <input
            ref={emailRef}
            type="text"
            placeholder="Email or Phone"
            aria-label="Email"
            autoCorrect="true"
            autoComplete="true"
            autoCapitalize="true"
            onFocus={(event) => {
              emailRef.current.style.border = "2px solid cornflowerblue";
            }}
            onBlur={() => {
              emailRef.current.style.border = "none";
            }}
          />
        </div>

        <div className="user-password">Password</div>

        <div className="input-filed">
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            aria-label="password"
            onFocus={(event) => {
              event.target.style.border = "2px solid cornflowerblue";
            }}
            onBlur={(event) => {
              event.target.style.border = "none";
            }}
            onChange={handleChange}
          />
        </div>
        <div className="login-btn">
          <button>Log In</button>
        </div>
        <div className="register">
          Don't have account ?{" "}
          <Link style={{ textDecoration: "none", color: "cornflowerblue" }} to="/register">
            Register Here{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountLogin;
