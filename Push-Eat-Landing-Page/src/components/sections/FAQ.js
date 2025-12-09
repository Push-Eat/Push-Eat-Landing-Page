import React from 'react';
import styles from './FAQ.module.css';

const FAQ = () => {
    const faqs = [
        { q: "What are Bites?", a: "Bites are earned from watching, liking, sharing, and downloading food videos. Use them to cut meal prices." },
        { q: "Can I order without Bites?", a: "Yes. You can pay normally. Bites simply reduce what you pay." },
        { q: "Where is Pusheat available?", a: "We are live in Lagos. New cities will follow." },
        { q: "How do creators earn?", a: "Creators post like they do on Instagram or TikTok, set their price, cook when they want, and get paid while we handle delivery." },
        { q: "How do I order?", a: "Pick a deal, choose delivery or pickup, add your details, pay from your wallet, and apply Bites to lower the price." },
        { q: "How do deals work?", a: "Join a deal and pay from your wallet. If it sells out or hits its target, the chef cooks. If it fails, your payment goes back to your wallet." },
        { q: "What if I do not want to wait?", a: "Choose a direct order and pay the worth price. You can still apply Bites using the direct rate." },
        { q: "How do I pay or top up?", a: "Fund your Pusheat wallet by transferring to your dedicated account number shown in the app. Then pay from your wallet." },
        { q: "When will my meal be ready?", a: "Each deal shows the prep and delivery window before you pay. Pickup availability is also shown." },
        { q: "What if a deal fails or I cancel?", a: "If a deal fails, your payment returns to your wallet. If you cancel within the allowed window, it also returns to your wallet." },
        { q: "Are delivery fees included?", a: "Delivery is shown at checkout. Winning the Last Bite Lottery can unlock free delivery for a week." }
    ];

    return (
        <section className={styles.section} id="faq">
            <h2 className={styles.headline}>Questions, answered</h2>
            <div className={styles.grid}>
                {faqs.map((item, index) => (
                    <div key={index} className={styles.item}>
                        <h4 className={styles.question}>{item.q}</h4>
                        <p className={styles.answer}>{item.a}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQ;
