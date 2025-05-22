import styles from "./HomeContent.module.css";
import iphone from "../assets/iphone.png";
import { PiHamburgerThin } from "react-icons/pi";
import { FiClock } from "react-icons/fi";
import { PiTruck } from "react-icons/pi";
import { faGooglePlay, faApple } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HomeContent = () => {
  return (
    <div className={styles.container}>
      {/* What we are building */}
      <section className={styles.buildingSection}>
        <div className={styles.textArea}>
          <div className={styles.tab}>
            <span className={styles.activeTab}>Customers</span>
            <span>Chefs</span>
          </div>
          <h2 className={styles.home_content_headings}>What we are building</h2>
          <p className={styles.home_content_paragraph}>
            We are building a social food deals app that allows you to <br />
            buy freshly-made meals, recipes, groceries and other <br />
            food-related items directly from online chefs and food <br />
            content creators.
          </p>
          <p className={styles.home_content_paragraph}>
            We’re like the TikTok that lets you buy the burger, falafel or{" "}
            <br />
            spoons set posted online by chefs and content creators at <br /> a
            deal price.
          </p>
          <p className={styles.home_content_paragraph}>
            With PushEat, you can enjoy incredible deal prices from top <br />{" "}
            online chefs delivered to your doorstep.
          </p>
          <button className={styles.downloadBtn}>Download App →</button>
        </div>
        <div className={styles.imageMockup}>
          <img src={iphone} alt="iphone" />
        </div>
      </section>

      {/* Steps Section */}
      <section className={styles.stepsSection}>
        <h2>Ready for the best food deals?</h2>
        <p>
          Scrolling through the exciting list of deals on PushEat is so <br />
          much fun. Here are 3 steps to get the best food deals.
        </p>
        <div className={styles.steps}>
          {/* Row with only icons and dashed lines */}
          <div className={styles.iconRow}>
            <div className={styles.iconWrapper}>
              <PiHamburgerThin className={styles.icon} />
            </div>
            <img src="/dashed.png" className={styles.dash} alt="dashed" />
            <div className={styles.iconWrapper}>
              <FiClock className={styles.icon} />
            </div>
            <img src="/dashed.png" className={styles.dash} alt="dashed" />
            <div className={styles.iconWrapper}>
              <PiTruck className={styles.icon} />
            </div>
          </div>

          {/* Row with headings and text aligned under each icon */}
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
      </section>

      {/* Why are we unique? */}
      <section className={styles.home_footer_images}>
        <div>
          <img src="/homef1.png" alt="" />
        </div>
        <div>
          <img src="/homef2.png" alt="" />
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles.ctaSection}>
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
