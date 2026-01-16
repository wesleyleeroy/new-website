"use client";

import Navigation from "@/components/Navigation";
import DockDemo from "@/components/DockDemo";
import { ZoomParallax } from "@/components/ZoomParallax";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";

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

    return (
        <>
            {/* Background Video */}
            <video className="fixed-bg-video" autoPlay loop muted playsInline preload="auto">
                <source src={`${basePath}/videos/background final final.mp4`} type="video/mp4" />
            </video>

            {/* Frosted Glass Overlay */}
            <div className="fixed -inset-4 z-[-1] bg-white/70"></div>

            <Navigation />

            {/* Content */}
            <main className="relative z-10 pt-32 pb-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold text-[#1f487e] mb-6 feature-title">Personal Life</h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto feature-subtitle">
                            Just a small collection of my personal interests, hobbies, and life outside of academics.
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
