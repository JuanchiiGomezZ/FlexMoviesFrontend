import React from "react";
import Card from "./Card";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import scrollTopOnClick from "../helpers/scrollTopOnClick";

const CardsList = ({ data, type }) => {
  return (
    <>
      {data.map((data) => (
        <Link
          to={`/Show/${data.name == undefined ? "Movies" : "tv"}/Detail/${
            data.id
          }`}
          key={data.id}
          className="card"
          onClick={() => {
            scrollTopOnClick();
          }}
          
        >
          <Card
            key={data.id}
            id={data.id}
            poster={data.poster_path}
            name={data.name}
            title={data.title}
            date={data.release_date}
            airDate={data.first_air_date}
            score={data.vote_average}
          />
        </Link>
      ))}
    </>
  );
};

export default CardsList;
