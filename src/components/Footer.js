import React from "react";
import Styles from "./Footer.module.css";
import logo from "../assets/Logo.png";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={Styles.footer}>
      <div className={Styles.top}>
        <div className={Styles.logo}>
          <img src={logo} alt="PushEat Logo" />
        </div>
        <ul className={Styles.links}>
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">Services</a>
          </li>
          <li>
            <a href="#">Terms & Conditions</a>
          </li>
          <li>
            <a href="#">Privacy Policy</a>
          </li>
        </ul>
      </div>
      <hr />
      <div className={Styles.bottom}>
        <p>Copyright © {currentYear} PushEat | All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
