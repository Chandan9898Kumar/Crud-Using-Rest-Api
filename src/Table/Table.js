import React, { useState, useEffect, memo } from "react";
import "./table.css";
const DataTable = ({ tableHead, tableRows }) => {
  return (
    <table id="table">
      <thead>
        <tr>
          {tableHead?.map((item) => {
            return <th key={item}>{item}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {tableRows?.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.default_branch}</td>
              <td>{item.language}</td>
              <td>{item.forks}</td>
              <td>{item.git_url}</td>
              <td>{"N / A"}</td>
              <td>{item.score}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default memo(DataTable);
