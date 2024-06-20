import React, { memo } from "react";

import PropTypes from "prop-types";

const Input = ({ value, label = "", type = "", placeholder = "", handleChange, error = "", id = "", height = "", ...otherProps }) => {
  const styles = {
    inputHead: {
      padding: "5px 8px",
      border: "1px solid grey",
      outline: "none",
      borderRadius: "5px",
      height: height,
      fontSize: "18px",
    },
    input_container: {
      display: "grid",
      gridAutoColumns: "minmax(0, 1fr)",
      gridAutoFlow: "column",
      position: "relative",
    },
    label: {
      textTransform: "uppercase",
      fontSize: "15px",
      fontWeight: 500,
    },
  };

  return (
    <div style={styles.input_container}>
      {label && (
        <label htmlFor={id} style={styles.label}>
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        style={styles.inputHead}
        onFocus={(event) => (event.target.style.border = "2px solid cornflowerblue")}
        onBlur={(event) => (event.target.style.border = "2px solid grey")}
        {...otherProps}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

Input.propTypes = {
  value: PropTypes.any,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string,
  height: PropTypes.any,
  handleChange: PropTypes.func,
};
export default memo(Input);
