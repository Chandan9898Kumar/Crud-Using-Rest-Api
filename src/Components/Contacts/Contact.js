import React, { lazy } from "react";
const ReUsableTable = lazy(() => import("../../Common/ReUsableTable/ReUsableTable"));

const headers = [
  { title: "Name", value: "name" },
  { title: "Phone Number", value: "phone" },
  { title: "Email", value: "email" },
  { title: "website", value: "website" },
];

const Contact = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h2>Table Component</h2>
        <ReUsableTable headers={headers} />
      </div>
    </>
  );
};
export default Contact;
