import React from 'react';
import styles from './ProofStrip.module.css';

const ProofStrip = () => {
    const items = [
        { n: '100+', t: 'Orders Fulfilled', d: 'Real deliveries from creator kitchens.' },
        { n: '20+', t: 'Food Creators', d: 'Local chefs posting, pricing, and selling out.' },
        { n: 'Lagos', t: 'Live Now', d: 'Built for Lagos food lovers right now.' }
    ];

    return (
        <section className={styles.section}>
            <div className={styles.grid}>
                {items.map((item, i) => (
                    <div key={i} className={styles.item}>
                        <div className={styles.number}>{item.n}</div>
                        <div className={styles.title}>{item.t}</div>
                        <div className={styles.desc}>{item.d}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProofStrip;
