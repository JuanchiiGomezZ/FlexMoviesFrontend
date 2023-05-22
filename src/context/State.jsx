import React, { useReducer, useState, useEffect, useContext } from 'react';
import Reducer from './Reducer';
import DataContext from './Context';
import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';
import { TokenContext } from './TokenContext';

const State = (props) => {
  const { VITE_API_KEY, VITE_API_URL } = getEnvVariables();
  const apiKey = VITE_API_KEY;
  const baseUrl = VITE_API_URL;
  const { setToken } = useContext(TokenContext);
  const initialState = {
    moviesPopular: null,
    moviesUpcoming: null,
    moviesTopRated: null,
    moviesNowPlaying: null,
    seriesPopular: null,
    seriesTopRated: null,
    seriesAiringToday: null,
    showsData: null,
    searchedData: null,
    allDetailsData: '',
    userData: null,
  };

  const [state, dispatch] = useReducer(Reducer, initialState);

  const getMoviesData = async (categorie, page) => {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${categorie}?api_key=${apiKey}&sort_by=popularity.desc&page=${page}`);

    let data = res.data;

    if (categorie == 'popular') {
      dispatch({
        type: 'GET_MOVIES_POPULAR',
        payload: data,
      });
    } else if (categorie == 'upcoming') {
      dispatch({
        type: 'GET_MOVIES_UPCOMING',
        payload: data,
      });
    } else if (categorie == 'top_rated') {
      dispatch({
        type: 'GET_MOVIES_TOP_RATED',
        payload: data,
      });
    } else if (categorie == 'now_playing') {
      dispatch({
        type: 'GET_MOVIES_NOW_PLAYING',
        payload: data,
      });
    }
  };

  const getSeriesData = async (categorie) => {
    const res = await axios.get(`https://api.themoviedb.org/3/tv/${categorie}?api_key=${apiKey}`);
    let data = res.data;
    if (categorie == 'popular') {
      dispatch({
        type: 'GET_SERIES_POPULAR',
        payload: data,
      });
    } else if (categorie == 'top_rated') {
      dispatch({
        type: 'GET_SERIES_TOP_RATED',
        payload: data,
      });
    } else if (categorie == 'airing_today') {
      dispatch({
        type: 'GET_SERIES_AIRING_TODAY',
        payload: data,
      });
    }
  };

  const getShowData = async (page, type, categorie, sortSelected, genreSelected) => {
    if (categorie.toLowerCase() == 'all') {
      const res = await axios.get(
        `https://api.themoviedb.org/3/discover/${type}/?api_key=${apiKey}&sort_by=${sortSelected}&with_genres=${genreSelected}&page=${page}`
      );
      let data = res.data;

      dispatch({
        type: 'GET_SHOWS_DATA',
        payload: data,
      });
    } else {
      const res = await axios.get(
        `https://api.themoviedb.org/3/${type}/${categorie}/?api_key=${apiKey}&sort_by=${sortSelected}&with_genres=${genreSelected}&page=${page}`
      );
      let data = res.data;

      dispatch({
        type: 'GET_SHOWS_DATA',
        payload: data,
      });
    }
  };

  const getSearchedData = (query, page) => {
    axios
      .all([
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&page=${page}&query=${query}&sort_by=popularity.desc`),
        axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&page=${page}&query=${query}&sort_by=popularity.desc`),
      ])
      .then(
        axios.spread((moviesResponse, tvShowsResponse) => {
          // Unir las dos matrices de resultados en una sola y ordenar por popularidad
          const movies = moviesResponse.data.results;
          const tvShows = tvShowsResponse.data.results;
          const results = movies.concat(tvShows).sort((a, b) => b.popularity - a.popularity);
          // Hacer algo con los resultados (por ejemplo, mostrarlos en tu aplicación)
          dispatch({
            type: 'GET_SEARCHED_DATA',
            payload: results,
          });
        })
      )
      .catch((error) => {
        // Manejar errores
        console.log(error);
      });
  };

  const getDetailsData = async (type, id) => {
    const [detailsRes, actorsRes, trailerRes, recommendationsRes] = await Promise.all([
      axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}`),
      axios.get(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${apiKey}`),
      axios.get(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${apiKey}`),
      axios.get(`https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${apiKey}`),
    ]);
    const detailsData = detailsRes.data;
    const actorsData = actorsRes.data.cast;
    const trailerData = trailerRes.data.results;
    const recommendationsData = recommendationsRes.data.results;

    let trailerKey = undefined;
    const trailer = trailerData.find((video) => video.type === 'Trailer');
    if (trailer) {
      trailerKey = trailer.key;
    }

    const allDetailsData = {
      detailsData: detailsData,
      actorsData: actorsData,
      trailerKey: trailerKey,
      recommendationsData: recommendationsData,
    };

    dispatch({
      type: 'GET_DETAILS',
      payload: allDetailsData,
    });
  };

  const getUserData = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    try {
      const response = await axios.get(`${baseUrl}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: 'GET_USER_DATA',
        payload: response.data,
      });
    } catch (error) {
      console.log(error.response.data);
      localStorage.removeItem('token');
    }
  };

  return (
    <DataContext.Provider
      value={{
        getMoviesData,
        moviesPopular: state.moviesPopular,
        moviesUpcoming: state.moviesUpcoming,
        moviesTopRated: state.moviesTopRated,
        moviesNowPlaying: state.moviesNowPlaying,

        getSeriesData,
        seriesPopular: state.seriesPopular,
        seriesTopRated: state.seriesTopRated,
        seriesAiringToday: state.seriesAiringToday,

        getShowData,
        showsData: state.showsData,

        getSearchedData,
        searchedData: state.searchedData,

        getDetailsData,
        allDetailsData: state.allDetailsData,

        getUserData,
        userData: state.userData,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default State;
