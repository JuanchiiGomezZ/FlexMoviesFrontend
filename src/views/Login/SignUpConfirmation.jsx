import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import AvatarSelectorModal from '../../components/AvatarSelectorModal';
import { requestSignUpConfirmation } from '../../api/login';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../../context/TokenContext';

const SignUpConfirmation = () => {
  const [username, setusername] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('https://i.postimg.cc/Rh66Bkp6/Avatar9.png');
  const [openModal, setOpenModal] = useState(false);
  const [userNameError, setusernameError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username != '') {
      const user = {
        profilepic: selectedAvatar,
        username: username,
      };
      setusernameError(false);
      await requestSignUpConfirmation(user);
      navigate('/');
    } else {
      setusernameError(true);
    }
  };

  return (
    <>
      <div className="confirmationBg">
        <div className="confirmationContainer">
          <div className="confirmation">
            <div className="logoForm">
              <p>Flex</p>
            </div>
            <div className="changeImg">
              <img src={selectedAvatar} alt="avatar" />
              <div className="editLogo">
                <FontAwesomeIcon
                  icon={faPen}
                  onClick={() => {
                    setOpenModal(true);
                  }}
                />
              </div>
            </div>
            <form
              className="input"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <label>Username</label>
              <input
                type="text"
                placeholder="Username"
                name="name"
                id="name"
                value={username}
                className={`${userNameError ? 'invalid' : ''}`}
                onChange={(e) => {
                  setusername(e.target.value);
                }}
              />
              <button className="sendBtn" type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
      {openModal ? <AvatarSelectorModal setSelectedAvatar={setSelectedAvatar} setOpenModal={setOpenModal} /> : ''}
    </>
  );
};

export default SignUpConfirmation;
