import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faBookmark, faGear, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const UserMenu = ({ openUserMenu, setOpenUserMenu, userData, setToken }) => {
  const handlelogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setOpenUserMenu(false);
  };
  return (
    <div className={`profileMenu ${openUserMenu ? 'profileMenuActive' : 'profileMenuHidden'}`}>
      <div className="profiles">
        <p className="profileTitle">Profiles</p>
        <div className="profile">
          <img src={userData.profilepic} alt="" />
          <p>{userData.username}</p>
        </div>
        <div className="profile">
          <img src="https://i.postimg.cc/rwS4zLV5/Avatar6-1.png" alt="" />
          <p>Valee</p>
        </div>
      </div>
      <div className="hLineThin" style={{ margin: '0 auto' }}></div>
      <div className="optionsMenu">
        <Link
          to="/Show/Saved"
          className="option"
          onClick={() => {
            setOpenUserMenu(false);
          }}
        >
          <div className="optionIcon">
            <FontAwesomeIcon icon={faBookmark} />
          </div>

          <p>My lists</p>
        </Link>
        <div className="option">
          <div className="optionIcon">
            <FontAwesomeIcon icon={faUserGroup} />
          </div>
          <p>Manage profiles</p>
        </div>
        <div className="option">
          <div className="optionIcon">
            <FontAwesomeIcon icon={faGear} />
          </div>
          <p>Settings</p>
        </div>
      </div>
      <div className="hLineThin" style={{ margin: '0 auto' }}></div>
      <div
        className="logout"
        onClick={() => {
          handlelogout();
        }}
      >
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
        <p>Logout</p>
      </div>
    </div>
  );
};

export default UserMenu;
