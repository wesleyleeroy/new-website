"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGSAPAnimations() {
    useEffect(() => {
        const springEase = "elastic.out(1, 0.5)";
        const elementisEase = "power2.out";

        // Text reveal animations
        gsap.utils.toArray<HTMLElement>(".text-reveal").forEach((text, index) => {
            gsap.to(text, {
                scrollTrigger: { trigger: text, start: "top 85%", toggleActions: "play none none none" },
                y: 0,
                opacity: 1,
                duration: 1.2,
                delay: index * 0.2,
                ease: elementisEase,
                onComplete: () => {
                    if (text.parentElement) text.parentElement.style.overflow = "visible";
                },
            });
        });

        // Hero description
        gsap.to(".hero-description", {
            scrollTrigger: { trigger: ".hero-description", start: "top 85%", toggleActions: "play none none none" },
            y: 0,
            opacity: 1,
            duration: 1.5,
            delay: 0.5,
            ease: "power2.out",
        });

        // Fade up animations
        gsap.utils.toArray<HTMLElement>(".fade-up").forEach((element) => {
            gsap.to(element, {
                scrollTrigger: { trigger: element, start: "top 85%", toggleActions: "play none none none" },
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "linear",
            });
        });

        // Feature cards sticky
        const featureCards = gsap.utils.toArray<HTMLElement>(".feature-card");
        featureCards.forEach((card, index) => {
            const isLast = index === featureCards.length - 1;
            ScrollTrigger.create({
                trigger: card,
                start: "top 100px",
                end: isLast ? "bottom 100px" : "bottom top",
                pin: true,
                pinSpacing: false,
            });
        });

        // Product cards animation
        const productCards = gsap.utils.toArray<HTMLElement>(".product-card");
        productCards.forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: { trigger: card, start: "top 80%", end: "bottom 20%", toggleActions: "play reverse play reverse" },
                opacity: 0,
                y: 40,
                scale: 0.95,
                duration: 0.8,
                delay: index * 0.1,
                ease: springEase,
            });
        });

        // Inventory section
        gsap.from(".inventory-title", {
            scrollTrigger: { trigger: ".inventory-title", start: "top 80%", toggleActions: "play none none none" },
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: springEase,
        });

        gsap.from(".inventory-subtitle", {
            scrollTrigger: { trigger: ".inventory-subtitle", start: "top 80%", toggleActions: "play none none none" },
            opacity: 0,
            y: 20,
            duration: 0.8,
            delay: 0.1,
            ease: springEase,
        });

        // Feature titles
        gsap.set(".feature-title", { y: 100, opacity: 0, scale: 0.95 });
        gsap.to(".feature-title", {
            scrollTrigger: { trigger: ".feature-title", start: "top 95%", toggleActions: "play none none none" },
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 2,
            ease: elementisEase,
        });

        gsap.set(".feature-subtitle", { y: 80, opacity: 0 });
        gsap.to(".feature-subtitle", {
            scrollTrigger: { trigger: ".feature-subtitle", start: "top 95%", toggleActions: "play none none none" },
            y: 0,
            opacity: 1,
            duration: 2,
            delay: 0.3,
            ease: elementisEase,
        });

        // Liquid cards
        gsap.utils.toArray<HTMLElement>(".liquid-card-container").forEach((card, index) => {
            gsap.set(card, { opacity: 0, y: 60 });
            gsap.to(card, {
                scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" },
                opacity: 1,
                y: 0,
                duration: 1.2,
                delay: index * 0.15,
                ease: elementisEase,
            });
        });

        // UPenn image parallax effect
        const upennImage = document.getElementById("upenn-image");
        if (upennImage) {
            gsap.to(upennImage, {
                scrollTrigger: {
                    trigger: ".upenn-image-wrapper",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.1,
                },
                y: "25%",
                ease: "none",
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);
}
