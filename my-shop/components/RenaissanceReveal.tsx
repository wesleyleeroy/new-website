"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Pre-generated star positions to avoid hydration mismatch
const starPositions = [
    { left: 12, top: 8, delay: 0.5, opacity: 0.9 },
    { left: 85, top: 15, delay: 1.2, opacity: 0.7 },
    { left: 45, top: 5, delay: 0.8, opacity: 0.85 },
    { left: 23, top: 78, delay: 2.1, opacity: 0.6 },
    { left: 67, top: 42, delay: 1.5, opacity: 0.95 },
    { left: 91, top: 67, delay: 0.3, opacity: 0.75 },
    { left: 34, top: 89, delay: 2.5, opacity: 0.8 },
    { left: 78, top: 23, delay: 1.8, opacity: 0.65 },
    { left: 5, top: 45, delay: 0.9, opacity: 0.9 },
    { left: 56, top: 72, delay: 2.2, opacity: 0.55 },
    { left: 19, top: 34, delay: 1.1, opacity: 0.85 },
    { left: 72, top: 91, delay: 0.7, opacity: 0.7 },
    { left: 41, top: 56, delay: 2.8, opacity: 0.6 },
    { left: 88, top: 12, delay: 1.4, opacity: 0.95 },
    { left: 9, top: 67, delay: 0.4, opacity: 0.8 },
    { left: 63, top: 38, delay: 2.0, opacity: 0.75 },
    { left: 28, top: 94, delay: 1.6, opacity: 0.65 },
    { left: 95, top: 51, delay: 0.6, opacity: 0.9 },
    { left: 47, top: 19, delay: 2.4, opacity: 0.55 },
    { left: 15, top: 82, delay: 1.0, opacity: 0.85 },
    { left: 81, top: 75, delay: 0.2, opacity: 0.7 },
    { left: 52, top: 28, delay: 2.6, opacity: 0.6 },
    { left: 3, top: 93, delay: 1.3, opacity: 0.95 },
    { left: 69, top: 7, delay: 0.8, opacity: 0.8 },
    { left: 36, top: 61, delay: 2.3, opacity: 0.75 },
    { left: 93, top: 44, delay: 1.7, opacity: 0.65 },
    { left: 21, top: 17, delay: 0.5, opacity: 0.9 },
    { left: 58, top: 86, delay: 2.9, opacity: 0.55 },
    { left: 77, top: 32, delay: 1.2, opacity: 0.85 },
    { left: 11, top: 59, delay: 0.3, opacity: 0.7 },
    { left: 44, top: 96, delay: 2.1, opacity: 0.6 },
    { left: 86, top: 21, delay: 1.5, opacity: 0.95 },
    { left: 31, top: 47, delay: 0.9, opacity: 0.8 },
    { left: 64, top: 69, delay: 2.7, opacity: 0.75 },
    { left: 7, top: 84, delay: 1.1, opacity: 0.65 },
    { left: 49, top: 11, delay: 0.7, opacity: 0.9 },
    { left: 89, top: 58, delay: 2.0, opacity: 0.55 },
    { left: 17, top: 73, delay: 1.4, opacity: 0.85 },
    { left: 74, top: 4, delay: 0.4, opacity: 0.7 },
    { left: 39, top: 36, delay: 2.5, opacity: 0.6 },
    { left: 97, top: 79, delay: 1.8, opacity: 0.95 },
    { left: 25, top: 52, delay: 0.6, opacity: 0.8 },
    { left: 61, top: 25, delay: 2.2, opacity: 0.75 },
    { left: 83, top: 88, delay: 1.0, opacity: 0.65 },
    { left: 14, top: 41, delay: 0.2, opacity: 0.9 },
    { left: 55, top: 64, delay: 2.8, opacity: 0.55 },
    { left: 71, top: 97, delay: 1.6, opacity: 0.85 },
    { left: 33, top: 14, delay: 0.8, opacity: 0.7 },
    { left: 99, top: 35, delay: 2.4, opacity: 0.6 },
];

export default function RenaissanceReveal() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 80%", "end start"],
    });

    // Transform values based on scroll progress
    const scale = useTransform(scrollYProgress, [0, 1], [1, 15]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div ref={containerRef} className="relative h-[300vh]">
            {/* Sticky Container */}
            <div className="sticky top-0 h-screen overflow-hidden">
                {/* Layer 1: Bottom - Dark Space Background with Hero */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black flex items-center justify-center">
                    {/* Stars Background - only render after mount to avoid hydration issues */}
                    {isMounted && (
                        <div className="absolute inset-0 overflow-hidden">
                            {starPositions.map((star, i) => (
                                <div
                                    key={i}
                                    className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                                    style={{
                                        left: `${star.left}%`,
                                        top: `${star.top}%`,
                                        animationDelay: `${star.delay}s`,
                                        opacity: star.opacity,
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    {/* Hero "Sidekick" Character */}
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-64 h-80 md:w-80 md:h-96 relative">
                            <img
                                src="https://picsum.photos/400/500?random=1"
                                alt="Sidekick Character"
                                className="w-full h-full object-cover rounded-2xl shadow-2xl shadow-purple-500/30"
                            />
                            {/* Glow effect */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-purple-600/30 via-transparent to-cyan-500/20" />
                        </div>
                        <h2 className="mt-8 text-4xl md:text-6xl font-bold text-white tracking-tight">
                            Welcome to the Future
                        </h2>
                        <p className="mt-4 text-lg text-gray-400 max-w-md text-center">
                            Discover what lies beyond the canvas
                        </p>
                    </div>
                </div>

                {/* Layer 2: Top - Renaissance Cover (zooms and fades) */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center origin-center"
                    style={{
                        scale,
                        opacity,
                    }}
                >
                    {/* Renaissance Background */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url('https://picsum.photos/1920/1080?random=2')`,
                        }}
                    >
                        {/* Overlay for vintage/Renaissance look */}
                        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/40 via-amber-800/20 to-amber-950/60" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
                    </div>

                    {/* Title Card */}
                    <div className="relative z-10 text-center p-12 bg-amber-50/90 rounded-lg shadow-2xl border-4 border-amber-700/50 max-w-lg">
                        <div className="absolute inset-2 border border-amber-600/30 rounded pointer-events-none" />
                        <h1
                            className="text-5xl md:text-7xl font-serif font-bold text-amber-900 mb-4"
                            style={{ fontFamily: "Georgia, serif" }}
                        >
                            Renaissance
                        </h1>
                        <div className="w-24 h-1 bg-amber-700 mx-auto mb-4" />
                        <p
                            className="text-lg text-amber-800 italic"
                            style={{ fontFamily: "Georgia, serif" }}
                        >
                            Scroll to reveal what lies beneath
                        </p>
                        <div className="mt-6 flex justify-center">
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className="text-amber-700"
                            >
                                <svg
                                    className="w-8 h-8"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                    />
                                </svg>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
