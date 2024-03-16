import React, { memo, useMemo } from "react";
import "./pagination.css";
import { LeftArrowIcon, DoubleLeftArrowIcon, RightArrowIcon, DoubleRightArrowIcon } from "../Assets/SvgImage";

const Pagination = ({ ITEM_PER_PAGE, totalItem, paginatedItems, currentPage, onPreviousClick, previousLastPage, onNextClick, nextLastPage }) => {
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
      <div className="page-heading">{`${startItem} - ${endItem} of ${totalItemCount}`}</div>

      <button className={isFirstPage ? "arrow-button-inactive" : "arrow-button-active"} disabled={isFirstPage} onClick={previousLastPage}>
        <DoubleLeftArrowIcon height={20} width={18} />
      </button>

      <button className={isFirstPage ? "arrow-button-inactive" : "arrow-button-active"} disabled={isFirstPage} onClick={onPreviousClick}>
        <LeftArrowIcon height={20} width={18} />
      </button>

      <button className={isLastPage ? "arrow-button-inactive" : "arrow-button-active"} disabled={isLastPage} onClick={onNextClick}>
        <RightArrowIcon height={20} width={18} />
      </button>

      <button className={isLastPage ? "arrow-button-inactive" : "arrow-button-active"} disabled={isLastPage} onClick={() => nextLastPage(TOTAL_PAGE)}>
        <DoubleRightArrowIcon height={20} width={18} />
      </button>
    </div>
  );
};

export default memo(Pagination);
