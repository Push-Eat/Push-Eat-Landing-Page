import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered, faTimes } from "@fortawesome/free-solid-svg-icons"; // New icons for menu
import {
  faXTwitter,
  faFacebookF,
  faLinkedinIn,
  faTiktok,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={Styles.navbar_content}>
      <div className={Styles.navbar}>
        <div className={Styles.logo}>
          <Link to="/">
            <img
              src="/Logo.svg"
              alt="PushEat Logo"
              className={Styles.logo_img}
            />
          </Link>
        </div>

        {/* Hamburger Icon */}
        <div className={Styles.menu_icon} onClick={toggleMenu}>
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBarsStaggered} />
        </div>

        <div
          className={`${Styles.nav_links} ${menuOpen ? Styles.show_menu : ""}`}
        >
          <NavLink
            to="/terms"
            className={({ isActive }) =>
              isActive ? `${Styles.link} ${Styles.active}` : Styles.link
            }
            onClick={() => setMenuOpen(false)}
          >
            Terms of Service
          </NavLink>
          <NavLink
            to="/privacy"
            className={({ isActive }) =>
              isActive ? `${Styles.link} ${Styles.active}` : Styles.link
            }
            onClick={() => setMenuOpen(false)}
          >
            Privacy Policy
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? `${Styles.link} ${Styles.active}` : Styles.link
            }
            onClick={() => setMenuOpen(false)}
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
