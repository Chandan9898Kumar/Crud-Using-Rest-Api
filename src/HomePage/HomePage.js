import React, { useState, useEffect, Suspense, lazy, memo, useMemo, useCallback } from "react";
import "./home.css";
import { HomeIcon, TableIcon } from "../Assets/SvgImage";
import { Api } from "../Apis/Api";
import PropTypes from "prop-types";
const SearchFiled = lazy(() => import("../Common/SearchComponent/SearchField"));
const DateRangePicker = lazy(() => import("../DateRangePicker/DateRange"));
const DataTable = lazy(() => import("../Table/Table"));
const Pagination = lazy(() => import("../Pagination/Pagination"));

const tableHead = ["Repository Name", "Default Branch", "Language", "Fork", "Git URL", "Topics", "Score"];

const Home = () => {
  const [searchedValue, setSearchedValue] = useState("");
  const [userData, setUserDate] = useState([]);
  const [isError, setIsError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEM_PER_PAGE = 10;

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

  //                                                                Search Items By 2 methods

  //                                                                    1st :-
  const globalSearch = useCallback(() => {
    const filteredValues = searchedValue && userData.filter((item) => item?.name?.trim()?.toLowerCase().includes(searchedValue?.trim()?.toLowerCase()));
    return filteredValues && filteredValues.length > 0 ? filteredValues : userData;

    // Here when user search then searched data will be returned if no data found then the entire which came from api will be shown.
    // If there is a scenario which comes : only show data when user type something,If no data is found then show empty [] or any message or don't show anything in search menu
    // Example :   return filteredValues && filteredValues.length > 0 ? filteredValues : []
  }, [searchedValue, userData]);

  const searchedItemFromList = useMemo(() => {
    return globalSearch(); // It will memoize the values which is returned by globalSearch function
  }, [globalSearch]); // Here we passed globalSearch reference as a dependency.

  //                                                                        2nd Method

  // const globalSearch = () => {
  //   return userData.filter((item) => item?.name?.trim()?.toLowerCase().includes(searchedValue?.trim()?.toLowerCase()));
  // };

  // const searchedItemFromList = searchedValue ? globalSearch() : userData;

  // =====================================================================================================================================================

  // Pagination integrated based on search.Whatever data will come after search have pagination.
  // For Ex : after search got 25 data, so autosuggestion bar will show 25 data and in table it will show 10 data per page.

  const paginatedItems = (searchedItemFromList && searchedItemFromList.length > 0 && searchedItemFromList.slice(currentPage * ITEM_PER_PAGE - 10, currentPage * ITEM_PER_PAGE)) || [];

  const increasePage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const decreasePage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const firstPage = () => {
    setCurrentPage(1);
  };

  const lastPage = () => {
    // setCurrentPage(1);
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
          <div className="item-count">{searchedItemFromList?.length || 0}</div>
        </div>
      </div>

      <div className="search">
        <div className="box">
          <Suspense fallback={"Loading ..."}>
            <SearchFiled type="text" value={searchedValue} callBackFun={searchItems} placeholder={"Search Item"} label={"Search"} />
          </Suspense>
          {searchedItemFromList && searchedItemFromList.length > 0 && (
            <div className="Render-List">
              {searchedItemFromList.map((item) => {
                return <AutoComplete key={item.id} item={item} onClick={setSearchedValue} />;
              })}
            </div>
          )}
        </div>
        <Suspense fallback={"Loading..."}>
          <DateRangePicker />
        </Suspense>
      </div>

      <div style={{ position: "relative", top: "80px", padding: "0px 40px" }}>
        <Suspense fallback={"Loading ..."}>
          <DataTable tableHead={tableHead} tableRows={paginatedItems} />
          <Pagination
            ITEM_PER_PAGE={ITEM_PER_PAGE}
            totalItem={searchedItemFromList}
            paginatedItems={paginatedItems}
            currentPage={currentPage}
            increasePage={increasePage}
            decreasePage={decreasePage}
            firstPage={firstPage}
            lastPage={lastPage}
          />
        </Suspense>
      </div>
    </div>
  );
};

// eslint-disable-next-line import/exports-last
export default Home;

// eslint-disable-next-line import/group-exports
const RenderLists = ({ item, onClick }) => {
  return (
    <div className="select-item-container">
      <div className="sub-item-container" onClick={() => onClick(item.name)}>
        {item.name}
      </div>
    </div>
  );
};

RenderLists.propTypes = {
  item: PropTypes.object,
  onClick: PropTypes.func,
};

export const AutoComplete = memo(RenderLists);
