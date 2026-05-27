"use client";

import React, { useEffect, useRef, useState } from "react";

import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
});

const points = [
  {
    lat: 28.6139,
    lng: 77.209,
    label: "India",
  },
  {
    lat: 40.7128,
    lng: -74.006,
    label: "New York",
  },
  {
    lat: 35.6762,
    lng: 139.6503,
    label: "Tokyo",
  },
  {
    lat: 37.7749,
    lng: -122.4194,
    label: "San Francisco",
  },
  {
    lat: 25.2048,
    lng: 55.2708,
    label: "Dubai",
  },
  {
    lat: 48.8566,
    lng: 2.3522,
    label: "Paris",
  },
  {
    lat: 1.3521,
    lng: 103.8198,
    label: "Singapore",
  },
  {
    lat: 19.076,
    lng: 72.8777,
    label: "Mumbai",
  },
  {
    lat: 31.2304,
    lng: 121.4737,
    label: "Shanghai",
  },
  {
    lat: 30.0444,
    lng: 31.2357,
    label: "Cairo",
  },
  {
    lat: 55.7558,
    lng: 37.6173,
    label: "Moscow",
  },
  {
    lat: 34.0522,
    lng: -118.2437,
    label: "Los Angeles",
  },
  {
    lat: 19.4326,
    lng: -99.1332,
    label: "Mexico City",
  },
  {
    lat: -1.2864,
    lng: 36.8172,
    label: "Nairobi",
  },
  {
    lat: 6.5244,
    lng: 3.3792,
    label: "Lagos",
  },
  {
    lat: 39.9042,
    lng: 116.4074,
    label: "Beijing",
  },
];

function OurWorldWideReach() {
  const globeRef = useRef();
  const headingRef = useRef();
  const globeWrapperRef = useRef();
  const glowRef = useRef();
  const sectionRef = useRef(null);
  const [globeReady, setGlobeReady] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  const [dimensions, setDimensions] = useState({
    width: 900,
    height: 700,
  });

  const titles = [
    "Global Robotics Network.",
    "Intelligence, Personified.",
    "Automation, Reimagined.",
    "Future Systems, Engineered.",
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Title rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % titles.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  /* RESPONSIVE */
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;

      setDimensions({
        width: mobile ? window.innerWidth - 32 : 600,
        height: mobile ? 400 : 500,
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* GLOBE CONTROLS - ORIGINAL LOGIC */
  useEffect(() => {
    if (!globeReady || !globeRef.current) return;

    const timer = setTimeout(() => {
      if (!globeRef.current) return;

      const controls = globeRef.current.controls();

      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.18;
        controls.enableZoom = false;
        controls.enablePan = false;
      }

      globeRef.current.pointOfView(
        {
          lat: 18,
          lng: 15,
          altitude: 1.9,
        },
        0,
      );
    }, 100);

    return () => clearTimeout(timer);
  }, [globeReady]);

  /* ENTRY ANIMATION */
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      headingRef.current,
      {
        opacity: 0,
        y: -60,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
      },
    ).fromTo(
      globeWrapperRef.current,
      {
        opacity: 0,
        scale: 0.75,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
      },
      "-=0.5",
    );
  }, []);

  /* SCROLL TRIGGER: GLOBE POP UP (small to large) */
  useEffect(() => {
    if (!globeWrapperRef.current) return;

    // Set initial scale to small (0.4) and opacity to 0.5
    gsap.set(globeWrapperRef.current, {
      scale: 0.4,
      opacity: 0.5,
    });

    // Create scroll-triggered animation
    const scrollAnimation = gsap.to(globeWrapperRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: "back.out(0.6)",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 30%",
        scrub: 0.8,
      },
    });

    return () => {
      scrollAnimation.kill();
    };
  }, []);

  /* CURSOR GLOW EFFECT */
  const handleMouseMove = (e) => {
    if (!glowRef.current || !globeWrapperRef.current) return;

    const rect = globeWrapperRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(glowRef.current, {
      x: x - 150,
      y: y - 150,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  /* FIX 2: STATS COUNTER WITH INTERSECTION OBSERVER */
  const [statCounts, setStatCounts] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    const statsElement = document.getElementById("stats-container");
    if (statsElement) {
      statsObserver.observe(statsElement);
    }

    return () => {
      if (statsElement) {
        statsObserver.unobserve(statsElement);
      }
    };
  }, []);

  useEffect(() => {
    if (!statsVisible) {
      setStatCounts([0, 0, 0, 0]);
      return;
    }

    const targets = [127, 13, 6, 1250];
    const intervals = targets.map((target, index) => {
      const duration = 2000;
      const increment = target / (duration / 30);

      return setInterval(() => {
        setStatCounts((prev) => {
          const newCounts = [...prev];
          if (newCounts[index] < target) {
            newCounts[index] = Math.min(target, newCounts[index] + increment);
          }
          return newCounts;
        });
      }, 10);
    });

    return () => intervals.forEach((i) => clearInterval(i));
  }, [statsVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center overflow-hidden bg-black px-6 py-8 md:py-12"
    >
      {/* =============================
          STABLE BACKGROUND BLUE GRADIENT
          Fixed position, stays behind all content
      ============================== */}

      <div
        className="pointer-events-none fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-2xl h-[30vh] max-h-[400px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(0,136,219,0.7) 0%, rgba(0,109,177,0.4) 50%, transparent 100%)",
        }}
      />

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      {/* HEADING - Flows above gradient */}

      <div ref={headingRef} className="relative z-20 max-w-6xl text-center">
        <div className="mb-8 md:mb-14 flex flex-col items-center max-w-4xl">
          <div className="relative inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-5">
            {/* CORNER BORDERS */}
            <span className="absolute left-0 top-0 h-3 w-3 md:h-4 md:w-4 rounded-tl-lg border-l border-t border-white/50" />
            <span className="absolute right-0 top-0 h-3 w-3 md:h-4 md:w-4 rounded-tr-lg border-r border-t border-white/50" />
            <span className="absolute bottom-0 left-0 h-3 w-3 md:h-4 md:w-4 rounded-bl-lg border-b border-l border-white/50" />
            <span className="absolute bottom-0 right-0 h-3 w-3 md:h-4 md:w-4 rounded-br-lg border-b border-r border-white/50" />

            <h2
              key={activeIndex}
              className="font-logo text-center text-xl font-semibold leading-tight tracking-[-0.03em] text-white md:text-3xl lg:text-4xl"
            >
              {titles[activeIndex].split("").map((char, index) => (
                <span
                  key={index}
                  className="inline-block animate-[fadeInUp_0.05s_ease_forwards]"
                  style={{
                    animationDelay: `${index * 0.05}s`,
                    opacity: 0,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h2>
          </div>
        </div>
      </div>

      {/* GLOBE - Flows below heading */}
      <div
        ref={globeWrapperRef}
        onMouseMove={handleMouseMove}
        className="relative z-10 -mt-10 md:-mt-20 flex items-center justify-center will-change-transform"
      >
        {/* Subtle outer glow */}
        <div className="absolute h-[350px] w-[350px] md:h-[450px] md:w-[450px] bg-[#0088db]/10 blur-[100px] md:blur-[140px]" />

        <div className="relative overflow-hidden cursor-grab active:cursor-grabbing transform-gpu">
          <Globe
            ref={globeRef}
            width={dimensions.width}
            height={dimensions.height}
            backgroundColor="rgba(0,0,0,0)"
            /* EARTH */
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            /* ATMOSPHERE */
            showAtmosphere={true}
            atmosphereColor="#0088db"
            atmosphereAltitude={0.15}
            /* POINTS */
            pointsData={points}
            pointAltitude={0.01}
            pointRadius={0.8}
            pointColor={() => "#ffba22"}
            /* LABELS */
            labelsData={points}
            labelLat="lat"
            labelLng="lng"
            labelText="label"
            labelSize={2.5}
            labelDotRadius={0.4}
            labelColor={() => "#ffc93d"}
            labelResolution={3}
            labelAltitude={0.015}
            /* INTERACTION */
            enablePointerInteraction={true}
            /* READY CALLBACK */
            onGlobeReady={() => setGlobeReady(true)}
          />
        </div>
      </div>

      {/* BOTTOM TEXT - Flows below globe */}
      <div className="relative z-20 max-w-2xl text-center mt-4 md:mt-8">
        <p className="font-mono text-xs text-[#a1a1aa] md:text-sm">
          Real-time connected robotics intelligence operating across worldwide
          industrial infrastructure networks.
        </p>
      </div>

      {/* BOTTOM FADE */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-[#050816] to-transparent pointer-events-none" />

      {/* Cursor glow element */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed z-50 h-[150px] w-[150px] md:h-[200px] md:w-[200px] rounded-full bg-[#0088db]/5 blur-2xl"
        style={{ top: 0, left: 0 }}
      />

      {/* FOUR CORNER STATS - Relative to section */}
      {/* FOUR CORNER STATS */}
      <div
        id="stats-container"
        className="relative lg:absolute lg:inset-0 z-20 w-full max-w-7xl mx-auto mt-8 md:mt-12 lg:mt-0 px-4 pointer-events-none"
      >
        {/* TOP STATS */}
        <div className="flex justify-between items-start lg:absolute lg:top-[24%] lg:left-16 lg:right-16">
          {/* Top Left */}
          <div className="border-b border-white/10 pb-4 text-left">
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
              {Math.round(statCounts[0])}+
            </h3>

            <p className="mt-2 text-xs md:text-sm uppercase tracking-[0.2em] text-white/60">
              Global Partners
            </p>
          </div>

          {/* Top Right */}
          <div className="border-b border-white/10 pb-4 text-right">
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
              24/7
            </h3>

            <p className="mt-2 text-xs md:text-sm uppercase tracking-[0.2em] text-white/60">
              Operations
            </p>
          </div>
        </div>

        {/* BOTTOM STATS */}
        <div className="flex justify-between items-end mt-10 md:mt-14 lg:mt-0 lg:absolute lg:bottom-[20%] lg:left-16 lg:right-16">
          {/* Bottom Left */}
          <div className="border-b border-white/10 pb-4 text-left">
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
              {Math.round(statCounts[1])}+
            </h3>

            <p className="mt-2 text-xs md:text-sm uppercase tracking-[0.2em] text-white/60">
              Countries
            </p>
          </div>

          {/* Bottom Right */}
          <div className="border-b border-white/10 pb-4 text-right">
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
              {Math.round(statCounts[3]) >= 1000
                ? `${(Math.round(statCounts[3]) / 1000).toFixed(0)}K+`
                : `${Math.round(statCounts[3])}+`}
            </h3>

            <p className="mt-2 text-xs md:text-sm uppercase tracking-[0.2em] text-white/60">
              Data Points
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurWorldWideReach;
