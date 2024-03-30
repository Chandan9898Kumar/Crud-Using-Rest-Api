import React from "react";
import ToDoNavLinkSideContent from "./ToDoNavLink";
import { Outlet } from "react-router-dom";
import "./todo.css";
const ToDoMenuDrawer = () => {
  return (
    <ToDoSideDrawer>
      <ToDoNavLinkSideContent />
    </ToDoSideDrawer>
  );
};

export default ToDoMenuDrawer;

export const ToDoSideDrawer = ({ children }) => {
  return (
    <div className="SideDrawerHead">
      {children}
      <div className="outlet-component">
        <Outlet />
      </div>
    </div>
  );
};
