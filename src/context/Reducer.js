import {
  GET_MOVIES_TOP_RATED,
  GET_MOVIES_UPCOMING,
  GET_MOVIES_NOW_PLAYING,
  GET_MOVIES_POPULAR,
  GET_SERIES_TOP_RATED,
  GET_SERIES_AIRING_TODAY,
  GET_SERIES_POPULAR,
  GET_SHOWS_DATA,
  GET_SEARCHED_DATA,
  GET_DETAILS,
  GET_USER_DATA,
} from "./Types";

export default function (state, action) {
  const { payload, type } = action;
  switch (type) {
    case GET_MOVIES_POPULAR:
      return {
        ...state,
        moviesPopular: payload,
      };
    case GET_MOVIES_UPCOMING:
      return {
        ...state,
        moviesUpcoming: payload,
      };
    case GET_MOVIES_TOP_RATED:
      return {
        ...state,
        moviesTopRated: payload,
      };
    case GET_MOVIES_NOW_PLAYING:
      return {
        ...state,
        moviesNowPlaying: payload,
      };

    case GET_SERIES_POPULAR:
      return {
        ...state,
        seriesPopular: payload,
      };
    case GET_SERIES_TOP_RATED:
      return {
        ...state,
        seriesTopRated: payload,
      };
    case GET_SERIES_AIRING_TODAY:
      return {
        ...state,
        seriesAiringToday: payload,
      };
    case GET_SHOWS_DATA:
      return {
        ...state,
        showsData: payload,
      };
    case GET_SEARCHED_DATA:
      return {
        ...state,
        searchedData: payload,
      };
    case GET_DETAILS:
      return {
        ...state,
        allDetailsData: payload,
      };
    case GET_USER_DATA:
      return {
        ...state,
        userData: payload,
      };
  }
}
