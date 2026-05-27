

"use client";

import { motion } from "framer-motion";

const logos = [
  "https://img.freepik.com/free-vector/colorful-letter-gradient-logo-design_474888-2309.jpg?semt=ais_hybrid&w=740&q=80",
  "https://images-platform.99static.com//M_JP7kgnSN9bGBbY6C4b5uKOUmw=/115x78:615x578/fit-in/500x500/99designs-contests-attachments/86/86740/attachment_86740648",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG7uUjJ1OVysvtKhIz3kScBz9EtR1slcxrdQ&s",
  "https://cdn.dribbble.com/userupload/33433742/file/original-221b856958a5221ea81722dd5a90cd0d.jpg?format=webp&resize=400x300&vertical=center",
  "https://dynamic.brandcrowd.com/asset/logo/aab13f0f-cf94-4331-b2b6-56fec5511224/logo-search-grid-1x?logoTemplateVersion=1&v=639059534289730000&layout=auto-1-1",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbdvFjdb4QKh4h_RKHQLhQCvR_9IAp1PWWaA&s",
];

export default function TrustedBy() {
  const duplicated = [...logos, ...logos];

  return (
    <section className="relative overflow-hidden bg-[var(--color-dark-100)] py-5">

      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* BLUE GLOW */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-[#006db1]/20 blur-3xl" />

      {/* YELLOW GLOW */}
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#ffba22]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* TOP LABEL */}
        <div className="mb-5 flex items-center gap-3">
          <div className="h-[2px] w-12 bg-[var(--color-secondary-400)]" />

          <span className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-secondary-400)]">
            Industry Recognition
          </span>
        </div>

        {/* HEADING */}
        <div className="mb-14 max-w-2xl">
          <h2 className="font-heading text-2xl font-semibold uppercase leading-tight text-[var(--color-text-primary)] md:text-4xl">
            Trusted by{" "}
            <span className="text-[var(--color-secondary-400)]">
              Robotics
            </span>{" "}
            & Industrial Leaders
          </h2>

          <p className="mt-5 max-w-2xl font-mono text-sm leading-8 text-[var(--color-text-secondary)]">
            Building intelligent automation systems engineered for
            next-generation logistics, AI robotics, and industrial innovation.
          </p>
        </div>

        {/* LOGO STRIP */}
        <div className="relative overflow-hidden rounded-[32px] border border-white/8 bg-white/[0.02] backdrop-blur-xl">

          {/* FADE LEFT */}
          <div className="absolute left-0 top-0 z-10 h-full w-28 bg-gradient-to-r from-[var(--color-dark-100)] to-transparent" />

          {/* FADE RIGHT */}
          <div className="absolute right-0 top-0 z-10 h-full w-28 bg-gradient-to-l from-[var(--color-dark-100)] to-transparent" />

          <motion.div
            className="flex w-max items-center gap-10 py-5 md:py-10"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 24,
              ease: "linear",
            }}  
          >
            {duplicated.map((logo, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -4,
                  scale: 1.03,
                }}
                transition={{
                  duration: 0.18,
                }}
                className="
                  group
                  flex
                  min-w-[180px]
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-white/6
                  bg-white/[0.015]
                  px-8
                  py-6
                  transition-all
                  duration-200
                  hover:border-[#006db1]/30
                  hover:bg-[#006db1]/[0.04]
                "
              >
                <img
                  src={logo}
                  alt="company logo"
                  className="
                    h-12
                    object-contain
                    grayscale
                    opacity-60
                    transition-all
                    duration-300
                    group-hover:grayscale-0
                    group-hover:opacity-100
                  "
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}