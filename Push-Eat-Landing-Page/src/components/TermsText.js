import styles from "./TermsText.module.css";
import { Helmet } from "react-helmet-async";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function TermsText() {
  return (
    <>
      <Helmet>
        <title>Terms of Service - Pusheat</title>
        <meta
          name="description"
          content="Read the terms of service for using Pusheat. Understand your rights, responsibilities, and our policies."
        />
        <meta
          name="keywords"
          content="Pusheat terms, Pusheat policy, terms of service, Pusheat legal"
        />

        <meta property="og:title" content="Terms of Service - Pusheat" />
        <meta
          property="og:description"
          content="Read the terms of service for using Pusheat. Understand your rights, responsibilities, and our policies."
        />
        <meta property="og:image" content={`${BASE_URL}/Logo.png`} />
        <meta property="og:url" content={`${BASE_URL}/terms`} />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Terms of Service - Pusheat" />
        <meta
          name="twitter:description"
          content="Read the terms of service for using Pusheat. Understand your rights, responsibilities, and our policies."
        />
        <meta name="twitter:image" content={`${BASE_URL}/Logo.png`} />
      </Helmet>
      <div className={styles.container}>
        <h1 className={styles.mainHeading}>Welcome to Pusheat!</h1>

        <section>
          <h2 className={styles.heading}>1. YOUR RELATIONSHIP WITH US</h2>
          <p>
            Welcome to Pusheat (the “Platform”), a social media-based food deals
            platform provided by PLUSH EAT Enterprise (“Pusheat,” “we,” “us,” or
            “our”). These Terms of Service (“Terms”) govern your access to and
            use of the Platform, including our related websites, services,
            applications, products, and content (collectively, the “Services”).
            By accessing or using the Services, you agree to be bound by these
            Terms. If you do not agree to these Terms, you may not use the
            Services.
          </p>
        </section>

        <section>
          <h2 className={styles.heading}>2. ACCEPTING THE TERMS</h2>
          <p>
            By accessing or using our Services, you confirm that you can form a
            binding contract with Pusheat, that you accept these Terms, and that
            you agree to comply with them. Your access to and use of our
            Services is also subject to our{" "}
            <a href="/privacy">Privacy Policy</a> and{" "}
            <a href="guidelines">Community Guidelines</a>, which are
            incorporated into these Terms by reference. If you are accessing or
            using the Services on behalf of a business or entity, you represent
            and warrant that you are authorized to bind that business or entity
            to these Terms.
          </p>
        </section>

        <section>
          <h2 className={styles.heading}>3. CHANGES TO THE TERMS</h2>
          <p>
            We may amend these Terms from time to time to reflect changes in our
            Services, legal or regulatory requirements, or for other reasons. We
            will notify you of any material changes by posting the updated Terms
            on the Platform or through other reasonable means. Your continued
            use of the Services after the changes take effect constitutes your
            acceptance of the revised Terms.
          </p>
        </section>

        <section>
          <h2 className={styles.heading}>4. YOUR ACCOUNT WITH US</h2>
          <p>
            To access certain features of the Services, you must create an
            account. You agree to provide accurate and up-to-date information
            during registration and to keep your account information current.
            You are responsible for maintaining the confidentiality of your
            account credentials, and for all activities that occur under your
            account. Notify us immediately if you suspect unauthorized access to
            your account.
          </p>
          <h3 className={styles.subheading}>Account Deletion</h3>
          <p>
            You may delete your account at any time by contacting us. Upon
            deletion, your account and all associated content will be
            permanently removed from the Platform. You will not be able to
            reactivate your account or retrieve any content after deletion.
          </p>
          <h3 className={styles.subheading}>
            Account Suspension or Termination
          </h3>
          <p>
            We reserve the right by our sole discretion to disable, suspend, or
            terminate your account at any time, including if:
          </p>
          <ul className={styles.list}>
            <li>You violate these Terms or our Community Guidelines.</li>
            <li>
              Your activities on the Platform may cause damage, infringe on
              third-party rights, or violate applicable laws or regulations.
            </li>
            <li>
              In our sole discretion, we determine that your account poses a
              risk to the Platform or its users.
            </li>
          </ul>
        </section>

        <section>
          <h2 className={styles.heading}>
            5. YOUR ACCESS TO AND USE OF OUR SERVICES
          </h2>
          <p>
            Your access to and use of the Services is subject to these Terms and
            all applicable laws and regulations. You agree not to:
          </p>
          <ul className={styles.list}>
            <li>Use the Services for any illegal or unauthorized purpose.</li>
            <li>
              Post content that is defamatory, obscene, discriminatory, or
              violates any third-party rights.
            </li>
            <li>
              Interfere with the proper functioning of the Services or engage in
              any activity that disrupts the Platform.
            </li>
            <li>
              Attempt to circumvent any security or access controls on the
              Platform.
            </li>
            <li>
              Use automated scripts to collect information from or interact with
              the Services.
            </li>
            <li>
              Impersonate any person or entity or misrepresent your affiliation
              with any person or entity.
            </li>
            <li>
              Post content that promotes violence, discrimination, or illegal
              activities.
            </li>
            <li>
              Upload or transmit viruses, malware, or any other harmful
              material.
            </li>
          </ul>
        </section>

        <section>
          <h2 className={styles.heading}>6. INTELLECTUAL PROPERTY RIGHTS</h2>
          <h3 className={styles.subheading}>Pusheat Content</h3>
          <p>
            All content, software, images, text, graphics, logos, and other
            materials on the Platform (“Pusheat Content”) are owned by or
            licensed to Pusheat. You may not use, reproduce, or distribute
            Pusheat Content without our prior written consent.
          </p>

          <h3 className={styles.subheading}>User Content</h3>
          <p>
            By posting content on Pusheat, including food deals, videos, and
            other materials (“User Content”), you grant us a{" "}
            <strong>
              non-exclusive, royalty-free, worldwide, perpetual, and
              transferable license
            </strong>{" "}
            to use, reproduce, modify, adapt, distribute, and display your User
            Content for any purpose, including commercial purposes, to improve
            our Services, and to increase our goodwill and value. This license
            includes the right to sublicense your User Content to third parties.
          </p>
        </section>
      </div>
    </>
  );
}
