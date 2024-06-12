import React, { useState } from "react";

import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./Nav.css";
import { SettingIcon } from "../Assets/SvgImage";
import DarkModeToggleModified from "../DarkLightTheme/Mode";

const NavLinks = () => {
  const [isClick, setIsClick] = useState(false);
  const navigate = useNavigate();

  const authorizedToken = localStorage.getItem("token");

  const handleClick = () => {
    setIsClick(!isClick);
  };

  const handleLogOut = () => {
    localStorage.setItem("token", "");
    navigate("/login");
    setIsClick(!isClick);
  };

  return (
    <div className="container-link">
      <div className="nav-link">
        <div>
          <NavLink to="/" caseSensitive className={({ isActive }) => (isActive ? "isActive" : "static")}>
            Home
          </NavLink>
        </div>
        <div>
          <NavLink to="/drag-drop" caseSensitive className={({ isActive }) => (isActive ? "isActive" : "static")}>
            Drag & Drop
          </NavLink>
        </div>
        <div>
          <NavLink to="/contact" caseSensitive className={({ isActive }) => (isActive ? "isActive" : "static")}>
            Practice
          </NavLink>
        </div>
        <div>
          <NavLink to="/application" caseSensitive className={({ isActive }) => (isActive ? "isActive" : "static")}>
            Application
          </NavLink>
        </div>
        <div>
          <NavLink to="/todo" caseSensitive className={({ isActive }) => (isActive ? "isActive" : "static")}>
            ToDo_App
          </NavLink>
        </div>
      </div>

      <div className="button-heading">
        {<DarkModeToggleModified />}
        {authorizedToken ? (
          <div className="setting-icon">
            <button onClick={handleClick}>
              <SettingIcon />
            </button>
            {isClick && (
              <div className="text-button">
                <button onClick={handleLogOut}>Login Out</button>
              </div>
            )}
          </div>
        ) : (
          <div className="setting-icon">
            <button onClick={handleClick}>
              <SettingIcon />
            </button>
            {isClick && (
              <div className="text-button">
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsClick(!isClick);
                  }}
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setIsClick(!isClick);
                    navigate("/register");
                  }}
                >
                  Register
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavLinks;
