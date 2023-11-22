import React, { useEffect, useState, useContext } from "react";
import DataContext from "../../context/Context";
import HomePoster from "../../components/HomePoster";
import CardsCarrousel from "../../components/CardsCarrousel";
import Loader from "../../helpers/Loader";

const Home = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(false);
  const {
    getMoviesData,
    moviesPopular,

    getSeriesData,
    seriesTopRated,
  } = useContext(DataContext);

  useEffect(() => {
    getMoviesData("popular",1);
    getSeriesData("top_rated");
    
  }, []);

  if (moviesPopular == null || seriesTopRated == null || isLoading) {
    return <Loader />;
  } else {
    return (
      <div className="homeContainer">
        <HomePoster data={moviesPopular.results} />
        <CardsCarrousel
          data={moviesPopular.results}
          type={"Movies"}
          categorie={"Rating"}
        />
        <CardsCarrousel
          data={seriesTopRated.results}
          type={"Series"}
          categorie={"Rating"}
        />
      </div>
    );
  }
};

export default Home;
