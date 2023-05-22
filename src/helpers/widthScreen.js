import React, { useState } from "react";

const widthScreen = ({ screen }) => {
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= screen);
  return isWideScreen;
};

export default widthScreen;
