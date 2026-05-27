"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import {
  IoArrowForward,
  IoCheckmarkCircle,
  IoChevronForward,
  IoHardwareChipOutline,
  IoCubeOutline,
  IoBuildOutline,
  IoCloudOutline,
  IoGridOutline,
  IoOptionsOutline,
  IoGitNetworkOutline,
  IoCodeSlashOutline,
  IoGlobeOutline,
  IoRocketOutline,
} from "react-icons/io5";

export default function SolutionsPage() {
  const sectionRefs = {
    hero: useRef(null),
    overview: useRef(null),
    warehouse: useRef(null),
    industrial: useRef(null),
    robotics: useRef(null),
    software: useRef(null),
    integration: useRef(null),
    philosophy: useRef(null),
  };

  const isInView = {
    hero: useInView(sectionRefs.hero, { once: true, amount: 0.3 }),
    overview: useInView(sectionRefs.overview, { once: true, amount: 0.2 }),
    warehouse: useInView(sectionRefs.warehouse, { once: true, amount: 0.3 }),
    industrial: useInView(sectionRefs.industrial, { once: true, amount: 0.3 }),
    robotics: useInView(sectionRefs.robotics, { once: true, amount: 0.3 }),
    software: useInView(sectionRefs.software, { once: true, amount: 0.3 }),
    integration: useInView(sectionRefs.integration, {
      once: true,
      amount: 0.2,
    }),
    philosophy: useInView(sectionRefs.philosophy, { once: true, amount: 0.2 }),
  };

  const solutionsCards = [
    {
      icon: <IoCubeOutline size={28} />,
      title: "Warehouse Automation",
      description:
        "Intelligent warehouse systems for material flow, orchestration, and operational efficiency.",
      tags: ["Orchestration", "Sorting", "Traceability"],
      link: "/solutions/warehouse-automation",
    },
    {
      icon: <IoBuildOutline size={28} />,
      title: "Industrial Automation",
      description:
        "Controls, monitoring, and intelligent automation systems for industrial operations.",
      tags: ["PLC", "SCADA", "MES"],
      link: "/solutions/industrial-automation",
    },
    {
      icon: <IoHardwareChipOutline size={28} />,
      title: "Robotics Systems",
      description:
        "Advanced robotics platforms for mobility, inspection, and autonomous operations.",
      tags: ["Quadrupeds", "AMRs", "Inspection"],
      link: "/robotics",
    },
    {
      icon: <IoCloudOutline size={28} />,
      title: "Industrial Software",
      description:
        "Operational intelligence platforms, monitoring systems, and connected industrial software.",
      tags: ["Analytics", "Dashboards", "Middleware"],
      link: "/solutions/industrial-software",
    },
    {
      icon: <IoCodeSlashOutline size={28} />,
      title: "Embedded Systems",
      description:
        "Embedded technologies powering intelligent robotics and automation infrastructure.",
      tags: ["Controllers", "Sensors", "RTOS"],
      link: "/solutions/embedded-systems",
    },
    {
      icon: <IoGitNetworkOutline size={28} />,
      title: "System Integration",
      description:
        "Connected industrial architecture integrating automation, software, robotics, and operational systems.",
      tags: ["Integration", "APIs", "Connectivity"],
      link: "/solutions/system-integration",
    },
  ];

  const warehouseCapabilities = [
    "Warehouse orchestration",
    "Sorting systems",
    "Material flow optimization",
    "Traceability systems",
    "Inventory intelligence",
    "Robotics integration",
  ];

  const industrialCapabilities = [
    "PLC systems",
    "SCADA integration",
    "MES connectivity",
    "Process monitoring",
    "Predictive maintenance",
    "Industrial dashboards",
  ];

  const roboticsCapabilities = [
    "Quadruped robotics",
    "Autonomous mobility",
    "Robotics middleware",
    "Human-interaction systems",
    "Intelligent robotics software",
    "Future AMR platforms",
  ];

  const softwareCapabilities = [
    "Operational dashboards",
    "Analytics systems",
    "Robotics middleware",
    "Warehouse intelligence",
    "Automation orchestration",
    "Monitoring platforms",
  ];

  const integrationLayers = [
    "Enterprise Systems",
    "Warehouse Intelligence",
    "Industrial Software",
    "Controls & Automation",
    "Robotics Systems",
    "Embedded Infrastructure",
  ];

  const [hoveredLayer, setHoveredLayer] = useState(null);

  return (
    <main className="bg-[var(--color-dark-100)]">
      {/* ========== HERO SECTION ========== */}
      <section
        ref={sectionRefs.hero}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
          <img
            src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?q=80&w=1200&auto=format&fit=crop"
            alt="Industrial automation background"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute inset-0 opacity-[0.03] z-10">
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

        <div className="relative z-20 max-w-7xl px-6 md:px-12 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView.hero ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="mb-5 mt-10 flex items-center gap-3">
              <div className="h-[2px] w-12 bg-[var(--color-secondary-400)]" />
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-secondary-400)]">
                Intelligent Automation Solutions
              </span>
            </div>

            <h1 className="font-heading max-w-xl md:max-w-full text-4xl md:text-5xl  font-bold uppercase leading-tight text-white mb-5">
              Intelligent Automation Solutions
            </h1>

            <p className="font-mono text-base md:text-lg text-[var(--color-text-secondary)] max-w-2xl">
              Designing scalable industrial automation, warehouse systems,
              robotics platforms, and intelligent operational infrastructure for
              modern industry.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/contact" className="btn-primary">
                Discuss Your Project →
              </Link>
              <Link href="/industries" className="btn-secondary">
                Explore Industries
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== SOLUTIONS OVERVIEW GRID ========== */}
      <section
        ref={sectionRefs.overview}
        className="relative py-10 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-[#006db1]/15 blur-3xl" />
        <div className="absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-[#ffba22]/5 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView.overview ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-semibold uppercase text-white">
              What We Build
            </h2>
            <p className="font-mono text-sm text-[var(--color-text-secondary)] mt-3 max-w-2xl mx-auto">
              Connected industrial automation systems designed for real-world
              operations
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {solutionsCards.map((solution, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView.overview ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-[var(--color-primary-500)]/30 hover:bg-white/[0.04]"
              >
                <div className="mb-4 text-[var(--color-primary-500)] group-hover:text-[var(--color-secondary-400)] transition-colors">
                  {solution.icon}
                </div>
                <h3 className="font-heading text-xl font-semibold text-white mb-2">
                  {solution.title}
                </h3>
                <p className="font-mono text-sm text-[var(--color-text-secondary)] mb-4">
                  {solution.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {solution.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-[var(--color-text-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={solution.link}
                  className="inline-flex items-center gap-2 font-mono text-sm text-[var(--color-primary-500)] group-hover:gap-3 transition-all"
                >
                  Learn more <IoArrowForward size={14} />
                </Link>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-secondary-400)] transition-all duration-300 group-hover:w-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== WAREHOUSE AUTOMATION SOLUTIONS ========== */}
      <section
        ref={sectionRefs.warehouse}
        className="relative py-20 md:py-28 overflow-hidden border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView.warehouse ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="h-[2px] w-8 bg-[var(--color-secondary-400)]" />
                <span className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-secondary-400)]">
                  Warehouse Solutions
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-4">
                Intelligent Warehouse Automation
              </h2>
              <p className="font-mono text-base text-[var(--color-text-secondary)] mb-6">
                VNX Robotics develops intelligent warehouse automation systems
                focused on operational visibility, scalable material handling,
                orchestration, and connected logistics infrastructure.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {warehouseCapabilities.map((cap, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <IoCheckmarkCircle
                      className="text-[var(--color-secondary-400)] flex-shrink-0"
                      size={16}
                    />
                    <span className="font-mono text-sm text-[var(--color-text-secondary)]">
                      {cap}
                    </span>
                  </div>
                ))}
              </div>
              {/* <Link
                href="/solutions/warehouse-automation"
                className="inline-flex items-center gap-2 font-mono text-[var(--color-primary-500)] hover:gap-3 transition-all"
              >
                Explore Warehouse Solutions <IoChevronForward size={14} />
              </Link> */}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView.warehouse ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop"
                alt="Warehouse Automation"
                className="w-full h-auto object-cover rounded-xl border border-white/10"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== INDUSTRIAL AUTOMATION SOLUTIONS ========== */}
      <section
        ref={sectionRefs.industrial}
        className="relative py-20 md:py-28 overflow-hidden border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView.industrial ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <img
                src="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=1200&auto=format&fit=crop"
                alt="Industrial Automation"
                className="w-full h-auto object-cover rounded-xl border border-white/10"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView.industrial ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="h-[2px] w-8 bg-[var(--color-secondary-400)]" />
                <span className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-secondary-400)]">
                  Industrial Solutions
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-4">
                Industrial Automation & Controls
              </h2>
              <p className="font-mono text-base text-[var(--color-text-secondary)] mb-6">
                Industrial automation systems integrating controls, monitoring,
                operational analytics, and intelligent infrastructure for modern
                industrial environments.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {industrialCapabilities.map((cap, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <IoCheckmarkCircle
                      className="text-[var(--color-secondary-400)] flex-shrink-0"
                      size={16}
                    />
                    <span className="font-mono text-sm text-[var(--color-text-secondary)]">
                      {cap}
                    </span>
                  </div>
                ))}
              </div>
              {/* <Link
                href="/solutions/industrial-automation"
                className="inline-flex items-center gap-2 font-mono text-[var(--color-primary-500)] hover:gap-3 transition-all"
              >
                Explore Industrial Solutions <IoChevronForward size={14} />
              </Link> */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== ROBOTICS & AUTONOMOUS SYSTEMS ========== */}
      <section
        ref={sectionRefs.robotics}
        className="relative py-20 md:py-28 overflow-hidden border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView.robotics ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="h-[2px] w-8 bg-[var(--color-secondary-400)]" />
                <span className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-secondary-400)]">
                  Robotics Solutions
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-4">
                Robotics & Autonomous Systems
              </h2>
              <p className="font-mono text-base text-[var(--color-text-secondary)] mb-6">
                Advanced robotics development programs focused on industrial
                mobility, intelligent inspection, autonomous operations, and
                future robotics infrastructure.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {roboticsCapabilities.map((cap, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <IoCheckmarkCircle
                      className="text-[var(--color-secondary-400)] flex-shrink-0"
                      size={16}
                    />
                    <span className="font-mono text-sm text-[var(--color-text-secondary)]">
                      {cap}
                    </span>
                  </div>
                ))}
              </div>
              {/* <Link
                href="/robotics"
                className="inline-flex items-center gap-2 font-mono text-[var(--color-primary-500)] hover:gap-3 transition-all"
              >
                Explore Robotics Programs <IoChevronForward size={14} />
              </Link> */}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView.robotics ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1535378917042-10a22c95931a?q=80&w=1200&auto=format&fit=crop"
                alt="Robotics Systems"
                className="w-full h-auto object-cover rounded-xl border border-white/10"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== SOFTWARE & OPERATIONAL INTELLIGENCE ========== */}
      <section
        ref={sectionRefs.software}
        className="relative py-20 md:py-28 overflow-hidden border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView.software ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"
                alt="Industrial Software"
                className="w-full h-auto object-cover rounded-xl border border-white/10"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView.software ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="h-[2px] w-8 bg-[var(--color-secondary-400)]" />
                <span className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-secondary-400)]">
                  Software Solutions
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-4">
                Industrial Software & Operational Intelligence
              </h2>
              <p className="font-mono text-base text-[var(--color-text-secondary)] mb-6">
                Software systems enabling connected operations, automation
                visibility, intelligent monitoring, and industrial
                decision-making.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {softwareCapabilities.map((cap, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <IoCheckmarkCircle
                      className="text-[var(--color-secondary-400)] flex-shrink-0"
                      size={16}
                    />
                    <span className="font-mono text-sm text-[var(--color-text-secondary)]">
                      {cap}
                    </span>
                  </div>
                ))}
              </div>
              {/* <Link
                href="/solutions/industrial-software"
                className="inline-flex items-center gap-2 font-mono text-[var(--color-primary-500)] hover:gap-3 transition-all"
              >
                Explore Software Solutions <IoChevronForward size={14} />
              </Link> */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== SYSTEM INTEGRATION & ARCHITECTURE ========== */}
      <section
        ref={sectionRefs.integration}
        className="relative py-10 overflow-hidden bg-[var(--color-dark-200)]"
      >
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

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView.integration ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-semibold uppercase text-white">
              Connected Industrial Architecture
            </h2>
            <p className="font-mono text-sm text-[var(--color-text-secondary)] mt-3 max-w-2xl mx-auto">
              We approach automation as interconnected operational ecosystems
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {integrationLayers.map((layer, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView.integration ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                onMouseEnter={() => setHoveredLayer(idx)}
                onMouseLeave={() => setHoveredLayer(null)}
                className={`relative transition-all duration-300 ${
                  hoveredLayer !== null && hoveredLayer !== idx
                    ? "opacity-40"
                    : "opacity-100"
                }`}
              >
                <div className="flex items-center gap-4 py-4">
                  <div
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      hoveredLayer === idx
                        ? "bg-[var(--color-secondary-400)] scale-150"
                        : "bg-[var(--color-primary-500)]"
                    }`}
                  />
                  <span className="font-heading text-lg text-white">
                    {layer}
                  </span>
                </div>
                {idx < integrationLayers.length - 1 && (
                  <div className="absolute left-1.5 top-12 bottom-0 w-px bg-gradient-to-b from-[var(--color-primary-500)] to-[var(--color-secondary-400)] opacity-50" />
                )}
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView.integration ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center font-mono text-sm text-[var(--color-text-secondary)] mt-8 max-w-2xl mx-auto"
          >
            VNX Robotics approaches automation as interconnected operational
            ecosystems combining controls, robotics, software, and intelligent
            infrastructure.
          </motion.p>
        </div>
      </section>

      {/* ========== FINAL CTA SECTION ========== */}
      <section className="relative py-15 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1581092335871-4b5b6b5a3a3f?q=80&w=1200&auto=format&fit=crop"
            alt="Industrial background"
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-dark-100)] via-transparent to-[var(--color-dark-100)]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-4">
            Let's Build Intelligent Industrial Systems
          </h2>
          <p className="font-mono text-base text-[var(--color-text-secondary)] mb-8 max-w-2xl mx-auto">
            Partner with VNX Robotics to design and deploy connected industrial
            automation systems.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Contact Us →
            </Link>
            <Link href="/industries" className="btn-secondary">
              Explore Industries
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
