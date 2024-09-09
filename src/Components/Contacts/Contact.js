import React, { lazy, useState, Suspense, useMemo, memo } from "react";

import "./contact.css";
import useFetch from "../../Hooks/UseFetch";
import tableData1 from "../../MockData/tableData1.json";
import tableData2 from "../../MockData/tableData2.json";
const ReUsableTable = lazy(() => import("../../Common/ReUsableTable/ReUsableTable"));

//   SortAble Table

const SortableTable = lazy(() => import("../../Common/SortableTable/SortableTable"));

const columnWithByDefaultSorting = [
  { label: "Full Name", accessor: "full_name", sortable: true },
  { label: "Email", accessor: "email", sortable: false },
  { label: "Gender", accessor: "gender", sortable: true, sortbyOrder: "desc" },
  { label: "Age", accessor: "age", sortable: true },
  { label: "Start date", accessor: "start_date", sortable: true },
];

const columnsWithNoByDefaultSorting = [
  { label: "Name", accessor: "name", sortable: true },
  { label: "Country", accessor: "country", sortable: true },
  { label: "GitHub username", accessor: "github_username", sortable: true },
  { label: "Course price", accessor: "money", sortable: true },
];
// ==========================
const headers = [
  { title: "Name", value: "name" },
  { title: "Phone Number", value: "phone" },
  { title: "Email", value: "email" },
  { title: "website", value: "website" },
];

const API = "https://jsonplaceholder.typicode.com/users";

const Contact = () => {
  const [search, setSearch] = useState("");
  const [data, isError, isLoading] = useFetch(API);

  const onSearch = (event) => {
    setSearch(event.target.value);
  };

  const searchedData = useMemo(() => {
    return data?.filter((item) => {
      return search.trim() === "" ? item : item.name.toLowerCase().includes(search);
    });
  }, [search, data]);

  return (
    <React.Fragment>
      <div style={{ padding: "20px 40px" }}>
        <input
          style={{
            height: "35px",
            outline: "none",
            width: "100%",
            maxWidth: "400px",
            textAlign: "justify",
            fontSize: "18px",
            fontWeight: "500",
            border: "2px solid transparent",
            borderRadius: "10px",
            transition: ".5s ease",
          }}
          data-testid="input-field"
          type="text"
          name="search"
          id="inputText"
          placeholder="Search"
          pattern="[A-Za-z]"
          value={search}
          onChange={onSearch}
          onFocus={(event) => {
            event.target.style.border = " 2px solid rgba(129, 140, 248)";
          }}
          onBlur={(event) => {
            event.target.style.border = "2px solid transparent";
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Suspense fallback="Loading...">
          <span className="type-writer-effect">
            <span>Table Component</span>
          </span>
          <ReUsableTable headers={headers} isError={isError} isLoading={isLoading} data={searchedData} />

          <SortableTable
            key="byDefaultSort"
            caption="1. Developers currently enrolled in this course. The table below is ordered (descending) by the Gender column."
            data={tableData1}
            columns={columnWithByDefaultSorting}
          />
          <SortableTable key="noByDefaultSort" caption="2. List of developers with an affordable course (has no default sorting)." data={tableData2} columns={columnsWithNoByDefaultSorting} />
        </Suspense>
      </div>
    </React.Fragment>
  );
};
export default memo(Contact);
