import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import scrollTopOnClick from "../helpers/scrollTopOnClick";

const CounterPage = ({ setPage, page, length }) => {
  const plusCounter = () => {
    if (length < 20) {
    } else {
      
      setPage(page + 1);
      scrollTopOnClick();
    }
  };

  const lessCounter = () => {
    if (page <= 1) {
    } else {
      setPage(page - 1);
      scrollTopOnClick();
    }
  };

  return (
    <div className="counterContainer">
      <div className="counter">
        <div
          className="controls"
          onClick={() => {
            lessCounter();
          }}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </div>
        <div className="page">
          <div className="littleNum">
            <p>{page - 1}</p>
          </div>
          <p>{page}</p>
          <div className="littleNum">
            <p>{page + 1}</p>
          </div>
        </div>

        <div
          className="controls"
          onClick={() => {
            plusCounter();
          }}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </div>
    </div>
  );
};

export default CounterPage;
