import React from 'react';
import styles from './WhyPushEat.module.css';

const WhyPushEat = () => {
    const content = [
        { title: "Bites make meals cheaper", desc: "Earn Bites by engaging with food videos and apply them to drop prices fast. Enough Bites can take a meal to zero." },
        { title: "Creator-made food", desc: "Meals come from the food creators you follow, not anonymous ghost kitchens. Support them directly while you save." },
        { title: "Lagos First", desc: "Built for Lagos routes and delivery realities so your food shows up with speed and care." },
        { title: "Pay your way", desc: "Apply Bites first, then pay the balance with your preferred option. Easy, safe, and made for Lagos users." },
        { title: "Limited Drops", desc: "Exclusive deals that sell out. Grab a drop early or watch the Bite activity rise before you jump in." },
        { title: "Built for budgets", desc: "Use saved Bites when cash is tight so you keep eating well without slowing down." }
    ];

    return (
        <section className={styles.section}>
            <h2 className={styles.headline}>Why Pusheat</h2>
            <div className={styles.grid}>
                {content.map((item, index) => (
                    <div key={index} className={styles.card}>
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhyPushEat;
