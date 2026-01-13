"use client";

import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesParticleCanvas from "@/components/FeaturesParticleCanvas";
import LiquidCard from "@/components/LiquidCard";
import ContactSection from "@/components/ContactSection";
import Marquee from "@/components/Marquee";
import DockDemo from "@/components/DockDemo";
import CurvedImageScroll from "@/components/CurvedImageScroll";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';


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
      <section className="relative pt-2 pb-32 overflow-hidden" id="features">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-2">
            <h2 className="text-4xl font-bold text-[#1f487e] mb-4 feature-title">Why Shop With Me?</h2>
            <p className="text-lg text-slate-500 feature-subtitle">A trusted marketplace experience with personal attention</p>
          </div>

          <FeaturesParticleCanvas />
        </div>

        {/* Liquid Cards - Full Width */}
        <section className="-mt-8 flex justify-between items-start gap-6 px-4 w-full">
          {liquidCards.map((card, i) => (
            <LiquidCard
              key={i}
              title={card.title}
              description={card.description}
              enableScrollOpacity={i === 0 || i === 2}
              previewImage={i === 0 ? `${basePath}/images/paper3.png` : i === 1 ? `${basePath}/images/paper2.jpg` : i === 2 ? `${basePath}/images/paper1.jpg` : undefined}
              previewFit={i === 1 ? 'contain' : 'cover'}
              previewOffsetY={i === 0 ? '20%' : '0%'}
              position={i === 0 ? 'left' : i === 2 ? 'right' : 'center'}
              link={i === 0 ? 'https://publications.aaahq.org/jeta/article-abstract/21/1/89/11896/Impact-of-Blockchain-on-Improving-Taxpayers?redirectedFrom=fulltext' : i === 1 ? 'https://www.eba-net.org/wp-content/uploads/2024/05/7-Lee-Leeroy25-66.pdf' : i === 2 ? 'https://www.mdpi.com/1911-8074/18/10/542' : undefined}
            />
          ))}
        </section>
      </section>

      <CurvedImageScroll />

      {/* UPenn Image Section */}
      <section className="pt-28 pb-12 relative" id="about">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mt-8 mb-8 flex justify-end">
            <div className="w-full max-w-2xl overflow-hidden shadow-lg">
              <div className="upenn-image-wrapper overflow-hidden relative" style={{ height: "550px" }}>
                <img id="upenn-image" src={`${basePath}/images/upenn.jpg`} alt="UPenn" className="absolute left-0 w-full object-cover" style={{ height: "160%", top: "-20%", willChange: "transform" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
      <Marquee />
      <div id="dock">
        <DockDemo />
      </div>
    </>
  );
}
