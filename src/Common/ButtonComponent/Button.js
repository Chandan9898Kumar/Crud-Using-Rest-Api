import React, { memo } from "react";
import PropTypes from "prop-types";
const Button = ({ size, variant, type, onClick, children, ...props }) => {
  
  const buttonStyle = {
    border: "none",
    borderRadius: "4px",
    fontSize: "8px",
    color: "#fff",
    backgroundColor: "#54a0ff", // Blue Color
    cursor: "pointer",
  };

  if (size === "lg") {
    buttonStyle.height = "40px";
    buttonStyle.fontSize = "18px";
  } else if (size === "sm") {
    buttonStyle.height = "16px";
    buttonStyle.fontSize = "10px";
  }

  if (variant === "warning") buttonStyle.backgroundColor = "#ff0000"; //  Red Color
  if (variant === "success") buttonStyle.backgroundColor = "#2ecc71"; // Green Color

  return (
    <button type={type} onClick={onClick} style={buttonStyle}>
      {children}
    </button>
  );
};

Button.propTypes = {
  size: PropTypes.string,
  variant: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.any,
};

export default memo(Button);

/**                                                         Button Props
 * 
1.   <Button type="submit" variant="primary" size={"lg"}> Submit data </Button>

2.   <Button type="reset" variant="warning" size={"sm"} onClick={() => modify_formTwoSearch("")}> Clear Form </Button>

3.   <Button type="submit" variant="success" size={"sm"}> Search </Button>


 * 
 * 
 * 
 */
