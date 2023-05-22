import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faEye, faEyeLowVision } from '@fortawesome/free-solid-svg-icons';
import { requestLogin } from '../../api/login';
import { loginValidator } from '../../helpers/inputsValidator';
import { TokenContext } from '../../context/TokenContext';

const Login = () => {
  const [passwordInfo, setPasswordInfo] = useState(false);
  const [seePassword, setSeePassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [blanksToFill, setBlanksTofill] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const { email, password } = newUser;
  const { token, setToken } = useContext(TokenContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    loginValidator(email, password, setBlanksTofill, setEmailError, setPasswordError);
    if (!blanksToFill && !emailError && !passwordError && password != '') {
      await requestLogin(newUser, setInvalidPassword, setInvalidEmail, setToken);
      navigate("/");
    }
  };
  const passwordInfoHandle = () => {
    setPasswordInfo(true);
    setTimeout(() => {
      setPasswordInfo(false);
    }, 3000);
  };
  return (
    <div className="loginBg">
      <div className="login">
        <div className="loginContainer">
          <div className="logoForm">
            <p>Flex</p>
          </div>
          {blanksToFill ? (
            <div className={`blanksToFillMsg`}>
              <p>Missing blanks to fill</p>
            </div>
          ) : (
            ''
          )}
          <form
            className="inputsGroup"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="input">
              <label>Email</label>

              <input
                type="email"
                placeholder="Email"
                name="name"
                id="email"
                value={email}
                onChange={(e) => {
                  setNewUser({ ...newUser, email: e.target.value });
                }}
                className={emailError || invalidEmail ? 'invalid' : ''}
              />
              <label className={`errorMessage ${emailError || invalidEmail ? 'errorMessageActive' : ''}`}>
                {invalidEmail ? 'Invalid email' : 'Invalid syntax email'}
              </label>
            </div>
            <div className="input">
              <div>
                <label>Password</label>
                <FontAwesomeIcon
                  icon={faCircleInfo}
                  className="info"
                  onClick={() => {
                    passwordInfoHandle();
                  }}
                />
              </div>
              <ul className={`passwordMessage ${passwordInfo ? 'pasWordMessageActive' : 'pasWordMessageHidden'}`}>
                <li>Password must contain:</li>
                <li>Minimum 8 characters</li>
                <li>Minimum 1 lowercase and uppercase</li>
                <li>Minimum 1 special character</li>
              </ul>
              <div className="inputPassword">
                <input
                  type={`${seePassword ? 'text' : 'password'}`}
                  placeholder="Password"
                  name="password"
                  id="password"
                  value={password}
                  className={`${passwordError || invalidPassword ? 'invalid' : ''}`}
                  onChange={(e) => {
                    setNewUser({ ...newUser, password: e.target.value });
                  }}
                />
                <div className="eyeIcon">
                  <FontAwesomeIcon
                    icon={!seePassword ? faEye : faEyeLowVision}
                    onClick={() => {
                      setSeePassword(!seePassword);
                    }}
                  />
                </div>
              </div>
              <label className={`errorMessage ${emailError || invalidPassword ? 'errorMessageActive' : ''}`}>
                {invalidPassword ? 'Invalid password' : 'Invalid syntax password'}
              </label>
            </div>
            <button className="loginBtn" type="submit">
              Login
            </button>
          </form>

          <div className="dontHaveAccount">
            <p>Dont have account?.</p>
            <Link className="signUpLink" to="/SignUp">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
