import React, { useState } from "react";
import ActorsCarrousel from "./ActorsCarrousel";
import FunctionsBtns from "../views/ShowDetail/FunctionsBtns";

const DetailsPC = ({ detailsData, actorsData }) => {
  return (
    <div
      className="showDetailsContainer"
      style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${detailsData.backdrop_path}')`,
      }}
    >
      <div className="bgBlackContainer">
        <div className="detailsContainer">
          <div className="nameOverview">
            <div className="showTitle">
              <p>
                {detailsData.name || detailsData.title} (
                {detailsData.release_date !== undefined
                  ? detailsData.release_date.slice(0, 4)
                  : detailsData.first_air_date.slice(0, 4)}
                )
              </p>
            </div>
            <div className="overview">
              <p>{detailsData.overview.length >= 700 ? detailsData.overview.substring(0, 700) + '...' : detailsData.overview}</p>
            </div>
          </div>
          <div className="rightContainer">
            <FunctionsBtns data={detailsData} />
            <div className="generalDetails">
              <div className="data">
                <p className="dataName">Release Date:</p>
                <p>{detailsData.release_date || detailsData.first_air_date}</p>
              </div>
              {detailsData.number_of_seasons != undefined ? (
                <>
                  <div className="data">
                    <p className="dataName">Seasons:</p>
                    <p>{detailsData.number_of_seasons}</p>
                  </div>
                  <div className="data">
                    <p className="dataName">Episodes:</p>
                    <p>{detailsData.number_of_episodes} </p>
                  </div>
                </>
              ) : (
                <div className="data">
                  <p className="dataName">Duration:</p>
                  <p>{detailsData.runtime} min</p>
                </div>
              )}

              <div className="data">
                <p className="dataName">Rating:</p>
                <p>{Math.round(detailsData.vote_average * 10)}%</p>
              </div>
              <div className="data">
                <p className="dataName">Genres:</p>
                {detailsData.genres.map((data) => (
                  <p key={data.id}>{data.name}</p>
                ))}
              </div>
              <div className="data">
                <p className="dataName">Country:</p>
                <p>
                  {detailsData.origin_country == undefined
                    ? detailsData.production_countries[0].name
                    : detailsData.origin_country[0]}
                </p>
              </div>
              <div className="data">
                <p className="dataName">Original Language:</p>
                <p>{detailsData.original_language.toUpperCase()}</p>
              </div>
            </div>
          </div>
        </div>

        <ActorsCarrousel data={actorsData} />
      </div>
    </div>
  );
};

export default DetailsPC;
