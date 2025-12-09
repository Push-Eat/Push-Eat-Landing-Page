import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./AudienceToggle.module.css";
import iPhoneImage from "../../assets/iphone.png";
import tagImage from "../../assets/tag.png";

const AudienceToggle = () => {
    const [activeTab, setActiveTab] = useState("customers");
    const [isHovered, setIsHovered] = useState(false);

    // Auto-switch tabs logic
    useEffect(() => {
        if (!isHovered) {
            const interval = setInterval(() => {
                setActiveTab((prev) => (prev === "customers" ? "chefs" : "customers"));
            }, 8000);
            return () => clearInterval(interval);
        }
    }, [isHovered]);

    const handleSmartDownload = () => {
        // ... logic from original file
        window.open('https://play.google.com/store/apps/details?id=ng.pushEats&pli=1', '_blank');
    };

    const content = {
        customers: {
            headline: "Eat for free with Bites",
            description: "Watch food videos, like them, share, and download to earn Bites. Apply them at checkout to drop your bill to zero on creator made meals in Lagos.",
            features: [
                "Earn Bites for every action on food videos",
                "Apply Bites to cut your price, even to zero",
                "Creator drops and limited deals before they sell out",
                "Pay normally when you want. Bites make every order cheaper"
            ]
        },
        chefs: {
            headline: "Post and get paid for your food videos",
            description: "Post like you do on Instagram or TikTok. Set your price, cook when you want, and let Pusheat handle delivery and payments so you earn instead of only getting likes.",
            features: [
                "Turn your audience into orders, not just engagement",
                "Set your menu, pricing, and drop schedule",
                "Cook on your terms, we handle delivery and payouts",
                "Add a buy button to the content you already post"
            ]
        }
    };

    return (
        <section className={styles.section} id="audience-toggle">
            <div
                className={styles.contentArea}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Tabs */}
                <div className={styles.tabs}>
                    <div
                        className={`${styles.tab} ${activeTab === "customers" ? styles.activeTab : ""}`}
                        onClick={() => setActiveTab("customers")}
                    >
                        Customers {activeTab === "customers" && "●"}
                    </div>
                    <div
                        className={`${styles.tab} ${activeTab === "chefs" ? styles.activeTab : ""}`}
                        onClick={() => setActiveTab("chefs")}
                    >
                        Chefs {activeTab === "chefs" && "●"}
                    </div>
                </div>

                <div className={styles.indicator}>
                    {isHovered ? 'Paused. Tap a tab to explore.' : 'Auto switching every 8s'}
                </div>

                {/* Content Area with Animation */}
                <div className={styles.textContent}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className={styles.headline}>{content[activeTab].headline}</h2>
                            <p className={styles.description}>{content[activeTab].description}</p>
                            <div className={styles.featureList}>
                                {content[activeTab].features.map((feature, i) => (
                                    <p key={i}>{feature}</p>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <button className={styles.downloadBtn} onClick={handleSmartDownload}>
                    Download App →
                </button>
            </div>

            {/* Image Side */}
            <div className={styles.imageArea}>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <img src={iPhoneImage} alt="App Interface" className={styles.mockupImage} />
                    <img src={tagImage} alt="PushEat" className={styles.logoBadge} />
                </motion.div>
            </div>
        </section>
    );
};

export default AudienceToggle;
