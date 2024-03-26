import React, { useRef, useEffect, useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";

import { isEmail } from "../RegEx";
const AccountRegister = () => {
  const nameRef = useRef("");
  const emailRef = useRef(" ");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");

  const handleClick = () => {
    const userEmail = isEmail(emailRef.current.value);
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h3>Register</h3>

        <div className="register-user-details">UserName</div>
        <div className="register-fields">
          <input
            ref={nameRef}
            type="text"
            placeholder="Name"
            aria-label="name"
            onFocus={(event) => {
              nameRef.current.style.border = "2px solid cornflowerblue";
            }}
            onBlur={() => {
              nameRef.current.style.border = "none";
            }}
          />
        </div>

        <div className="register-user-details email-address">Email Address</div>
        <div className="register-fields email-address">
          <input
            ref={emailRef}
            type="text"
            placeholder="Email Address"
            aria-label="email"
            onFocus={(event) => {
              emailRef.current.style.border = "2px solid cornflowerblue";
            }}
            onBlur={() => {
              emailRef.current.style.border = "none";
            }}
          />
        </div>

        <div className="register-user-details password">Password</div>
        <div className="register-fields password">
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            aria-label="password"
            onFocus={(event) => {
              passwordRef.current.style.border = "2px solid cornflowerblue";
            }}
            onBlur={() => {
              passwordRef.current.style.border = "none";
            }}
          />
        </div>

        <div className="register-user-details confirm-password">Confirm Password</div>
        <div className="register-fields confirm-password">
          <input
            ref={confirmPasswordRef}
            type="password"
            placeholder="Confirm-Password"
            aria-label="confirm-password"
            onFocus={(event) => {
              confirmPasswordRef.current.style.border = "2px solid cornflowerblue";
            }}
            onBlur={() => {
              confirmPasswordRef.current.style.border = "none";
            }}
          />
        </div>

        <div className="Register-btn">
          <button aria-label="register-button" onClick={handleClick}>
            Register
          </button>
        </div>

        <div className="account-confirmation">
          Have already an account ?{" "}
          <Link to="/login" style={{ textDecoration: "none", color: "rgb(51 65 85)" }}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountRegister;
