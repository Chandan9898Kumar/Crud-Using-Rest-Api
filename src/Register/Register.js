import React from "react";
import "./register.css";
const AccountRegister = () => {
  return (
    <div className="register-container">
      <div className="register-form">
        <h3>Register</h3>
        <div className="register-user-name">UserName</div>
        <div className="register-name-filed">
          <input type="text" placeholder="Name" aria-label="name" />
        </div>
      </div>
    </div>
  );
};

export default AccountRegister;
