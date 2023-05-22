import React from "react";
import LogoXL from "../../components/LogoXL";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFacebook, faTwitter, faInstagram} from "@fortawesome/free-brands-svg-icons"
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="footerContainer">
        <div className="column-1">
          <LogoXL />
          <p className="subCategories">+54 3815 751 992</p>
          <p className="subCategories">Juanmanuelgomezomil@gmail.com</p>
        </div>
        <div className="column-2">
          <p className="categories">Categories</p>
          <NavLink className="subCategories"> Movies</NavLink>
          <NavLink className="subCategories">Series</NavLink>
          <NavLink className="subCategories">Actors</NavLink>
        </div>
        <div className="column-3">
          <p className="categories">Follow Us</p>
          <div className="socialMedias">
            <FontAwesomeIcon icon={faFacebook} className="subCategories"/>
            <FontAwesomeIcon icon={faTwitter} className="subCategories"/>
            <FontAwesomeIcon icon={faInstagram} className="subCategories"/>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
