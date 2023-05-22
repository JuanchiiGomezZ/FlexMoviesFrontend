import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faGears, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TokenContext } from '../../context/TokenContext';
import { getFavsUser } from '../../api/favorites';
import Loader from '../../helpers/Loader';
import { deleteFav } from '../../api/favorites';
import { Link } from 'react-router-dom';
import scrollTopOnClick from '../../helpers/scrollTopOnClick';
import noFavs from '../../assets/images/NoFavs.png';
import backdropNull from '../../assets/images/NoRecommendation.png';
import posterNull from '../../assets/images/NoPoster.png';
const Saved = () => {
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 575);
  const { token } = useContext(TokenContext);
  const [favoritesData, setFavoritesData] = useState(null);

  useEffect(() => {
    const fetchFavs = async () => {
      setFavoritesData(await getFavsUser(token));
    };
    fetchFavs();
  }, []);

  const deleteFavorite = async (id, token) => {
    try {
      await deleteFav(id, token);
      setFavoritesData((prevData) => prevData.filter((data) => data.id !== id));
    } catch (error) {
      console.log('Error deleting favorite:', error);
    }
  };
  return (
    <div className="saved">
      <div className="savedContainer">
        <div className="savedTitle">
          <FontAwesomeIcon icon={faBookmark} />
          <p>My Lists</p>
        </div>
        <div className="savedCategories">
          <div className="savedCategorie active">
            <p>Favorites</p>
          </div>
          <div className="savedCategorie">
            <p>Watched</p>
          </div>
          <div className="savedCategorie">
            <p>To watch</p>
          </div>
        </div>
        <div className="savedShowsContainer">
          <div className="head">
            <div className="filterSaved">
              <FontAwesomeIcon icon={faGears} />
              <p>Filters</p>
            </div>
          </div>
          <div className="shows">
            {favoritesData == null ? (
              <Loader />
            ) : favoritesData.length == 0 ? (
              <div className="noSavedContainer">
                <img src={noFavs} alt="YuzuNoFavs" />
                <div className="infoNoSaved">
                  <p>You have nothing saved in favorites.</p>
                  <Link to={`/Show/Movies `}>You can add any series or movie to favorites.</Link>
                </div>
              </div>
            ) : (
              favoritesData.map((data) => {
                return (
                  <div className="cardShow" key={data.id}>
                    {data.backdrop || data.poster != null ? (
                      <img
                        src={`${
                          isWideScreen
                            ? `https://image.tmdb.org/t/p/w500/${data.backdrop}`
                            : `https://image.tmdb.org/t/p/w500/${data.poster}`
                        }`}
                        alt={data.showname}
                      />
                    ) : (
                      <img src={`${isWideScreen ? backdropNull : posterNull}`} alt="null" />
                    )}
                    <div className="cardShowDetails">
                      <div>
                        <Link to={`/Show/${data.media_type == 'movie' ? 'Movies' : 'Series'}/Detail/${data.media_id}`} className="title">
                          {data.showname.length >= 35 ? data.showname.substring(0, 35) + '...' : data.showname}
                        </Link>
                        <p className="duration">
                          {data.duration} {data.media_type == 'movie' ? 'mins' : 'Episodes'}
                        </p>
                      </div>
                      <div className="foot">
                        <div className="mediaType">
                          <p className="type">{data.media_type == 'movie' ? 'Movie' : 'Serie'}</p>
                          <p>• {!data.score ? 0 : data.score}</p>
                        </div>
                        <div className="trashIcon">
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() => {
                              deleteFavorite(data.id, token);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Saved;
