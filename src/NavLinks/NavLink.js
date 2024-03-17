import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Nav.css";
import DarkModeToggleModified from "../DarkLightTheme/Mode";
import { SettingIcon } from "../Assets/SvgImage";
const NavLinks = () => {
  const [isClick, setIsClick] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
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
          <NavLink to="/service" caseSensitive className={({ isActive }) => (isActive ? "isActive" : "static")}>
            Services
          </NavLink>
        </div>
        <div>
          <NavLink to="/contact" caseSensitive className={({ isActive }) => (isActive ? "isActive" : "static")}>
            contact
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
      </div>
    </div>
  );
};

export default NavLinks;
