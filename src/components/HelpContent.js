import React, { useState } from "react";
import Styles from "./HelpContent.module.css";
import { FaEnvelope, FaUser, FaMobileAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Helmet } from "react-helmet-async";
import { allCountries } from "country-telephone-data";
import emailjs from "emailjs-com";

const BASE_URL = process.env.REACT_APP_BASE_URL;

function HelpContent() {
  const [selectedDialCode, setSelectedDialCode] = useState("+234");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSelect = (dialCode) => {
    setSelectedDialCode(`+${dialCode}`);
    setIsDropdownOpen(false);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare email data
    const emailParams = {
      to_email: "pusheat@dev.co",
      full_name: formData.fullName,
      email_address: formData.email,
      phone_number: `${selectedDialCode} ${formData.phone}`,
      message: formData.message,
    };

    // Send the email using EmailJS
    emailjs
      .send("your_service_id", "your_template_id", emailParams, "your_user_id")
      .then(
        (response) => {
          console.log("SUCCESS", response);
          alert("Your message has been sent!");
        },
        (error) => {
          console.log("FAILED", error);
          alert(
            "There was an error sending your message. Please try again later."
          );
        }
      );
  };

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
            <FaEnvelope className={Styles.icon} />
            <span>dev@pusheat.co</span>
          </div>
        </div>

        {/* Right Side Form */}
        <div className={Styles.formWrapper}>
          <form className={Styles.form} onSubmit={handleSubmit}>
            <div className={Styles.inputGroup}>
              <label htmlFor="fullName">Full Name</label>
              <div className={Styles.inputIcon}>
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  autoComplete="name"
                />
                <FaUser />
              </div>
            </div>

            <div className={Styles.inputGroup}>
              <label htmlFor="email">Email Address</label>
              <div className={Styles.inputIcon}>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  autoComplete="email"
                />
                <MdEmail />
              </div>
            </div>

            <div className={Styles.inputGroup}>
              <label htmlFor="phone">Phone Number</label>
              <div
                className={Styles.inputIcon}
                style={{ position: "relative" }}
              >
                <div
                  className={Styles.countryCode}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  style={{ cursor: "pointer" }}
                >
                  {selectedDialCode}
                </div>

                {isDropdownOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 5px)",
                      left: 0,
                      background: "white",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      maxHeight: "200px",
                      overflowY: "auto",
                      zIndex: 10,
                      width: "100%",
                    }}
                  >
                    {allCountries.map((country) => (
                      <div
                        key={country.iso2}
                        onClick={() => handleSelect(country.dialCode)}
                        style={{
                          padding: "10px",
                          borderBottom: "1px solid #eee",
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                      >
                        {country.name} (+{country.dialCode})
                      </div>
                    ))}
                  </div>
                )}

                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="00 000 000"
                  autoComplete="tel"
                  style={{ marginLeft: "5px" }}
                />
                <FaMobileAlt />
              </div>
            </div>

            <div className={Styles.inputGroup}>
              <label htmlFor="message">Your Message</label>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How may we help you?"
              />
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
