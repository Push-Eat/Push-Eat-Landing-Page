import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import Styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  faXTwitter,
  faLinkedinIn,
  faTiktok,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <div className={Styles.navbar_content}>
      <div className={Styles.navbar}>
        <div className={Styles.logo}>
          <Link to="/">
            <img
              src={`${process.env.PUBLIC_URL}/Logo.svg`}
              alt="Pusheat Logo"
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
            to="/delete-account"
            className={({ isActive }) =>
              isActive ? `${Styles.link} ${Styles.active}` : Styles.link
            }
          >
            Delete Account
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
          <a
            href="https://www.instagram.com/justpusheat?igsh=YTk4M3UzOG5oZ3Vz"
            target="_blank"
            rel="noopener noreferrer"
            className={Styles.social_icon}
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a
            href="https://x.com/JustPushEat?t=qNbqSe_LYWqt-4pt9XGXVw&s=09"
            target="_blank"
            rel="noopener noreferrer"
            className={Styles.social_icon}
          >
            <FontAwesomeIcon icon={faXTwitter} />
          </a>
          <a
            href="https://www.linkedin.com/company/pusheat/"
            target="_blank"
            rel="noopener noreferrer"
            className={Styles.social_icon}
          >
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
          <a
            href="https://www.tiktok.com/@justpusheat?_t=ZM-8vlrPWZgula&_r=1"
            target="_blank"
            rel="noopener noreferrer"
            className={Styles.social_icon}
          >
            <FontAwesomeIcon icon={faTiktok} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
