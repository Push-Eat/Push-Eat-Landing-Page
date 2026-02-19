import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered, faTimes } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.navIn}>
        <Link to="/" className={styles.navLogo}>
          <img
            src={`${process.env.PUBLIC_URL}/Logo.svg`}
            alt="Pusheat Logo"
            className={styles.logoImg}
          />
        </Link>

        <div className={styles.menuIcon} onClick={toggleMenu}>
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBarsStaggered} />
        </div>

        <div className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ""}`}>
          <a href="/#features" className={styles.link}>How It Works</a>
          <a href="/#faq" className={styles.link}>FAQ</a>
          <a
            href="https://apps.apple.com/ng/app/pusheat/id6749077010"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navCta}
          >
            Get the App
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
              arrow_outward
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
