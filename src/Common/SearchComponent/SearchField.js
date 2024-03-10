import React, { memo } from "react";
import { SearchIcon } from "../../Assets/SvgImage";
import PropTypes from "prop-types";
import "./Search.css";
const SearchFiled = ({ value, callBackFun, placeholder, label, type }) => {
  return (
    <div className="search-container">
      <SearchIcon width={28} height={28} color={"black"} />
      <input type={type} value={value} placeholder={placeholder} aria-label={label} onChange={callBackFun} />
    </div>
  );
};

SearchFiled.propTypes = {
  value: PropTypes.string,
  callBackFun: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
};

export default memo(SearchFiled);
