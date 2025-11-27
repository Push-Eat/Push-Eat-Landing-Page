import Styles from "./Footer.module.css";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={Styles.footer}>
      <div className={Styles.top}>
        <div className={Styles.logo}>
          <Link to="/">
            <img
              src={`${process.env.PUBLIC_URL}/Logo.svg`}
              alt="Pusheat Logo"
              className={Styles.logo_img}
            />
          </Link>
        </div>
        <ul className={Styles.links}>
          <li>
            <Link to="/faq">FAQ</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/terms">Terms & Conditions</Link>
          </li>
          <li>
            <Link to="/privacy">Privacy Policy</Link>
          </li>
        </ul>
      </div>
      <hr />
      <div className={Styles.bottom}>
        <p>Copyright © {currentYear} Pusheat | All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
