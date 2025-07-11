import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Styles from "./Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGooglePlay, faApple } from "@fortawesome/free-brands-svg-icons";
import HomeContent from "./HomeContent";
import carousel1 from "../assets/carousel1.webp";
import carousel2 from "../assets/carousel2.webp";
import carousel3 from "../assets/carousel3.webp";

const images = [carousel1, carousel2, carousel3];
const BASE_URL = process.env.REACT_APP_BASE_URL;

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const handleFirstImageLoad = () => {
    setTimeout(() => {
      setShowAllImages(true);
    }, 400);
  };

  return (
    <>
      <div className={Styles.home_wrapper}>
        <Helmet>
          <title>PushEat - No Stress, Just Great Food!</title>
          <meta
            name="description"
            content="Order delicious meals fast and easy with PushEat. No stress, just great food!"
          />
        </Helmet>

        <section className={Styles.carousel_wrapper}>
          <img
            src={images[0]}
            alt="carousel"
            onLoad={handleFirstImageLoad}
            className={`${Styles.fade_image} ${
              currentIndex === 0 ? Styles.visible : ""
            }`}
          />
          {showAllImages &&
            images
              .slice(1)
              .map((src, index) => (
                <img
                  key={index + 1}
                  src={src}
                  alt="carousel"
                  className={`${Styles.fade_image} ${
                    currentIndex === index + 1 ? Styles.visible : ""
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
      </div>
      <HomeContent />
    </>
  );
}

export default Home;
