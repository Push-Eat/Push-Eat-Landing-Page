import React from 'react';
import styles from './AppCTA.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGooglePlay, faApple } from "@fortawesome/free-brands-svg-icons";

const AppCTA = () => {
    return (
        <section className={styles.section}>
            <div className={styles.card}>
                <h2 className={styles.headline}>Ready to discover food creators?</h2>
                <div className={styles.buttons}>
                    <a href="https://play.google.com/store/apps/details?id=ng.pushEats&pli=1" className={styles.storeBtn}>
                        <FontAwesomeIcon icon={faGooglePlay} />
                        <span>Download on Google Play</span>
                    </a>
                    <a href="https://apps.apple.com/ng/app/pusheat/id6749077010" className={styles.storeBtn}>
                        <FontAwesomeIcon icon={faApple} />
                        <span>Download on App Store</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default AppCTA;
