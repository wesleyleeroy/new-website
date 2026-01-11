"use client";

interface FeatureCardProps {
    icon: string;
    iconGradient: string;
    title: string;
    description: string;
    index: number;
}

export default function FeatureCard({ icon, iconGradient, title, description }: FeatureCardProps) {
    return (
        <div className="feature-card bg-white rounded-3xl p-10 border border-slate-200 soft-shadow sticky top-20">
            <div className={`feature-icon inline-flex h-16 w-16 items-center justify-center rounded-2xl ${iconGradient} text-white mb-6`}>
                <span className="material-symbols-outlined text-3xl">{icon}</span>
            </div>
            <h3 className="text-2xl font-bold text-[#1f487e] mb-3">
                <div className="text-reveal-wrap">
                    <span className="text-reveal feature-heading">{title}</span>
                </div>
            </h3>
            <p className="feature-text text-slate-500 text-lg leading-relaxed">{description}</p>
        </div>
    );
}
