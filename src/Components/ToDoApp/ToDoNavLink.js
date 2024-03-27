import React from "react";
import { NavLink, useParams } from "react-router-dom";

import "./todo.css";
const ToDoNavLinkSideContent = () => {
  const { id } = useParams();
  return (
    <div className="side-bar-head-link">
      <div className="side-bar-sub-head-link">
        <div>
          <NavLink to="/todo" caseSensitive className={({ isActive }) => (isActive ? "isActive" : "static")}>
            All Project List
          </NavLink>
        </div>
        <div>
          <NavLink to="/create-app" caseSensitive className={({ isActive }) => (isActive ? "isActive" : "static")}>
            Create New Project
          </NavLink>
        </div>
        <div>
          <NavLink to={`/edit/${id}`} caseSensitive className={({ isActive }) => (isActive ? "isActive" : "static")}>
            Edit Project
          </NavLink>
        </div>
        <div>
          <NavLink to={`/show/${id}`} caseSensitive className={({ isActive }) => (isActive ? "isActive" : "static")}>
            Show Project
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ToDoNavLinkSideContent;
