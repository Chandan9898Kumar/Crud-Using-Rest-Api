import React from "react";

import "./sortAble.css";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import { useSortableTable } from "./useSortableTable";

const SortableTable = ({ caption, data, columns }) => {
  const [tableData, handleSorting] = useSortableTable(data, columns);

  return (
    <table className="table-sort">
      <caption>{caption}</caption>
      <TableHead {...{ columns, handleSorting }} />
      <TableBody {...{ columns, tableData }} />
    </table>
  );
};

export default SortableTable;
