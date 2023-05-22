import React, { useState, useContext, useEffect } from "react";
import DataContext from "../../context/Context";
import CategoriesNav from "../../components/CategoriesNav";
import CardsCarrousel from "../../components/CardsCarrousel";
import Loader from "../../helpers/Loader";

const Movies = () => {
  const {
    getMoviesData,
    moviesPopular,
    moviesTopRated,
    moviesNowPlaying,
    moviesUpcoming,
  } = useContext(DataContext);

  useEffect(() => {
    getMoviesData("popular"),
      getMoviesData("top_rated"),
      getMoviesData("now_playing"),
      getMoviesData("upcoming");
  }, []);

  return (
    <>
      {moviesPopular == null ||
      moviesTopRated == null ||
      moviesNowPlaying == null ||
      moviesUpcoming == null ? (
        <Loader />
      ) : (
        <div className="categoriesShows">
          <CategoriesNav type={"MOVIES"} />
          <CardsCarrousel
            data={moviesPopular.results}
            type={"Movies"}
            categorie={"Popular"}
          />
          <CardsCarrousel
            data={moviesNowPlaying.results}
            type={"Movies"}
            categorie={"Airing Today"}
          />
          <CardsCarrousel
            data={moviesUpcoming.results}
            type={"Movies"}
            categorie={"Upcoming"}
          />
          <CardsCarrousel
            data={moviesTopRated.results}
            type={"Movies"}
            categorie={"Rated"}
          />
        </div>
      )}
    </>
  );
};

export default Movies;
