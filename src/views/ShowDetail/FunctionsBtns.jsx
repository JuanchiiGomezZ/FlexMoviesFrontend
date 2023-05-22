import React, { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faClock, faEye } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate } from 'react-router-dom';
import { TokenContext } from '../../context/TokenContext';
import { addFav, getFavsUser, deleteFav } from '../../api/favorites';
import { Tooltip } from 'react-tooltip';

const FunctionsBtns = ({ data }) => {
  const { showType, showId } = useParams();
  const { token } = useContext(TokenContext);
  const [heart, setHeart] = useState(false);
  const [eye, setEye] = useState(false);
  const [clock, setClock] = useState(false);
  const [favInfo, setFavInfo] = useState({
    media_type: showType == 'Movies' ? 'movie' : 'tv',
    media_id: showId,
    backdrop: data.backdrop_path || null,
    poster: data.poster_path || null,
    showname: data.name || data.title || null,
    year: data.release_date || data.first_air_date || null,
    duration: data.runtime || data.number_of_episodes || null,
    score: data.vote_average.toFixed(1) || null,
  });
  const navigate = useNavigate();
  const [favId, setFavId] = useState('');

  useEffect(() => {
    const fetchFavs = async () => {
      try {
        const response = await getFavsUser(token);
        const foundMedia = response.some((item) => item.media_id == favInfo.media_id);
        setHeart(foundMedia);
        if (foundMedia) {
          const favId = response.find((item) => item.media_id == favInfo.media_id).id;
          setFavId(favId);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchFavs();
  }, []);

  const deleteFavorite = async (id, token) => {
    try {
      // Eliminar el favorito de la base de datos
      await deleteFav(id, token);

      // Actualizar el estado local heart
      setHeart(false);
    } catch (error) {
      console.log('Error deleting favorite:', error);
    }
  };

  const addFavorite = async (favInfo, token) => {
    try {
      // Agregar el favorito a la base de datos
      await addFav(favInfo, token);

      // Actualizar el estado local heart
      setHeart(true);
    } catch (error) {
      console.log('Error adding favorite:', error);
    }
  };

  const favHandle = async () => {
    if (token == null) {
      navigate('/Login');
    } else {
      if (heart) {
        await deleteFavorite(favId, token);
      } else {
        await addFavorite(favInfo, token);
      }
    }
  };

  return (
    <div className="functionsContainer">
      <div className="btnCont">
        <div
          className={`function heart ${heart ? 'heartActive' : ' '}`}
          onClick={() => {
            favHandle();
          }}
          data-tooltip-content="Favorite"
          data-tooltip-id="fav"
        >
          <FontAwesomeIcon icon={faHeart} />
        </div>
        <Tooltip id="fav" />
      </div>

      <div className="btnCont">
        <div
          className={`function eye ${eye ? 'eyeActive' : ' '}`}
          onClick={() => {
            setEye(!eye);
          }}
          data-tooltip-content="Watched"
          data-tooltip-id="watched"
        >
          <FontAwesomeIcon icon={faEye} />
        </div>
        <Tooltip id="watched" />
      </div>

      <div className="btnCont">
        <div
          className={`function clock ${clock ? 'clockActive' : ' '}`}
          onClick={() => {
            setClock(!clock);
          }}
          data-tooltip-content="To watch"
          data-tooltip-id="later"
        >
          <FontAwesomeIcon icon={faClock} />
        </div>
        <Tooltip id="later" />
      </div>
    </div>
  );
};

export default FunctionsBtns;
