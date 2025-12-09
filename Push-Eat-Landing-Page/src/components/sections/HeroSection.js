import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGooglePlay, faApple } from "@fortawesome/free-brands-svg-icons";
import styles from './HeroSection.module.css';

// Import images (assuming paths are correct relative to this file)
// We might need to adjust imports if they are aliases or relative paths
import carousel1 from "../../assets/carousel1.webp";
import carousel2 from "../../assets/carousel2.webp";
import carousel3 from "../../assets/carousel3.webp";

const images = [carousel1, carousel2, carousel3];

const HeroSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 7000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className={styles.heroWrapper}>
            {/* Background Carousel */}
            <div className={styles.imageContainer}>
                <AnimatePresence mode="popLayout">
                    <motion.img
                        key={currentIndex}
                        src={images[currentIndex]}
                        alt="Delicious food"
                        className={styles.heroImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                    />
                </AnimatePresence>
                <div className={styles.overlay} />
            </div>

            {/* Content */}
            <div className={styles.contentWrapper}>
                <div className={styles.content}>
                    <motion.h1
                        className={styles.headline}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Eat for free with Bites
                    </motion.h1>

                    <motion.p
                        className={styles.subhead}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Watch, like, share, and earn Bites that drop your meal price to zero on creator made food in Lagos.
                    </motion.p>

                    <motion.div
                        className={styles.buttons}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <a
                            href="https://play.google.com/store/apps/details?id=ng.pushEats&pli=1"
                            className={styles.storeBtn}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FontAwesomeIcon icon={faGooglePlay} />
                            Download on Google Play
                        </a>
                        <a
                            href="https://apps.apple.com/ng/app/pusheat/id6749077010"
                            className={styles.storeBtn}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FontAwesomeIcon icon={faApple} />
                            Download on App Store
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Dots */}
            <div className={styles.dots}>
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ""}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroSection;
