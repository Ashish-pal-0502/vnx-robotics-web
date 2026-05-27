"use client";

import Link from "next/link";
import Image from "next/image";

import { useEffect, useState } from "react";

export default function HeroHome() {
  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {
    const updateVideoSource = () => {
      const isMobile = window.innerWidth < 768; // Mobile: < 768px
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024; // Tablet: 768px - 1024px

      if (isMobile) {
        setVideoSrc("/mp4/phone.mp4"); // Your mobile video
      } else if (isTablet) {
        setVideoSrc("/mp4/HeroHome1.mp4"); // Your tablet video (optional)
      } else {
        setVideoSrc("/mp4/HeroHome1.mp4"); // Your desktop video
      }
    };

    // Set initial video source
    updateVideoSource();

    // Add resize listener
    window.addEventListener("resize", updateVideoSource);

    // Cleanup
    return () => window.removeEventListener("resize", updateVideoSource);
  }, []);

  return (
    <main className="text-white bg-black/70">
      <section className="relative h-screen w-full flex items-center">
        {/* VIDEO BACKGROUND */}
        {videoSrc && (
          <video
            key={videoSrc} // Forces re-render when video source changes
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}

        {/* DARK OVERLAY */}
        <div className=" "></div>

        {/* CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-10 md:pt-20 w-full ">
          <div className="max-w-2xl">
            {/* TRUST BADGE */}
            <div className="flex items-center gap-3 mb-6 md:mb-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-[#083427] rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-[#083427] rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-[#083427] rounded-full border-2 border-white"></div>
              </div>
              <p className="text-sm font-heading text-white">
                1K+ Trusted Customers
              </p>
            </div>

            {/* HEADING */}
            <h1 className="text-3xl font-logo uppercase md:text-4xl font-medium leading-tight mb-6 md:mb-2">
              Control Redefined <br />
              Innovation Unleashed
            </h1>

            {/* DESCRIPTION */}
            <p className="text-gray-300 mb-6 font-mono text-xl  md:text-base">
              We focus on building intelligent robots for real-world logistics
              and industrial inspection, starting with Warehouse AMRs and
              Quadruped Inspection Robots.
            </p>

            {/* BUTTON */}
            {/* <Link
              href="/contact"
              className="inline-block btn-primary "
            >
              Get Started
            </Link> */}
            <Link href="/contact" className="btn-primary">
              Get Started →
            </Link>
          </div>
        </div>

        <div className="absolute right-6 md:right-10 bottom-8 md:bottom-20 hidden md:flex flex-col items-center">
          <div className="  flex items-center justify-center animate-bounce cursor-pointer">
            <Image
              src="/icons/scrolldown.png"
              alt="Scroll down"
              width={100}
              height={100}
              className="w-12 h-12 md:w-32 md:h-32"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
