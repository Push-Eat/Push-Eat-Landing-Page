import React from "react";
import Styles from "./Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGooglePlay, faApple } from "@fortawesome/free-brands-svg-icons";
import Navbar from "./Navbar";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import carousel1 from "../assets/carousel1.png";
// import carousel2 from "../assets/carousel2.png";
// import carousel3 from "../assets/carousel3.png";

function Home() {
  return (
    <div className={Styles.home_wrapper}>
      <section className={Styles.carousel_wrapper}>
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={4000}
          transitionTime={1000}
          className={Styles.carousel}
        >
          <div>
            <img src="/carousel1.png" alt="food" />
          </div>
          <div>
            <img src="/carousel2.png" alt="food" />
          </div>
          <div>
            <img src="/carousel3.png" alt="food" />
          </div>
        </Carousel>
        <div className={Styles.navbar}>
          <Navbar />
        </div>
        <div className={Styles.home_content}>
          <div className={Styles.content}>
            <h1>
              No Stress,
              <br />
              Just Great Food!
            </h1>
            <div className={Styles.buttons}>
              <a href="google.com" className={Styles.google}>
                <FontAwesomeIcon
                  icon={faGooglePlay}
                  className={Styles.app_icon}
                />
                Download on Google Play
              </a>
              <a href="aple.com" className={Styles.apple}>
                <FontAwesomeIcon icon={faApple} className={Styles.app_icon} />
                Download on App Store
              </a>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className={Styles.third_section_content}>
          <h1>Ready for the best food deals?</h1>
          <p>
            Scrolling through the exciting list of deals on Pusheat is so <br />
            much fun. Here are 3 steps to get the best food deals.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
