"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion, useSpring, useMotionValue } from "framer-motion";

export default function CurvedImageScroll() {
    const containerRef = useRef(null);
    const [isRevealed, setIsRevealed] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const x = useTransform(scrollYProgress, [0, 0.5, 1], ["60vw", "0vw", "60vw"]);
    const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

    // "Gift Opening" Reveal Animation
    // -25% = Full Blur (No hole), 150% = Full Clear (Hole covers everything)
    const targetMaskSize = useMotionValue(-25);
    const revealVal = useSpring(targetMaskSize, { stiffness: 100, damping: 20 });

    useEffect(() => {
        targetMaskSize.set(isRevealed ? 150 : -25);
    }, [isRevealed, targetMaskSize]);

    const maskImage = useTransform(revealVal, (val) =>
        `radial-gradient(circle at center, transparent ${val}%, black ${val + 25}%)`
    );

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
                    boxShadow: "0 35px 60px -15px rgba(0, 0, 0, 0.6), 0 0 40px 10px rgba(31, 72, 126, 0.5), 0 0 80px 20px rgba(100, 160, 255, 0.3)",
                    willChange: "transform, opacity"
                }}
                className="w-[400px] h-[520px] rounded-3xl overflow-hidden relative z-10 group cursor-pointer bg-black"
                onHoverStart={() => setIsRevealed(true)}
                onClick={() => window.open('https://blog.ese.upenn.edu/ai-freshman-wesley-leeroy-shares-his-experience-at-this-falls-ieee-international-conference-on-data-mining/', '_blank')}
            >
                {/* 1. Underlying Sharp Image (Revealed when mask opens) */}
                <img
                    src={`${basePath}/images/blog%20preview.png`}
                    alt="Curved Scroll Art"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* 2. Overlying Blurred Image + Glass Effect (Hidden when mask opens) */}
                {/* We blur this IMAGE instead of using backdrop-filter. Much faster. */}
                <motion.div
                    className="absolute inset-0 z-20 pointer-events-none rounded-3xl overflow-hidden"
                    style={{
                        maskImage,
                        WebkitMaskImage: maskImage,
                        willChange: "mask-image"
                    }}
                >
                    {/* The Blurred Image */}
                    <img
                        src={`${basePath}/images/blog%20preview.png`}
                        alt="Curved Scroll Art Blur"
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ filter: "blur(20px) saturate(180%)", transform: "scale(1.1)" }} // Scale slightly to hide blur edges
                    />

                    {/* Glass Overlay Texture (Border/Shine) sitting on top of the blurred image */}
                    {/* Added Yellow/Gold Tint */}
                    <div className="absolute inset-0 w-full h-full rounded-3xl border border-yellow-200/30 bg-yellow-500/20 shadow-[inset_0_0_40px_rgba(255,215,0,0.3)] mix-blend-overlay"></div>
                    <div className="absolute inset-0 w-full h-full rounded-3xl bg-yellow-400/10"></div>
                </motion.div>
            </motion.div>
        </section>
    );
}

/* eslint-enable react-hooks/exhaustive-deps */
