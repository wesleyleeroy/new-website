"use client";

import { useEffect, useRef } from "react";

export default function Marquee() {
    const cylinderRef = useRef<HTMLDivElement>(null);

    const text = "     Defining the future     ";
    // More segments for smoother curve
    const segments = 16;
    const textItems = Array(segments).fill(text);

    useEffect(() => {
        let rotation = 0;
        let animationId: number;

        const animate = () => {
            rotation += 0.1;
            if (cylinderRef.current) {
                cylinderRef.current.style.transform = `rotateY(${rotation}deg)`;
            }
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationId);
    }, []);

    const radius = 550; // Radius for smooth curve
    const angleStep = 360 / segments;

    return (
        <div className="marquee-3d-wrapper">
            <div className="marquee-3d-scene">
                <div ref={cylinderRef} className="marquee-3d-cylinder">
                    {textItems.map((item, index) => {
                        const angle = index * angleStep;
                        return (
                            <div
                                key={index}
                                className="marquee-3d-segment"
                                style={{
                                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                                }}
                            >
                                {item}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
