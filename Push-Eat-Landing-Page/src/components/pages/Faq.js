import React from "react";
import { Helmet } from "react-helmet-async";
import styles from "../HomeContent.module.css";

const Faq = () => {
  return (
    <div className={styles.container}>
      <Helmet>
        <title>Pusheat FAQ | How Bites, deals, and payments work</title>
        <meta
          name="description"
          content="Learn how to earn Bites, join deals, pay from your wallet, and get creator made meals delivered in Lagos."
        />
      </Helmet>
      <section className={styles.faqSection}>
        <h2>Questions, answered</h2>
        <div className={styles.faqList}>
          <div>
            <h4>What are Bites?</h4>
            <p>Bites are earned from watching, liking, sharing, and downloading food videos. Use them to cut meal prices.</p>
          </div>
          <div>
            <h4>Can I order without Bites?</h4>
            <p>Yes. You can pay normally. Bites simply reduce what you pay.</p>
          </div>
          <div>
            <h4>Where is Pusheat available?</h4>
            <p>We are live in Lagos. New cities will follow.</p>
          </div>
          <div>
            <h4>How do creators earn?</h4>
            <p>Creators post like they do on Instagram or TikTok, set their price, cook when they want, and get paid while we handle delivery.</p>
          </div>
          <div>
            <h4>How do I order?</h4>
            <p>Pick a deal, choose delivery or pickup, add your details, pay from your wallet, and apply Bites to lower the price.</p>
          </div>
          <div>
            <h4>How do deals work?</h4>
            <p>Join a deal and pay from your wallet. If it sells out or hits its target, the chef cooks. If it fails, your payment goes back to your wallet.</p>
          </div>
          <div>
            <h4>What if I do not want to wait?</h4>
            <p>Choose a direct order and pay the worth price. You can still apply Bites using the direct rate.</p>
          </div>
          <div>
            <h4>How do I pay or top up?</h4>
            <p>Fund your Pusheat wallet by transferring to your dedicated account number shown in the app. Then pay from your wallet.</p>
          </div>
          <div>
            <h4>When will my meal be ready?</h4>
            <p>Each deal shows the prep and delivery window before you pay. Pickup availability is also shown.</p>
          </div>
          <div>
            <h4>What if a deal fails or I cancel?</h4>
            <p>If a deal fails, your payment returns to your wallet. If you cancel within the allowed window, it also returns to your wallet.</p>
          </div>
          <div>
            <h4>Are delivery fees included?</h4>
            <p>Delivery is shown at checkout. Winning the Last Bite Lottery can unlock free delivery for a week.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faq;
