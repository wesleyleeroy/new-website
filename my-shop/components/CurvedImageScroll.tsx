"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export default function CurvedImageScroll() {
    const containerRef = useRef(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const maskCanvasRef = useRef<HTMLCanvasElement>(null);
    const isMaskUpdatePending = useRef(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const x = useTransform(scrollYProgress, [0, 0.5, 1], ["60vw", "0vw", "60vw"]);
    const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

    // Initialize Mask: Black = Opaque (Visible Glass)
    useEffect(() => {
        const canvas = maskCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Black mask makes the overlay visible
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 400, 520);

        if (overlayRef.current) {
            const dataUrl = canvas.toDataURL();
            overlayRef.current.style.maskImage = `url(${dataUrl})`;
            overlayRef.current.style.webkitMaskImage = `url(${dataUrl})`;
        }
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const canvas = maskCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Scratch Effect: Cut hole in mask (destination-out)
        ctx.globalCompositeOperation = "destination-out";
        const brushRadius = 100;
        const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, brushRadius);
        gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
        gradient.addColorStop(0.5, "rgba(0, 0, 0, 0.5)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, brushRadius, 0, Math.PI * 2);
        ctx.fill();

        // Throttle Mask Sync
        if (!isMaskUpdatePending.current) {
            isMaskUpdatePending.current = true;
            requestAnimationFrame(() => {
                if (overlayRef.current) {
                    const dataUrl = canvas.toDataURL();
                    overlayRef.current.style.maskImage = `url(${dataUrl})`;
                    overlayRef.current.style.webkitMaskImage = `url(${dataUrl})`;
                }
                isMaskUpdatePending.current = false;
            });
        }
    };

    return (
        <section ref={containerRef} className="py-24 overflow-hidden relative flex flex-col items-center justify-center min-h-[120vh]">
            <div className="absolute top-32 w-full max-w-7xl px-4 md:px-8 z-20">
                <h2
                    className="text-6xl font-bold text-[#1f487e] feature-title text-left"
                    style={{ textShadow: "0 25px 50px rgba(0,0,0,0.6), 0 0 20px rgba(255,255,255,0.4)" }}
                >
                    Featured Media
                </h2>
            </div>
            <motion.div
                style={{
                    x,
                    rotate,
                    opacity,
                    boxShadow: "0 35px 60px -15px rgba(0, 0, 0, 0.6), 0 0 40px 10px rgba(31, 72, 126, 0.5), 0 0 80px 20px rgba(100, 160, 255, 0.3)"
                }}
                className="w-[400px] h-[520px] rounded-3xl overflow-hidden relative z-10 group"
                onMouseMove={handleMouseMove}
            >
                {/* Base Image (Revealed) */}
                <img
                    src={`${basePath}/images/blog%20preview.png`}
                    alt="Curved Scroll Art"
                    className="w-full h-full object-cover"
                />

                {/* Glass Button Effect Overlay (Masked) */}
                <div
                    ref={overlayRef}
                    className="absolute inset-0 z-20 pointer-events-none rounded-3xl overflow-hidden glass-button-wrap"
                >
                    {/* Inner Glass Element mimicking GlassButton structure but full size */}
                    <div className="glass-button absolute inset-0 w-full h-full !rounded-3xl border border-white/20"></div>
                    <div className="glass-button-shadow absolute inset-0 w-full h-full !rounded-3xl"></div>
                </div>

                {/* Mask Canvas (Hidden) */}
                <canvas
                    ref={maskCanvasRef}
                    width={400}
                    height={520}
                    className="hidden"
                />
            </motion.div>
        </section>
    );
}

/* eslint-enable react-hooks/exhaustive-deps */
