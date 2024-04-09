import React, { memo } from "react";
import Loader from "../../Loader/Loader";
import PropTypes from "prop-types";
const LoadComponent = ({ load, children }) => {
  return (
    <React.Fragment>
      {load && <Loader />}

      {children}
    </React.Fragment>
  );
};

LoadComponent.propTypes = {
  load: PropTypes.bool,
  children: PropTypes.any,
};
export default memo(LoadComponent);
