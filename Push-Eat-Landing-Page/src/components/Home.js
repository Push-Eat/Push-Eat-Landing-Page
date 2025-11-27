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
            content="Earn Bites by watching and sharing food videos, then use them to drop meal prices to zero. Get creator made meals in Lagos with exclusive deals and fast delivery."
          />
          <meta property="og:title" content="Eat for free with Bites | Pusheat Lagos" />
          <meta
            property="og:description"
            content="Earn Bites from watching and sharing food videos, then drop creator made meal prices to zero in Lagos."
          />
          <meta property="og:image" content={`${process.env.PUBLIC_URL}/Logo.png`} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://pusheat.co" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Eat for free with Bites | Pusheat Lagos" />
          <meta
            name="twitter:description"
            content="Earn Bites from watching and sharing food videos, then drop creator made meal prices to zero in Lagos."
          />
          <meta name="twitter:image" content={`${process.env.PUBLIC_URL}/Logo.png`} />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Pusheat",
              "description": "Creator-to-table food delivery platform where users earn Bites from engagement and spend them to cut meal prices to zero on creator made food",
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
              "keywords": "free food app Lagos, cheap food Lagos, earn rewards for meals, food delivery Nigeria, food creators, creator made meals, best food delivery Lagos, local food creators Nigeria"
            })}
          </script>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What are Bites?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Bites are earned from watching, liking, sharing, and downloading food videos. You apply them at checkout to reduce the price of your meal."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I order without Bites?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. You can pay normally. Bites simply reduce what you pay when you apply them."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Where is Pusheat available?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Pusheat is live in Lagos. New cities will follow."
                  }
                },
                {
                "@type": "Question",
                "name": "How do creators earn?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Creators post like they do on Instagram or TikTok, set their price, cook when they want, and get paid while Pusheat handles delivery and payments."
                }
                },
                {
                  "@type": "Question",
                  "name": "How do I order?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Pick a deal, choose delivery or pickup, add your details, pay from your wallet, and apply Bites to lower the price."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do deals work?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Join a deal and pay from your wallet. If it sells out or hits its target, the chef cooks. If it fails, your payment goes back to your wallet."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What if I do not want to wait?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Choose a direct order and pay the worth price. You can still apply Bites using the direct rate."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do I pay or top up?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Fund your Pusheat wallet by transferring to your dedicated account number shown in the app. Then pay from your wallet."
                  }
                },
                {
                  "@type": "Question",
                  "name": "When will my meal be ready?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Each deal shows the prep and delivery window before you pay. Pickup availability is also shown."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What if a deal fails or I cancel?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "If a deal fails, your payment returns to your wallet. If you cancel within the allowed window, it also returns to your wallet."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Are delivery fees included?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Delivery is shown at checkout. Winning the Last Bite Lottery can unlock free delivery for a week."
                  }
                }
              ]
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
                Eat for free with Bites
              </h1>
              <p className={Styles.subhead}>
                Watch, like, share, and earn Bites that drop your meal price to zero on creator made food in Lagos.
              </p>
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
      <div className={Styles.mobileStickyBar}>
        <div className={Styles.stickyText}>
          Get meals cheaper with Bites
        </div>
        <div className={Styles.stickyActions}>
          <a
            href="https://play.google.com/store/apps/details?id=ng.pushEats&pli=1"
            className={Styles.apple}
          >
            Google Play
          </a>
          <a
            href="https://apps.apple.com/ng/app/pusheat/id6749077010"
            className={Styles.apple}
          >
            App Store
          </a>
        </div>
      </div>
    </>
  );
}

export default Home;
