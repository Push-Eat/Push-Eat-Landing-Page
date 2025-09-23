import React from "react";
import { Helmet } from "react-helmet-async";
import styles from "./Delete.module.css";
import HelpContent from "./HelpContent";

const Delete = () => {
  return (
    <>
      <Helmet>
        <title>Delete Your Pusheat Account | Pusheat Help</title>
        <meta
          name="description"
          content="Step-by-step guide on how to permanently delete your Pusheat account, including data and wallet removal. Learn how to manage your profile settings."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.pusheat.com/help/delete-account"
        />
      </Helmet>

      <div className={styles.container}>
        <h2 className={styles.title}>We’re sorry to see you go!</h2>
        <p className={styles.subtitle}>
          To delete your account from the Pusheat app, please follow these
          steps:
        </p>

        <ol className={styles.stepsList}>
          <li>
            <span className={styles.stepNumber}>1</span> Open the Pusheat app.
          </li>
          <li>
            <span className={styles.stepNumber}>2</span> Navigate to your{" "}
            <strong>Profile</strong>.
          </li>
          <li>
            <span className={styles.stepNumber}>3</span> Go to{" "}
            <strong>Settings</strong>.
          </li>
          <li>
            <span className={styles.stepNumber}>4</span> Select{" "}
            <strong>Delete My Account</strong>.
          </li>
          <li>
            <span className={styles.stepNumber}>5</span> Confirm your{" "}
            <strong>Action</strong>.
          </li>
        </ol>

        <p className={styles.warning}>
          ⚠️ This action is permanent. Your data, order history, and wallet
          balance will be deleted.
        </p>
      </div>
      <div className={styles.need_help}>Need help? Contact Support</div>
      <HelpContent />
    </>
  );
};

export default Delete;
