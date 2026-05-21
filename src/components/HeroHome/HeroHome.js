"use client";

import Link from "next/link";

export default function HeroHome() {
  return (
    <main className="text-white">
  
      <section className="relative h-screen w-full flex items-center"> 
<video
  autoPlay
  muted
  loop
  playsInline
  preload="metadata"
  className="absolute inset-0 w-full h-full object-cover"
>
  <source src="/mp4/HeroV1.mp4" type="video/mp4" />
</video>

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            {/* TRUST BADGE */}
            <div className="flex items-center gap-3 mb-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-[#083427] rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-[#083427] rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-[#083427] rounded-full border-2 border-white"></div>
              </div>
              <p className="text-sm text-gray-300">1K+ Trusted Customers</p>
            </div>

            {/* HEADING */}
            <h1 className="text-xl md:text-5xl font-bold leading-tight mb-2">
              Control Redefined <br />
              Innovation Unleashed
            </h1>

            {/* DESCRIPTION */}
            <p className="text-gray-300 mb-3">
              We focus on building intelligent robots for real-world logistics
              and industrial inspection, starting with Warehouse AMRs and
              Quadruped Inspection Robots.
            </p>

            {/* BUTTON */}
            <Link
              href="/contact"
              className="inline-block px-6 py-3 border border-white rounded-full hover:bg-white hover:text-black transition"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* SCROLL INDICATOR */}
        <div className="absolute right-10 bottom-20 hidden md:flex flex-col items-center">
          <div className="w-16 h-16 rounded-full border border-white/40 flex items-center justify-center animate-bounce">
            ↓
          </div>
          <p className="text-xs tracking-widest mt-3 rotate-90 text-gray-300">
            SCROLL DOWN
          </p>
        </div>
      </section>
    </main>
  );
}

