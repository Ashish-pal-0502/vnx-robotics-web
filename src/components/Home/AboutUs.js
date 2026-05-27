"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-dark-100)] py-5">
      {/* BACKGROUND GLOW - Industrial & Calm */}
      <div className="absolute left-[-120px] top-[-80px] h-96 w-96 rounded-full bg-[#006db1]/5 blur-3xl" />
      <div className="absolute bottom-[-100px] right-[-80px] h-96 w-96 rounded-full bg-[#ffba22]/5 blur-3xl" />

      {/* SUBTLE GRID - Engineering Foundation */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        {/* MAIN GRID: Left Image + Right Content */}
        <div className="grid items-center gap-16 md:grid-cols-2 md:gap-20">
          {/* LEFT IMAGE - Cinematic Industrial Robotics */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            {/* OUTER FRAME - Architectural Maturity */}
            <div className="absolute -left-5 -top-5 h-full w-full border border-[#006db1]/20" />

            {/* IMAGE CONTAINER */}
            <div className="relative overflow-hidden border border-white/8 bg-[var(--color-dark-300)]">
              {/* TOP BAR - Systems Monitor Feel */}
              <div className="absolute left-0 top-0 z-20 flex w-full items-center justify-between border-b border-white/10 bg-black/30 px-5 py-3 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#ffba22]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#006db1]" />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-text-secondary)]">
                  INDUSTRIAL SYSTEMS
                </span>
              </div>

              <Image
                src="/images/contactus.png"
                alt="VNX Robotics industrial automation and robotics systems"
                width={700}
                height={600}
                className="h-[520px] w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
              />

              {/* SUBTLE OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-100)]/50 to-transparent" />
            </div>
          </motion.div>

          {/* RIGHT CONTENT - Engineering Philosophy & Layered Capability */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* LABEL */}
            <div className="mb-6 flex items-center gap-3">
              <div className="h-[2px] w-12 bg-[var(--color-secondary-400)]" />
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-secondary-400)]">
                Engineering Philosophy
              </span>
            </div>

            {/* HEADING - Aligned with Strategic Positioning */}
            <h2 className="font-heading text-2xl font-semibold uppercase leading-tight text-[var(--color-text-primary)] md:text-4xl">
              Building Intelligent{" "}
              <span className="text-[var(--color-secondary-400)]">
                Automation & Robotics
              </span>{" "}
              Systems
            </h2>

            {/* DESCRIPTION - Strategic Narrative from Docs */}
            <div className="mt-8 space-y-5">
              <p className="font-mono text-sm  text-[var(--color-text-secondary)]">
                VNX Robotics is developing intelligent industrial automation and
                robotics technologies focused on scalable systems, operational
                intelligence, and future autonomous infrastructure.
              </p>
              <p className="font-mono text-sm  text-[var(--color-text-secondary)]">
                Our approach combines industrial automation, robotics
                engineering, embedded systems, and operational software to build
                connected intelligent systems for modern industry.
              </p>
            </div>

            {/* LAYERED CAPABILITY PILLARS - From Tech Architecture Section */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                "Industrial Automation",
                "Warehouse Intelligence",
                "Robotics Systems",
                "Embedded & AI",
              ].map((capability, idx) => (
                <div
                  key={capability}
                  className="flex items-center gap-3 border-l-2 border-[#006db1]/40 bg-white/[0.02] px-4 py-3"
                >
                  <span className="text-sm font-medium uppercase tracking-wide text-[var(--color-text-primary)]">
                    {capability}
                  </span>
                </div>
              ))}
            </div>

            {/* PHILOSOPHY STATEMENT - Leadership & Engineering Maturity */}
            <div className="mt-10 rounded-md border border-white/5 bg-white/[0.02] p-5">
              <p className="font-body text-sm italic leading-relaxed text-[var(--color-text-secondary)]">
                &ldquo;VNX Robotics believes successful automation systems are
                built through scalable architecture, operational reliability,
                and disciplined engineering execution.&rdquo;
              </p>
            </div>

            {/* CTA BUTTON */}

            <div className="mt-5 flex flex-wrap items-center gap-5">
              <Link href="/aboutus" className="btn-primary">
                <span>Explore our vision →</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
