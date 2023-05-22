import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import CardsList from './CardsList';
import DataContext from '../context/Context';
import Loader from '../helpers/Loader';
import CounterPage from './CounterPage';
import { getShowTypes } from '../helpers/getShowType';

const CardsListedContainer = ({ sortSelected, genreSelected }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { getShowData, showsData } = useContext(DataContext);

  const { showCategorie, showType } = useParams();

  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      await getShowData(page, getShowTypes(showType), showCategorie.toLowerCase(), sortSelected, genreSelected);
      setPage(1);
      setIsLoading(false);
    }
    fetchData();
  }, [showCategorie, sortSelected, genreSelected]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      await getShowData(page, getShowTypes(showType), showCategorie.toLowerCase(), sortSelected, genreSelected);
      setIsLoading(false);
    }
    fetchData();
  }, [page]);

  return (
    <>
      {showsData == null || isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="cardsContainer">
            <div className="head">
              <p className="title">{`${showCategorie.replace('_', ' ')} ${showType}`}</p>
              <div className="hLine"></div>
            </div>

            <div className="cards">
              <CardsList data={showsData.results} type={showType} />
            </div>
            <CounterPage setPage={setPage} page={page} length={showsData.results.length} />
          </div>
        </>
      )}
    </>
  );
};

export default CardsListedContainer;
