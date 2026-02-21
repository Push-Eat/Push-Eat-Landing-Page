import React from "react";
import Styles from "./PrivacyText.module.css";
import { Helmet } from "react-helmet-async";

const BASE_URL = process.env.REACT_APP_BASE_URL;

function PrivacyText() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Pusheat</title>
        <meta
          name="description"
          content="Read the Pusheat Privacy Policy to understand how we collect, use, and protect your personal information when using our platform and services."
        />
        <meta
          name="keywords"
          content="Pusheat privacy policy, AI profile personalization, social profile enrichment, data protection, personal data, user information"
        />
        <meta property="og:title" content="Privacy Policy - Pusheat" />
        <meta
          property="og:description"
          content="Understand how Pusheat handles your personal data with our transparent privacy policy."
        />
        <meta property="og:image" content={`${BASE_URL}/Logo.png`} />
        <meta property="og:url" content={`${BASE_URL}/privacy`} />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Privacy Policy - Pusheat" />
        <meta
          name="twitter:description"
          content="Read how Pusheat collects, uses, and protects your personal information."
        />
        <meta name="twitter:image" content={`${BASE_URL}/Logo.png`} />
      </Helmet>
      <div className={Styles.wrapper}>
        <div className={Styles.section}>
          <h2 id="info-collect">1. INTRODUCTION</h2>
          <p>
            Welcome to <strong>Pusheat!</strong> This Privacy Policy explains
            how we collect, use, disclose, and protect your personal information
            when you use our Platform and Services. By accessing or using
            Pusheat, you agree to the terms of this Privacy Policy. If you do
            not agree, please do not use our Services.
          </p>
        </div>

        <div className={Styles.section}>
          <h2 id="info-we-collect">2. INFORMATION WE COLLECT</h2>
          <p>We collect the following types of information:</p>
          <h3>2.1 Information You Provide</h3>
          <ul>
            <li>
              <strong>Account Information:</strong> Name, email address, phone
              number, username, password, and profile picture.
            </li>
            <li>
              <strong>Payment Information:</strong> Card details for processing
              payments. We do not collect or store your full bank account
              information or transaction history.
            </li>
            <li>
              <strong>Chef-Specific Information:</strong>
              <ul>
                <li>Kitchen location and business address.</li>
                <li>Social media handles (if linked).</li>
                <li>Identity verification documents.</li>
                <li>Culinary or expertise certificates.</li>
              </ul>
            </li>
            <li>
              <strong>Content You Post:</strong> Food deals, videos, comments,
              reviews, and other user-generated content.
            </li>
            <li>
              <strong>Communications:</strong> Messages, feedback, and support
              requests.
            </li>
          </ul>

          <h3>2.2 Information Collected Automatically</h3>
          <ul>
            <li>
              <strong>Device Information:</strong> IP address, device type,
              operating system, browser type, and FCM token (for push
              notifications).
            </li>
            <li>
              <strong>Usage Data:</strong> Pages visited, time spent on the
              Platform, and interactions with content.
            </li>
            <li>
              <strong>Location Data:</strong> Approximate location based on IP
              address or GPS (if enabled).
            </li>
          </ul>

          <h3>2.3 Information from Third Parties</h3>
          <ul>
            <li>
              <strong>Social Media:</strong> If you link your Pusheat account to
              social media platforms, we may collect information from those
              accounts.
            </li>
            <li>
              <strong>Public Social Profile Enrichment:</strong> Where permitted by
              law and your account settings, we may process publicly available
              profile and post metadata tied to business handles you provide in
              order to improve chef discovery pages and search relevance.
            </li>
            <li>
              <strong>Payment Processors:</strong> Payment confirmation and
              limited transaction details from third-party payment providers.
            </li>
          </ul>
        </div>

        <div className={Styles.section}>
          <h2 id="info-use">3. HOW WE USE YOUR INFORMATION</h2>
          <p>We use your information for the following purposes:</p>
          <ul>
            <li>To provide, maintain, and improve our Services.</li>
            <li>To process transactions and facilitate food deals.</li>
            <li>
              To communicate with you about your account, transactions, and
              updates.
            </li>
            <li>To personalize your experience and show relevant content.</li>
            <li>
              To generate and update chef profile pages, headings, summaries, and
              other profile content using first-party platform data and approved
              enrichment inputs.
            </li>
            <li>
              To perform automated personalization and profiling for marketplace
              ranking, SEO relevance, and content quality controls.
            </li>
            <li>
              To enforce our Terms and Conditions and Community Guidelines.
            </li>
            <li>
              To detect, prevent, and address fraud, security, or technical
              issues.
            </li>
            <li>To comply with legal obligations and protect our rights.</li>
          </ul>
        </div>

        <div className={Styles.section}>
          <h2 id="info-share">4. HOW WE SHARE YOUR INFORMATION</h2>
          <p>We may share your information in the following circumstances:</p>
          <ul>
            <li>
              <strong>With Chefs and Users:</strong> To facilitate food deals,
              we share necessary information (e.g., delivery details) between
              chefs and users.
            </li>
            <li>
              <strong>With Service Providers:</strong> Third-party vendors who
              assist with payment processing, analytics, and customer support.
            </li>
            <li>
              <strong>With AI/Cloud Processors:</strong> We may process limited
              content inputs through approved providers (such as Google Cloud /
              Vertex AI) to generate chef profile content, improve quality, and
              maintain consistency of marketplace pages.
            </li>
            <li>
              <strong>For Legal Reasons:</strong> To comply with laws, respond
              to legal requests, or protect our rights and safety.
            </li>
            <li>
              <strong>With Your Consent:</strong> For any other purpose
              disclosed to you at the time of collection.
            </li>
          </ul>
        </div>

        <div className={Styles.section}>
          <h2 id="data-retention">5. DATA RETENTION</h2>
          <p>
            We retain your information only as long as necessary to fulfill the
            purposes outlined in this Privacy Policy, unless a longer retention
            period is required by law. For example:
          </p>
          <ul>
            <li>Account data is retained while your account is active.</li>
            <li>
              Chef-specific information (e.g., identity documents) is retained
              for verification and compliance purposes.
            </li>
            <li>
              User-generated content may be retained for archival purposes
              unless you delete it.
            </li>
            <li>
              Enrichment snapshots, generated profile revisions, and related audit
              metadata may be retained for a limited window to support quality
              checks, dispute resolution, and safe regeneration workflows.
            </li>
          </ul>
          <p>
            Our target retention window for enrichment snapshots is up to 180
            days, unless a longer period is required for security, legal, or
            compliance reasons.
          </p>
        </div>

        <div className={Styles.section}>
          <h2 id="your-rights">6. YOUR RIGHTS AND CHOICES</h2>
          <p>
            You have the following rights regarding your personal information:
          </p>
          <ul>
            <li>
              <strong>Access and Correction</strong> – Request access to or
              correction of your information.
            </li>
            <li>
              <strong>Deletion</strong> – Request deletion of your account and
              associated data.
            </li>
            <li>
              <strong>Opt-Out</strong> – Opt out of marketing communications or
              data sharing with third parties.
            </li>
            <li>
              <strong>Data Portability</strong> – Request a copy of your data in
              a machine-readable format.
            </li>
            <li>
              <strong>Generated Content Correction and Appeal</strong> – Request
              correction, review, or removal of generated profile content you
              believe is inaccurate or misleading.
            </li>
            <li>
              <strong>Social Enrichment Opt-Out</strong> – You may opt out of
              social profile enrichment while keeping access to core app features.
            </li>
          </ul>
          <p>
            To exercise these rights, contact us at{" "}
            <a href="mailto:dev@pusheat.co">dev@pusheat.co</a>.
          </p>
        </div>

        <div className={Styles.section}>
          <h2 id="security">7. SECURITY</h2>
          <p>
            We implement technical and organizational measures to protect your
            information, including:
          </p>
          <ul>
            <li>Encryption of sensitive data (e.g., payment information).</li>
            <li>Regular security audits and vulnerability assessments.</li>
            <li>
              Access controls to limit internal access to your information.
            </li>
          </ul>
          <p>
            <em>
              However, no method of transmission or storage is 100% secure. You
              are responsible for keeping your account credentials confidential.
            </em>
          </p>
        </div>

        <div className={Styles.section}>
          <h2 id="international">8. INTERNATIONAL DATA TRANSFERS</h2>
          <p>
            If we transfer your information outside Nigeria, we will ensure it
            is protected by appropriate safeguards, such as data transfer
            agreements or certifications.
          </p>
        </div>

        <div className={Styles.section}>
          <h2 id="children">9. CHILDREN'S PRIVACY</h2>
          <p>
            Pusheat is not intended for users under the age of 18. We do not
            knowingly collect personal information from children. If we become
            aware of such collection, we will delete the information promptly.
          </p>
        </div>

        <div className={Styles.section}>
          <h2 id="third-party">10. THIRD-PARTY LINKS</h2>
          <p>
            Our Platform may contain links to third-party websites or services.
            This Privacy Policy does not apply to those third parties. We
            encourage you to review their privacy policies before providing any
            information.
          </p>
        </div>

        <div className={Styles.section}>
          <h2 id="changes">11. CHANGES TO THIS PRIVACY POLICY</h2>
          <p>
            We may update this Privacy Policy from time to time. If we make
            material changes, we will notify you through the Platform or by
            email. Your continued use of Pusheat after the changes take effect
            constitutes your acceptance of the updated Privacy Policy.
          </p>
        </div>

        <div className={Styles.section}>
          <h2 id="contact-us">12. CONTACT US</h2>
          <p>
            If you have questions or concerns about this Privacy Policy or our
            data practices, please contact us at:{" "}
            <a href="mailto:dev@pusheat.co">dev@pusheat.co</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default PrivacyText;
