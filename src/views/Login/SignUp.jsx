import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faEye,
  faEyeLowVision,
} from "@fortawesome/free-solid-svg-icons";
import { requestSignUp } from "../../api/login";
import { signUpValidator } from "../../helpers/inputsValidator";
import { TokenContext } from "../../context/TokenContext";

const SignUp = () => {
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordInfo, setPasswordInfo] = useState(false);
  const [seePassword, setSeePassword] = useState(false);
  const [seeRepeatPassword, setSeeRepeatPassword] = useState(false);
  const [matchPasswords, setmatchPasswords] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [emailAlrExists, setEmailAlrExists] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [blanksToFill, setBlanksTofill] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    profilepic: "https://i.postimg.cc/Rh66Bkp6/Avatar9.png",
    username: "Username",
  });

  const { setToken } = useContext(TokenContext);
  const navigate = useNavigate();
  const { name, lastname, email, password } = newUser;

  const handleSubmit = async (e) => {
    e.preventDefault();

    signUpValidator(
      name,
      lastname,
      email,
      password,
      repeatPassword,
      setBlanksTofill,
      setEmailError,
      setPasswordError,
      setmatchPasswords
    );
    if (
      !blanksToFill &&
      !emailError &&
      !passwordError &&
      password != "" &&
      password == repeatPassword
    ) {
      await requestSignUp(newUser, setEmailAlrExists, setToken);
      navigate("/SignUp/Confirmation");
    }
  };

  const passwordInfoHandle = () => {
    setPasswordInfo(true);
    setTimeout(() => {
      setPasswordInfo(false);
    }, 3000);
  };

  return (
    <div className="signUpBg">
      <div className="signUp">
        <div className="signUpContainer">
          <div className="logoForm">
            <p>Flex</p>
          </div>
          {blanksToFill ? (
            <div className={`blanksToFillMsg`}>
              <p>Missing blanks to fill</p>
            </div>
          ) : (
            ""
          )}
          <form
            className="inputsGroup"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="inlineInputs">
              <div className="input">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setNewUser({ ...newUser, name: e.target.value });
                  }}
                />
              </div>
              <div className="input">
                <label>Lastname</label>
                <input
                  type="text"
                  placeholder="Lastname"
                  name="lastname"
                  id="lastname"
                  value={lastname}
                  onChange={(e) => {
                    setNewUser({ ...newUser, lastname: e.target.value });
                  }}
                />
              </div>
            </div>
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
                className={emailError || emailAlrExists ? "invalid" : ""}
              />
              <label
                className={`errorMessage ${
                  emailError || emailAlrExists ? "errorMessageActive" : ""
                }`}
              >
                {emailAlrExists ? "This email already exists" : "Invalid email"}
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
              <ul
                className={`passwordMessage ${
                  passwordInfo ? "pasWordMessageActive" : "pasWordMessageHidden"
                }`}
              >
                <li>Password must contain:</li>
                <li>Minimum 8 characters</li>
                <li>Minimum 1 lowercase and uppercase</li>
                <li>Minimum 1 special character</li>
              </ul>
              <div className="inputPassword">
                <input
                  type={`${seePassword ? "text" : "password"}`}
                  placeholder="Password"
                  name="password"
                  id="password"
                  value={password}
                  className={`${passwordError ? "invalid" : ""}`}
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
              <label
                className={`errorMessage ${
                  passwordError ? "errorMessageActive" : ""
                }`}
              >
                Invalid password
              </label>
            </div>
            <div className="input">
              <div>
                <label>Repeat password</label>
              </div>
              <div className="inputPassword">
                <input
                  type={`${seeRepeatPassword ? "text" : "password"}`}
                  placeholder="Repeat password"
                  name="repeatPassword"
                  id="repeatPassword"
                  value={repeatPassword}
                  onChange={(e) => {
                    setRepeatPassword(e.target.value);
                  }}
                  className={matchPasswords ? "" : "invalid"}
                />
                <div className="eyeIcon">
                  <FontAwesomeIcon
                    icon={!seeRepeatPassword ? faEye : faEyeLowVision}
                    onClick={() => {
                      setSeeRepeatPassword(!seeRepeatPassword);
                    }}
                  />
                </div>
              </div>
              <label
                className={`errorMessage ${
                  matchPasswords ? "" : "errorMessageActive"
                }`}
              >
                Passwords dont match
              </label>
            </div>
            <button className="signUpBtn" type="submit">
              Sign Up
            </button>
          </form>
          <div className="dontHaveAccount">
            <p>Already signed up?.</p>
            <Link className="signUpLink" to="/Login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
