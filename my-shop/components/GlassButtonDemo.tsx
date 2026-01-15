"use client";

import { GlassButton } from "@/components/ui/glass-button";
import { Zap } from "lucide-react";

/**
 * Background with dotted pattern
 */
const DottedBackground = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        height="100%"
        width="100%"
        className="pointer-events-none absolute inset-0 z-0"
    >
        <defs>
            <pattern
                patternUnits="userSpaceOnUse"
                height="30"
                width="30"
                id="dottedGrid"
            >
                <circle
                    fill="oklch(from var(--foreground) l c h / 30%)"
                    r="1"
                    cy="2"
                    cx="2"
                ></circle>
            </pattern>
        </defs>
        <rect fill="url(#dottedGrid)" height="100%" width="100%"></rect>
    </svg>
);

const GlassButtonDemo = () => {
    return (
        <section className="relative flex w-full flex-col items-center justify-center gap-8 bg-background py-20 overflow-hidden">
            <DottedBackground />
            <div className="z-10 text-center">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-[#1f487e] mb-2">Premium Glass Buttons</h2>
                    <p className="text-slate-500">Elegant, modern UI components with glassmorphism effects</p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-6">
                    <GlassButton
                        size="sm"
                    >
                        Small
                    </GlassButton>
                    <GlassButton
                        size="default"
                        contentClassName="flex items-center gap-2"
                    >
                        <span>Generate</span>
                        <Zap className="h-5 w-5" />
                    </GlassButton>
                    <GlassButton
                        size="lg"
                    >
                        Submit
                    </GlassButton>
                    <GlassButton
                        size="icon"
                    >
                        <Zap className="h-5 w-5" />
                    </GlassButton>
                </div>
            </div>
        </section>
    );
};

export default GlassButtonDemo;
