import React, { useRef, useState } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { isEmail } from "../RegEx";
import ComponentModal from "../Common/ModalComponent/Modal";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(function (config) {
  config.headers["X-Binarybox-Api-Key"] = process.env.REACT_APP_API_KEY;
  return config;
});

const AccountRegister = () => {
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState("");
  const [isOPen, setIsOpen] = useState(false);
  const nameRef = useRef("");
  const emailRef = useRef(" ");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");

  const handleRegister = () => {
    setIsOpen(false);
    const isEmailValid = isEmail(emailRef.current.value);
    const isPasswordMatched = passwordRef.current.value === confirmPasswordRef.current.value;

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: confirmPasswordRef.current.value,
    };

    if (isEmailValid && isPasswordMatched) {
      axios
        .post("/api/register", payload)
        .then((Response) => {
          setValidationErrors("");
          localStorage.setItem("credentials", JSON.stringify({ userAuth: Response.data, credentials: payload }));
          localStorage.setItem("token", Response.data.token);
          navigate("/login");
        })
        .catch((error) => {
          if (error.response.data.message !== undefined) {
            setValidationErrors(error.response.data.message);
          }
        });
    } else {
      setValidationErrors("Something went wrong, please verify your details.");
    }
  };

  return (
    <div className="register-container">
      {isOPen && (
        <ComponentModal
          titleMessage={"Are You Sure You Want to Continue?"}
          bodyMessage={"After Moving ahead you will be redirect to login page"}
          cancelText={"Cancel"}
          continueText={"Proceed"}
          handleCancel={setIsOpen}
          handleProceed={handleRegister}
        />
      )}
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
          <button aria-label="register-button" onClick={() => setIsOpen(true)}>
            Register
          </button>
        </div>

        <div className="account-confirmation">
          Have already an account ?{" "}
          <Link to="/login" style={{ textDecoration: "none", color: "rgb(51 65 85)" }}>
            Login
          </Link>
        </div>
        {Boolean(validationErrors) && (
          <div style={{ color: "red", width: "max-content", position: "relative", top: "70px", left: "28px", overflow: "hidden", display: "inline-block", fontSize: "18px" }}>{validationErrors}</div>
        )}
      </div>
    </div>
  );
};

export default AccountRegister;
