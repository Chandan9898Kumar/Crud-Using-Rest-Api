import React, { useRef, useState } from "react";
import "./login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(function (config) {
  config.headers["X-Binarybox-Api-Key"] = process.env.REACT_APP_API_KEY;
  return config;
});

const AccountLogin = () => {
  const navigate = useNavigate();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [validationErrors, setValidationErrors] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    setIsSubmitting(true);
    try {
      axios
        .post("/api/login", payload)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          setValidationErrors("");
          navigate("/todo");
        })
        .catch((error) => {
          if (error?.response?.data?.message !== undefined) {
            setValidationErrors(error.response.data.message);
          }
        });
    } catch {
      setValidationErrors("Something Went Wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
          />
        </div>
        <div className="login-btn">
          <button disabled={isSubmitting} onClick={handleSubmit}>
            Log In
          </button>
        </div>
        <div className="register">
          Don't have account ?{" "}
          <Link style={{ textDecoration: "none", color: "cornflowerblue" }} to="/register">
            Register Here{" "}
          </Link>
        </div>

        {Boolean(validationErrors) && (
          <div style={{ color: "red", width: "max-content", position: "relative", top: "70px", left: "28px", overflow: "hidden", display: "inline-block", fontSize: "18px" }}>{validationErrors}</div>
        )}
      </div>
    </div>
  );
};

export default AccountLogin;
