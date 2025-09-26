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
          <title>Pusheat - Order from Food Creators | Viral Recipes Delivered</title>
          <meta
            name="description"
            content="Get exclusive food deals from your favorite food creators before they blow up. Fresh recipes, viral flavors, creator prices delivered straight to your door!"
          />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Pusheat",
              "description": "Creator-to-table food delivery platform connecting food creators with Gen Z food lovers through exclusive deals and viral recipes",
              "url": "https://pusheat.co",
              "logo": "https://pusheat.co/Logo.png",
              "sameAs": [
                "https://play.google.com/store/apps/details?id=ng.pushEats",
                "https://apps.apple.com/app/pusheat/id6749077010"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": "English"
              },
              "areaServed": {"@type": "Country", "name": "Nigeria"},
              "serviceType": "Food Delivery and Creator Marketplace",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "5000+"
              },
              "priceRange": "₦₦",
              "keywords": "food delivery Nigeria, food creators, viral recipes, Nigerian food delivery app, best food delivery Nigeria, cheap food delivery, local food creators Nigeria"
            })}
          </script>
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
                From your favorite
                <br />
                food creators
                <br />
                straight to your door
              </h1>
              <div className={Styles.buttons}>
                <a
                  href="https://play.google.com/store/apps/details?id=ng.pushEats&pli=1"
                  className={Styles.google}
                >
                  <FontAwesomeIcon
                    icon={faGooglePlay}
                    className={Styles.app_icon}
                  />
                  Download on Google Play
                </a>
                <a href="https://apps.apple.com/ng/app/pusheat/id6749077010" className={Styles.apple}>
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
