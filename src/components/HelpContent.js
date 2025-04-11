import React from "react";
import Styles from "./HelpContent.module.css";
import { FaPhoneAlt, FaEnvelope, FaUser, FaMobileAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function HelpContent() {
  return (
    <div className={Styles.container}>
      {/* Left Side Contact Info */}
      <div className={Styles.contactInfo}>
        <h2>Get in touch with us</h2>
        <p>We are always here to assist you with anything</p>
        <div className={Styles.infoItem}>
          <FaPhoneAlt className={Styles.icon} />
          <span>+1012 3456 789</span>
        </div>
        <div className={Styles.infoItem}>
          <FaEnvelope className={Styles.icon} />
          <span>demo@gmail.com</span>
        </div>
      </div>

      {/* Right Side Form */}
      <div className={Styles.formWrapper}>
        <form className={Styles.form}>
          <div className={Styles.inputGroup}>
            <label htmlFor="fullName">Full Name</label>
            <div className={Styles.inputIcon}>
              <input type="text" id="fullName" placeholder="Full Name" />
              <FaUser />
            </div>
          </div>

          <div className={Styles.inputGroup}>
            <label htmlFor="email">Email Address</label>
            <div className={Styles.inputIcon}>
              <input type="email" id="email" placeholder="Email Address" />
              <MdEmail />
            </div>
          </div>

          <div className={Styles.inputGroup}>
            <label htmlFor="phone">Business Phone Number</label>
            <div className={Styles.inputIcon}>
              <select className={Styles.countryCode}>
                <option value="+81">+81</option>
              </select>
              <input type="tel" id="phone" placeholder="00 000 000" />
              <FaMobileAlt />
            </div>
          </div>

          <div className={Styles.inputGroup}>
            <label htmlFor="message">Your Message</label>
            <textarea id="message" placeholder="How may we help you?" />
          </div>

          <button type="submit" className={Styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default HelpContent;
