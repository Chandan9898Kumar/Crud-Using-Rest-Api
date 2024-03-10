import React, { memo, useState } from "react";
import { SearchIcon } from "../../Assets/SvgImage";
import PropTypes from "prop-types";
import "./Search.css";
const SearchFiled = ({ value, callBackFun, placeholder, label, type }) => {
  const [isFocus, setIsFocused] = useState(false);
  return (
    <div className={isFocus ? "search-container focus" : "search-container"}>
      <SearchIcon width={28} height={28} color={"black"} />
      <input onBlur={() => setIsFocused(false)} onFocus={() => setIsFocused(true)} type={type} value={value} placeholder={placeholder} aria-label={label} onChange={callBackFun} />
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
