import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SecondaryPages.module.css';

const pages = [
    { icon: 'shield', title: 'Privacy Policy', desc: 'How we safeguard your data and protect your personal information with care.', link: '/privacy', cta: 'Read More' },
    { icon: 'gavel', title: 'Terms of Service', desc: 'The agreements that shape your experience on our platform.', link: '/terms', cta: 'Read More' },
    { icon: 'mail', title: 'Contact Us', desc: 'Have a question or need help? Our team is ready to assist you.', link: '/contact', cta: 'Get in Touch' },
    { icon: 'person_remove', title: 'Delete Account', desc: 'Request the removal of your account and all associated data.', link: '/delete-account', cta: 'Learn More' },
    { icon: 'help', title: 'FAQ', desc: 'Quick answers to the most common questions about Pusheat.', link: '/faq', cta: 'View FAQ' },
];

const SecondaryPages = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.hdr}>
                    <div className={styles.label}>Information</div>
                    <h2>Everything You Need</h2>
                </div>
            </div>
            <div className={styles.grid}>
                {pages.map((page) => (
                    <Link key={page.link} to={page.link} className={styles.card}>
                        <div className={styles.cardIcon}>
                            <span className="material-symbols-outlined">{page.icon}</span>
                        </div>
                        <h3>{page.title}</h3>
                        <p>{page.desc}</p>
                        <span className={styles.cardLink}>
                            {page.cta}{' '}
                            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default SecondaryPages;
