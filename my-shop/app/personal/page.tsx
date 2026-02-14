"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";

const ZoomParallax = dynamic(() => import("@/components/ZoomParallax").then(mod => ({ default: mod.ZoomParallax })), { ssr: false });
const DockDemo = dynamic(() => import("@/components/DockDemo"), { ssr: false });

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

// Images for the ZoomParallax gallery (exact same as home page)
const parallaxImages = [
    { src: `${basePath}/images/me solo.jpeg`, alt: "Me Solo" },
    { src: `${basePath}/images/naach.jpeg`, alt: "Naach" },
    { src: `${basePath}/images/grad.jpeg`, alt: "Graduation" },
    { src: `${basePath}/images/diving.jpeg`, alt: "Diving" },
    { src: `${basePath}/images/pfp.jpeg`, alt: "Profile Picture" },
    { src: `${basePath}/images/class board.jpeg`, alt: "Class Board" },
    { src: `${basePath}/images/bfs.jpeg`, alt: "BFS" },
];

export default function PersonalLife() {
    useGSAPAnimations();

    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const slideUp = (el: HTMLElement | null, delay: number) => {
            if (!el) return;
            el.animate(
                [
                    { opacity: 0, transform: 'translateY(100px) scale(0.95)' },
                    { opacity: 1, transform: 'translateY(0) scale(1)' },
                ],
                {
                    duration: 1400,
                    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                    delay,
                    fill: 'forwards',
                }
            );
        };

        slideUp(titleRef.current, 100);
        slideUp(subtitleRef.current, 350);
    }, []);

    return (
        <>
            {/* Background Video */}
            <video className="fixed-bg-video" autoPlay loop muted playsInline preload="metadata">
                <source src={`${basePath}/videos/background final final.mp4`} type="video/mp4" onError={(e) => e.stopPropagation()} />
            </video>

            {/* Frosted Glass Overlay */}
            <div className="fixed -inset-4 z-[-1] bg-white/70"></div>

            <Navigation />

            {/* Content */}
            <main className="relative z-10 pt-32 pb-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center overflow-hidden pb-8">
                        <h1
                            ref={titleRef}
                            className="text-5xl font-bold text-[#1f487e] mb-6"
                            style={{ opacity: 0 }}
                        >Personal Life</h1>
                        <p
                            ref={subtitleRef}
                            className="text-xl text-slate-500 max-w-2xl mx-auto"
                            style={{ opacity: 0 }}
                        >
                            Just a small collection of my beloved friends, hobbies, and life outside of academics.
                        </p>
                    </div>
                </div>
            </main>

            {/* Image Gallery - Exact same as home page */}
            <ZoomParallax images={parallaxImages} />

            {/* Dock Section */}
            <div id="dock">
                <DockDemo />
            </div>
        </>
    );
}
