import React, { useEffect, useState, useContext } from 'react';
import DataContext from '../../context/Context';
import { NavLink } from 'react-router-dom';
import Logo from '../../components/Logo';
import SearchBar from '../../components/SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faBookmark } from '@fortawesome/free-solid-svg-icons';
import UserMenu from '../../components/UserMenu';
import LoaderMini from '../../helpers/LoaderMini';
import { TokenContext } from '../../context/TokenContext';
import scrollTopOnClick from '../../helpers/scrollTopOnClick';

const Navbar = () => {
  const { token, setToken } = useContext(TokenContext);
  const { getUserData, userData } = useContext(DataContext);
  const [openUserMenu, setopenUserMenu] = useState(false);

  useEffect(() => {
    token != null && getUserData() ;
  }, [token]);

  return (
    <header>
      <nav style={{ marginBottom: '71px' }}>
        <div className="container">
          <div className="first">
            <Logo />
            <div className="categories">
              <NavLink
                to="/"
                className="category"
                onClick={() => {
                  scrollTopOnClick();
                }}
              >
                HOME
              </NavLink>
              <NavLink
                to="Show/Movies"
                className="category"
                onClick={() => {
                  scrollTopOnClick();
                }}
              >
                MOVIES
              </NavLink>
              <NavLink
                to="Show/Series"
                className="category"
                onClick={() => {
                  scrollTopOnClick();
                }}
              >
                SERIES
              </NavLink>
            </div>
          </div>
          <div className="second">
            <SearchBar />
            {token == null ? (
              <NavLink to="Login" className="logInBtn">
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
                  <img src={userData.profilepic} alt="avatar" />
                  <FontAwesomeIcon icon={faSortDown} />
                </div>
              </div>
            )}
          </div>
        </div>
        {userData != null ? (
          <UserMenu openUserMenu={openUserMenu} setOpenUserMenu={setopenUserMenu} userData={userData} setToken={setToken} />
        ) : (
          ''
        )}
      </nav>
    </header>
  );
};

export default Navbar;
