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
  const scrollToDownload = () => {
    if (downloadRef.current) {
      downloadRef.current.scrollIntoView({ behavior: "smooth" });
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

  return (
    <div className={styles.container}>
      <section className={styles.buildingSection}>
        <div className={styles.textArea}>
          <div className={styles.tab}>
            <span
              className={activeTab === "customers" ? styles.activeTab : ""}
              onClick={() => handleTabClick("customers")}
            >
              Customers
            </span>
            <span
              className={activeTab === "chefs" ? styles.activeTab : ""}
              onClick={() => handleTabClick("chefs")}
            >
              Chefs
            </span>
          </div>

          {activeTab === "customers" && (
            <div className={styles.block1}>
              <h2 className={styles.home_content_headings}>
                What we are building
              </h2>
              <p className={styles.home_content_paragraph}>
                We are building a social food deals app that allows you to buy
                freshly-made meals, recipes, groceries and other food-related
                items directly from online chefs and food content creators.
              </p>
              <p className={styles.home_content_paragraph}>
                We’re like the TikTok that lets you buy the burger, falafel or
                <br />
                spoons set posted online by chefs and content creators at <br />{" "}
                a deal price.
              </p>
              <p className={styles.home_content_paragraph}>
                With PushEat, you can enjoy incredible deal prices from top{" "}
                <br /> online chefs delivered to your doorstep.
              </p>
            </div>
          )}

          {activeTab === "chefs" && (
            <div className={styles.block2}>
              <h2 className={styles.home_content_headings}>Pushing Chefs</h2>
              <p className={styles.home_content_paragraph}>
                We know you make a lot of amazing food content on your social
                platforms like Instagram, TikTok, and others. We also know that
                most times, the best reward you get from the content you worked
                so hard to make are "likes and comments" with a very small
                amount of people actually coming to your DMs to buy.
              </p>
              <p className={styles.home_content_paragraph}>
                With PushEat, you can now sell the content(s) of your posts with
                ease. Our platform transforms your recipes, food items,
                groceries, and food creations into irresistible deals for your
                followers.
              </p>
            </div>
          )}

          <button className={styles.downloadBtn} onClick={scrollToDownload}>
            Download App →
          </button>
        </div>

        <div className={styles.imageMockup}>
          <img src={iphone} alt="iphone" />
          <img src={tag} alt="PushEat Logo" className={styles.logoOverlay} />
        </div>
      </section>

      {/* Steps Section */}
      <section className={styles.stepsSection}>
        <h2>Ready for the best food deals?</h2>
        <h2 className={styles.stepsh2}>Ready for the best food deals?</h2>
        <p className={styles.text_paragraph}>
          Scrolling through the exciting list of deals <br />
          on PushEat is so <br />
          much fun. Here are 3 <br />
          steps to get the best food deals.
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
                  Browse through a variety of delicious food deals. From local
                  favorites to exotic cuisines.
                </p>
              </div>

              <div className={styles.textBlock}>
                <h3>JOIN DEAL</h3>
                <p>
                  Top up your wallet and join food deals you love. You can also
                  buy immediately if you can't wait.
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
        <h2>Ready to see live deals?</h2>
        <div className={styles.downloadLinks}>
          <button className={styles.storeBtn}>
            <FontAwesomeIcon icon={faGooglePlay} className={styles.aa} />{" "}
            Download on Google Play
          </button>
          <button className={styles.storeBtn}>
            <FontAwesomeIcon icon={faApple} className={styles.aa} /> Download on
            App Store
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomeContent;
