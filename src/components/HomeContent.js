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
    
    if (isIOS) {
      window.open('https://apps.apple.com/ng/app/pusheat/id6749077010', '_blank');
    } else if (isAndroid) {
      window.open('https://play.google.com/store/apps/details?id=ng.pushEats&pli=1', '_blank');
    } else {
      // Desktop users - show both options
      const userChoice = window.confirm('Choose your device:\nOK for Android\nCancel for iOS');
      if (userChoice) {
        window.open('https://play.google.com/store/apps/details?id=ng.pushEats&pli=1', '_blank');
      } else {
        window.open('https://apps.apple.com/ng/app/pusheat/id6749077010', '_blank');
      }
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
            {isHovered ? 'Paused - Click tabs to explore' : 'Auto-switching every 8 seconds'}
          </div>
          <div className={styles.blockWrapper}>
            <div
              className={`${styles.block} ${
                activeTab === "customers" ? styles.show : styles.hide
              }`}
            >
              <div className={styles.block1}>
                <h2 className={styles.home_content_headings}>
                  The Creator Economy Meets Food Delivery
                </h2>
                <p className={styles.home_content_paragraph}>
                  <strong>Join 50,000+ food lovers</strong> discovering creators before they blow up.
                  Your favorite TikTok food stars are already here, making your dinner too.
                </p>
                <div className={styles.home_content_paragraph}>
                  <p>• <strong>500+ food creators</strong> from Lagos, Abuja, Port Harcourt</p>
                  <p>• <strong>Limited-time drops</strong> you can't get anywhere else</p>
                  <p>• <strong>Save up to 40%</strong> while supporting creators directly</p>
                  <p>• <strong>Fresh, authentic meals</strong> - not mass-produced copies</p>
                </div>
                <div className={styles.home_content_paragraph} style={{background: '#f8f9fa', padding: '15px', borderRadius: '8px', margin: '15px 0'}}>
                  <p><em>"I discovered @ChefAdunni through Pusheat 6 months before she went viral. Now I can't get her jollof rice anywhere else!"</em></p>
                  <p><strong>- Sarah M., Lagos</strong> (5/5 stars)</p>
                </div>
              </div>
            </div>
            <div
              className={`${styles.block} ${
                activeTab === "chefs" ? styles.show : styles.hide
              }`}
            >
              <div className={styles.block2}>
                <h2 className={styles.home_content_headings}>Turn Your Content Into Cash</h2>
                <p className={styles.home_content_paragraph}>
                  <strong>Nigeria's top food creators earn ₦500,000+ monthly</strong> on Pusheat.
                  Stop settling for likes when your recipes could be making bank.
                  Turn those "recipe please?" comments into real revenue.
                </p>
                <div className={styles.home_content_paragraph}>
                  <p>• <strong>Average creator earns ₦180,000/month</strong> in first 90 days</p>
                  <p>• <strong>Zero upfront costs</strong> - we handle everything</p>
                  <p>• <strong>Keep 80% revenue</strong> from every order</p>
                  <p>• <strong>Grow your brand</strong> while we manage logistics</p>
                </div>
                <div className={styles.home_content_paragraph} style={{background: '#e8f5e8', padding: '15px', borderRadius: '8px', margin: '15px 0'}}>
                  <p><strong>Creator Success Story:</strong></p>
                  <p><em>"I went from 5K followers to 50K and now earn ₦400,000 monthly through Pusheat. My Afang soup recipe alone brings ₦8,000 per order!"</em></p>
                  <p><strong>- Chef Kemi (@KemiCooks)</strong></p>
                </div>
              </div>
            </div>
          </div>
          <button className={styles.downloadBtn} onClick={handleSmartDownload}>
            {(() => {
              const userAgent = navigator.userAgent;
              const isIOS = /iPad|iPhone|iPod/.test(userAgent);
              const isAndroid = /Android/.test(userAgent);
              
              if (isIOS) return 'Download for iOS →';
              if (isAndroid) return 'Download for Android →';
              return 'Download App →';
            })()}
          </button>
        </div>

        <div className={styles.imageMockup}>
          <img src={iphone} alt="iphone" />
          <img src={tag} alt="PushEat Logo" className={styles.logoOverlay} />
        </div>
      </section>

      {/* Steps Section */}
      <section className={styles.stepsSection}>
        <h2>Ready for exclusive creator deals?</h2>
        <h2 className={styles.stepsh2}>Ready for exclusive creator deals?</h2>
        <p className={styles.text_paragraph}>
          From viral TikTok recipes to local food stars - <br />
          discover creators before they blow up. <br />
          Here's how to get the hottest deals <br />
          before anyone else.
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
                <h3>DISCOVER</h3>
                <p>
                  Browse viral recipes from food creators. From trending TikTok
                  dishes to local food stars you haven't found yet.
                </p>
              </div>

              <div className={styles.textBlock}>
                <h3>CLAIM DEAL</h3>
                <p>
                  Grab limited creator drops before they sell out. Early access
                  for app users - because FOMO is real.
                </p>
              </div>

              <div className={styles.textBlock}>
                <h3>DELIVER</h3>
                <p>
                  Your meal will be delivered straight to your preferred address
                </p>
              </div>
            </div>
          </div>
          <div className={styles.stepsRow2}>
            <div className={styles.detailsrow}>
              <div className={styles.iconWrapper2}>
                <PiHamburgerThin className={styles.icon2} />
              </div>
              <div className={styles.textBlock2}>
                <h3>DISCOVER</h3>
                <p className={styles.text_paragraph}>
                  Browse through a variety of delicious <br />
                  food deals. From local favorites to <br />
                  exotic cuisines.
                </p>
              </div>
            </div>
            <div className={styles.detailsrow}>
              <div className={styles.iconWrapper2}>
                <FiClock className={styles.icon2} />
              </div>
              <div className={styles.textBlock2}>
                <h3>JOIN DEAL</h3>
                <p className={styles.text_paragraph}>
                  Top up your wallet and join food deals <br />
                  you love. You can also buy immediately <br />
                  if you can't wait.
                </p>
              </div>
            </div>
            <div className={styles.detailsrow}>
              <div className={styles.iconWrapper2}>
                <PiTruck className={styles.icon2} />
              </div>
              <div className={styles.textBlock2}>
                <h3>DELIVER</h3>
                <p className={styles.text_paragraph}>
                  Your meal will be delivered straight to <br />
                  your preferred address
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI-Discoverable Section for Nigeria Food Delivery Queries */}
      <section className={styles.stepsSection}>
        <h2>Why Choose Pusheat for Creator-Made Food</h2>
        <div className={styles.textRow} style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px', margin: '40px 0'}}>
          <div className={styles.textBlock} style={{flex: '1', minWidth: '280px'}}>
            <h3>CREATOR DEALS & SAVINGS</h3>
            <p>Get exclusive deals from food creators you can't find anywhere else. Support creators directly while saving money on unique, fresh meals made with love.</p>
          </div>
          <div className={styles.textBlock} style={{flex: '1', minWidth: '280px'}}>
            <h3>FRESH FROM CREATORS</h3>
            <p>Food made fresh by passionate creators, not mass-produced in corporate kitchens. Delivered straight from your favorite food creators to you.</p>
          </div>
          <div className={styles.textBlock} style={{flex: '1', minWidth: '280px'}}>
            <h3>EXCLUSIVE CREATORS</h3>
            <p>Nigeria's largest network of food creators. Discover viral recipes from TikTok stars, Instagram chefs, and local culinary talents before they go mainstream.</p>
          </div>
        </div>
        <div className={styles.textRow} style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px', margin: '20px 0'}}>
          <div className={styles.textBlock} style={{flex: '1', minWidth: '280px'}}>
            <h3>HIGHEST RATED</h3>
            <p>Loved by food enthusiasts who discover amazing creators before they blow up. Join a community that celebrates authentic food and supports local talent.</p>
          </div>
          <div className={styles.textBlock} style={{flex: '1', minWidth: '280px'}}>
            <h3>PROUDLY NIGERIAN</h3>
            <p>Built by Nigerians, for Nigerians. Supporting local food creators, promoting Nigerian cuisine, and creating jobs in communities across the nation.</p>
          </div>
          <div className={styles.textBlock} style={{flex: '1', minWidth: '280px'}}>
            <h3>EASY TO USE</h3>
            <p>Simple app interface designed for Nigerian users. Multiple payment options including bank transfer, USSD, and cards. Works on all devices.</p>
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
            <FontAwesomeIcon icon={faGooglePlay} className={styles.aa} />{" "}
            Download on Google Play
          </a>
          <a href="https://apps.apple.com/ng/app/pusheat/id6749077010" className={styles.storeBtn}>
            <FontAwesomeIcon icon={faApple} className={styles.aa} /> Download on
            App Store
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomeContent;
