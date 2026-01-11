"use client";

import { useRef, useCallback, useState, useEffect } from "react";

export default function Navigation() {
    const buttonRef = useRef<HTMLAnchorElement>(null);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

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
                    <div className="flex items-baseline gap-2 py-2">
                        <div className="bg-[#01baef]/10 p-2 rounded-xl">
                            <span className="material-symbols-outlined text-[#01baef] text-2xl">storefront</span>
                        </div>
                        <span className="text-[#1f487e] text-xl font-bold tracking-tight leading-loose">
                            Wesley&apos;s<span className="text-[#01baef] font-normal">Shop</span>
                        </span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <a className="text-lg font-bold text-[#1f487e] hover:text-[#01baef] transition-colors" href="#inventory">Browse Items</a>
                        <a className="text-lg font-bold text-[#1f487e] hover:text-[#01baef] transition-colors" href="#dock" onClick={handleContactClick}>Contact</a>
                    </div>
                    <div className="glow-btn-wrapper hidden md:inline-flex">
                        <span className="btn-border-base"></span>
                        <span className="btn-glow"></span>
                        <a
                            ref={buttonRef}
                            id="nav-btn"
                            className="shine-button flex h-10 items-center justify-center rounded-md bg-transparent border-2 border-black px-6 text-sm font-bold text-black transition-all hover:bg-black hover:text-white"
                            href="#dock"
                            onClick={handleContactClick}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                        >
                            <span className="relative z-10">My Socials</span>
                        </a>
                    </div>
                    <div className="md:hidden">
                        <button className="text-[#1f487e] p-2 hover:bg-slate-5 rounded-lg transition-colors">
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
