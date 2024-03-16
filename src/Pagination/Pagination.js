import React, { memo, useEffect, useState } from "react";
import "./pagination.css";
import { LeftArrowIcon, DoubleLeftArrowIcon, RightArrowIcon, DoubleRightArrowIcon } from "../Assets/SvgImage";

const Pagination = () => {
  return (
    <div className="page-container">
      <button>
        <DoubleLeftArrowIcon />
      </button>

      <button>
        <LeftArrowIcon />
      </button>

      <button>
        <RightArrowIcon />
      </button>

      <button>
        <DoubleRightArrowIcon />
      </button>
    </div>
  );
};

export default memo(Pagination);
