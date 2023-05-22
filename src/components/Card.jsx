import React from 'react';
import PosterNull from '../assets/images/NoPoster.png';
import ScoreBar from './ScoreBar';

const Card = ({ poster, name, date, score, title, airDate }) => {
  return (
    <>
      {
        <div className="cardContainer">
          {poster == null ? (
            <img src={PosterNull} alt="PosterNull" />
          ) : (
            <img src={`https://image.tmdb.org/t/p/w342/${poster}`} alt={name || title} />
          )}
          <div style={{ marginTop: '-22px' }}>
            <ScoreBar score={score} />
          </div>

          <div className="details">
            <p className="titleShow">{name || title}</p>
            <p className="date">{date || airDate}</p>
          </div>
        </div>
      }
    </>
  );
};

export default Card;
