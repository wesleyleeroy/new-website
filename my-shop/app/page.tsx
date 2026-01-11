"use client";

import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesParticleCanvas from "@/components/FeaturesParticleCanvas";
import LiquidCard from "@/components/LiquidCard";
import ProductCard from "@/components/ProductCard";
import ContactSection from "@/components/ContactSection";
import LiquidButton from "@/components/LiquidButton";
import Marquee from "@/components/Marquee";
import DockDemo from "@/components/DockDemo";
import Footer from "@/components/Footer";
import RenaissanceReveal from "@/components/RenaissanceReveal";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';



const products = [
  { image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLK7m-BCFzm1eDND9jqA0SNNPEwgvAB9awC6dpyW5tOZGsIua1i55o7RlYSuK3me1_NSOlHRrl85K6q75hmI5JOudX-Qu8YU0tZhvmjLQsd_q2cvZmE0WqtyManZSFINl8aabEsUY_wNDmuyZPcI8lBpSP4f1PlpVxA9aeAVAZCOKMu7olorwoPHyvCNJtwMlaXQKsh7L_Lm3OGwC-Tzw5THxgCdu_m6ixmVzylafX7H3PyEIyugFhA-BDczSN47IUm6ScJRZj1oc", title: "Retro Console X", price: "$150", description: "Vintage gaming system with original controllers and 5 game cartridges. Fully restored circuitry.", badge: { icon: "star", iconColor: "text-[#01baef]", text: "MINT" } },
  { image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7RCGtuC2rbhINKtkvdLDwyd8wSLTaUywNhwnPZUCfJ4suirezca1zas2V_mTnmFTd8A1gV7kk0oSkSJQxfkMzsMtChbygzrz4brmJ6FG1R0_h0ozB5r-bF0ADSepNf8LKxN9Ap6Fsc52Mn_bn5iiuMh_imJ1gdRm-NWrvPB2S_yZe-SS7M2jovnfA28ET1Zyy6E1ktDMyHLFRfvcoGeO3UI6kLQpRljb0BR8S8cCanX34y04TwRzJU_vBfq2zX1yQSr3ogSe9pV0", title: "Pro Audio Suite", price: "$90", description: "Lifetime license for top-tier audio production software. Includes all future plugin updates.", badge: { icon: "key", iconColor: "text-[#107e92]", text: "DIGITAL" } },
  { image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjWAm9bA7FzMoZjoOg963WGdEFSHnmXabzSeTxd1Zy9rQfLNuNdxA02tcvi6mZYcuyt0sub2Ke99LECFBiWOzsCp3G_QFd-Ok5CnhQ79DwlmuIiJzlOlawEQo1GNitVgq1kC35h8g21uRkMqo5UYTDSUuasgnHyXZRmxixLZGMcQppj4pueV4BjIZtD1cAU_DOtTf_aMgpM3dvpuk9Vq-1pFw1cZ-LrgBNHziVJLmTNwwTQQ0M9LY7vpyHVrsiZLZQyH0MJPBARfQ", title: "Limited Sneakers", price: "$220", description: "Size 10 US. Never worn. Original box and verification tags included. Collector's item." },
  { image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgs57_6f4iDEN-W9JRxfuXEMCObnHiD_YOl4x5h6Y3y-ohyyjIanmGuPZdi5R1TJGzOjCS-C7SiRDdUr1CZvQLE6Uu2aA7nfR4ZDOIhi6PmTNqW-8c3R9GDFJt2UKdAfuZAmifsIfZaVuLE_TSR1D3dtjmCVrldi8b0eJSLy-MmWShzpmgS1Gh-kECDMeMguhkqiKLsX4I9DHeJUGgADLCYeufnCEfORVdYKJUobRkug4AqLOM9_3uuvuUvkZ_uDnnzaYoAUCgnxc", title: "Mobile Device Y", price: "$450", description: "Unlocked 128GB model. Space Grey. Includes fast charger and protective case." },
  { image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAu8HGFar7V_MeygHy-YaRLPeRpOvyciQ_5Dew0R4ZYNi--8WYBV8gXmd8aYvMTw3NTPTT7H3UwtNsoc7OOPST2L5220PgcE9lpGsS884FuNNNMXj5UOqcpoxZWgqcJZwzAR2prMRDToz9_5iZw8lM1BV9ApBcP6GA7N1C_DmMOhGIwNQ6fpDTSBr-adRiqk7n4_VpLjGQWvGrcW5QgzGVA1OV0v7uxzDjA91MLnSqSt-kzd9-3qiK55bZt9vylZuTd8nMH7anIs_Y", title: "Mech Keyboard", price: "$120", description: "Custom built 60% layout. Cherry MX Red switches. PBT keycaps. RGB backlight.", badge: { icon: "diamond", iconColor: "text-orange-400", text: "RARE" } },
  { image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAc0nTPRj8EQRl7m9xJb-wHo_zysVerrumA6Gtc58EweEZ6WuUKPsQqhNprnaeKUjpVNXcBMntGtD2rW0GXZ-b7mbly4wHYvCRhCfiNX17alwN4O7Wt26lKKbtqgxXT7VBt3nILM6mOA9S5dqZiVWqzIVaqTXmW6K87osxXTMmIDErdi_hDpIkDE-CbGdC4GMpiooCxnlv42qmwULMhlXUDM2zXABpxi5fwSnBAXP11cU_g6Q7sp8QWXBXMvMz9cAQtT4al7B7-xXs", title: "UltraWide Monitor", price: "$340", description: "34-inch curved display. 144Hz refresh rate. Perfect for gaming or productivity." },
];

const liquidCards = [
  { title: "Project Cygnus", description: "An interstellar journey through generative art and sound, creating a unique experience for every user." },
  { title: "Project Aurora", description: "Exploring the boundaries of computational creativity through neural networks and algorithmic design." },
  { title: "Project Nebula", description: "A deep dive into emergent systems and self-organizing patterns in natural phenomena." },
];

export default function Home() {
  useGSAPAnimations();

  return (
    <>
      {/* Background Video */}
      <video className="fixed-bg-video" autoPlay loop muted playsInline preload="auto">
        <source src={`${basePath}/videos/background final final.mp4`} type="video/mp4" />
      </video>

      {/* Frosted Glass Overlay */}
      <div className="fixed -inset-4 z-[-1] bg-white/70"></div>

      {/* SVG Filter for Liquid Cards */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="liquid-distort">
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.03" numOctaves={3} seed={2} result="turbulence">
              <animate attributeName="seed" from="2" to="100" dur="10s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="turbulence" scale={30} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <Navigation />
      <HeroSection />

      {/* Features Section */}
      <section className="relative pt-8 pb-32 overflow-hidden" id="features">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-2">
            <h2 className="text-4xl font-bold text-[#1f487e] mb-4 feature-title">Why Shop With Me?</h2>
            <p className="text-lg text-slate-500 feature-subtitle">A trusted marketplace experience with personal attention</p>
          </div>

          <FeaturesParticleCanvas />

          {/* Liquid Cards */}
          <section className="-mt-8 flex justify-between items-start gap-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {liquidCards.map((card, i) => (
              <LiquidCard
                key={i}
                title={card.title}
                description={card.description}
                enableScrollOpacity={i === 2}
                previewImage={i === 2 ? `${basePath}/images/paper1.jpg` : undefined}
              />
            ))}
          </section>


        </div>
      </section>

      {/* Inventory Section */}
      <section className="pt-28 pb-12 relative" id="inventory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="mt-8 mb-8 flex justify-end">
            <div className="w-full max-w-2xl overflow-hidden shadow-lg">
              <div className="upenn-image-wrapper overflow-hidden relative" style={{ height: "550px" }}>
                <img id="upenn-image" src={`${basePath}/images/upenn.jpg`} alt="UPenn" className="absolute left-0 w-full object-cover" style={{ height: "160%", top: "-20%", willChange: "transform" }} />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-[#1f487e] tracking-tight flex items-center gap-3 inventory-title">
                <span className="bg-[#71b4c3]/20 text-[#107e92] p-2 rounded-xl material-symbols-outlined">inventory_2</span>
                Available Items
              </h2>
              <p className="text-slate-500 mt-2 font-medium inventory-subtitle">Freshly stocked and ready for a new home.</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#1f487e] bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm inventory-badge">
              <span className="material-symbols-outlined text-[#01baef] text-lg">verified</span>
              Verified Seller
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 products-grid">
            {products.map((product, i) => (
              <ProductCard key={i} {...product} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <button className="text-slate-400 hover:text-[#01baef] font-bold transition-colors text-sm flex items-center justify-center gap-1 mx-auto">
              View Archive
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      <ContactSection />
      <LiquidButton />
      <Marquee />
      <DockDemo />
      <RenaissanceReveal />
      <Footer />
    </>
  );
}
