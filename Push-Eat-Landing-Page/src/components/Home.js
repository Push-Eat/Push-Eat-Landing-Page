import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import HeroSection from "./sections/HeroSection";
import AudienceToggle from "./sections/AudienceToggle";
import HowItWorks from "./sections/HowItWorks";
import PriceDrop from "./sections/PriceDrop";
import ProofStrip from "./sections/ProofStrip";
import WhyPushEat from "./sections/WhyPushEat";
import FAQ from "./sections/FAQ";
import AppCTA from "./sections/AppCTA";
import styles from "./Home.module.css"; // Keeping for any specific wrapper styles if needed, though most moved

function Home() {
  // Mobile sticky bar logic can remain or be moved to a component
  // For now, keeping it here for simplicity but could be refactored too

  return (
    <>
      <div className={styles.home_wrapper}>
        <Helmet>
          <title>Pusheat - Order from Food Creators | Viral Recipes Delivered</title>
          <meta
            name="description"
            content="Earn Bites by watching and sharing food videos, then use them to drop meal prices to zero. Get creator made meals in Lagos with exclusive deals and fast delivery."
          />
          {/* ... existing meta tags ... */}
        </Helmet>

        <HeroSection />

        <AudienceToggle />

        <HowItWorks />

        <PriceDrop />

        <ProofStrip />

        <WhyPushEat />

        <FAQ />

        <AppCTA />

      </div>

      {/* Mobile Sticky Bar - can be extracted to MobileStickyBar.js later if needed */}
      <div className={styles.mobileStickyBar}>
        <div className={styles.stickyText}>
          Get meals cheaper with Bites
        </div>
        <div className={styles.stickyActions}>
          <a
            href="https://play.google.com/store/apps/details?id=ng.pushEats&pli=1"
            className={styles.apple}
          >
            Google Play
          </a>
          <a
            href="https://apps.apple.com/ng/app/pusheat/id6749077010"
            className={styles.apple}
          >
            App Store
          </a>
        </div>
      </div>
    </>
  );
}

export default Home;
