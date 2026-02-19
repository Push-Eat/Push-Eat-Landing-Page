import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AppCTA.module.css';

const AppCTA = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.ctaFt}>
            <div className={styles.glow} />
            <div className={styles.ctaIn}>
                <div className={styles.ctaGrid}>
                    <div className={styles.ctaTxt}>
                        <h2>Get Pusheat.<br />Eat for Free.</h2>
                        <p>Download the app and start earning Bites on every food video you watch. Your next meal could cost nothing.</p>
                    </div>
                    <div className={styles.ctaBtns}>
                        <a
                            href="https://apps.apple.com/ng/app/pusheat/id6749077010"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.btnD}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                            </svg>
                            App Store
                        </a>
                        <a
                            href="https://play.google.com/store/apps/details?id=ng.pushEats&pli=1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.btnOd}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3.18 23.73L14.26 12.65 3.18.57C2.85.85 2.63 1.3 2.63 1.89v19.82c0 .59.22 1.04.55 1.02zM18.88 10.53l-3.6-2.1L11.87 12l3.41 3.57 3.6-2.1c.68-.4.68-2.54 0-2.94zM5.04.08l10.97 6.26-2.56 2.67L5.04.08zM5.04 23.52l8.41-8.93 2.56 2.67L5.04 23.52z" />
                            </svg>
                            Google Play
                        </a>
                    </div>
                </div>
            </div>
            <div className={styles.ftBar}>
                <div className={styles.ftLinks}>
                    <a href="https://www.instagram.com/pusheat.ng/" target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a href="https://www.tiktok.com/@pusheat" target="_blank" rel="noopener noreferrer">TikTok</a>
                    <a href="https://twitter.com/pusheat_ng" target="_blank" rel="noopener noreferrer">Twitter</a>
                    <Link to="/privacy">Privacy</Link>
                    <Link to="/terms">Terms</Link>
                    <Link to="/contact">Contact</Link>
                </div>
                <div className={styles.ftCopy}>&copy; {currentYear} Pusheat. All rights reserved.</div>
            </div>
        </footer>
    );
};

export default AppCTA;
