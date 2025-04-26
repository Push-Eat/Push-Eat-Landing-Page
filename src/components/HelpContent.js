import React from "react";
import Styles from "./HelpContent.module.css";
import { FaPhoneAlt, FaEnvelope, FaUser, FaMobileAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Helmet } from "react-helmet-async";

const BASE_URL = process.env.REACT_APP_BASE_URL;

function HelpContent() {
  return (
    <>
      <Helmet>
        <title>Contact Us - PushEat</title>
        <meta
          name="description"
          content="Have questions or need support? Contact PushEat for quick assistance via phone or email."
        />
        <meta
          name="keywords"
          content="PushEat contact, help, support, customer service"
        />
        <meta property="og:title" content="Contact Us - PushEat" />
        <meta
          property="og:description"
          content="Have questions or need support? Contact PushEat for quick assistance via phone or email."
        />
        <meta property="og:image" content={`${BASE_URL}/Logo.png`} />
        <meta property="og:url" content={`${BASE_URL}/contact`} />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us - PushEat" />
        <meta
          name="twitter:description"
          content="Have questions or need support? Contact PushEat for quick assistance via phone or email."
        />
        <meta name="twitter:image" content={`${BASE_URL}/Logo.png`} />
      </Helmet>
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
              Send message
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default HelpContent;
