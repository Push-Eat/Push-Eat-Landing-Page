import React from 'react';
import { motion } from 'framer-motion';
import { PiHamburgerThin, PiTruck } from "react-icons/pi";
import { FiClock } from "react-icons/fi";
import styles from './HowItWorks.module.css';

const HowItWorks = () => {
    const steps = [
        {
            icon: <PiHamburgerThin className={styles.icon} />,
            title: "Engage",
            desc: "Watch creator food videos. Like them, share, and download the ones you love."
        },
        {
            icon: <FiClock className={styles.icon} />,
            title: "Earn Bites",
            desc: "Each action earns Bites that sit in your wallet. Show interest and build balance."
        },
        {
            icon: <PiTruck className={styles.icon} />,
            title: "Checkout",
            desc: "Apply Bites at checkout to cut the price. Enough Bites can take it to zero."
        }
    ];

    return (
        <section className={styles.section} id="how-bites-works">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className={styles.headline}>How Bites Works</h2>
                <p className={styles.subhead}>
                    Engage with food videos to earn Bites, apply them at checkout, and drop creator made meal prices fast in Lagos.
                </p>

                <div className={styles.stepsContainer}>
                    {steps.map((step, index) => (
                        <React.Fragment key={index}>
                            <div className={styles.stepItem}>
                                <div className={styles.iconWrapper}>
                                    {step.icon}
                                </div>
                                <h3 className={styles.stepTitle}>{step.title}</h3>
                                <p className={styles.stepDesc}>{step.desc}</p>
                            </div>

                            {/* Dot Separator (only between items) */}
                            {index < steps.length - 1 && (
                                <div className={styles.separator}>
                                    {[...Array(6)].map((_, i) => (
                                        <span key={i} className={styles.dot} />
                                    ))}
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default HowItWorks;
