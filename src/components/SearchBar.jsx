import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [typed, setTyped] = useState("");
  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (typed != "") {
      if (e.key === "Enter") {
        navigate(`/Search/${typed}`);
        setTyped("");
      }
    }
  };

  return (
    <div className="searchBar">
      <div className="searchBarContainer">
        <div
          className="searchIcon"
          onClick={(e) => {
            handleKeyPress(e);
          }}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
        <input
          type="text"
          value={typed}
          placeholder="Search..."
          onChange={(e) => {
            setTyped(e.target.value);
          }}
          onKeyDown={(e) => {
            handleKeyPress(e);
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
