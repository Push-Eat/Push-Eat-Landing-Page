import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Styles from "./Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGooglePlay, faApple } from "@fortawesome/free-brands-svg-icons";
import { useLoader } from "../components/UI/LoaderContext";

const images = ["/carousel1.webp", "/carousel2.webp", "/carousel3.webp"];
const BASE_URL = process.env.REACT_APP_BASE_URL;

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const { hasLoaded, setHasLoaded } = useLoader();

  useEffect(() => {
    if (hasLoaded) {
      setIsReady(true);
      return;
    }

    const loadImages = images.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
      });
    });

    const timer = new Promise((resolve) => setTimeout(resolve, 5000));

    Promise.all([...loadImages, timer]).then(() => {
      setIsReady(true);
      setHasLoaded(true);
    });
  }, [hasLoaded, setHasLoaded]);

  useEffect(() => {
    if (!isReady) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000);
    return () => clearInterval(interval);
  }, [isReady]);

  return (
    <div className={Styles.home_wrapper}>
      <Helmet>
        <title>PushEat - No Stress, Just Great Food!</title>
        <meta
          name="description"
          content="Order delicious meals fast and easy with PushEat. No stress, just great food!"
        />
      </Helmet>

      {!isReady && (
        <div className={Styles.loaderOverlay}>
          <div className={Styles.spinner}></div>
        </div>
      )}

      {isReady && (
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
      )}
    </div>
  );
}

export default Home;
