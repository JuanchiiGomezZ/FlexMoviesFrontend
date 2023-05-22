import React, { useEffect, useState, useContext } from 'react';
import DataContext from '../../context/Context';
import Logo from '../../components/Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsStaggered, faMagnifyingGlass, faSortDown, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import UserMenu from '../../components/UserMenu';
import LoaderMini from '../../helpers/LoaderMini';
import { TokenContext } from '../../context/TokenContext';
import scrollTopOnClick from '../../helpers/scrollTopOnClick';

const NavbarMobile = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [typed, setTyped] = useState('');
  const [openUserMenu, setopenUserMenu] = useState(false);

  const { token, setToken } = useContext(TokenContext);
  const { getUserData, userData } = useContext(DataContext);

  useEffect(() => {
    token != null ? getUserData() : '';
  }, [token]);

  const handleKeyPress = (e) => {
    if (typed != '') {
      if (e.key === 'Enter') {
        navigate(`/Search/${typed}`);
        setTyped('');
        setOpenSearch(false);
      }
    }
  };

  return (
    <header>
      <nav>
        <div className="navMobile">
          <div className="containerMobile">
            <div className="burgerMenu">
              <div
                className={`burgerIcon ${openMenu ? 'active' : 'hidden'}`}
                id="burgerIcon"
                onClick={() => {
                  setOpenMenu(!openMenu);
                }}
              >
                <FontAwesomeIcon icon={faBarsStaggered} />
              </div>
            </div>
            <div className="logoMobile">
              <Logo />
            </div>

            <div className="endPart">
              <div
                className="searchIcon"
                onClick={() => {
                  setOpenSearch(!openSearch);
                }}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </div>
              {token == null ? (
                <NavLink
                  to="/Login"
                  className="logInBtn"
                  onClick={() => {
                    scrollTopOnClick();
                  }}
                >
                  Login
                </NavLink>
              ) : userData == null ? (
                <LoaderMini />
              ) : (
                <div className="userLoggedinNav">
                  <NavLink
                    to="/Show/Saved"
                    className="listsIcon"
                    onClick={() => {
                      scrollTopOnClick();
                    }}
                  >
                    <FontAwesomeIcon icon={faBookmark} />
                  </NavLink>
                  <div
                    className={`profilePicNav ${openUserMenu ? 'profilePicNavActive' : ''}`}
                    onClick={() => {
                      setopenUserMenu(!openUserMenu);
                    }}
                  >
                    <img src={userData.profilepic} alt="" />
                    <FontAwesomeIcon icon={faSortDown} />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={`searchBarContainer ${!openSearch ? 'searchBarContainerHidden' : 'searchBarContainerActive'}`}>
            <input
              type="text"
              className="searchInput"
              placeholder="Search..."
              value={typed}
              onChange={(e) => {
                setTyped(e.target.value);
              }}
              onKeyDown={(e) => {
                handleKeyPress(e);
              }}
            />
          </div>
          <div id="burgerMenuContainer" className={`burgerMenuContainer ${openMenu ? 'active' : 'hidden'}`}>
            <div className="burgerMenuItems">
              <NavLink
                className="categorie"
                to="/"
                onClick={() => {
                  setOpenMenu(false);
                  scrollTopOnClick();
                }}
              >
                Home
              </NavLink>
              <NavLink
                className="categorie"
                to="Show/Movies"
                onClick={() => {
                  setOpenMenu(false);
                  scrollTopOnClick();
                }}
              >
                Movies
              </NavLink>
              <NavLink
                className="categorie"
                to="Show/Series"
                onClick={() => {
                  setOpenMenu(false);
                  scrollTopOnClick();
                }}
              >
                Series
              </NavLink>
            </div>
          </div>
          {userData != null ? (
            <UserMenu openUserMenu={openUserMenu} setOpenUserMenu={setopenUserMenu} userData={userData} setToken={setToken} />
          ) : (
            ''
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavbarMobile;
