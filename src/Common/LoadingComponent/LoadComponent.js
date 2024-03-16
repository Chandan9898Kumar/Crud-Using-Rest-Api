import React, { memo } from "react";
import Loader from "../../Loader/Loader";
const LoadComponent = ({ load, children }) => {
  return (
    <React.Fragment>
      {load && <Loader />}

      {children}
    </React.Fragment>
  );
};

export default memo(LoadComponent);
