import React from "react";
import ContentService from "../ContentService";
import Styles from "../ContentService.module.css";
import TermsText from "../TermsText";

function TermsService() {
  return (
    <ContentService title="Terms of Service" lastUpdated="Effective: February 2026">
      <div className={Styles.toc}>
        <div className={Styles.tocTitle}>Contents</div>
        <a href="#relationship">1. Your Relationship with Us</a>
        <a href="#acceptance">2. Accepting the Terms</a>
        <a href="#changes">3. Changes to the Terms</a>
        <a href="#accounts">4. Your Account with Us</a>
        <a href="#usage">5. Access and Use of Services</a>
        <a href="#ip">6. Intellectual Property Rights</a>
        <a href="#ai-enrichment">7. AI Profile Enrichment</a>
        <a href="#liability">8. Limitations</a>
        <a href="#governing">9. Governing Law</a>
      </div>
      <div className={Styles.callout}>
        By accessing or using Pusheat, you agree to be bound by these Terms. If you do not agree, please do not use our services.
      </div>
      <TermsText />
    </ContentService>
  );
}

export default TermsService;
