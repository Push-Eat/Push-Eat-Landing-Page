import { useEffect, useRef } from "react";
import styles from "./Home.module.css";
import HeroSection from "./sections/HeroSection";
import Features from "./sections/Features";
import ProofStrip from "./sections/ProofStrip";
import FAQ from "./sections/FAQ";
import SecondaryPages from "./sections/SecondaryPages";

const Home = () => {
  const bridgeRef = useRef(null);
  const featuresStageRef = useRef(null);

  useEffect(() => {
    let rafId = null;

    const updateBridge = () => {
      const el = bridgeRef.current;
      const featuresStage = featuresStageRef.current;
      if (!el || !featuresStage) return;
      const viewport = window.innerHeight || 1;
      const raw = window.scrollY / (viewport * 0.72);
      const progress = Math.max(0, Math.min(1, raw));
      const featuresLift = Math.max(0, Math.min(1, (window.scrollY - viewport * 0.2) / (viewport * 0.65)));
      el.style.setProperty("--bridge-progress", progress.toString());
      el.style.setProperty("--bridge-shift", `${progress * 42}px`);
      featuresStage.style.setProperty("--features-progress", featuresLift.toString());
      featuresStage.style.setProperty("--features-shift", `${(1 - featuresLift) * 56}px`);
      rafId = null;
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateBridge);
      }
    };

    updateBridge();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <>
      <HeroSection />
      <div ref={bridgeRef} className={styles.heroBridge} aria-hidden="true">
        <div className={styles.bridgeGlow} />
        <div className={styles.bridgeWave} />
        <div className={styles.bridgeSpine} />
      </div>
      <div ref={featuresStageRef} className={styles.featuresStage}>
        <Features />
      </div>
      <ProofStrip />
      <FAQ />
      <SecondaryPages />
    </>
  );
};

export default Home;
