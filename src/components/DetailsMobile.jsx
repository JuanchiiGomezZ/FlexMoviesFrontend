import React, { useState } from 'react';
import ScoreBar from './ScoreBar';
import ActorsCarrousel from './ActorsCarrousel';
import FunctionsBtns from '../views/ShowDetail/FunctionsBtns';

const DetailsMobile = ({ detailsData, actorsData }) => {
  return (
    <div className="detailsMobile">
      <div
        className="mainBgMobile"
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original/${detailsData.backdrop_path}')`,
        }}
      >
        <div className="bgBlack">
          <div className="imgPoster">
            <img src={`https://image.tmdb.org/t/p/original/${detailsData.poster_path}`} alt="" />
          </div>
          <div className="details">
            <div className="showTitle">
              <p className="title">{detailsData.title || detailsData.name}</p>
            </div>
            <div className="otherDetails">
              {detailsData.name ? (
                <div>
                  <p>
                    {detailsData.release_date || detailsData.first_air_date} • {detailsData.genres.map((data) => data.name).join(', ')}
                  </p>
                  <p>
                    {detailsData.number_of_seasons} seasons, {detailsData.number_of_episodes} episodes
                  </p>
                </div>
              ) : (
                <p>
                  {detailsData.release_date || detailsData.first_air_date} • {detailsData.genres.map((data) => data.name).join(', ')} •{' '}
                  {`${Math.floor(detailsData.runtime / 60) + 'h ' + (detailsData.runtime % 60) + 'm'}`}
                </p>
              )}
            </div>
            <div className="scoreCont">
              <ScoreBar score={detailsData.vote_average} />
            </div>

            <div className="overview">
              <p>{detailsData.overview.length >= 600 ? detailsData.overview.substring(0, 450) + '...' : detailsData.overview}</p>
            </div>
            <FunctionsBtns data={detailsData} />
          </div>
        </div>
      </div>
      <div style={{ marginTop: '30px' }}>
        <div className="actors">
          <p className="detailsHeader">Actors</p>
          <div className="hLine"></div>
        </div>
        <ActorsCarrousel data={actorsData} />
      </div>
    </div>
  );
};

export default DetailsMobile;
