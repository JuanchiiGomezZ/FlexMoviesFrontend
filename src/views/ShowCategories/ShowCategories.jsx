import React, { useState } from "react";
import CategoriesNav from "../../components/CategoriesNav";
import { useParams } from "react-router-dom";
import CardsListedContainer from "../../components/CardsListedContainer";
import Filter from "../../components/Filter";


const ShowCategorie = () => {
  const { showType, showCategorie } = useParams();
  const [sortSelected, setSortSelected] = useState("popularity.desc");
  const [genreSelected, setGenreSelected] = useState("");
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 775);

  return (
    <>
      <CategoriesNav type={showType.toUpperCase()} />
      <div className="showsContainer">
        <Filter
            setSortSelected={setSortSelected}
            setGenreSelected={setGenreSelected}
          />

        <CardsListedContainer
          sortSelected={sortSelected}
          genreSelected={genreSelected}
        />
      </div>
    </>
  );
};

export default ShowCategorie;
