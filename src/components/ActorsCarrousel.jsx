import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import noActorImg from '../assets/images/NoActorImg.png';

const ActorsCarrousel = ({ data }) => {
  const isWidth = () => {
    if (window.innerWidth > 1000) {
      return 0.9;
    } else if (window.innerWidth > 500 && window.innerWidth < 1000) {
      return 0.8;
    } else {
      return 0.95;
    }
  };

  const slideToShow = () => {
    const cardWidth = window.innerWidth > 400 ? 125 : 115;
    const screenWidth = window.innerWidth * isWidth();

    const maxCards = Math.floor(screenWidth / cardWidth);

    if (data.length < maxCards) {
      return data.length;
    } else {
      return maxCards;
    }
  };

  const carrouselWidth = () => {
    let width = 124 * data.length;
    const screenWidth = window.innerWidth * isWidth();
    if (width > screenWidth) {
      return screenWidth;
    } else {
      return width;
    }
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: slideToShow(),
    slidesToScroll: slideToShow(),
  };

  return (
    <div className="actorsContainer" style={{ width: `${carrouselWidth()}px` }}>
      <Slider {...settings}>
        {data.map((data) => (
          <div className="cardActor" key={data.id}>
            {data.profile_path == undefined ? (
              <img src={noActorImg} alt="noImg" />
            ) : (
              <img src={`https://image.tmdb.org/t/p/w154/${data.profile_path}`} alt={data.name} />
            )}

            <div className="actorName">
              <p>{data.name}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ActorsCarrousel;
