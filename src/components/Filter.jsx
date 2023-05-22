import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { getGenres } from '../helpers/getGenres';
import { getShowTypes } from '../helpers/getShowType';
import { useParams } from 'react-router-dom';
import scrollTopOnClick from '../helpers/scrollTopOnClick';

const Filter = ({ setSortSelected, setGenreSelected }) => {
  const [openSort, setOpenSort] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [genres, setgenres] = useState('');
  const [genresSelect, setgenresSelect] = useState([]);
  const [selectSort, setSelectSort] = useState('popularity.desc');
  const { showType, showCategorie } = useParams();

  const getShowGenres = async (props) => {
    const genres = await getGenres(props);
    setgenres(genres);
  };

  const handleGenres = (props) => {
    if (genresSelect.includes(props)) {
      for (let index = 0; index < genresSelect.length; index++) {
        if (genresSelect[index] == props) {
          const updateDeleted = [...genresSelect];
          updateDeleted.splice(index, 1);
          setgenresSelect(updateDeleted);
        }
      }
    } else {
      setgenresSelect([...genresSelect, props]);
    }
  };

  const handleSearch = () => {
    setGenreSelected(genresSelect.join(', '));
    setSortSelected(selectSort);
    setOpenFilter(false);
    setOpenSort(false);
    scrollTopOnClick();
  };

  useEffect(() => {
    getShowGenres(getShowTypes(showType));
  }, []);

  return (
    <div className="filter">
      {showCategorie.toLocaleLowerCase() == 'all' ? (
        <div className="sort">
          {openSort ? (
            <div className="opennedContainer">
              <div
                className="head"
                onClick={() => {
                  setOpenSort(false);
                }}
              >
                <p>Sort</p>
                <FontAwesomeIcon icon={faAngleDown} style={{ cursor: 'pointer' }} />
              </div>
              <div className="body">
                <p>Sort Results By: </p>
                <select
                  name="sort-by"
                  id="sort-by"
                  className="sortSelector"
                  onChange={(e) => {
                    setSelectSort(e.target.value);
                  }}
                >
                  <option value="popularity.desc">Popularity Descending</option>
                  <option value="popularity.asc">Popularity Ascending</option>
                  <option value="vote_average.desc">Rating Descending</option>
                  <option value="vote_average.asc">Rating Ascending</option>
                  <option value="release_date.asc">Release Date Ascending</option>
                  <option value="release_date.desc">Release Date Desceding</option>
                  <option value="original_title.asc">Title (A-Z) </option>
                  <option value="original_title.desc">Title (Z-A)</option>
                </select>
              </div>
            </div>
          ) : (
            <div
              className="closedContainer"
              onClick={() => {
                setOpenSort(true);
              }}
            >
              <p>Sort</p>
              <FontAwesomeIcon icon={faAngleRight} style={{ cursor: 'pointer' }} />
            </div>
          )}
        </div>
      ) : (
        ''
      )}

      <div className="filters">
        {openFilter ? (
          <div className="opennedContainer">
            <div
              className="head"
              onClick={() => {
                setOpenFilter(false);
              }}
            >
              <p>Filters</p>
              <FontAwesomeIcon icon={faAngleDown} style={{ cursor: 'pointer' }} />
            </div>
            <div className="body">
              <p>Genres </p>
              <div className="genresContainer">
                {genres == '' ? (
                  <div className="genreBtn">Action</div>
                ) : (
                  genres.map((data) => (
                    <div
                      key={data.id}
                      className={`genreBtn ${genresSelect.includes(data.id) ? 'genreBtnActive' : ''}`}
                      onClick={() => {
                        handleGenres(data.id);
                      }}
                    >
                      {data.name}
                    </div>
                  ))
                )}
              </div>
              <div className="resetBtn">
                <p
                  onClick={() => {
                    setgenresSelect([]);
                    setSelectSort('popularity.desc');
                  }}
                >
                  Reset
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="closedContainer"
            onClick={() => {
              setOpenFilter(true);
            }}
          >
            <p>Filters</p>
            <FontAwesomeIcon icon={faAngleRight} style={{ cursor: 'pointer' }} />
          </div>
        )}
      </div>
      <div
        className="searchBtn"
        onClick={() => {
          handleSearch();
        }}
      >
        Search
      </div>
    </div>
  );
};

export default Filter;
