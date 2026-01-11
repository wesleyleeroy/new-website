"use client";

import { useEffect, useRef, useState } from "react";

interface LiquidCardProps {
    title: string;
    description: string;
    enableScrollOpacity?: boolean;
    previewImage?: string;
}

export default function LiquidCard({ title, description, enableScrollOpacity = false, previewImage }: LiquidCardProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);
    const shimmerRef = useRef<HTMLDivElement>(null);

    // Scroll-based opacity state
    const [opacity, setOpacity] = useState(0.9);

    useEffect(() => {
        const container = containerRef.current;
        const card = cardRef.current;
        const spotlight = spotlightRef.current;
        const shimmer = shimmerRef.current;
        if (!container || !card || !spotlight || !shimmer) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const dx = e.clientX - rect.left - rect.width / 2;
            const dy = e.clientY - rect.top - rect.height / 2;
            const rotateY = (dx / rect.width) * 20;
            const rotateX = (dy / rect.height) * -20;
            card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        };

        const handleMouseLeave = () => {
            card.style.transform = "rotateY(0) rotateX(0)";
        };

        const handleCardMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            spotlight.style.setProperty("--mouse-x", `${x}px`);
            spotlight.style.setProperty("--mouse-y", `${y}px`);
            shimmer.style.setProperty("--mouse-x", `${x}px`);
            shimmer.style.setProperty("--mouse-y", `${y}px`);
        };

        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseleave", handleMouseLeave);
        card.addEventListener("mousemove", handleCardMouseMove);

        return () => {
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseleave", handleMouseLeave);
            card.removeEventListener("mousemove", handleCardMouseMove);
        };
    }, []);

    // Scroll-based opacity effect
    useEffect(() => {
        if (!enableScrollOpacity) return;

        const handleScroll = () => {
            const scrollY = window.scrollY;
            // Start at 0.9 opacity, decrease to 0.2 over 1000px of scrolling
            const maxScroll = 1000;
            const minOpacity = 0.2;
            const maxOpacity = 0.9;

            const calculatedOpacity = Math.max(
                minOpacity,
                maxOpacity - (scrollY / maxScroll) * (maxOpacity - minOpacity)
            );

            setOpacity(calculatedOpacity);
        };

        // Initial calculation
        handleScroll();

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [enableScrollOpacity]);

    // Dynamic background style for scroll opacity
    const cardStyle = enableScrollOpacity
        ? {
            background: `linear-gradient(135deg, rgba(26, 26, 46, ${opacity}) 0%, rgba(22, 33, 62, ${opacity}) 50%, rgba(15, 15, 35, ${opacity}) 100%)`,
        }
        : undefined;

    return (
        <div ref={containerRef} className="liquid-card-container" role="region" aria-label={title} tabIndex={0}>
            <div ref={cardRef} className="liquid-card" style={cardStyle}>
                <div ref={spotlightRef} className="liquid-spotlight"></div>
                <div ref={shimmerRef} className="liquid-shimmer"></div>
                <div className="liquid-card-content">
                    <div>
                        <h2 className="liquid-card-title">{title}</h2>
                        <p className="liquid-card-description">{description}</p>
                        {previewImage && (
                            <div className="mt-4 rounded-lg overflow-hidden max-h-[350px] overflow-y-auto">
                                <img
                                    src={previewImage}
                                    alt={`${title} preview`}
                                    className="w-full h-auto object-cover rounded-lg transition-opacity"
                                    style={{
                                        filter: 'invert(1) hue-rotate(180deg)',
                                        opacity: 0.85,
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

