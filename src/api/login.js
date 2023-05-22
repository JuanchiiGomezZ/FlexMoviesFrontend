import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';
const { VITE_API_URL } = getEnvVariables();
const baseUrl = VITE_API_URL;
const token = JSON.parse(localStorage.getItem('token'));

export const requestSignUp = async (user, setEmailAlrExists, setToken) => {
  await axios
    .post(`${baseUrl}/api/SignUp`, user)
    .then(async (response) => {
      const token = response.data.token;
      setToken(token);
      await localStorage.setItem('token', JSON.stringify(token));
    })
    .catch((error) => {
      setEmailAlrExists(error.response.data.message ? true : false);
      console.log(error.response.data);
      throw error;
    });
};

export const requestSignUpConfirmation = async (user) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    await axios
      .patch(`${baseUrl}/api/SignUp/Confirmation`, user, config)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

export const requestLogin = async (user, setInvalidPassword, setInvalidEmail, setToken) => {
  await axios
    .post(`${baseUrl}/api/Login`, user)
    .then((response) => {
      const token = response.data.token;
      setToken(token);
      localStorage.setItem('token', JSON.stringify(token));
    })
    .catch((error) => {
      if (error.response.data.message.includes('password')) {
        setInvalidPassword(true);
        setInvalidEmail(false);
        throw error;
      } else if (error.response.data.message.includes('Email')) {
        setInvalidEmail(true);
        setInvalidPassword(false);
        throw error;
      } else {
        console.log(error.response.data);
      }
    });
};
