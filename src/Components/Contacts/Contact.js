import React, { lazy, useState, Suspense, useMemo } from "react";

import "./contact.css";
import useFetch from "../../Hooks/UseFetch";
const ReUsableTable = lazy(() => import("../../Common/ReUsableTable/ReUsableTable"));

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
          <h2 className="type-writer-effect">Table Component</h2>
          <ReUsableTable headers={headers} isError={isError} isLoading={isLoading} data={searchedData} />
        </Suspense>
      </div>
    </React.Fragment>
  );
};
export default Contact;
