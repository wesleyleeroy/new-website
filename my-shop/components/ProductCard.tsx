"use client";

interface ProductCardProps {
    image: string;
    title: string;
    price: string;
    description: string;
    badge?: {
        icon: string;
        iconColor: string;
        text: string;
    };
}

export default function ProductCard({ image, title, price, description, badge }: ProductCardProps) {
    return (
        <div className="product-card group relative bg-white rounded-3xl overflow-hidden border border-slate-100 transition-all duration-300 soft-shadow hover:-translate-y-2">
            <div className="aspect-video w-full overflow-hidden bg-slate-100 relative">
                {badge && (
                    <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm shadow-sm text-[#1f487e] text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                        <span className={`material-symbols-outlined text-sm ${badge.iconColor}`}>{badge.icon}</span> {badge.text}
                    </div>
                )}
                <div
                    className="w-full h-full bg-slate-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('${image}')`, backgroundSize: "cover", backgroundPosition: "center" }}
                />
            </div>
            <div className="p-8">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-[#1f487e]">{title}</h3>
                    <span className="bg-[#01baef]/10 text-[#01baef] font-bold px-3 py-1 rounded-lg">{price}</span>
                </div>
                <p className="text-slate-500 mb-6 line-clamp-2 text-sm">{description}</p>
                <button className="w-full h-12 rounded-xl bg-slate-50 hover:bg-[#01baef] hover:text-white text-[#1f487e] text-sm font-bold transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-[#01baef]/20">
                    View Details
                </button>
            </div>
        </div>
    );
}
