import React, { useState, useEffect, Suspense, lazy } from "react";
import "./home.css";
import { HomeIcon, TableIcon } from "../Assets/SvgImage";
import { Api } from "../Apis/Api";
const SearchFiled = lazy(() => import("../Common/SearchComponent/SearchField"));
const DateRangePicker = lazy(() => import("../DateRangePicker/DateRange"));
const Home = () => {
  const [searchedValue, setSearchedValue] = useState("");
  const [userData, setUserDate] = useState([]);
  const [isError, setIsError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Api.getUsers();
        setUserDate(response.data.items);
      } catch ({ message }) {
        setIsError(message);
      }
    }
    fetchData();
  }, []);

  const searchItems = (event) => {
    setSearchedValue(event.target.value);
  };

  return (
    <div className="container">
      <div className="image-head">
        <div>
          <HomeIcon width={40} height={40} />
        </div>
        <div>
          <div className="text">Home Page</div>
          <p className="sub-text">filtering out the data according to given date range.</p>
        </div>
      </div>
      <div className="item">
        <div className="sub-item">
          <div className="item-text">
            <TableIcon width={40} height={40} />
            Total Items
          </div>
          <div className="item-count">200</div>
        </div>
      </div>
      <div className="search">
        <Suspense fallback={"Loading ..."}>
          <SearchFiled type={"text"} value={searchedValue} callBackFun={searchItems} placeholder={"Search Item"} label={"Search"} />
        </Suspense>
      </div>

      <div className="search">
        <div className="select-item-container">
          {[...Array(50)].fill(1).map((item) => {
            return <div>data</div>;
          })}
        </div>
      </div>

      <div>
        <DateRangePicker />
      </div>
    </div>
  );
};

export default Home;
