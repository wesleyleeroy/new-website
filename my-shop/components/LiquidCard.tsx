"use client";

import { useEffect, useRef, useState } from "react";

interface LiquidCardProps {
    title: string;
    description: string;
    enableScrollOpacity?: boolean;
    previewImage?: string;
    previewFit?: 'cover' | 'contain';
    previewOffsetY?: string;
    position?: 'left' | 'center' | 'right';
    link?: string;
}

export default function LiquidCard({ title, description, enableScrollOpacity = false, previewImage, previewFit = 'cover', previewOffsetY = '0%', position = 'center', link }: LiquidCardProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);
    const shimmerRef = useRef<HTMLDivElement>(null);

    // Scroll-based opacity state
    const [opacity, setOpacity] = useState(0.9);
    const [isHovered, setIsHovered] = useState(false);

    // ... (useEffect hook content will be updated in next step) ...

    useEffect(() => {
        const container = containerRef.current;
        const card = cardRef.current;
        const spotlight = spotlightRef.current;
        const shimmer = shimmerRef.current;
        if (!container || !card || !spotlight || !shimmer) return;

        const handleMouseEnter = () => setIsHovered(true);

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const dx = e.clientX - rect.left - rect.width / 2;
            const dy = e.clientY - rect.top - rect.height / 2;
            const rotateY = (dx / rect.width) * 20;
            const rotateX = (dy / rect.height) * -20;

            let translateX = 0;
            if (position === 'left') translateX = 15;
            if (position === 'right') translateX = -15;

            card.style.transform = `scale(1.25) translateX(${translateX}%) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
            // Apply z-index to container so it pops over siblings
            if (container) container.style.zIndex = '100';
        };

        const handleMouseLeave = () => {
            setIsHovered(false);
            card.style.transform = "scale(1) translateX(0) rotateY(0) rotateX(0)";
            if (container) container.style.zIndex = 'auto'; // Reset container z-index
        };

        const handleCardMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            // Adjust for scale(1.25)
            const x = (e.clientX - rect.left) / 1.25;
            const y = (e.clientY - rect.top) / 1.25;
            spotlight.style.setProperty("--mouse-x", `${x}px`);
            spotlight.style.setProperty("--mouse-y", `${y}px`);
            shimmer.style.setProperty("--mouse-x", `${x}px`);
            shimmer.style.setProperty("--mouse-y", `${y}px`);
        };

        container.addEventListener("mouseenter", handleMouseEnter);
        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseleave", handleMouseLeave);
        card.addEventListener("mousemove", handleCardMouseMove);

        return () => {
            container.removeEventListener("mouseenter", handleMouseEnter);
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseleave", handleMouseLeave);
            card.removeEventListener("mousemove", handleCardMouseMove);
        };
    }, [position]); // Added position dependency

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
    const currentOpacity = isHovered ? 1 : opacity;
    const cardStyle = enableScrollOpacity
        ? {
            background: `linear-gradient(135deg, rgba(26, 26, 46, ${currentOpacity}) 0%, rgba(22, 33, 62, ${currentOpacity}) 50%, rgba(15, 15, 35, ${currentOpacity}) 100%)`,
        }
        : undefined;

    const handleClick = () => {
        if (link) {
            window.open(link, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div ref={containerRef} className="liquid-card-container" role="region" aria-label={title} tabIndex={0} onClick={handleClick} style={{ cursor: link ? 'pointer' : 'default' }}>
            <div ref={cardRef} className="liquid-card" style={cardStyle}>
                <div className="liquid-card-clipper absolute inset-0 rounded-none overflow-hidden z-10" style={{ backgroundColor: '#000000' }}>
                    {previewImage && (
                        <img
                            src={previewImage}
                            alt={`${title} preview`}
                            className={`absolute inset-0 w-full h-full object-cover`}
                            style={{
                                filter: 'invert(1) hue-rotate(180deg)',
                                opacity: 0.85,
                                transform: previewFit === 'contain' ? `scale(1.3) translateY(10%)` : 'none',
                                objectPosition: previewOffsetY !== '0%' ? `center ${previewOffsetY}` : 'center top',
                            }}
                        />
                    )}
                    <div ref={spotlightRef} className="liquid-spotlight"></div>
                    <div ref={shimmerRef} className="liquid-shimmer"></div>
                    {!previewImage && (
                        <div className="liquid-card-content">
                            <div>
                                <h2 className="liquid-card-title">{title}</h2>
                                <p className="liquid-card-description">{description}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

