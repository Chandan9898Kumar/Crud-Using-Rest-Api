import React, { memo } from "react";

import PropTypes from "prop-types";

import tableStyle from "./usableTable.module.css";
import LoadComponent from "../../Common/LoadingComponent/LoadComponent";
import useFetch from "../../Hooks/UseFetch";


const API = "https://jsonplaceholder.typicode.com/users";

const Table = ({ headers }) => {
  const [data, isError, isLoading] = useFetch(API);

  if (isError) {
    return <p>Error: {isError.message}</p>;
  }

  return (
    <LoadComponent load={isLoading}>
      <table className={tableStyle.table}>
        <thead className={tableStyle.tableThead}>
          <tr>
            {headers?.map((item, index) => {
              return <TableHeader key={index} header={item} />;
            })}
          </tr>
        </thead>

        <tbody>
          {data?.map((user, index) => (
            <TableData user={user} headers={headers} key={index} />
          ))}
        </tbody>
      </table>
    </LoadComponent>
  );
};

const TableHeader = ({ header }) => {
  return <th className={tableStyle.tableTh}>{header.value}</th>;
};

//  NOTE : Make sure the value of each key in your headers array corresponds with the keys in your user object coming from the API
const TableData = ({ user, headers }) => {
  return (
    <tr>
      {headers?.map((header, index) => {
        return (
          <td className={tableStyle.tableTd} key={index}>
            {user[`${header.value}`]}
          </td>
        );
      })}
    </tr>
  );
};

Table.propTypes = {
  headers: PropTypes.array,
};

TableHeader.propTypes = {
  header: PropTypes.any,
};

TableData.propTypes = {
  headers: PropTypes.array,
  user: PropTypes.any,
};

const ReUsableTable = memo(Table);
export default ReUsableTable;
