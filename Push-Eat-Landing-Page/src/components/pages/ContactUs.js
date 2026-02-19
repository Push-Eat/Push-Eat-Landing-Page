import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import ContentService from "../ContentService";
import styles from "./ContactUs.module.css";

const infoCards = [
  { icon: "mail", title: "Email Us", content: <p>General: <a href="mailto:hello@pusheat.com">hello@pusheat.com</a><br />Support: <a href="mailto:support@pusheat.com">support@pusheat.com</a><br />Press: <a href="mailto:press@pusheat.com">press@pusheat.com</a></p> },
  { icon: "location_on", title: "Location", content: <p>Lagos, Nigeria<br /><span style={{ color: 'var(--t3)', fontSize: 13 }}>Serving food creators across the city</span></p> },
  { icon: "schedule", title: "Response Time", content: <p>We typically respond within <strong style={{ color: 'var(--green)' }}>24 hours</strong> on business days. For urgent issues, reach out via in-app support.</p> },
  { icon: "follow_the_signs", title: "Follow Us", content: <p><a href="https://www.instagram.com/pusheat.ng/" target="_blank" rel="noopener noreferrer">Instagram</a> &middot; <a href="https://twitter.com/pusheat_ng" target="_blank" rel="noopener noreferrer">Twitter/X</a> &middot; <a href="https://www.tiktok.com/@pusheat" target="_blank" rel="noopener noreferrer">TikTok</a></p> },
];

function ContactUs() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <ContentService title="Get in Touch" subtitle="Have a question, feedback, or a partnership idea? We'd love to hear from you.">
      <Helmet>
        <title>Contact Us - Pusheat</title>
        <meta name="description" content="Contact Pusheat for support, partnership inquiries, or general questions. We're here to help." />
      </Helmet>
      <div className={styles.wrap}>
        <div className={styles.info}>
          {infoCards.map((card) => (
            <div key={card.icon} className={styles.ciCard}>
              <div className={styles.ciIcon}>
                <span className="material-symbols-outlined">{card.icon}</span>
              </div>
              <h3>{card.title}</h3>
              {card.content}
            </div>
          ))}
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h3 className={styles.cfTitle}>Send a Message</h3>
          <p className={styles.cfSub}>Fill out the form and we'll get back to you.</p>
          <div className={styles.formGroup}>
            <label>Your Name</label>
            <input type="text" placeholder="Full name" required />
          </div>
          <div className={styles.formGroup}>
            <label>Email Address</label>
            <input type="email" placeholder="you@example.com" required />
          </div>
          <div className={styles.formGroup}>
            <label>Subject</label>
            <select defaultValue="General Inquiry">
              <option>General Inquiry</option>
              <option>Technical Support</option>
              <option>Partnership</option>
              <option>Press & Media</option>
              <option>Become a Creator</option>
              <option>Bug Report</option>
              <option>Other</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Message</label>
            <textarea placeholder="Tell us what's on your mind..." required />
          </div>
          <button type="submit" className={styles.submitBtn} style={submitted ? { background: '#1A942B' } : {}}>
            {submitted ? 'Message Sent ✓' : 'Send Message'}
          </button>
        </form>
      </div>
    </ContentService>
  );
}

export default ContactUs;
