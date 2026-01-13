"use client";

import { useEffect, useRef } from "react";

export default function FeaturesParticleCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const words = ["Publications"];
        let currentWordIndex = 0;
        let particles: Particle[] = [];

        function resize() {
            if (!canvas || !canvas.parentElement) return;
            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        }

        class Particle {
            pos: { x: number; y: number };
            target: { x: number; y: number };
            vel: { x: number; y: number };
            acc: { x: number; y: number };
            maxSpeed: number;
            size: number;
            color: { r: number; g: number; b: number };
            isKilled: boolean;

            constructor(x: number, y: number) {
                this.pos = { x: -Math.random() * (canvas?.width || 800) * 0.5, y: Math.random() * (canvas?.height || 400) };
                this.target = { x, y };
                this.vel = { x: 0, y: 0 };
                this.acc = { x: 0, y: 0 };
                this.maxSpeed = Math.random() * 6 + 4;
                this.size = 1.5;
                this.color = { r: 31, g: 72, b: 126 };
                this.isKilled = false;
            }

            move() {
                let dx = this.target.x - this.pos.x;
                let dy = this.target.y - this.pos.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                let speed = this.maxSpeed;
                if (dist < 100) speed = (dist / 100) * this.maxSpeed;
                if (dist > 0) {
                    dx = (dx / dist) * speed;
                    dy = (dy / dist) * speed;
                }
                this.acc.x += (dx - this.vel.x) * 0.1;
                this.acc.y += (dy - this.vel.y) * 0.1;
                this.vel.x += this.acc.x;
                this.vel.y += this.acc.y;
                this.pos.x += this.vel.x;
                this.pos.y += this.vel.y;
                this.acc.x = 0;
                this.acc.y = 0;
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 1)`;
                ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
            }

            kill() {
                if (!this.isKilled && canvas) {
                    this.target.x = canvas.width + 10;
                    this.target.y = Math.random() * canvas.height;
                    this.isKilled = true;
                }
            }
        }

        function nextWord() {
            if (!canvas || !ctx) return;
            const word = words[currentWordIndex];
            currentWordIndex = (currentWordIndex + 1) % words.length;

            const tempCanvas = document.createElement("canvas");
            tempCanvas.width = canvas.width;
            tempCanvas.height = canvas.height;
            const tCtx = tempCanvas.getContext("2d");
            if (!tCtx) return;

            const fontSize = Math.min(canvas.width * 0.12, 60);
            tCtx.font = `800 ${fontSize}px 'Outfit', sans-serif`;
            tCtx.textAlign = "left";
            tCtx.textBaseline = "middle";
            tCtx.fillStyle = "white";
            tCtx.fillText(word, canvas.width * 0.1, canvas.height / 2);

            const imageData = tCtx.getImageData(0, 0, canvas.width, canvas.height).data;
            const pixelStep = 1; // Reduced from 2 for more particles
            const newTargets: { x: number; y: number }[] = [];

            for (let y = 0; y < canvas.height; y += pixelStep) {
                for (let x = 0; x < canvas.width; x += pixelStep) {
                    const index = (y * canvas.width + x) * 4;
                    if (imageData[index + 3] > 50) newTargets.push({ x, y });
                }
            }

            if (particles.length < newTargets.length) {
                const diff = newTargets.length - particles.length;
                for (let i = 0; i < diff; i++) {
                    particles.push(new Particle(canvas.width / 2, canvas.height / 2));
                }
            }

            newTargets.sort(() => Math.random() - 0.5);

            for (let i = 0; i < particles.length; i++) {
                if (i < newTargets.length) {
                    particles[i].target = newTargets[i];
                    particles[i].isKilled = false;
                    particles[i].color = { r: 31, g: 72, b: 126 };
                } else {
                    particles[i].kill();
                    particles[i].color = { r: 180, g: 180, b: 180 };
                }
            }
        }

        function animate() {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (const p of particles) {
                p.move();
                p.draw();
            }
            requestAnimationFrame(animate);
        }


        let hasStarted = false;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !hasStarted) {
                    hasStarted = true;
                    // Wait for Outfit font to load before rendering
                    document.fonts.ready.then(() => {
                        resize();
                        nextWord();
                        animate();
                    });
                    observer.disconnect();
                }
            });
        }, { threshold: 0.1 });

        window.addEventListener("resize", resize);
        resize();
        observer.observe(canvas);

        return () => {
            window.removeEventListener("resize", resize);
            observer.disconnect();
        };
    }, []);

    return (
        <div className="relative h-32 mb-8 overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8" style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}>
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    );
}
