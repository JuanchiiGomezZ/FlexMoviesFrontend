import React, { useState } from "react";

const ScoreBar = ({ score }) => {
    
  const scorePercentage = () => {
    if (score > 0) return Math.round(score * 10) + "%";
    else return "NR";
  };

  const scoreBarColorSelector = (score) => {
    if (score >= 7) {
      return "#20ca77";
    } else if (score >= 5) {
      return "#D2D531";
    } else if (score > 0) {
      return "#DB2360";
    } else {
      return "#5A5D5D";
    }
  };
  return (
    <div className="score">
      <div className="scoreContainer">
        <div
          className="outerCircle"
          style={{ backgroundColor: scoreBarColorSelector(score) }}
        >
          <div className="innerCircle">{scorePercentage()}</div>
        </div>
        <div className="scoreBar">
          <div
            className="progress"
            style={{
              width: scorePercentage(),
              backgroundColor: scoreBarColorSelector(score),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ScoreBar;
