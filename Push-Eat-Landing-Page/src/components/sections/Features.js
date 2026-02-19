import React, { useState, useRef, useCallback } from 'react';
import styles from './Features.module.css';
import chefOyebeez from '../../assets/chef-oyebeez-enhanced.png';
import pennePasta from '../../assets/penne-pasta.jpg';
import plantainBites from '../../assets/plantain-bites-real.jpg';
import suyaThumb from '../../assets/suya.jpg';


const Features = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    const toggleVideo = useCallback(() => {
        const vid = videoRef.current;
        if (!vid) return;
        if (vid.paused) {
            vid.play();
            setIsPlaying(true);
        } else {
            vid.pause();
            setIsPlaying(false);
        }
    }, []);

    return (
        <section className={styles.features} id="features">
            <div className={styles.fBlock}>
                <div className={styles.fItem}>
                    <div className={styles.fText}>
                        <div className={styles.fLabel}>01 / Discover</div>
                        <h2 className={styles.fHead}>Video<br />Discovery</h2>
                        <p className={styles.fDesc}>Watch, crave, and order. Discover new flavors through immersive bite-sized videos that bring every dish to life.</p>
                    </div>
                    <div className={styles.fVis}>
                        <div className={styles.fCardBg} />
                        <div className={styles.fCard}>
                            <video
                                ref={videoRef}
                                poster={`${process.env.PUBLIC_URL}/discovery-thumbnail.jpg`}
                                playsInline
                                preload="metadata"
                                loop
                                muted
                                className={isPlaying ? styles.isPlaying : ''}
                            >
                                <source src={`${process.env.PUBLIC_URL}/discovery-video.mp4`} type="video/mp4" />
                            </video>
                            <div
                                className={`${styles.fCardOv} ${isPlaying ? styles.vidPlaying : ''}`}
                                onClick={toggleVideo}
                            >
                                <div className={styles.playB}>
                                    <span className="material-symbols-outlined" style={{ color: 'white', fontSize: 28 }}>
                                        {isPlaying ? 'pause' : 'play_arrow'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.fItem} ${styles.rev}`}>
                    <div className={styles.fText} style={{ textAlign: 'right' }}>
                        <div className={styles.fLabel}>02 / Order</div>
                        <h2 className={styles.fHead}>Creator<br />Deals</h2>
                        <p className={styles.fDesc} style={{ marginLeft: 'auto' }}>Join a deal, pick your portions, and order directly from the creators you love. Every dish is made fresh.</p>
                    </div>
                    <div className={styles.fVis}>
                        <div className={styles.oCardBg} />
                        <div className={styles.oCard}>
                            <div className={styles.oHdr}>
                                <span>YOUR ORDER</span>
                                <span className={styles.cnt}>3 ITEMS</span>
                            </div>
                            <div>
                                <div className={styles.oItem}>
                                    <div className={styles.oThumb}>
                                        <img src={pennePasta} alt="Penne Pasta" />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div className={styles.oName}>Penne Pasta</div>
                                        <div className={styles.oChef}>@chef_haleemah</div>
                                    </div>
                                    <div className={styles.oPrice}>&#8358;4,500</div>
                                </div>
                                <div className={styles.oItem}>
                                    <div className={styles.oThumb}>
                                        <img src={suyaThumb} alt="Grilled Suya" />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div className={styles.oName}>Grilled Suya</div>
                                        <div className={styles.oChef}>@grill_master</div>
                                    </div>
                                    <div className={styles.oPrice}>&#8358;3,200</div>
                                </div>
                                <div className={styles.oItem}>
                                    <div className={styles.oThumb}>
                                        <img src={plantainBites} alt="Plantain Bites" />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div className={styles.oName}>Plantain Bites</div>
                                        <div className={styles.oChef}>@chef_April</div>
                                    </div>
                                    <div className={styles.oPrice}>&#8358;1,800</div>
                                </div>
                            </div>
                            <div className={styles.oFoot}>
                                <div>
                                    <div className={styles.oTotalL}>Total</div>
                                    <div className={styles.oTotal}>&#8358;9,500</div>
                                </div>
                                <button className={styles.oBtn}>Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.fItem}>
                    <div className={styles.fText}>
                        <div className={styles.fLabel}>03 / Enjoy</div>
                        <h2 className={styles.fHead}>Creator<br />Made</h2>
                        <p className={styles.fDesc}>Every dish is crafted by a real person. Someone you follow, someone you trust. Not a ghost kitchen. Not a chain.</p>
                    </div>
                    <div className={styles.fVis}>
                        <div className={styles.fCardBg} />
                        <div className={styles.fCard}>
                            <img src={chefOyebeez} alt="Chef Oyebeez" />
                            <div className={styles.fCardOv} style={{ alignItems: 'flex-end', padding: 24 }}>
                                <div style={{ width: '100%' }}>
                                    <div style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 17 }}>Chef Oyebeez</div>
                                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,.6)', marginTop: 4 }}>Contemporary Nigerian Cuisine</div>
                                    <div className={styles.chefBadge}>12 Active Drops</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
