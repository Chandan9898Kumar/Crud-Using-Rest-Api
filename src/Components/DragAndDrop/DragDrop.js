import React, { lazy, Suspense } from "react";
const DragDropOne = lazy(() => import("./DragDropOne"));
const DragDropTwo = lazy(()=>import('./DragDropTwo'))
const DragDrop = () => {
  return (
    <Suspense fallback='Loading...'>
      <DragDropOne />
      <DragDropTwo />
    </Suspense>
  );
};

export default DragDrop;
