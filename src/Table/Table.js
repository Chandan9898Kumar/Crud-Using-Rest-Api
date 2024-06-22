import React, { memo } from "react";

import "./table.css";
import PropTypes from "prop-types";

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
              <td>
                {item.topics.map((items) => (
                  <span key={items}>
                    {items},{"  "}
                  </span>
                ))}{" "}
              </td>
              <td>{item.score}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

DataTable.propTypes = {
  tableHead: PropTypes.array.isRequired,
  tableRows: PropTypes.array.isRequired,
};

export default memo(DataTable);
