import React, { useEffect, useState, useContext } from "react";
import Slider, { PrevArrow, NextArrow } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "./Card";
import Loader from "../helpers/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import scrollTopOnClick from "../helpers/scrollTopOnClick";

const CardsCarrousel = ({ data, type, categorie }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 1460,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  if (data == undefined) {
    return <Loader />;
  } else {
    return (
      <div className="cardsCarrouselContainer">
        <div className="titleCarrousel">
          <Link>
            Top {categorie} {type}{" "}
            <FontAwesomeIcon icon={faFire} style={{ color: "#ed6807" }} />
          </Link>
        </div>
        <div className="hLine"></div>
        <div className="cardsCarrousel">
          <Slider {...settings}>
            {data.map((data) => (
              <Link
                to={`/Show/${type}/Detail/${data.id}`}
                key={data.id}
                onClick={() => {
                  scrollTopOnClick();
                }}
                className="card"
              >
                <Card
                  id={data.id}
                  poster={data.poster_path}
                  name={data.name}
                  title={data.original_title}
                  date={data.release_date}
                  airDate={data.first_air_date}
                  score={data.vote_average}
                />
              </Link>
            ))}
          </Slider>
        </div>
      </div>
    );
  }
};

export default CardsCarrousel;
