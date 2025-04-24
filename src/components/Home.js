import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Styles from "./Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGooglePlay, faApple } from "@fortawesome/free-brands-svg-icons";

const images = ["/carousel1.png", "/carousel2.png", "/carousel3.png"];

const BASE_URL = process.env.REACT_APP_BASE_URL;

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

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div className={Styles.home_wrapper}>
      <Helmet>
        <title>PushEat - No Stress, Just Great Food!</title>
        <meta
          name="description"
          content="Order delicious meals fast and easy with PushEat. No stress, just great food!"
        />
        <meta
          name="keywords"
          content="PushEat, food delivery, fast food, order food online"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="PushEat - No Stress, Just Great Food!"
        />
        <meta
          property="og:description"
          content="Order delicious meals fast and easy with PushEat. Fresh meals delivered to your door."
        />
        <meta property="og:image" content={`${BASE_URL}/Logo.png`} />
        <meta property="og:url" content={BASE_URL} />
        <meta property="og:type" content="website" />

        {/* Twitter card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="PushEat - No Stress, Just Great Food!"
        />
        <meta
          name="twitter:description"
          content="Order delicious meals fast and easy with PushEat. Fresh meals delivered to your door."
        />
        <meta name="twitter:image" content={`${BASE_URL}/Logo.png`} />
      </Helmet>
      <section className={Styles.carousel_wrapper}>
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            rel="preload"
            loading="eager"
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
