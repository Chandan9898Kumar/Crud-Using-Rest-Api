import React, { memo } from "react";

import PropTypes from "prop-types";

import Loader from "../../Loader/Loader";
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
