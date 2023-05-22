import React, { useEffect, useState, useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import scrollTopOnClick from "../helpers/scrollTopOnClick";

const HomePoster = ({ data }) => {
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3500,
  };
  return (
    <div className="homeLayout">
      <Slider {...settings}>
        {data.slice(0, 7).map((data) => (
          <div key={data.original_title}> 
            <div
              className="homeLayoutContainer"
              
              style={{
                backgroundImage: `url('https://image.tmdb.org/t/p/original/${data.backdrop_path}')`,
              }}
            >
              <div className="bgBlackContainer">
                <div className="infoContainer">
                  <div className="showTitle">
                    <p>{data.original_title}</p>
                  </div>

                  <Link
                    className="infoBtn"
                    to={`/Show/Movies/Detail/${data.id}`}
                    onClick={()=>{scrollTopOnClick()}}
                  >
                    <FontAwesomeIcon icon={faCircleInfo} />
                    <p>More Info</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomePoster;
