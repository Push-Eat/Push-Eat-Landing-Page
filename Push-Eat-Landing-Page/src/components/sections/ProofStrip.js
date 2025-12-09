import React from 'react';
import styles from './ProofStrip.module.css';

const ProofStrip = () => {
    const items = [
        { title: "Live in Lagos", desc: "Built for Lagos food lovers and creators right now." },
        { title: "Over 100 orders fulfilled", desc: "Creator drops moving fast with real deliveries." },
        { title: "20+ food creators", desc: "Local chefs posting, setting prices, and selling out." }
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {items.map((item, index) => (
                    <div key={index} className={styles.item}>
                        <h3 className={styles.title}>{item.title}</h3>
                        <p className={styles.desc}>{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProofStrip;
