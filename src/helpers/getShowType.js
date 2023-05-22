

export const getShowTypes = (type) => {
  if (type.toLowerCase() == "movies") {
    return "movie";
  } else if (type.toLowerCase() == "series" || type.toLowerCase() == "tv" ) {
    return "tv";
  } else {
    return "";
  }
};


