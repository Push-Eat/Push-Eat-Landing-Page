import React, { useEffect, useRef } from 'react';

const ParticleCursor = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let boids = [];
        let W, H;
        let mouseX = -9999, mouseY = -9999;
        let prevMouseX = -9999, prevMouseY = -9999;
        let mouseVX = 0, mouseVY = 0;
        let time = 0;
        let animationFrameId;

        const COUNT = 90;
        const MAX_SPEED = 1.6;
        const MAX_FORCE = 0.03;
        const SEP_DIST = 22;
        const ALI_DIST = 70;
        const COH_DIST = 100;
        const CURSOR_DIST = 320;
        const CURSOR_FORCE = 0.035;

        class Boid {
            constructor() {
                this.x = Math.random() * window.innerWidth;
                this.y = Math.random() * window.innerHeight;
                const a = Math.random() * Math.PI * 2;
                const s = Math.random() * 0.5 + 0.3;
                this.vx = Math.cos(a) * s;
                this.vy = Math.sin(a) * s;
                this.seed = Math.random() * 1000;
                this.len = Math.random() * 2 + 2.5;
                this.isGreen = Math.random() > 0.7;
                this.baseAlpha = Math.random() * 0.2 + 0.12;
            }
        }

        const limit = (vx, vy, max) => {
            const mag = Math.sqrt(vx * vx + vy * vy);
            if (mag > max) {
                return [(vx / mag) * max, (vy / mag) * max];
            }
            return [vx, vy];
        };

        const init = () => {
            // Re-initialize logic
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
            boids = [];
            for (let i = 0; i < COUNT; i++) boids.push(new Boid());
        };

        const draw = () => {
            time++;
            ctx.clearRect(0, 0, W, H);

            if (mouseX > -9000 && prevMouseX > -9000) {
                mouseVX = (mouseX - prevMouseX) * 0.3;
                mouseVY = (mouseY - prevMouseY) * 0.3;
            }
            prevMouseX = mouseX;
            prevMouseY = mouseY;

            const mouseSpeed = Math.sqrt(mouseVX * mouseVX + mouseVY * mouseVY);
            const dynamicForce = CURSOR_FORCE + Math.min(mouseSpeed * 0.003, 0.06);
            const dynamicDist = CURSOR_DIST + Math.min(mouseSpeed * 8, 200);

            const n = boids.length;
            for (let i = 0; i < n; i++) {
                const b = boids[i];
                let sepX = 0, sepY = 0, sepN = 0;
                let aliX = 0, aliY = 0, aliN = 0;
                let cohX = 0, cohY = 0, cohN = 0;

                for (let j = 0; j < n; j++) {
                    if (i === j) continue;
                    const o = boids[j];
                    const dx = o.x - b.x, dy = o.y - b.y;
                    const d = Math.sqrt(dx * dx + dy * dy);

                    if (d < SEP_DIST && d > 0) {
                        sepX -= dx / d; sepY -= dy / d; sepN++;
                    }
                    if (d < ALI_DIST) {
                        aliX += o.vx; aliY += o.vy; aliN++;
                    }
                    if (d < COH_DIST) {
                        cohX += o.x; cohY += o.y; cohN++;
                    }
                }

                let steerX = 0, steerY = 0;

                if (sepN > 0) {
                    const sX = sepX / sepN, sY = sepY / sepN;
                    const sv = limit(sX, sY, MAX_FORCE);
                    steerX += sv[0] * 1.8;
                    steerY += sv[1] * 1.8;
                }
                if (aliN > 0) {
                    const aX = aliX / aliN - b.vx, aY = aliY / aliN - b.vy;
                    const av = limit(aX, aY, MAX_FORCE);
                    steerX += av[0] * 1.0;
                    steerY += av[1] * 1.0;
                }
                if (cohN > 0) {
                    const cx = cohX / cohN - b.x, cy = cohY / cohN - b.y;
                    const cv = limit(cx, cy, MAX_FORCE);
                    steerX += cv[0] * 0.8;
                    steerY += cv[1] * 0.8;
                }

                if (mouseX > -9000) {
                    const cdx = mouseX - b.x, cdy = mouseY - b.y;
                    const cd = Math.sqrt(cdx * cdx + cdy * cdy);
                    if (cd < dynamicDist && cd > 20) {
                        const cf = dynamicForce * (1 - cd / dynamicDist);
                        steerX += (cdx / cd) * cf;
                        steerY += (cdy / cd) * cf;
                        if (mouseSpeed > 2) {
                            steerX += mouseVX * 0.008 * (1 - cd / dynamicDist);
                            steerY += mouseVY * 0.008 * (1 - cd / dynamicDist);
                        }
                    }
                }

                steerX += Math.sin(time * 0.003 + b.seed) * 0.004;
                steerY += Math.cos(time * 0.002 + b.seed * 1.3) * 0.003;

                b.vx += steerX;
                b.vy += steerY;
                const lv = limit(b.vx, b.vy, MAX_SPEED);
                b.vx = lv[0]; b.vy = lv[1];

                b.x += b.vx;
                b.y += b.vy;

                if (b.x < -10) b.x += W + 20;
                if (b.x > W + 10) b.x -= W + 20;
                if (b.y < -10) b.y += H + 20;
                if (b.y > H + 10) b.y -= H + 20;

                const angle = Math.atan2(b.vy, b.vx);
                const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
                const drawLen = b.len + speed * 1.5;
                const ex = b.x + Math.cos(angle) * drawLen;
                const ey = b.y + Math.sin(angle) * drawLen;

                const posGrad = 0.5 + 0.5 * Math.sin(b.x / W * Math.PI + time * 0.001);
                let alpha = b.baseAlpha * (0.6 + posGrad * 0.6);

                if (mouseX > -9000) {
                    const mdx = mouseX - b.x, mdy = mouseY - b.y;
                    const md = Math.sqrt(mdx * mdx + mdy * mdy);
                    if (md < dynamicDist * 0.6) {
                        alpha = Math.min(0.65, alpha + (1 - md / (dynamicDist * 0.6)) * 0.4);
                    }
                }

                ctx.beginPath();
                ctx.moveTo(b.x, b.y);
                ctx.lineTo(ex, ey);
                ctx.strokeStyle = b.isGreen
                    ? 'rgba(33,181,55,' + alpha + ')'
                    : 'rgba(250,250,248,' + alpha + ')';
                ctx.lineWidth = 1.2;
                ctx.stroke();
            }

            animationFrameId = window.requestAnimationFrame(draw);
        };

        const handleResize = () => {
            init();
        };

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const handleMouseLeave = () => {
            mouseX = -9999;
            mouseY = -9999;
        };

        init();
        draw();

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseLeave);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseLeave);
            if (animationFrameId) {
                window.cancelAnimationFrame(animationFrameId);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 1,
                pointerEvents: 'none'
            }}
        />
    );
};

export default ParticleCursor;
