"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export default function CurvedImageScroll() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // START (0): Bottom of viewport (scrolling down -> image moving up into view)
    // Image should be Offscreen Right.
    // MIDDLE (0.5): Center of viewport.
    // Image should be Onscreen (slide in).
    // END (1): Top of viewport.
    // Image should be Offscreen Right (slide out).

    // X values (Translation)
    // 60vw -> 0vw -> 60vw (Starts offscreen right, comes to center, goes back)
    const x = useTransform(scrollYProgress, [0, 0.5, 1], ["60vw", "0vw", "60vw"]);

    // Optional Rotation for flair
    const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);

    // Optional Opacity to ensure it doesn't pop in
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} className="py-24 overflow-hidden relative flex flex-col items-center justify-center min-h-[120vh]">
            <div className="absolute top-32 w-full max-w-7xl px-4 md:px-8 z-20">
                <h2 className="text-6xl font-bold text-[#1f487e] feature-title text-left">Featured Media</h2>
            </div>
            <motion.div
                style={{ x, rotate, opacity }}
                className="w-[500px] h-[350px] rounded-3xl overflow-hidden shadow-2xl relative z-10"
            >
                <img
                    src="https://picsum.photos/seed/curve/800/600"
                    alt="Curved Scroll Art"
                    className="w-full h-full object-cover"
                />
            </motion.div>
        </section>
    );
}
