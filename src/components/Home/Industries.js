"use client";

import { useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight, FiArrowRight } from "react-icons/fi";

const industries = [
  {
    title: "Warehouse & Logistics",
    description: "Intelligent warehouse systems and automation infrastructure.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Manufacturing",
    description: "Connected production systems and industrial intelligence.",
    image:
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Robotics & AI",
    description: "Advanced robotics platforms for future-ready operations.",
    image:
      "https://images.unsplash.com/photo-1535378917042-10a22c95931a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Agriculture Systems",
    description: "Autonomous technologies powering modern agriculture.",
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Embedded Devices",
    description: "Embedded systems driving next-generation automation.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Industrial Infrastructure",
    description: "Integrated software and smart operational systems.",
    image:
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function IndustriesSection() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;

    const cardWidth =
      window.innerWidth < 768
        ? window.innerWidth * 0.72
        : window.innerWidth < 1024
          ? window.innerWidth * 0.46
          : window.innerWidth * 0.31;

    container.scrollBy({
      left: direction === "left" ? -(cardWidth + 20) : cardWidth + 20,
      behavior: "smooth",
    });
  };

  /* AUTO SLIDE */
  useEffect(() => {
    const container = scrollRef.current;

    const interval = setInterval(() => {
      if (!container) return;

      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScrollLeft - 10) {
        container.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        const cardWidth =
          window.innerWidth < 768
            ? window.innerWidth * 0.72
            : window.innerWidth < 1024
              ? window.innerWidth * 0.46
              : window.innerWidth * 0.31;

        container.scrollBy({
          left: cardWidth + 20,
          behavior: "smooth",
        });
      }
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[var(--color-dark-100)] py-5">
      {/* TOP LEFT YELLOW GLOW */}
      <div className="absolute left-[-180px] top-[-180px] h-[420px] w-[420px] bg-[var(--color-secondary-400)]/10 blur-3xl" />

      {/* BOTTOM RIGHT BLUE GLOW */}
      <div className="absolute bottom-[-220px] right-[-180px] h-[420px] w-[420px] bg-[var(--color-primary-400)]/10 blur-3xl" />

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

      <div className="relative z-10 mx-auto max-w-7xl pl-5 md:pl-8 lg:pl-10">
        {/* HEADER */}
        <div className="mb-14 flex flex-col gap-8 pr-5 md:pr-8 lg:flex-row lg:items-end lg:justify-between lg:pr-10">
          <div className="max-w-3xl">
            {/* <p className="mb-5 font-mono text-xs uppercase tracking-[0.35em] text-[var(--color-secondary-400)]">
              Industries We Enable
            </p> */}

            <div className="mb-5 flex items-center gap-3">
              <div className="h-[2px] w-12 bg-[var(--color-secondary-400)]" />

              <span className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-secondary-400)]">
                Industries We Enable
              </span>
            </div>

            <h2 className="font-heading text-2xl font-semibold uppercase leading-[0.95] text-[var(--color-text-primary)] md:text-4xl">
              Intelligent Systems For
              <span className="mt-2 block text-[var(--color-secondary-400)]">
                Modern Industries
              </span>
            </h2>

            <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
              Building scalable robotics, automation, and intelligent
              infrastructure systems across global industries.
            </p>
          </div>

          {/* CONTROLS */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              className="flex h-12 w-12 items-center justify-center border border-white/10 bg-white/[0.03] text-white transition-all duration-300 hover:border-[var(--color-primary-400)] hover:bg-[var(--color-primary-400)]/10"
            >
              <FiChevronLeft size={22} />
            </button>

            <button
              onClick={() => scroll("right")}
              className="flex h-12 w-12 items-center justify-center border border-white/10 bg-white/[0.03] text-white transition-all duration-300 hover:border-[var(--color-secondary-400)] hover:bg-[var(--color-secondary-400)]/10"
            >
              <FiChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* HORIZONTAL SCROLL */}
        <div
          ref={scrollRef}
          className="no-scrollbar flex gap-5 overflow-x-auto scroll-smooth pr-5 md:gap-1 md:pr-8 lg:pr-10"
        >
          {industries.map((industry, index) => (
            <div
              key={index}
              className="
                group
                relative
                h-[500px]
                min-w-[72%]
                overflow-hidden
                border
                border-white/10
                bg-[var(--color-dark-200)]

                md:min-w-[46%]
                lg:min-w-[31%]
              "
            >
              {/* IMAGE */}
              <img
                src={industry.image}
                alt={industry.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />

              {/* HOVER BLUE OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,109,177,0.96)] via-[rgba(0,136,219,0.82)] to-[rgba(5,8,22,0.95)] opacity-0 transition-all duration-500 group-hover:opacity-100" />

              {/* TOP LINE */}
              <div className="absolute left-0 top-0 h-[3px] w-0 bg-[var(--color-secondary-400)] transition-all duration-500 group-hover:w-full" />

              {/* CONTENT */}
              <div className="relative z-10 flex h-full flex-col justify-end p-7 md:p-8">
                <div className="translate-y-8 transition-all duration-500 group-hover:translate-y-0">
                  <h3 className="font-heading text-2xl font-semibold leading-tight text-white md:text-3xl">
                    {industry.title}
                  </h3>

                  <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-white/80 opacity-0 transition-all duration-500 group-hover:opacity-100">
                    {industry.description}
                  </p>

                  <div className="mt-7 flex items-center gap-3 text-[var(--color-secondary-400)] opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <span className="font-mono text-xs uppercase tracking-[0.25em]">
                      Explore
                    </span>

                    <FiArrowRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
