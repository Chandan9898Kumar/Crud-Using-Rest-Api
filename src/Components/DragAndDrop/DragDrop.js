import React, { lazy, Suspense } from "react";
const DragDropOne = lazy(() => import("./DragDropOne"));

const DragDrop = () => {
  return (
    <Suspense fallback='Loading...'>
      <DragDropOne />
    </Suspense>
  );
};

export default DragDrop;
