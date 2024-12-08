import React from "react";

import { NavLink, useParams } from "react-router-dom";

import "./todo.css";
const ToDoNavLinkSideContent = () => {
  const { id } = useParams();
  return (
    <div className="side-bar-sub-head-link">
      <div className="div-Width">
        <NavLink to="/todo" caseSensitive className={({ isActive }) => (isActive ? "isActiveLink" : "staticLink")} unstable_viewTransition>
          All Project List
        </NavLink>
      </div>
      <div className="div-Width">
        <NavLink to="/create-app" caseSensitive className={({ isActive }) => (isActive ? "isActiveLink" : "staticLink")} unstable_viewTransition>
          Create New Project
        </NavLink>
      </div>
      <div className="div-Width">
        <NavLink to={`/edit/${id}`} caseSensitive className={({ isActive }) => (isActive ? "isActiveLink" : "staticLink")} unstable_viewTransition>
          Edit Project
        </NavLink>
      </div>
      <div className="div-Width">
        <NavLink to={`/show/${id}`} caseSensitive className={({ isActive }) => (isActive ? "isActiveLink" : "staticLink")} unstable_viewTransition>
          Show Projects
        </NavLink>
      </div>
    </div>
  );
};

export default ToDoNavLinkSideContent;
