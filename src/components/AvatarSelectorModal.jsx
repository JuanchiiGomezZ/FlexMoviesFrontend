import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import avatares from "../helpers/avatares.json";

const AvatarSelectorModal = ({ setSelectedAvatar, setOpenModal }) => {
  const [avatar, setAvatar] = useState(
    "https://i.postimg.cc/Rh66Bkp6/Avatar9.png"
  );

  return (
    <div className="modal">
      <div className="modalContainer">
        <div className="head">
          <div className="closeIcon">
            <FontAwesomeIcon
              icon={faXmark}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setOpenModal(false);
              }}
            />
          </div>
          <div className="headInfo">
            <img src={avatar} alt="" />
            <div>
              <p className="chooseAvatar">Choose your avatar</p>
              <div
                className="saveBtn"
                onClick={() => {
                  setSelectedAvatar(avatar);
                  setOpenModal(false);
                }}
              >
                Save
              </div>
            </div>
          </div>
        </div>
        <div className="avataresContainer">
          {avatares.map((data) => {
            return (
              <img
                src={data.profilepic}
                alt=""
                key={data.id}
                onClick={() => {
                  setAvatar(data.profilepic);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AvatarSelectorModal;
