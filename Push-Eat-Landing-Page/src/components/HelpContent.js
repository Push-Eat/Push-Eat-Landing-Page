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
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState({
    text: "",
    isError: false,
  });
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

    const newErrors = {};
    if (!formData.fullName.trim())
      newErrors.fullName = "Full name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const emailParams = {
      to_email: "dev@pusheat.co",
      full_name: formData.fullName,
      email_address: formData.email,
      phone_number: `${selectedDialCode} ${formData.phone}`,
      message: formData.message,
    };

    emailjs
      .send(
        "service_ohgbuw1",
        "template_43mfnut",
        emailParams,
        "1Ch2cVTqYzKtFu-es"
      )
      .then(() => {
        setStatusMessage({
          text: "Your message has been sent successfully!",
          isError: false,
        });

        setFormData({
          fullName: "",
          email: "",
          phone: "",
          message: "",
        });

        setTimeout(() => {
          setStatusMessage({ text: "", isError: false });
        }, 5000);
      })

      .catch(() => {
        setStatusMessage({
          text: "There was an error sending your message. Please try again later.",
          isError: true,
        });
      });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Pusheat</title>
        <meta
          name="description"
          content="Have questions or need support? Contact Pusheat for quick assistance via phone or email."
        />
        <meta
          name="keywords"
          content="Pusheat contact, help, support, customer service"
        />
        <meta property="og:title" content="Contact Us - Pusheat" />
        <meta
          property="og:description"
          content="Have questions or need support? Contact Pusheat for quick assistance via phone or email."
        />
        <meta property="og:image" content={`${BASE_URL}/Logo.png`} />
        <meta property="og:url" content={`${BASE_URL}/contact`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us - Pusheat" />
        <meta
          name="twitter:description"
          content="Have questions or need support? Contact Pusheat for quick assistance via phone or email."
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
              {errors.fullName && (
                <div style={{ color: "red", marginTop: "4px" }}>
                  {errors.fullName}
                </div>
              )}
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
              {errors.email && (
                <div style={{ color: "red", marginTop: "4px" }}>
                  {errors.email}
                </div>
              )}
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
              {errors.phone && (
                <div style={{ color: "red", marginTop: "4px" }}>
                  {errors.phone}
                </div>
              )}
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
            {errors.message && (
              <div style={{ color: "red", marginTop: "4px" }}>
                {errors.message}
              </div>
            )}
            <button type="submit" className={Styles.button}>
              Send message
            </button>
            {statusMessage.text && (
              <div
                style={{
                  marginTop: "10px",
                  color: statusMessage.isError ? "#d93025" : "#0f9d58",
                  fontWeight: "500",
                }}
              >
                {statusMessage.text}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default HelpContent;
