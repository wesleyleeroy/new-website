"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Liquid, Colors } from "@/components/LiquidButton";

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

export default function HeroSection() {
    const [isHoveredBrowse, setIsHoveredBrowse] = useState(false);
    const [isHoveredContact, setIsHoveredContact] = useState(false);

    return (
        <header className="relative w-full pt-20 lg:pt-32 pb-2" id="hero">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#cec0b3]/20 rounded-full blur-3xl pointer-events-none opacity-70"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#71b4c3]/20 rounded-full blur-3xl pointer-events-none opacity-70"></div>
            <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8 flex flex-col items-center">
                <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-slate-900 sm:text-7xl mb-6 leading-tight">
                    <div className="text-reveal-wrap">
                        <span className="text-reveal text-gradient bg-gradient-to-r from-[#01baef] via-[#107e92] to-[#1f487e]">Wesley Leeroy</span>
                    </div>
                    <br />
                    <div className="text-reveal-wrap">
                        <span className="text-reveal text-3xl sm:text-5xl text-gradient bg-gradient-to-r from-[#01baef] via-[#107e92] to-[#1f487e]">UPenn 2029</span>
                    </div>
                </h1>
                <p className="hero-description mx-auto max-w-2xl text-lg text-slate-500 mb-2 leading-relaxed">
                    A Penn Engineering AI student focused on applying artificial intelligence to real world business problems.
                </p>
            </div>
        </header>
    );
}

