import React, { useEffect, useRef } from "react";

const ParticleCursor = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const cfg = {
      friction: 0.94,
      decay: 0.016,
      density: 3.6,
      size: 6.8,
      edgeBounce: 0.78,
      speedGain: 0.54,
      spread: 2.4,
      maxParticles: window.innerWidth < 768 ? 460 : 760,
    };

    let W = 0;
    let H = 0;
    let rafId = null;
    const particles = [];
    const mouse = {
      x: null,
      y: null,
      lastX: null,
      lastY: null,
      active: false,
    };

    const palette = [
      "rgba(33,181,55,",
      "rgba(245,247,249,",
      "rgba(186,255,203,",
      "rgba(220,225,230,",
    ];

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawnKnife = (x, y, vx, vy, burst = 1) => {
      const count = Math.max(1, Math.floor(cfg.density * burst));
      for (let i = 0; i < count; i++) {
        if (particles.length >= cfg.maxParticles) {
          particles.shift();
        }
        const jx = (Math.random() - 0.5) * cfg.spread * 2;
        const jy = (Math.random() - 0.5) * cfg.spread * 2;
        const pvx = vx * cfg.speedGain + (Math.random() * cfg.spread * 2 - cfg.spread);
        const pvy = vy * cfg.speedGain + (Math.random() * cfg.spread * 2 - cfg.spread);
        const speed = Math.hypot(pvx, pvy);
        particles.push({
          x: x + jx,
          y: y + jy,
          vx: pvx,
          vy: pvy,
          size: Math.random() * cfg.size + 2.2,
          life: 1,
          spin: (Math.random() - 0.5) * 0.12,
          rot: Math.atan2(pvy, pvx),
          tone: palette[Math.floor(Math.random() * palette.length)],
          shimmer: Math.random() * 0.5 + 0.5,
          boost: Math.min(1, speed / 11),
        });
      }
    };

    const drawKnife = (p) => {
      const heading = Math.atan2(p.vy, p.vx);
      const a = heading + p.rot * 0.12;
      const len = p.size * 1.55;
      const bladeW = p.size * 0.32;
      const handleL = p.size * 0.68;
      const handleW = bladeW * 0.9;
      const glowAlpha = Math.min(0.42, p.life * 0.32 + p.boost * 0.18);

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(a);

      ctx.shadowBlur = 16;
      ctx.shadowColor = "rgba(33,181,55,0.24)";
      ctx.beginPath();
      ctx.moveTo(len * 0.65, 0);
      ctx.lineTo(len * 0.02, bladeW);
      ctx.lineTo(-handleL * 0.2, bladeW * 0.5);
      ctx.lineTo(-handleL * 0.2, -bladeW * 0.5);
      ctx.lineTo(len * 0.02, -bladeW);
      ctx.closePath();
      ctx.fillStyle = `${p.tone}${Math.max(0, p.life * p.shimmer)})`;
      ctx.fill();

      ctx.beginPath();
      ctx.rect(-handleL, -handleW * 0.5, handleL * 0.85, handleW);
      ctx.fillStyle = `rgba(78,84,92,${Math.max(0, p.life * 0.75)})`;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(len * 0.43, 0);
      ctx.lineTo(len * 0.1, bladeW * 0.2);
      ctx.lineTo(len * 0.1, -bladeW * 0.2);
      ctx.closePath();
      ctx.fillStyle = `rgba(255,255,255,${glowAlpha})`;
      ctx.fill();

      ctx.restore();
    };

    const tick = () => {
      ctx.clearRect(0, 0, W, H);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vx *= cfg.friction;
        p.vy *= cfg.friction;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.spin;
        p.life -= cfg.decay;

        if (p.x < 0 || p.x > W) {
          p.vx *= -cfg.edgeBounce;
          p.x = Math.max(0, Math.min(W, p.x));
        }
        if (p.y < 0 || p.y > H) {
          p.vy *= -cfg.edgeBounce;
          p.y = Math.max(0, Math.min(H, p.y));
        }

        if (p.life <= 0.02) {
          particles.splice(i, 1);
          continue;
        }
        drawKnife(p);
      }

      rafId = window.requestAnimationFrame(tick);
    };

    const handlePointerMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      if (mouse.lastX === null || mouse.lastY === null) {
        mouse.lastX = x;
        mouse.lastY = y;
      }
      const dx = x - mouse.lastX;
      const dy = y - mouse.lastY;
      const speed = Math.hypot(dx, dy);
      const burst = Math.min(2.4, 0.8 + speed * 0.08);
      spawnKnife(x, y, dx, dy, burst);
      mouse.x = x;
      mouse.y = y;
      mouse.lastX = x;
      mouse.lastY = y;
      mouse.active = true;
    };

    const handlePointerDown = (e) => {
      spawnKnife(e.clientX, e.clientY, 0, 0, 3.4);
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.lastX = null;
      mouse.lastY = null;
    };

    resize();
    tick();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerleave", handlePointerLeave);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
};

export default ParticleCursor;
