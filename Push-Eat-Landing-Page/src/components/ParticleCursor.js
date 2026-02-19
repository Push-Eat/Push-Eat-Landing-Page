import React, { useEffect, useRef } from "react";

const ParticleCursor = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const CONFIG = {
      friction: 0.94,
      decayRate: 0.015,
      sizeMultiplier: 6,
      particleDensity: 3,
      maxParticles: window.innerWidth < 768 ? 280 : 520,
      bounce: 0.82,
      colors: ["#4285F4", "#EA4335", "#FBBC05", "#34A853"],
    };

    let particles = [];
    let rafId = null;
    let W = 0;
    let H = 0;
    const mouse = { x: null, y: null, lastX: null, lastY: null };

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    class Particle {
      constructor(x, y, velocityX, velocityY) {
        this.x = x;
        this.y = y;
        this.vx = velocityX * 0.5 + (Math.random() * 4 - 2);
        this.vy = velocityY * 0.5 + (Math.random() * 4 - 2);
        this.radius = Math.random() * CONFIG.sizeMultiplier + 1;
        this.color = CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)];
        this.alpha = 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= CONFIG.friction;
        this.vy *= CONFIG.friction;
        this.alpha -= CONFIG.decayRate;

        if (this.x <= this.radius || this.x >= W - this.radius) {
          this.vx *= -CONFIG.bounce;
          this.x = Math.max(this.radius, Math.min(W - this.radius, this.x));
        }
        if (this.y <= this.radius || this.y >= H - this.radius) {
          this.vy *= -CONFIG.bounce;
          this.y = Math.max(this.radius, Math.min(H - this.radius, this.y));
        }
      }

      draw() {
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const spawnParticles = (x, y, velocityX, velocityY) => {
      for (let i = 0; i < CONFIG.particleDensity; i++) {
        if (particles.length >= CONFIG.maxParticles) {
          particles.shift();
        }
        particles.push(new Particle(x, y, velocityX, velocityY));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, W, H);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }
        p.draw();
      }

      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(animate);
    };

    const onPointerMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (mouse.lastX === null || mouse.lastY === null) {
        mouse.lastX = mouse.x;
        mouse.lastY = mouse.y;
      }
      const velocityX = mouse.x - mouse.lastX;
      const velocityY = mouse.y - mouse.lastY;
      spawnParticles(mouse.x, mouse.y, velocityX, velocityY);
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;
    };

    const onPointerLeave = () => {
      mouse.x = null;
      mouse.y = null;
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
