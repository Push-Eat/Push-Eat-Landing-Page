import React from "react";
import Styles from "./Footer.module.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={Styles.footer}>
      <div className={Styles.top}>
        <div className={Styles.logo}>
          <img src="/Logo.png" alt="PushEat Logo" />
        </div>
        <ul className={Styles.links}>
          <li>
            <a href="/about">Contact Us</a>
          </li>
          <li>
            <a href="terms">Terms & Conditions</a>
          </li>
          <li>
            <a href="privacy">Privacy Policy</a>
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
