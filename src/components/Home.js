import React, { useEffect, useState } from "react";
import Styles from "./Home.module.css";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGooglePlay, faApple } from "@fortawesome/free-brands-svg-icons";

const images = ["/carousel1.png", "/carousel2.png", "/carousel3.png"];

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={Styles.home_wrapper}>
      <section className={Styles.carousel_wrapper}>
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt="carousel"
            className={`${Styles.fade_image} ${
              index === currentIndex ? Styles.visible : ""
            }`}
          />
        ))}
        <div className={Styles.dots}>
          {images.map((_, index) => (
            <div
              key={index}
              className={`${Styles.dot} ${
                index === currentIndex ? Styles.activeDot : ""
              }`}
            ></div>
          ))}
        </div>

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
              <a href="https://google.com" className={Styles.google}>
                <FontAwesomeIcon
                  icon={faGooglePlay}
                  className={Styles.app_icon}
                />
                Download on Google Play
              </a>
              <a href="https://apple.com" className={Styles.apple}>
                <FontAwesomeIcon icon={faApple} className={Styles.app_icon} />
                Download on App Store
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* <section>
        <div className={Styles.third_section_content}>
          <h1>Ready for the best food deals?</h1>
          <p>
            Scrolling through the exciting list of deals on Pusheat is so <br />
            much fun. Here are 3 steps to get the best food deals.
          </p>
        </div>
      </section> */}
    </div>
  );
}

export default Home;
