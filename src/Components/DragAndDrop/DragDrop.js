import React, { lazy, Suspense } from "react";
const DragDropOne = lazy(() => import("./DragDropOne"));
const DragDropTwo = lazy(() => import("./DragDropTwo"));
const ReUsableTable = lazy(() => import("../../Common/ReUsableTable/ReUsableTable"));

const headers = [
  { title: "Name", value: "name" },
  { title: "Phone Number", value: "phone" },
  { title: "Email", value: "email" },
  { title: "website", value: "website" },
];

const DragDrop = () => {
  return (
    <Suspense fallback="Loading...">
      <DragDropOne />
      <DragDropTwo />
      <ReUsableTable headers={headers} />
    </Suspense>
  );
};

export default DragDrop;
