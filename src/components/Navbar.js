import React from "react";
import { NavLink, Link } from "react-router-dom";
import Styles from "./Navbar.module.css";
import logo from "../assets/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faFacebookF,
  faLinkedinIn,
  faTiktok,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Navbar() {
  return (
    <div className={Styles.navbar_content}>
      <div className={Styles.navbar}>
        <div className={Styles.logo}>
          <Link to="/">
            <img src={logo} alt="PushEat Logo" />
          </Link>
        </div>

        <div className={Styles.nav_links}>
          <NavLink
            to="/terms"
            className={({ isActive }) =>
              isActive ? `${Styles.link} ${Styles.active}` : Styles.link
            }
          >
            Terms of Service
          </NavLink>
          <NavLink
            to="/privacy"
            className={({ isActive }) =>
              isActive ? `${Styles.link} ${Styles.active}` : Styles.link
            }
          >
            Privacy Policy
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? `${Styles.link} ${Styles.active}` : Styles.link
            }
          >
            Contact Us
          </NavLink>
        </div>

        <div className={Styles.social_icons}>
          <FontAwesomeIcon icon={faInstagram} className={Styles.social_icon} />
          <FontAwesomeIcon icon={faXTwitter} className={Styles.social_icon} />
          <FontAwesomeIcon icon={faFacebookF} className={Styles.social_icon} />
          <FontAwesomeIcon icon={faLinkedinIn} className={Styles.social_icon} />
          <FontAwesomeIcon icon={faTiktok} className={Styles.social_icon} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
