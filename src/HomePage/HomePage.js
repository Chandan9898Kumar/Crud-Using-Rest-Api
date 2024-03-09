import React from "react";
import "./home.css";
import { HomeImage } from "../Assets/SvgImage";
const Home = () => {
  return (
    <div className="container">
      <div className="image-head">
        <div>
          <HomeImage width={40} height={40} />
        </div>
        <div>
          <div className="text">Home Page</div>
          <p className="sub-text">filtering out the data according to given date range.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
