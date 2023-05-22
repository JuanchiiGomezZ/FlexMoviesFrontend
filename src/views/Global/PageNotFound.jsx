import React from "react";
import pageNotFound from "../../assets/images/pageNotFound.png";
import { Link } from "react-router-dom";


const PageNotFound = () => {
  return (
    <div className="pageNotFound">
      <img src={pageNotFound} alt="Kitty" />
      <div className="errorDet">
        <p className="error">404 - Page Not Found</p>
        <p className="yuzuText">Yuzu says there´s nothing to see here!</p>
        <Link to="/" className="goHomeBtn">TAKE ME TO HOME</Link>
      </div>
    </div>
  );
};

export default PageNotFound;
