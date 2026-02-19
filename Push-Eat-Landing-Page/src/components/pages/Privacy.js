import React from "react";
import ContentService from "../ContentService";
import Styles from "../ContentService.module.css";
import PrivacyText from "../PrivacyText";

function Privacy() {
  return (
    <ContentService title="Privacy Policy" lastUpdated="Effective: February 2026">
      <div className={Styles.toc}>
        <div className={Styles.tocTitle}>Contents</div>
        <a href="#info-collect">1. Introduction</a>
        <a href="#info-we-collect">2. Information We Collect</a>
        <a href="#info-use">3. How We Use Your Information</a>
        <a href="#info-share">4. How We Share Your Information</a>
        <a href="#data-retention">5. Data Retention</a>
        <a href="#your-rights">6. Your Rights and Choices</a>
        <a href="#security">7. Security</a>
        <a href="#international">8. International Data Transfers</a>
        <a href="#children">9. Children's Privacy</a>
        <a href="#third-party">10. Third-Party Links</a>
        <a href="#changes">11. Changes to This Policy</a>
        <a href="#contact-us">12. Contact Us</a>
      </div>
      <PrivacyText />
    </ContentService>
  );
}

export default Privacy;
