import React, { useEffect, useState, useRef } from "react";
import styles from "./HomeContent.module.css";
import iphone from "../assets/iphone.png";
import { PiHamburgerThin } from "react-icons/pi";
import { FiClock } from "react-icons/fi";
import { PiTruck } from "react-icons/pi";
import { faGooglePlay, faApple } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import tag from "../assets/tag.png";
import homef1 from "../assets/homef1.png";
import homef2 from "../assets/homef2.png";
import featureline from "../assets/featureline.svg";
import features from "../assets/features.png";

const HomeContent = () => {
  const downloadRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Smart device detection and download
  const handleSmartDownload = () => {
    const userAgent = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);
    const isAndroid = /Android/.test(userAgent);
    const isMac = /Macintosh|MacIntel|MacPPC|Mac68K/.test(userAgent);
    
    if (isIOS) {
      window.open('https://apps.apple.com/ng/app/pusheat/id6749077010', '_blank');
    } else if (isAndroid) {
      window.open('https://play.google.com/store/apps/details?id=ng.pushEats&pli=1', '_blank');
    } else if (isMac) {
      // Mac users should go to App Store (they likely have iPhone too)
      window.open('https://apps.apple.com/ng/app/pusheat/id6749077010', '_blank');
    } else {
      // Windows/Linux users - default to Google Play
      window.open('https://play.google.com/store/apps/details?id=ng.pushEats&pli=1', '_blank');
    }
  };

  const [activeTab, setActiveTab] = useState("customers");

  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };

  useEffect(() => {
    // Only auto-switch if user is not interacting
    if (!isHovered) {
      const interval = setInterval(() => {
        setActiveTab((prev) => (prev === "customers" ? "chefs" : "customers"));
      }, 8000); // Increased to 8 seconds for better UX

      return () => clearInterval(interval);
    }
  }, [isHovered]);

  return (
    <div className={styles.container}>
      <section className={styles.buildingSection}>
        <div className={styles.textArea} 
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}>
          <div className={styles.tab}>
            <span
              className={activeTab === "customers" ? styles.activeTab : ""}
              onClick={() => handleTabClick("customers")}
              title="For food lovers discovering amazing creators"
            >
              Customers {activeTab === "customers" && "●"}
            </span>
            <span
              className={activeTab === "chefs" ? styles.activeTab : ""}
              onClick={() => handleTabClick("chefs")}
              title="For food creators ready to monetize"
            >
              Chefs {activeTab === "chefs" && "●"}
            </span>
          </div>
          <div style={{fontSize: '12px', color: '#666', marginBottom: '10px', textAlign: 'center'}}>
            {isHovered ? 'Paused. Tap a tab to explore.' : 'Auto switching every 8 seconds'}
          </div>
          <div className={styles.blockWrapper}>
            <div
              className={`${styles.block} ${
                activeTab === "customers" ? styles.show : styles.hide
              }`}
            >
              <div className={styles.block1}>
                <h2 className={styles.home_content_headings}>
                  Eat for free with Bites
                </h2>
                <p className={styles.home_content_paragraph}>
                  Watch food videos, like them, share, and download to earn Bites. Apply them at checkout to drop your bill to zero on creator made meals in Lagos.
                </p>
                <div className={styles.home_content_paragraph}>
                  <p>Earn Bites for every action on food videos</p>
                  <p>Apply Bites to cut your price, even to zero when you have enough</p>
                  <p>Creator drops and limited deals before they sell out</p>
                  <p>Pay normally when you want. Bites make every order cheaper</p>
                </div>
              </div>
            </div>
            <div
              className={`${styles.block} ${
                activeTab === "chefs" ? styles.show : styles.hide
              }`}
            >
              <div className={styles.block2}>
                <h2 className={styles.home_content_headings}>Post and get paid for your food videos</h2>
                <p className={styles.home_content_paragraph}>
                  Post like you do on Instagram or TikTok. Set your price, cook when you want, and let Pusheat handle delivery and payments so you earn instead of only getting likes.
                </p>
                <div className={styles.home_content_paragraph}>
                  <p>Turn your audience into orders, not just engagement</p>
                  <p>Set your menu, pricing, and drop schedule</p>
                  <p>Cook on your terms, we handle delivery and payouts</p>
                  <p>Add a buy button to the content you already post</p>
                </div>
              </div>
            </div>
          </div>
          <button className={styles.downloadBtn} onClick={handleSmartDownload}>
            Download App →
          </button>
        </div>

        <div className={styles.imageMockup}>
          <img src={iphone} alt="iphone" />
          <img src={tag} alt="Pusheat Logo" className={styles.logoOverlay} />
        </div>
      </section>

      <section className={styles.stepsSection} id="how-bites-works">
        <h2>How Bites Works</h2>
        <h2 className={styles.stepsh2}>How Bites Works</h2>
        <p className={styles.text_paragraph}>
          Engage with food videos to earn Bites, apply them at checkout, and drop creator made meal prices fast in Lagos.
        </p>
        <div className={styles.steps}>
          {/* Icons and text grouped per column */}
          <div className={styles.stepsRow}>
            {/* ICONS + DOTS row */}
            <div className={styles.iconRow}>
              <div className={styles.iconWrapper}>
                <PiHamburgerThin className={styles.icon} />
              </div>

              <div className={styles.dots}>
                {[...Array(18)].map((_, i) => (
                  <span
                    key={`dots1-${i}`}
                    className={`${styles.dot} ${
                      i === 0
                        ? styles.smallDot
                        : i === 17
                        ? styles.bigDot
                        : styles.midDot
                    }`}
                  ></span>
                ))}
              </div>

              <div className={styles.iconWrapper}>
                <FiClock className={styles.icon} />
              </div>

              <div className={styles.dots}>
                {[...Array(18)].map((_, i) => (
                  <span
                    key={`dots1-${i}`}
                    className={`${styles.dot} ${
                      i === 0
                        ? styles.smallDot
                        : i === 17
                        ? styles.bigDot
                        : styles.midDot
                    }`}
                  ></span>
                ))}
              </div>

              <div className={styles.iconWrapper}>
                <PiTruck className={styles.icon} />
              </div>
            </div>

            {/* TEXT row */}
            <div className={styles.textRow}>
              <div className={styles.textBlock}>
                <h3>ENGAGE</h3>
                <p>Watch creator food videos. Like them, share, and download the ones you love.</p>
              </div>

              <div className={styles.textBlock}>
                <h3>EARN BITES</h3>
                <p>Each action earns Bites that sit in your wallet. Show interest and build balance.</p>
              </div>

              <div className={styles.textBlock}>
                <h3>CHECKOUT</h3>
                <p>Apply Bites at checkout to cut the price. Enough Bites can take it to zero.</p>
              </div>
            </div>
          </div>
          <div className={styles.stepsRow2}>
            <div className={styles.detailsrow}>
              <div className={styles.iconWrapper2}>
                <PiHamburgerThin className={styles.icon2} />
              </div>
              <div className={styles.textBlock2}>
                <h3>ENGAGE</h3>
                <p className={styles.text_paragraph}>
                  Watch and share the creator food videos you like.
                </p>
              </div>
            </div>
            <div className={styles.detailsrow}>
              <div className={styles.iconWrapper2}>
                <FiClock className={styles.icon2} />
              </div>
              <div className={styles.textBlock2}>
                <h3>EARN BITES</h3>
                <p className={styles.text_paragraph}>
                  Every action earns Bites in your wallet for creator drops.
                </p>
              </div>
            </div>
            <div className={styles.detailsrow}>
              <div className={styles.iconWrapper2}>
                <PiTruck className={styles.icon2} />
              </div>
              <div className={styles.textBlock2}>
                <h3>CHECKOUT</h3>
                <p className={styles.text_paragraph}>
                  Apply Bites to drop the price. Delivery comes to you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.priceBarSection}>
        <div className={styles.priceBarHeader}>Watch your price drop with Bites</div>
        <div className={styles.priceBar}>
          <span className={styles.priceLabel}>₦5,000</span>
          <div className={styles.priceTrack}>
            <div className={styles.priceFill}></div>
          </div>
          <span className={styles.priceLabel}>₦0</span>
        </div>
        <p className={styles.priceNote}>Apply saved Bites at checkout to lower the cost. 100 Bites = ₦1,000. Enough Bites can take it to zero.</p>
      </section>

      <section className={styles.proofStrip}>
        <div className={styles.proofItem}>
          <h3>Live in Lagos</h3>
          <p>Built for Lagos food lovers and creators right now.</p>
        </div>
        <div className={styles.proofItem}>
          <h3>Over 100 orders fulfilled</h3>
          <p>Creator drops moving fast with real deliveries.</p>
        </div>
        <div className={styles.proofItem}>
          <h3>20+ food creators</h3>
          <p>Local chefs posting, setting prices, and selling out.</p>
        </div>
      </section>

      {/* AI-Discoverable Section for Nigeria Food Delivery Queries */}
      <section className={styles.stepsSection}>
        <h2>Why Pusheat</h2>
        <div className={styles.textRow} style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px', margin: '40px 0'}}>
          <div className={styles.textBlock} style={{flex: '1', minWidth: '280px'}}>
            <h3>BITES MAKE MEALS CHEAPER</h3>
            <p>Earn Bites by engaging with food videos and apply them to drop prices fast. Enough Bites can take a meal to zero.</p>
          </div>
          <div className={styles.textBlock} style={{flex: '1', minWidth: '280px'}}>
            <h3>CREATOR-MADE FOOD</h3>
            <p>Meals come from the food creators you follow, not anonymous ghost kitchens. Support them directly while you save.</p>
          </div>
          <div className={styles.textBlock} style={{flex: '1', minWidth: '280px'}}>
            <h3>LAGOS FIRST</h3>
            <p>Built for Lagos routes and delivery realities so your food shows up with speed and care.</p>
          </div>
        </div>
        <div className={styles.textRow} style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px', margin: '20px 0'}}>
          <div className={styles.textBlock} style={{flex: '1', minWidth: '280px'}}>
            <h3>PAY YOUR WAY</h3>
            <p>Apply Bites first, then pay the balance with your preferred option. Easy, safe, and made for Lagos users.</p>
          </div>
          <div className={styles.textBlock} style={{flex: '1', minWidth: '280px'}}>
            <h3>LIMITED DROPS</h3>
            <p>Exclusive deals that sell out. Grab a drop early or watch the Bite activity rise before you jump in.</p>
          </div>
          <div className={styles.textBlock} style={{flex: '1', minWidth: '280px'}}>
            <h3>BUILT FOR BUDGETS</h3>
            <p>Use saved Bites when cash is tight so you keep eating well without slowing down.</p>
          </div>
        </div>
      </section>

      <section className={styles.highlightSection}>
        <div className={styles.highlightCard}>
          <h3>Food security made practical</h3>
          <p>Save Bites from your daily engagement. When cash is tight, apply them to cover meals and keep going.</p>
        </div>
        <div className={styles.highlightCard}>
          <h3>Last Bite Lottery</h3>
          <p>Be the last to Bite before a drop ends and win bonus rewards plus free delivery for a week. Watch the timer, then make your move.</p>
        </div>
      </section>

      <section className={styles.faqSection} id="faq">
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

      {/* Why are we unique? */}
      <section className={styles.home_footer_images}>
        <div className={styles.home_footer_image}>
          <div>
            <img src={homef1} alt="" />
          </div>
          <div>
            <img src={homef2} alt="" />
          </div>
        </div>
        <div className={styles.home_footer_image2}>
          <div>
            <img src={featureline} alt="footer" />
          </div>
          <div>
            <img src={features} alt="footer" />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles.ctaSection} ref={downloadRef}>
        <h2>Ready to discover food creators?</h2>
        <div className={styles.downloadLinks}>
          <a href="https://play.google.com/store/apps/details?id=ng.pushEats&pli=1" className={styles.storeBtn}>
            <FontAwesomeIcon icon={faGooglePlay} className={styles.storeIcon} />
            <span>Download on Google Play</span>
          </a>
          <a href="https://apps.apple.com/ng/app/pusheat/id6749077010" className={styles.storeBtn}>
            <FontAwesomeIcon icon={faApple} className={styles.storeIcon} />
            <span>Download on App Store</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomeContent;
