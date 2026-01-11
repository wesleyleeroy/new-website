"use client";

import { useEffect, useRef } from "react";

interface LiquidCardProps {
    title: string;
    description: string;
}

export default function LiquidCard({ title, description }: LiquidCardProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);
    const shimmerRef = useRef<HTMLDivElement>(null);

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

    return (
        <div ref={containerRef} className="liquid-card-container" role="region" aria-label={title} tabIndex={0}>
            <div ref={cardRef} className="liquid-card">
                <div ref={spotlightRef} className="liquid-spotlight"></div>
                <div ref={shimmerRef} className="liquid-shimmer"></div>
                <div className="liquid-card-content">
                    <div>
                        <h2 className="liquid-card-title">{title}</h2>
                        <p className="liquid-card-description">{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
