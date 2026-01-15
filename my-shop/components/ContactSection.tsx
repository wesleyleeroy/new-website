"use client";

import { useRef } from "react";
import { LiquidEffectAnimation } from "@/components/ui/liquid-effect-animation";

export default function ContactSection() {
    const emailBtnRef = useRef<HTMLDivElement>(null);

    const handleCopy = () => {
        const email = "wesleyleeroy06@gmail.com";
        const copyBtn = emailBtnRef.current?.querySelector("div:last-child");
        if (!copyBtn) return;
        const originalText = copyBtn.textContent;

        navigator.clipboard.writeText(email).then(() => {
            copyBtn.textContent = "COPIED!";
            copyBtn.classList.add("text-[#01baef]");
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.classList.remove("text-[#01baef]");
            }, 2000);
        }).catch(() => {
            copyBtn.textContent = "FAILED";
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        });
    };

    return (
        <section className="py-20 relative" id="contact">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-[3rem] bg-white border border-slate-100 p-8 md:p-12 text-center soft-shadow contact-card">
                    <LiquidEffectAnimation />
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#01baef]/5 to-transparent pointer-events-none"></div>
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#01baef]/10 text-[#01baef] contact-content">
                            <span className="material-symbols-outlined text-3xl">mail</span>
                        </div>
                        <h2 className="text-3xl font-bold text-[#1f487e] mb-10 contact-content">Reach me here!</h2>
                        <div className="w-full max-w-lg mb-10 contact-content">
                            <div
                                ref={emailBtnRef}
                                onClick={handleCopy}
                                className="group relative flex flex-col md:flex-row items-center justify-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-[#01baef]/30 hover:shadow-md transition-all cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-slate-400 group-hover:text-[#01baef]">email</span>
                                <span className="text-lg md:text-xl font-bold text-[#1f487e] break-all">wesleyleeroy06@gmail.com</span>
                                <div className="md:ml-auto bg-white px-3 py-1 rounded-lg text-xs font-bold text-slate-400 shadow-sm group-hover:text-[#01baef]">COPY</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
