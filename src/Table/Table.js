import React, { useState, useEffect, memo } from "react";
import "./table.css";
import LoadComponent from "../Common/LoadingComponent/LoadComponent";
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
        <LoadComponent load={tableRows && tableRows.length === 0}>
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
        </LoadComponent>
      </tbody>
    </table>
  );
};

export default memo(DataTable);
