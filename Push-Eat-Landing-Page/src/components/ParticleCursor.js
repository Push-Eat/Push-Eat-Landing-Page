import React, { useEffect, useRef } from 'react';

const ParticleCursor = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let boids = [];
        let W;
        let H;
        let mouseX = -9999;
        let mouseY = -9999;
        let mouseTargetX = -9999;
        let mouseTargetY = -9999;
        let prevMouseX = -9999;
        let prevMouseY = -9999;
        let mouseVX = 0;
        let mouseVY = 0;
        let time = 0;
        let animationFrameId;

        const COUNT = window.innerWidth < 768 ? 120 : 170;
        const MAX_SPEED = 2.5;
        const MAX_FORCE = 0.07;
        const SEP_DIST = 24;
        const ALI_DIST = 74;
        const COH_DIST = 120;
        const CURSOR_DIST = 410;
        const CURSOR_FORCE = 0.085;
        const SWIRL_FORCE = 0.05;
        const CLUSTER_FORCE = 0.1;
        const JITTER_FORCE = 0.008;

        class Boid {
            constructor() {
                this.x = Math.random() * window.innerWidth;
                this.y = Math.random() * window.innerHeight;
                const a = Math.random() * Math.PI * 2;
                const s = Math.random() * 0.8 + 0.5;
                this.vx = Math.cos(a) * s;
                this.vy = Math.sin(a) * s;
                this.seed = Math.random() * 1000;
                this.len = Math.random() * 4 + 5;
                this.width = Math.random() * 1.4 + 1.2;
                this.isGreen = Math.random() > 0.62;
                this.baseAlpha = Math.random() * 0.24 + 0.16;
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
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
            boids = [];
            for (let i = 0; i < COUNT; i++) boids.push(new Boid());
        };

        const draw = () => {
            time++;
            ctx.clearRect(0, 0, W, H);

            mouseX += (mouseTargetX - mouseX) * 0.26;
            mouseY += (mouseTargetY - mouseY) * 0.26;

            if (mouseX > -9000 && prevMouseX > -9000) {
                mouseVX = (mouseX - prevMouseX) * 0.55;
                mouseVY = (mouseY - prevMouseY) * 0.55;
            }
            prevMouseX = mouseX;
            prevMouseY = mouseY;

            const mouseSpeed = Math.sqrt(mouseVX * mouseVX + mouseVY * mouseVY);
            const dynamicForce = CURSOR_FORCE + Math.min(mouseSpeed * 0.004, 0.12);
            const dynamicDist = CURSOR_DIST + Math.min(mouseSpeed * 10, 220);

            const n = boids.length;
            for (let i = 0; i < n; i++) {
                const b = boids[i];
                let sepX = 0;
                let sepY = 0;
                let sepN = 0;
                let aliX = 0;
                let aliY = 0;
                let aliN = 0;
                let cohX = 0;
                let cohY = 0;
                let cohN = 0;

                for (let j = 0; j < n; j++) {
                    if (i === j) continue;
                    const o = boids[j];
                    const dx = o.x - b.x;
                    const dy = o.y - b.y;
                    const d = Math.sqrt(dx * dx + dy * dy);

                    if (d < SEP_DIST && d > 0) {
                        sepX -= dx / d;
                        sepY -= dy / d;
                        sepN++;
                    }
                    if (d < ALI_DIST) {
                        aliX += o.vx;
                        aliY += o.vy;
                        aliN++;
                    }
                    if (d < COH_DIST) {
                        cohX += o.x;
                        cohY += o.y;
                        cohN++;
                    }
                }

                let steerX = 0;
                let steerY = 0;

                if (sepN > 0) {
                    const sX = sepX / sepN;
                    const sY = sepY / sepN;
                    const sv = limit(sX, sY, MAX_FORCE);
                    steerX += sv[0] * 1.8;
                    steerY += sv[1] * 1.8;
                }
                if (aliN > 0) {
                    const aX = aliX / aliN - b.vx;
                    const aY = aliY / aliN - b.vy;
                    const av = limit(aX, aY, MAX_FORCE);
                    steerX += av[0] * 1.05;
                    steerY += av[1] * 1.05;
                }
                if (cohN > 0) {
                    const cx = cohX / cohN - b.x;
                    const cy = cohY / cohN - b.y;
                    const cv = limit(cx, cy, MAX_FORCE);
                    steerX += cv[0] * 0.92;
                    steerY += cv[1] * 0.92;
                }

                if (mouseX > -9000) {
                    const cdx = mouseX - b.x;
                    const cdy = mouseY - b.y;
                    const cd = Math.sqrt(cdx * cdx + cdy * cdy);
                    if (cd < dynamicDist && cd > 12) {
                        const proximity = 1 - cd / dynamicDist;
                        const cf = dynamicForce * proximity;
                        const tx = -cdy / cd;
                        const ty = cdx / cd;
                        steerX += (cdx / cd) * cf;
                        steerY += (cdy / cd) * cf;
                        steerX += tx * SWIRL_FORCE * proximity;
                        steerY += ty * SWIRL_FORCE * proximity;
                        if (cd < dynamicDist * 0.45) {
                            steerX += (cdx / cd) * CLUSTER_FORCE * proximity;
                            steerY += (cdy / cd) * CLUSTER_FORCE * proximity;
                        }
                        if (mouseSpeed > 1) {
                            steerX += mouseVX * 0.011 * proximity;
                            steerY += mouseVY * 0.011 * proximity;
                        }
                    }
                }

                steerX += Math.sin(time * 0.004 + b.seed) * JITTER_FORCE;
                steerY += Math.cos(time * 0.003 + b.seed * 1.3) * JITTER_FORCE;

                b.vx += steerX;
                b.vy += steerY;
                const lv = limit(b.vx, b.vy, MAX_SPEED);
                b.vx = lv[0];
                b.vy = lv[1];

                b.x += b.vx;
                b.y += b.vy;

                if (b.x < -10) b.x += W + 20;
                if (b.x > W + 10) b.x -= W + 20;
                if (b.y < -10) b.y += H + 20;
                if (b.y > H + 10) b.y -= H + 20;

                const angle = Math.atan2(b.vy, b.vx);
                const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
                const drawLen = b.len + speed * 1.9;
                const backX = b.x - Math.cos(angle) * drawLen * 0.4;
                const backY = b.y - Math.sin(angle) * drawLen * 0.4;
                const tipX = b.x + Math.cos(angle) * drawLen;
                const tipY = b.y + Math.sin(angle) * drawLen;
                const perpX = Math.cos(angle + Math.PI / 2) * b.width;
                const perpY = Math.sin(angle + Math.PI / 2) * b.width;

                const posGrad = 0.5 + 0.5 * Math.sin(b.x / W * Math.PI + time * 0.001);
                let alpha = b.baseAlpha * (0.6 + posGrad * 0.6);

                if (mouseX > -9000) {
                    const mdx = mouseX - b.x;
                    const mdy = mouseY - b.y;
                    const md = Math.sqrt(mdx * mdx + mdy * mdy);
                    if (md < dynamicDist * 0.58) {
                        alpha = Math.min(0.8, alpha + (1 - md / (dynamicDist * 0.58)) * 0.46);
                    }
                }

                ctx.beginPath();
                ctx.moveTo(tipX, tipY);
                ctx.lineTo(backX + perpX, backY + perpY);
                ctx.lineTo(backX - perpX, backY - perpY);
                ctx.closePath();
                ctx.fillStyle = b.isGreen
                    ? 'rgba(33,181,55,' + alpha + ')'
                    : 'rgba(250,250,248,' + alpha + ')';
                ctx.fill();
            }

            animationFrameId = window.requestAnimationFrame(draw);
        };

        const handleResize = () => {
            init();
        };

        const handleMouseMove = (e) => {
            mouseTargetX = e.clientX;
            mouseTargetY = e.clientY;
            if (mouseX < -9000) {
                mouseX = e.clientX;
                mouseY = e.clientY;
                prevMouseX = e.clientX;
                prevMouseY = e.clientY;
            }
        };

        const handleMouseLeave = () => {
            mouseTargetX = -9999;
            mouseTargetY = -9999;
        };

        init();
        draw();

        window.addEventListener('resize', handleResize);
        window.addEventListener('pointermove', handleMouseMove);
        window.addEventListener('pointerout', handleMouseLeave);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('pointermove', handleMouseMove);
            window.removeEventListener('pointerout', handleMouseLeave);
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
