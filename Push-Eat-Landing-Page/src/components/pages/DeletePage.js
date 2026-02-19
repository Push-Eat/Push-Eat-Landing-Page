import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ContentService from "../ContentService";
import styles from "./DeletePage.module.css";

const consequences = [
  { icon: "person_off", title: "Profile & Account", desc: "Your profile, username, and account settings will be permanently deleted." },
  { icon: "receipt_long", title: "Order History", desc: "All past orders, receipts, and transaction records will be erased." },
  { icon: "star_off", title: "Reviews & Ratings", desc: "Your reviews, ratings, and all content you've contributed will be removed." },
  { icon: "loyalty", title: "Rewards & Credits", desc: "Any unused credits, rewards points, or promotional balances will be forfeited." },
];

const steps = [
  { num: 1, title: "Open the Pusheat App", desc: "Navigate to Settings from your profile tab." },
  { num: 2, title: "Go to Account Settings", desc: 'Scroll down and tap "Delete Account" at the bottom.' },
  { num: 3, title: "Confirm Your Identity", desc: "Enter your password or verify via email to confirm." },
  { num: 4, title: "Confirm Deletion", desc: "Review the summary and confirm. Your account will be scheduled for deletion." },
];

function DeletePage() {
  const [requested, setRequested] = useState(false);

  return (
    <ContentService
      title="Delete Your Account"
      subtitle="We're sorry to see you go. Please review what happens when you delete your account."
    >
      <div className={styles.warningBox}>
        <span className="material-symbols-outlined">warning</span>
        <div>
          <p><strong>This action is permanent and cannot be undone.</strong> Once your account is deleted, all associated data will be permanently removed within 30 days. Some data may be retained as required by law.</p>
        </div>
      </div>

      <h3 className={styles.sectionTitle}>What You'll Lose</h3>
      <div className={styles.cqGrid}>
        {consequences.map((c) => (
          <div key={c.icon} className={styles.cqCard}>
            <span className="material-symbols-outlined">{c.icon}</span>
            <h4>{c.title}</h4>
            <p>{c.desc}</p>
          </div>
        ))}
      </div>

      <h3 className={styles.sectionTitle}>How to Delete Your Account</h3>
      <div className={styles.steps}>
        {steps.map((s) => (
          <div key={s.num} className={styles.step}>
            <div className={styles.stepNum}>{s.num}</div>
            <div className={styles.stepText}>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.deleteCta}>
        <h3>Ready to proceed?</h3>
        <p>You can also request account deletion by emailing us.</p>
        <button
          className={styles.deleteBtn}
          onClick={() => setRequested(true)}
          style={requested ? { borderColor: 'var(--green)', color: 'var(--green)' } : {}}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>delete_forever</span>
          {requested ? 'Request Sent ✓' : 'Request Account Deletion'}
        </button>
        <p className={styles.altLink}>Changed your mind? <Link to="/">Go back home</Link></p>
      </div>
    </ContentService>
  );
}

export default DeletePage;
