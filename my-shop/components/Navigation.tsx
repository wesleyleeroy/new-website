"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Liquid, Colors } from "@/components/LiquidButton";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const defaultColors: Colors = {
    color1: '#0B06FC',
    color2: '#7D7BF4',
    color3: '#1E10C5',
    color4: '#5E5AE6',
    color5: '#3D38D9',
    color6: '#8B89F7',
    color7: '#4A46E0',
    color8: '#6B68F0',
    color9: '#9997FA',
    color10: '#2B25CC',
    color11: '#1812B8',
    color12: '#A8A6FC',
    color13: '#5955E3',
    color14: '#7775F2',
    color15: '#8583F5',
    color16: '#3F3BDB',
    color17: '#5D59E8',
};

export default function Navigation() {
    const pathname = usePathname();
    const isPersonalPage = pathname?.startsWith("/personal") ?? false;

    const buttonRef = useRef<HTMLAnchorElement>(null);
    const contactButtonRef = useRef<HTMLAnchorElement>(null);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isHoveredSocials, setIsHoveredSocials] = useState(false);
    const [isHoveredPersonal, setIsHoveredPersonal] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show navbar when scrolling up, hide when scrolling down
            if (currentScrollY < lastScrollY) {
                // Scrolling up
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
                // Scrolling down and past the initial navbar height
                setIsVisible(false);
            }

            setLastScrollY(currentScrollY);
        };

        // Listen for custom event to force hide nav
        const handleForceHide = () => {
            setIsVisible(false);
            setLastScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("hideNavigation", handleForceHide);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("hideNavigation", handleForceHide);
        };
    }, [lastScrollY]);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        const button = buttonRef.current;
        if (!button) return;

        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        button.style.setProperty("--shine-x", `${x}px`);
        button.style.setProperty("--shine-y", `${y}px`);
    }, []);

    const handleMouseLeave = useCallback(() => {
        const button = buttonRef.current;
        if (!button) return;

        // Move the shine off the button when mouse leaves
        button.style.setProperty("--shine-x", "-100px");
        button.style.setProperty("--shine-y", "-100px");
    }, []);

    const handleContactMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        const button = contactButtonRef.current;
        if (!button) return;

        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        button.style.setProperty("--shine-x", `${x}px`);
        button.style.setProperty("--shine-y", `${y}px`);
    }, []);

    const handleContactMouseLeave = useCallback(() => {
        const button = contactButtonRef.current;
        if (!button) return;

        button.style.setProperty("--shine-x", "-100px");
        button.style.setProperty("--shine-y", "-100px");
    }, []);

    const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const target = document.querySelector("#dock");
        if (target) {
            window.dispatchEvent(new CustomEvent('hideNavigation'));
            target.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav
            className={`fixed top-0 z-50 w-full bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 transition-transform duration-300 ease-in-out ${isVisible ? "translate-y-0" : "-translate-y-full"
                }`}
        >
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between overflow-visible">
                    <div className="hidden md:flex items-center gap-4">
                        <motion.div
                            className="glow-btn-wrapper inline-flex"
                            style={{ '--btn-radius': '1rem' } as React.CSSProperties}
                            onMouseEnter={() => setIsHoveredPersonal(true)}
                            onMouseLeave={() => setIsHoveredPersonal(false)}
                            animate={{
                                y: isHoveredPersonal ? -3 : 0,
                            }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <span className="btn-border-base"></span>
                            <span className="btn-glow"></span>
                            <motion.a
                                id="personal-btn"
                                href={isPersonalPage ? `${basePath}/` : `${basePath}/personal`}
                                className="relative w-[140px] h-[40px] rounded-2xl overflow-hidden cursor-pointer border-2 border-black"
                                initial={{
                                    boxShadow: "0 12px 35px -5px rgba(0, 0, 0, 0.5), 0 15px 40px -10px rgba(11, 6, 252, 0.6), 0 8px 20px -5px rgba(125, 123, 244, 0.4)"
                                }}
                                animate={{
                                    boxShadow: isHoveredPersonal
                                        ? "0 18px 50px -5px rgba(0, 0, 0, 0.6), 0 25px 60px -10px rgba(11, 6, 252, 0.8), 0 15px 40px -5px rgba(125, 123, 244, 0.6), 0 0 70px -10px rgba(93, 89, 232, 0.5)"
                                        : "0 12px 35px -5px rgba(0, 0, 0, 0.5), 0 15px 40px -10px rgba(11, 6, 252, 0.6), 0 8px 20px -5px rgba(125, 123, 244, 0.4)",
                                }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                {/* Background */}
                                <div className="absolute inset-0 bg-black rounded-2xl" />

                                {/* Liquid layers */}
                                <Liquid isHovered={isHoveredPersonal} colors={defaultColors} />

                                {/* Content */}
                                <div className="absolute inset-0 flex items-center justify-center gap-2 z-10">
                                    <span className="text-white text-sm font-bold">{isPersonalPage ? "Home" : "Personal Life"}</span>
                                </div>
                            </motion.a>
                        </motion.div>
                        <div className="glow-btn-wrapper inline-flex">
                            <span className="btn-border-base"></span>
                            <span className="btn-glow"></span>
                            <a
                                ref={contactButtonRef}
                                id="contact-btn"
                                className="shine-button flex h-10 items-center justify-center rounded-md bg-transparent border-2 border-black px-6 text-sm font-bold text-black transition-all hover:bg-black hover:text-white"
                                href="#dock"
                                onClick={handleContactClick}
                                onMouseMove={handleContactMouseMove}
                                onMouseLeave={handleContactMouseLeave}
                            >
                                <span className="relative z-10">Contact</span>
                            </a>
                        </div>
                    </div>
                    <motion.div
                        className="glow-btn-wrapper hidden md:inline-flex"
                        style={{ '--btn-radius': '1rem' } as React.CSSProperties}
                        onMouseEnter={() => setIsHoveredSocials(true)}
                        onMouseLeave={() => setIsHoveredSocials(false)}
                        animate={{
                            y: isHoveredSocials ? -3 : 0,
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <span className="btn-border-base"></span>
                        <span className="btn-glow"></span>
                        <motion.a
                            id="nav-btn"
                            href="#dock"
                            onClick={handleContactClick}
                            className="relative w-[140px] h-[40px] rounded-2xl overflow-hidden cursor-pointer border-2 border-black"
                            initial={{
                                boxShadow: "0 12px 35px -5px rgba(0, 0, 0, 0.5), 0 15px 40px -10px rgba(11, 6, 252, 0.6), 0 8px 20px -5px rgba(125, 123, 244, 0.4)"
                            }}
                            animate={{
                                boxShadow: isHoveredSocials
                                    ? "0 18px 50px -5px rgba(0, 0, 0, 0.6), 0 25px 60px -10px rgba(11, 6, 252, 0.8), 0 15px 40px -5px rgba(125, 123, 244, 0.6), 0 0 70px -10px rgba(93, 89, 232, 0.5)"
                                    : "0 12px 35px -5px rgba(0, 0, 0, 0.5), 0 15px 40px -10px rgba(11, 6, 252, 0.6), 0 8px 20px -5px rgba(125, 123, 244, 0.4)",
                            }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            {/* Background */}
                            <div className="absolute inset-0 bg-black rounded-2xl" />

                            {/* Liquid layers */}
                            <Liquid isHovered={isHoveredSocials} colors={defaultColors} />

                            {/* Content */}
                            <div className="absolute inset-0 flex items-center justify-center gap-2 z-10">
                                <span className="text-white text-sm font-bold">My Socials</span>
                            </div>
                        </motion.a>
                    </motion.div>
                    <div className="md:hidden">
                        <button className="text-[#1f487e] p-2 hover:bg-slate-5 rounded-lg transition-colors">
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav >
    );
}
