import React from "react";
import ContentService from "../ContentService";
import Styles from "../ContentService.module.css";
import TermsText from "../TermsText";

function TermsService() {
  return (
    <ContentService title="Terms of Service" lastUpdated="Effective: February 2026">
      <div className={Styles.toc}>
        <div className={Styles.tocTitle}>Contents</div>
        <a href="#acceptance">1. Acceptance of Terms</a>
        <a href="#accounts">2. User Accounts</a>
        <a href="#usage">3. Acceptable Use</a>
        <a href="#orders">4. Orders & Payments</a>
        <a href="#ip">5. Intellectual Property</a>
        <a href="#liability">6. Limitation of Liability</a>
        <a href="#termination">7. Termination</a>
        <a href="#governing">8. Governing Law</a>
      </div>
      <div className={Styles.callout}>
        By accessing or using Pusheat, you agree to be bound by these Terms. If you do not agree, please do not use our services.
      </div>
      <TermsText />
    </ContentService>
  );
}

export default TermsService;
