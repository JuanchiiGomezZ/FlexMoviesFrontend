import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faAngleLeft,
  faAngleUp,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";

const CategoriesNav = ({ type }) => {
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 900);
  const { showType } = useParams();
  const [openCategories, setOpenCategories] = useState(false);

  if (isWideScreen) {
    return (
      <div className="categoriesNav">
        <div className="navFirst">
          <p>{type}</p>
          <div className="categoriesContainer">
            <div
              className="categoriesBtn"
              onClick={() => {
                setOpenCategories(!openCategories);
              }}
            >
              <p>Categories</p>
              <FontAwesomeIcon icon={faAngleRight} />
            </div>
          </div>
        </div>
        <div
          className={`categories ${openCategories ? "active" : "hidden"}`}
          id="categoriesPC"
        >
          {showType == "Movies" ? (
            <>
              <Link
                to="/Show/Movies/All"
                onClick={() => {
                  setOpenCategories(!openCategories);
                }}
              >
                All Movies
              </Link>{" "}
              |
              <Link
                to="/Show/Movies/Popular"
                onClick={() => {
                  setOpenCategories(!openCategories);
                }}
              >
                Popular
              </Link>{" "}
              |
              <Link
                to="/Show/Movies/Now_Playing"
                onClick={() => {
                  setOpenCategories(!openCategories);
                }}
              >
                Now Playing
              </Link>{" "}
              |
              <Link
                to="/Show/Movies/Upcoming"
                onClick={() => {
                  setOpenCategories(!openCategories);
                }}
              >
                Upcoming
              </Link>
              |
              <Link
                to="/Show/Movies/Top_Rated"
                onClick={() => {
                  setOpenCategories(!openCategories);
                }}
              >
                Top rated
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/Show/Series/All"
                onClick={() => {
                  setOpenCategories(!openCategories);
                }}
              >
                All Series
              </Link>{" "}
              |
              <Link
                to="/Show/Series/Popular"
                onClick={() => {
                  setOpenCategories(!openCategories);
                }}
              >
                Popular
              </Link>{" "}
              |
              <Link
                to="/Show/Series/Airing_Today"
                onClick={() => {
                  setOpenCategories(!openCategories);
                }}
              >
                Airing Today
              </Link>{" "}
              |
              <Link
                to="/Show/Series/Top_Rated"
                onClick={() => {
                  setOpenCategories(!openCategories);
                }}
              >
                Top rated
              </Link>
            </>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="categoriesNavMobile">
        <div className="categoriesNavMobileContainer">
          <p>{type}</p>
          <div
            className="categoriesBtn"
            onClick={() => {
              setOpenCategories(!openCategories);
            }}
          >
            <p>Categories</p>
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
        </div>
        <div
          className={`categoriesContainer ${
            openCategories ? "active" : "hidden"
          }`}
          id="mobileCategories"
        >
          {showType == "Movies" ? (
            <>
              <Link
                to={`/Show/${showType}/All`}
                onClick={() => {
                  setOpenCategories(!openCategories);
                }}
              >
                All Movies
              </Link>
              <Link
                to={`/Show/${showType}/Popular`}
                onClick={() => {
                  setOpenCategories(!openCategories);
                }}
              >
                Popular
              </Link>
              <Link
                to={`/Show/${showType}/Now_Playing`}
                onClick={() => {
                  setOpenCategories(!openCategories);
                }}
              >
                Now Playing
              </Link>
              <Link
                to={`/Show/${showType}/Upcoming`}
                onClick={() => {
                  setOpenCategories(!openCategories);
                }}
              >
                Upcoming
              </Link>
              <Link
                to={`/Show/${showType}/Top_Rated`}
                onClick={() => {
                  setOpenCategories(!openCategories);
                }}
              >
                Top rated
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/Show/Series/All"
                onClick={() => {
                  setOpenCategories(!openCategories);
                }}
              >
                All Series
              </Link>
              <Link
                to="/Show/Series/Popular"
                onClick={() => {
                  setOpenCategories(!openCategories);
                }}
              >
                Popular
              </Link>
              <Link
                to="/Show/Series/Airing_Today"
                onClick={() => {
                  setOpenCategories(!openCategories);
                }}
              >
                Airing Today
              </Link>
              <Link
                to="/Show/Series/Top_rated"
                onClick={() => {
                  setOpenCategories(!openCategories);
                }}
              >
                Top rated
              </Link>
            </>
          )}
        </div>
      </div>
    );
  }
};

export default CategoriesNav;
