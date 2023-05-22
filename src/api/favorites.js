import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';
const { VITE_API_URL } = getEnvVariables();
const baseUrl = VITE_API_URL;
const token = JSON.parse(localStorage.getItem('token'));
const config = {
  headers: { Authorization: `Bearer ${token}` },
};
export const addFav = async (user) => {
  try {
    const response = await axios.post(`${baseUrl}/api/favorite`, user, config);
  } catch (error) {
    console.log(error);
  }
};

export const getFavsUser = async (token) => {
  try {
    const response = await axios.get(`${baseUrl}/api/favorite`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFav = async (favId) => {
  try {
    const response = await axios.delete(`${baseUrl}/api/favorite/${favId}`, config);
  } catch (error) {
    console.log(error);
  }
};
