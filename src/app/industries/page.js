"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  IoArrowForward,
  IoCheckmarkCircle,
  IoChevronForward,
  IoHardwareChipOutline,
  IoCubeOutline,
  IoBuildOutline,
  IoCloudOutline,
  IoTrendingUpOutline,
  IoFlashOutline,
} from "react-icons/io5";

export default function IndustriesPage() {
  const sectionRefs = {
    hero: useRef(null),
    overview: useRef(null),
    warehouse: useRef(null),
    manufacturing: useRef(null),
    robotics: useRef(null),
    agriculture: useRef(null),
    embedded: useRef(null),
    crossIndustry: useRef(null),
    future: useRef(null),
  };

  const isInView = {
    hero: useInView(sectionRefs.hero, { once: true, amount: 0.3 }),
    overview: useInView(sectionRefs.overview, { once: true, amount: 0.2 }),
    warehouse: useInView(sectionRefs.warehouse, { once: true, amount: 0.3 }),
    manufacturing: useInView(sectionRefs.manufacturing, {
      once: true,
      amount: 0.3,
    }),
    robotics: useInView(sectionRefs.robotics, { once: true, amount: 0.3 }),
    agriculture: useInView(sectionRefs.agriculture, {
      once: true,
      amount: 0.3,
    }),
    embedded: useInView(sectionRefs.embedded, { once: true, amount: 0.3 }),
    crossIndustry: useInView(sectionRefs.crossIndustry, {
      once: true,
      amount: 0.2,
    }),
    future: useInView(sectionRefs.future, { once: true, amount: 0.2 }),
  };

  const industryCards = [
    {
      icon: <IoCubeOutline size={28} />,
      title: "Warehouse & Logistics",
      description:
        "Intelligent warehouse systems, material handling, orchestration, and automation infrastructure.",
      capabilities: [
        "Warehouse Orchestration",
        "Sorting Systems",
        "Material Handling",
        "Inventory Traceability",
        "Robotics Integration",
      ],
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
    },
    {
      icon: <IoBuildOutline size={28} />,
      title: "Manufacturing",
      description:
        "Industrial automation, controls, operational intelligence, and connected production systems.",
      capabilities: [
        "PLC Systems",
        "SCADA Integration",
        "MES Connectivity",
        "Process Monitoring",
        "Predictive Maintenance",
      ],
      image:
        "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=1200&auto=format&fit=crop",
    },
    {
      icon: <IoHardwareChipOutline size={28} />,
      title: "Robotics & Autonomous Systems",
      description:
        "Advanced robotics platforms for industrial inspection, mobility, and intelligent operations.",
      capabilities: [
        "Quadruped Robotics",
        "Autonomous Mobility",
        "Robotics Middleware",
        "Human-Interaction Systems",
        "Intelligent Robotics Software",
      ],
      image:
        "https://images.unsplash.com/photo-1535378917042-10a22c95931a?q=80&w=1200&auto=format&fit=crop",
    },
    {
      icon: <IoTrendingUpOutline size={28} />,
      title: "Agriculture & Field Robotics",
      description:
        "Future autonomous robotics systems for agricultural operations and outdoor environments.",
      capabilities: [
        "Land-based Automation",
        "Autonomous Mobility",
        "Smart Field Operations",
        "Intelligent Monitoring Systems",
      ],
      image:
        "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop",
    },
    {
      icon: <IoFlashOutline size={28} />,
      title: "Embedded & Intelligent Systems",
      description:
        "Embedded technologies supporting robotics, automation systems, and intelligent hardware.",
      capabilities: [
        "Embedded Controllers",
        "Sensor Systems",
        "Robotics Electronics",
        "Intelligent Hardware Platforms",
        "Real-time Systems",
      ],
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    },
    {
      icon: <IoCloudOutline size={28} />,
      title: "Industrial Infrastructure",
      description:
        "Integrated systems combining controls, software, robotics, and operational monitoring.",
      capabilities: [
        "Control Systems",
        "Industrial Dashboards",
        "Operational Intelligence",
        "System Integration",
        "Monitoring Platforms",
      ],
      image:
        "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const capabilityPillars = [
    "Controls & Automation",
    "Robotics Systems",
    "Industrial Software",
    "Embedded Systems",
    "AI & Analytics",
    "Operational Intelligence",
  ];

  return (
    <main className="bg-[var(--color-dark-100)]">
      {/* ========== HERO SECTION ========== */}
      <section
        ref={sectionRefs.hero}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Background Video/Image */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
          <img
            src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?q=80&w=1200&auto=format&fit=crop"
            alt="Industrial background"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Grid Overlay */}
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

        <div className="relative z-20 max-w-7xl  px-6 md:px-12 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView.hero ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="h-[2px] w-12 bg-[var(--color-secondary-400)]" />
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-secondary-400)]">
                Industries We Enable
              </span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl  font-bold uppercase leading-tight text-white mb-5">
              Industries We Enable
            </h1>

            <p className="font-mono text-base md:text-lg text-[var(--color-text-secondary)] max-w-2xl">
              Building intelligent automation and robotics systems for modern
              industrial operations, logistics, manufacturing, and future
              autonomous industries.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/contact" className="btn-primary">
                Discuss Your Industry →
              </Link>
              <Link href="/solutions" className="btn-secondary">
                Explore Solutions
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== INDUSTRIES OVERVIEW GRID ========== */}
      <section
        ref={sectionRefs.overview}
        className="relative py-10  overflow-hidden"
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
              Industries We Serve
            </h2>
            <p className="font-mono text-sm text-[var(--color-text-secondary)] mt-3 max-w-2xl mx-auto">
              Scalable intelligent systems across global industrial domains
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {industryCards.map((industry, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView.overview ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-[var(--color-primary-500)]/30 hover:bg-white/[0.04]"
              >
                <div className="mb-4 text-[var(--color-primary-500)] group-hover:text-[var(--color-secondary-400)] transition-colors">
                  {industry.icon}
                </div>
                <h3 className="font-heading text-xl font-semibold text-white mb-2">
                  {industry.title}
                </h3>
                <p className="font-mono text-sm text-[var(--color-text-secondary)] mb-4">
                  {industry.description}
                </p>
                <Link
                  href={`/industries/${industry.title.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
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

      {/* ========== WAREHOUSE & LOGISTICS DETAIL ========== */}
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
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-4">
                Intelligent Warehouse Automation
              </h2>
              <p className="font-mono text-base text-[var(--color-text-secondary)] mb-6">
                VNX Robotics develops intelligent warehouse systems focused on
                automation, orchestration, operational visibility, and scalable
                material flow infrastructure.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {industryCards[0].capabilities.map((cap, idx) => (
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
                src={industryCards[0].image}
                alt="Warehouse Automation"
                className="w-full h-auto object-cover rounded-xl border border-white/10"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== MANUFACTURING DETAIL ========== */}
      <section
        ref={sectionRefs.manufacturing}
        className="relative py-20 md:py-28 overflow-hidden border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView.manufacturing ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <img
                src={industryCards[1].image}
                alt="Manufacturing Systems"
                className="w-full h-auto object-cover rounded-xl border border-white/10"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView.manufacturing ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-4">
                Smart Manufacturing Systems
              </h2>
              <p className="font-mono text-base text-[var(--color-text-secondary)] mb-6">
                Industrial automation systems integrating controls, monitoring,
                operational analytics, and intelligent production workflows.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {industryCards[1].capabilities.map((cap, idx) => (
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
                Explore Manufacturing Solutions <IoChevronForward size={14} />
              </Link> */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== ROBOTICS & AUTONOMOUS SYSTEMS DETAIL ========== */}
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
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-4">
                Robotics Platforms & Autonomous Systems
              </h2>
              <p className="font-mono text-base text-[var(--color-text-secondary)] mb-6">
                Advanced robotics development programs focused on mobility,
                industrial inspection, autonomy, and intelligent operational
                systems.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {industryCards[2].capabilities.map((cap, idx) => (
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
              <Link
                href="/robotics"
                className="inline-flex items-center gap-2 font-mono text-[var(--color-primary-500)] hover:gap-3 transition-all"
              >
                Explore Robotics Programs <IoChevronForward size={14} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView.robotics ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-xl overflow-hidden"
            >
              <img
                src={industryCards[2].image}
                alt="Robotics Systems"
                className="w-full h-auto object-cover rounded-xl border border-white/10"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== AGRICULTURE & FIELD ROBOTICS DETAIL ========== */}
      <section
        ref={sectionRefs.agriculture}
        className="relative py-20 md:py-28 overflow-hidden border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView.agriculture ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <img
                src={industryCards[3].image}
                alt="Agriculture Robotics"
                className="w-full h-auto object-cover rounded-xl border border-white/10"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView.agriculture ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-4">
                Agriculture & Outdoor Robotics
              </h2>
              <p className="font-mono text-base text-[var(--color-text-secondary)] mb-6">
                Future autonomous robotics systems designed for agricultural
                operations, outdoor automation, and intelligent field
                infrastructure.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {industryCards[3].capabilities.map((cap, idx) => (
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
                href="/solutions/agriculture-robotics"
                className="inline-flex items-center gap-2 font-mono text-[var(--color-primary-500)] hover:gap-3 transition-all"
              >
                Explore Agriculture Solutions <IoChevronForward size={14} />
              </Link> */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== EMBEDDED & INTELLIGENT SYSTEMS DETAIL ========== */}
      <section
        ref={sectionRefs.embedded}
        className="relative py-20 md:py-28 overflow-hidden border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView.embedded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-4">
                Embedded Systems & Intelligent Hardware
              </h2>
              <p className="font-mono text-base text-[var(--color-text-secondary)] mb-6">
                Embedded technologies supporting robotics, automation systems,
                sensors, control systems, and future intelligent infrastructure.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {industryCards[4].capabilities.map((cap, idx) => (
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
                href="/solutions/embedded-systems"
                className="inline-flex items-center gap-2 font-mono text-[var(--color-primary-500)] hover:gap-3 transition-all"
              >
                Explore Embedded Solutions <IoChevronForward size={14} />
              </Link> */}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView.embedded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-xl overflow-hidden"
            >
              <img
                src={industryCards[4].image}
                alt="Embedded Systems"
                className="w-full h-auto object-cover rounded-xl border border-white/10"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== CROSS-INDUSTRY CAPABILITIES ========== */}
      <section
        ref={sectionRefs.crossIndustry}
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
            animate={isInView.crossIndustry ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-semibold uppercase text-white">
              Connected Industrial Intelligence
            </h2>
            <p className="font-mono text-sm text-[var(--color-text-secondary)] mt-3 max-w-2xl mx-auto">
              We think in systems — integrating controls, robotics, software,
              and intelligence
            </p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {capabilityPillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView.crossIndustry ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group relative cursor-pointer rounded-xl border border-white/10 bg-white/[0.02] p-6 text-center transition-all duration-300 hover:border-[var(--color-primary-500)]/30"
              >
                <h4 className="font-heading text-lg font-semibold text-white group-hover:text-[var(--color-primary-400)] transition-colors">
                  {pillar}
                </h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA SECTION ========== */}
      <section className="relative py-20 overflow-hidden border-t border-white/5">
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
            Let's Build Intelligent Industrial Systems Together
          </h2>
          <p className="font-mono text-base text-[var(--color-text-secondary)] mb-8 max-w-2xl mx-auto">
            Partner with VNX Robotics to transform your industrial operations
            with intelligent automation and robotics systems.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Contact Us →
            </Link>
            <Link href="/solutions" className="btn-secondary">
              Explore Technologies
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
