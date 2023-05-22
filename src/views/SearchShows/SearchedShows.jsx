import React, { useEffect, useContext, useState } from "react";
import CardsList from "../../components/CardsList";
import DataContext from "../../context/Context";
import Loader from "../../helpers/Loader";
import CounterPage from "../../components/CounterPage";
import { useParams } from "react-router-dom";

const SearchedShows = () => {
  const { getSearchedData, searchedData } = useContext(DataContext);
  const [pageOff, setPageOff] = useState(1);
  const [page, setPage] = useState(1);
  const { typed } = useParams();

  useEffect(() => {
    getSearchedData(typed, page);
    setPage(1);
  }, [typed]);

  useEffect(() => {
    getSearchedData(typed, page);
  }, [page]);
  return (
    <>
      {searchedData == null ? (
        <Loader />
      ) : (
        <div className="cardsContainer searchedContainer">
          <div className="searchedHead">
            <p className="title">Results for: {typed}</p>
            <div className="hLine"></div>
          </div>

          <div className="cards cardsSearched">
            {searchedData.length > 0 ? (
              <CardsList data={searchedData} />
            ) : (
              <div className="noSearch">
                <p>No data</p>
              </div>
            )}
          </div>
          <CounterPage
            setPage={setPage}
            page={page}
            length={searchedData.length}
          />
        </div>
      )}
    </>
  );
};

export default SearchedShows;
