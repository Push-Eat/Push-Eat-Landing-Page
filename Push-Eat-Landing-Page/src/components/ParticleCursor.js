import React, { useEffect, useRef } from "react";

const ParticleCursor = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const cfg = {
      friction: 0.93,
      decay: 0.018,
      density: 4,
      sizeMin: 0.8,
      sizeMax: 2.2,
      spread: 1.4,
      speedGain: 0.35,
      max: window.innerWidth < 768 ? 280 : 460,
    };

    let W = 0;
    let H = 0;
    let rafId = null;
    const particles = [];
    const mouse = { lastX: null, lastY: null };

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (x, y, vx, vy) => {
      for (let i = 0; i < cfg.density; i++) {
        if (particles.length >= cfg.max) particles.shift();
        particles.push({
          x: x + (Math.random() - 0.5) * cfg.spread * 2,
          y: y + (Math.random() - 0.5) * cfg.spread * 2,
          vx: vx * cfg.speedGain + (Math.random() - 0.5) * 1.2,
          vy: vy * cfg.speedGain + (Math.random() - 0.5) * 1.2,
          life: 1,
          size: cfg.sizeMin + Math.random() * (cfg.sizeMax - cfg.sizeMin),
          glow: Math.random() * 0.18 + 0.1,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, W, H);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= cfg.friction;
        p.vy *= cfg.friction;
        p.life -= cfg.decay;

        if (p.life <= 0.02) {
          particles.splice(i, 1);
          continue;
        }

        const alpha = p.life * (0.6 + p.glow);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(animate);
    };

    const onPointerMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      if (mouse.lastX === null || mouse.lastY === null) {
        mouse.lastX = x;
        mouse.lastY = y;
      }
      const vx = x - mouse.lastX;
      const vy = y - mouse.lastY;
      spawn(x, y, vx, vy);
      mouse.lastX = x;
      mouse.lastY = y;
    };

    const onPointerLeave = () => {
      mouse.lastX = null;
      mouse.lastY = null;
    };

    resize();
    animate();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none" }}
    />
  );
};

export default ParticleCursor;
