import React, { useState, useContext, useEffect } from "react";
import DataContext from "../../context/Context";
import CategoriesNav from "../../components/CategoriesNav";
import CardsCarrousel from "../../components/CardsCarrousel";
import Loader from "../../helpers/Loader";

const Series = () => {
  const { getSeriesData, seriesPopular, seriesTopRated, seriesAiringToday } =
    useContext(DataContext);

  useEffect(() => {
    getSeriesData("popular");
    getSeriesData("top_rated");
    getSeriesData("airing_today");
  }, []);

  return (
    <>
      {seriesPopular == null ||
      seriesTopRated == null ||
      seriesAiringToday == null ? (
        <Loader />
      ) : (
        <div className="categoriesShows">
          <CategoriesNav type={"SERIES"} />
          <CardsCarrousel
            data={seriesPopular.results}
            type={"series"}
            categorie={"Popular"}
          />
          <CardsCarrousel
            data={seriesAiringToday.results}
            type={"series"}
            categorie={"Airing Today"}
          />
          <CardsCarrousel
            data={seriesTopRated.results}
            type={"series"}
            categorie={"Rated"}
          />
        </div>
      )}
    </>
  );
};

export default Series;
