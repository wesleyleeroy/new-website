"use client";

import { useEffect, useRef } from "react";

const icons = [
    { href: "#hero", tooltip: "Home", icon: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" },
    { href: "#inventory", tooltip: "Blog", icon: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" },
];

const socialIcons = [
    { href: "https://github.com/wesleyleeroy", tooltip: "GitHub", icon: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z", isFilled: true },
    { href: "https://www.linkedin.com/in/wesleyleeroy/", tooltip: "LinkedIn", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z", isFilled: true },
    { href: "https://x.com/wesleyleeroy", tooltip: "X", icon: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z", isFilled: true },
    { href: "mailto:wesleyleeroy06@gmail.com", tooltip: "Send Email", icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" },
];

export default function MagnifyDock() {
    const dockRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const dock = dockRef.current;
        const tooltip = tooltipRef.current;
        if (!dock || !tooltip) return;

        const dockIcons = dock.querySelectorAll<HTMLElement>(".magnify-dock-icon");
        const separators = dock.querySelectorAll<HTMLElement>(".magnify-separator");
        const maxScale = 1.5;
        const minScale = 1;
        const magnifyRange = 150;
        let isHovering = false;

        const gaussian = (distance: number, range: number) => {
            const sigma = range / 2.5;
            return Math.exp(-(distance * distance) / (2 * sigma * sigma));
        };

        const calculateScale = (distance: number) => minScale + (maxScale - minScale) * gaussian(distance, magnifyRange);

        const applyMagnification = (mouseX: number) => {
            dockIcons.forEach((icon) => {
                const rect = icon.getBoundingClientRect();
                const iconCenterX = rect.left + rect.width / 2;
                const distance = Math.abs(mouseX - iconCenterX);
                icon.style.transform = `scale(${calculateScale(distance)})`;
            });
            separators.forEach((sep) => {
                const rect = sep.getBoundingClientRect();
                const sepCenterX = rect.left + rect.width / 2;
                const distance = Math.abs(mouseX - sepCenterX);
                sep.style.transform = `scale(${calculateScale(distance)})`;
            });
        };

        const resetMagnification = () => {
            dockIcons.forEach((icon) => (icon.style.transform = "scale(1)"));
            separators.forEach((sep) => (sep.style.transform = "scale(1)"));
        };

        const showTooltip = (icon: HTMLElement) => {
            const text = icon.getAttribute("data-tooltip");
            if (!text || !tooltip) return;
            tooltip.textContent = text;
            tooltip.classList.add("visible");
        };

        const hideTooltip = () => tooltip?.classList.remove("visible");

        dock.addEventListener("mouseenter", () => (isHovering = true));
        dock.addEventListener("mousemove", (e) => isHovering && applyMagnification(e.clientX));
        dock.addEventListener("mouseleave", () => { isHovering = false; resetMagnification(); hideTooltip(); });
        dockIcons.forEach((icon) => icon.addEventListener("mouseenter", () => showTooltip(icon)));

        return () => {
            dock.removeEventListener("mouseenter", () => { });
            dock.removeEventListener("mousemove", () => { });
            dock.removeEventListener("mouseleave", () => { });
        };
    }, []);

    return (
        <div id="magnify-dock-wrapper" className="flex justify-center py-8 relative">
            <div ref={dockRef} id="magnify-dock" className="flex items-end gap-2 px-4 py-3 rounded-2xl bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-xl">
                {icons.map((item, i) => (
                    <a key={i} href={item.href} className="magnify-dock-icon" data-tooltip={item.tooltip}>
                        <div className="magnify-icon-inner flex items-center justify-center w-12 h-12 rounded-full bg-transparent hover:bg-gray-100 transition-colors">
                            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                            </svg>
                        </div>
                    </a>
                ))}
                <div className="magnify-separator w-px h-8 bg-gray-300 mx-1 self-center"></div>
                {socialIcons.map((item, i) => (
                    <a key={i} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="magnify-dock-icon" data-tooltip={item.tooltip}>
                        <div className="magnify-icon-inner flex items-center justify-center w-12 h-12 rounded-full bg-transparent hover:bg-gray-100 transition-colors">
                            <svg className={item.isFilled ? "w-5 h-5 text-gray-700" : "w-5 h-5 text-gray-700"} fill={item.isFilled ? "currentColor" : "none"} stroke={item.isFilled ? undefined : "currentColor"} strokeWidth={item.isFilled ? undefined : "1.5"} viewBox="0 0 24 24">
                                {item.isFilled ? <path fillRule="evenodd" clipRule="evenodd" d={item.icon} /> : <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />}
                            </svg>
                        </div>
                    </a>
                ))}
            </div>
            <div ref={tooltipRef} id="magnify-dock-tooltip" className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 pointer-events-none transition-all duration-150 whitespace-nowrap shadow-lg" />
        </div>
    );
}
