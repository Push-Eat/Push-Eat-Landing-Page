import React from 'react';
import styles from './PriceDrop.module.css';
import { motion } from 'framer-motion';

const PriceDrop = () => {
    return (
        <section className={styles.section}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <h2 className={styles.headline}>Watch your price drop with Bites</h2>

                <div className={styles.barContainer}>
                    <span className={styles.priceLabel}>₦5,000</span>

                    <div className={styles.track}>
                        <div className={styles.fill} />
                    </div>

                    <span className={styles.priceLabel}>₦0</span>
                </div>

                <p className={styles.note}>
                    Apply saved Bites at checkout to lower the cost. 100 Bites = ₦1,000. Enough Bites can take it to zero.
                </p>
            </motion.div>
        </section>
    );
};

export default PriceDrop;
