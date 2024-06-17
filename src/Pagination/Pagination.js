import React, { memo, useMemo } from "react";

import "./pagination.css";
import PropTypes from "prop-types";

import { LeftArrowIcon, DoubleLeftArrowIcon, RightArrowIcon, DoubleRightArrowIcon } from "../Assets/SvgImage";

const Pagination = ({ ITEM_PER_PAGE, totalItem, paginatedItems, currentPage, onPreviousClick, onPreviousLastClick, onNextClick, onNextLastClick }) => {
  const totalItemCount = useMemo(() => {
    return totalItem && totalItem.length;
  }, [totalItem]);

  const TOTAL_PAGE = Math.ceil(totalItem?.length / ITEM_PER_PAGE);

  const startItem = (currentPage - 1) * ITEM_PER_PAGE + 1;
  const endItem = Math.min(currentPage * ITEM_PER_PAGE, totalItemCount);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage * ITEM_PER_PAGE >= totalItemCount;

  return (
    <div className="page-container">
      <div className="page-heading">{`${totalItemCount === 0 ? 0 : startItem} - ${endItem} of ${totalItemCount}`}</div>

      <button aria-label="previousLastClick" className={isFirstPage ? "arrow-button-inactive" : "arrow-button-active"} disabled={isFirstPage} onClick={onPreviousLastClick}>
        <DoubleLeftArrowIcon height={20} width={18} />
      </button>

      <button aria-label="lastClick" className={isFirstPage ? "arrow-button-inactive" : "arrow-button-active"} disabled={isFirstPage} onClick={onPreviousClick}>
        <LeftArrowIcon height={20} width={18} />
      </button>

      <button aria-label="nextClick" className={isLastPage ? "arrow-button-inactive" : "arrow-button-active"} disabled={isLastPage} onClick={onNextClick}>
        <RightArrowIcon height={20} width={18} />
      </button>

      <button aria-label="lastNextClick" className={isLastPage ? "arrow-button-inactive" : "arrow-button-active"} disabled={isLastPage} onClick={() => onNextLastClick(TOTAL_PAGE)}>
        <DoubleRightArrowIcon height={20} width={18} />
      </button>
    </div>
  );
};

Pagination.propTypes = {
  ITEM_PER_PAGE: PropTypes.number.isRequired,
  totalItem: PropTypes.array.isRequired,
  paginatedItems: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPreviousClick: PropTypes.func.isRequired,
  onPreviousLastClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
  onNextLastClick: PropTypes.func.isRequired,
};
export default memo(Pagination);
