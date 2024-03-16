import React, { memo, useEffect, useState, useMemo } from "react";
import "./pagination.css";
import { LeftArrowIcon, DoubleLeftArrowIcon, RightArrowIcon, DoubleRightArrowIcon } from "../Assets/SvgImage";

const Pagination = ({ ITEM_PER_PAGE, totalItem, paginatedItems, currentPage, lastPage, decreasePage, increasePage, firstPage }) => {
  const Total_Item = useMemo(() => {
    return totalItem && totalItem.length;
  }, [totalItem]);

  const start = 1;
  const end = 10;

  return (
    <div className="page-container">
      <div className="page-heading">{`${start} - ${end} of ${Total_Item}`}</div>
      <button onClick={lastPage}>
        <DoubleLeftArrowIcon />
      </button>

      <button onClick={decreasePage}>
        <LeftArrowIcon />
      </button>

      <button onClick={increasePage}>
        <RightArrowIcon />
      </button>

      <button onClick={firstPage}>
        <DoubleRightArrowIcon />
      </button>
    </div>
  );
};

export default memo(Pagination);
