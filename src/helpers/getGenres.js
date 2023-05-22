import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { VITE_API_KEY } = getEnvVariables();
const apiKey = VITE_API_KEY;

export const getGenres = async (showType) => {
  let url = `https://api.themoviedb.org/3/genre/${showType}/list?api_key=${apiKey}`;

  const data = await axios.get(url);
  return data.data.genres;
};
