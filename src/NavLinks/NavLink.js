import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavLinks = () => {
  return (
    <div>
      <div>
        <div>
          <NavLink to="/" caseSensitive className={({ isActive }) => (isActive ? "isActive" : "")}>
            Home
          </NavLink>
        </div>
        <div>
          <NavLink to="/service" caseSensitive className={({ isActive }) => (isActive ? "isActive" : "")}>
            Services
          </NavLink>
        </div>
        <div>
          <NavLink to="/contact" caseSensitive className={({ isActive }) => (isActive ? "isActive" : "")}>
            contact
          </NavLink>
        </div>
        <div>
          <NavLink to="/application" caseSensitive className={({ isActive }) => (isActive ? "isActive" : "")}>
            Application
          </NavLink>
        </div>
        <div>
          <NavLink to="/todo" caseSensitive className={({ isActive }) => (isActive ? "isActive" : "")}>
            ToDo-App
          </NavLink>
        </div>
      </div>
      <div>
        <button>Login</button>
      </div>
    </div>
  );
};

export default NavLinks;
