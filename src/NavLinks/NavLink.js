import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Nav.css";
import DarkModeToggleModified from '../DarkLightTheme/Mode'
const NavLinks = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
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
      <div className="heading">
        {<DarkModeToggleModified />}
        <div className="log-out-button">
          <button onClick={handleClick}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default NavLinks;
