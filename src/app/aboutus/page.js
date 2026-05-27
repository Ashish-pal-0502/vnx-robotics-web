"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  IoArrowForward,
  IoCheckmarkCircle,
  IoHardwareChipOutline,
  IoCubeOutline,
  IoBuildOutline,
  IoCloudOutline,
  IoGitNetworkOutline,
  IoFlashOutline,
  IoCalendarOutline,
  IoNewspaperOutline,
} from "react-icons/io5";

export default function AboutPage() {
  const sectionRefs = {
    hero: useRef(null),
    introduction: useRef(null),
    visionMission: useRef(null),
    leadership: useRef(null),
    culture: useRef(null),
    collaborations: useRef(null),
    growth: useRef(null),
    news: useRef(null),
  };

  const isInView = {
    hero: useInView(sectionRefs.hero, { once: true, amount: 0.3 }),
    introduction: useInView(sectionRefs.introduction, {
      once: true,
      amount: 0.3,
    }),
    visionMission: useInView(sectionRefs.visionMission, {
      once: true,
      amount: 0.2,
    }),
    leadership: useInView(sectionRefs.leadership, { once: true, amount: 0.2 }),
    culture: useInView(sectionRefs.culture, { once: true, amount: 0.2 }),
    collaborations: useInView(sectionRefs.collaborations, {
      once: true,
      amount: 0.2,
    }),
    growth: useInView(sectionRefs.growth, { once: true, amount: 0.2 }),
    news: useInView(sectionRefs.news, { once: true, amount: 0.2 }),
  };

  const teamCapabilities = [
    "Robotics Engineering",
    "Controls & Automation",
    "Embedded Systems",
    "Industrial Software",
    "Operational Intelligence",
    "Systems Integration",
  ];

  const collaborationAreas = [
    "Actuator development",
    "Robotics mechanisms",
    "Industrial automation",
    "Embedded infrastructure",
    "Intelligent operational systems",
  ];

  const growthStages = [
    {
      stage: "Stage 1",
      title: "Industrial automation & integration",
      year: "Foundation",
    },
    {
      stage: "Stage 2",
      title: "Warehouse systems & operational intelligence",
      year: "Expansion",
    },
    {
      stage: "Stage 3",
      title: "Robotics platforms & embedded systems",
      year: "Advanced",
    },
    {
      stage: "Stage 4",
      title: "Advanced autonomous industrial infrastructure",
      year: "Future",
    },
  ];

  const newsUpdates = [
    {
      title: "Robotics Development Update",
      description:
        "Quadruped mobility testing and robotics platform development progress.",
      date: "April 2025",
      icon: <IoHardwareChipOutline size={20} />,
    },
    {
      title: "Industrial Collaboration",
      description:
        "Strategic collaboration discussions across industrial automation and intelligent systems.",
      date: "March 2025",
      icon: <IoGitNetworkOutline size={20} />,
    },
    {
      title: "Embedded Systems Expansion",
      description:
        "Expansion of embedded systems and intelligent hardware capability development.",
      date: "February 2025",
      icon: <IoFlashOutline size={20} />,
    },
  ];

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
            alt="Industrial engineering background"
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

        <div className="relative z-20 max-w-7xl  px-6 md:px-12 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView.hero ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="mb-5 mt-10 flex items-center gap-3">
              <div className="h-[2px] w-12 bg-[var(--color-secondary-400)]" />
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-secondary-400)]">
                About VNX Robotics
              </span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl  font-bold uppercase leading-tight text-white mb-5">
              Building Intelligent Automation & Robotics Systems
            </h1>

            <p className="font-mono text-base md:text-lg text-[var(--color-text-secondary)] max-w-2xl">
              VNX Robotics is developing intelligent industrial automation and
              robotics technologies focused on scalable systems, operational
              intelligence, and future autonomous infrastructure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========== COMPANY INTRODUCTION ========== */}
      <section ref={sectionRefs.introduction} className="relative py-20 ">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView.introduction ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-4">
                Engineering the Future of{" "}
                <span className="text-[var(--color-secondary-400)]">
                  Intelligent Industry
                </span>
              </h2>
              <p className="font-mono text-base text-[var(--color-text-secondary)] mb-6">
                VNX Robotics is an industrial automation and robotics systems
                company focused on building intelligent operational technologies
                for manufacturing, logistics, warehouse automation, and future
                autonomous systems.
              </p>
              <div className="space-y-3">
                {[
                  "industrial automation",
                  "robotics engineering",
                  "embedded systems",
                  "operational software",
                  "intelligent infrastructure development",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <IoCheckmarkCircle
                      className="text-[var(--color-secondary-400)] flex-shrink-0"
                      size={18}
                    />
                    <span className="font-mono text-sm text-[var(--color-text-secondary)] capitalize">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView.introduction ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-xl overflow-hidden"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-primary-500)]/20 to-[var(--color-secondary-400)]/20 blur-xl rounded-xl" />
              <div className="relative bg-[var(--color-dark-200)] rounded-xl border border-white/10 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-[2px] w-8 bg-[var(--color-secondary-400)]" />
                  <span className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-secondary-400)]">
                    Our Approach
                  </span>
                </div>
                <p className="font-mono text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  Our approach emphasizes scalable architecture, operational
                  understanding, realistic deployment, and long-term technology
                  capability building.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== VISION & MISSION ========== */}
      <section
        ref={sectionRefs.visionMission}
        className="relative py-5 overflow-hidden bg-[var(--color-dark-200)]"
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

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView.visionMission ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-8"
            >
              <div className="mb-4 text-[var(--color-secondary-400)]">
                <IoFlashOutline size={32} />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-white mb-4">
                Vision
              </h3>
              <p className="font-mono text-sm text-[var(--color-text-secondary)] leading-relaxed">
                To build intelligent automation and robotics systems that
                transform industrial operations through scalable automation,
                operational intelligence, and advanced autonomous technologies.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView.visionMission ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-8"
            >
              <div className="mb-4 text-[var(--color-secondary-400)]">
                <IoCheckmarkCircle size={32} />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-white mb-4">
                Mission
              </h3>
              <p className="font-mono text-sm text-[var(--color-text-secondary)] leading-relaxed">
                To develop practical industrial automation systems, intelligent
                robotics platforms, and connected operational technologies that
                enable modern industry to evolve toward scalable autonomous
                infrastructure.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== LEADERSHIP PHILOSOPHY ========== */}
      <section ref={sectionRefs.leadership} className="relative py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView.leadership ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <img
                src="/images/contactus.png"
                alt="Engineering leadership"
                className="w-full h-auto object-cover rounded-xl border border-white/10"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView.leadership ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="h-[2px] w-12 bg-[var(--color-secondary-400)]" />
                <span className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-secondary-400)]">
                  Leadership & Engineering Philosophy
                </span>
              </div>

              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-4">
                Deep Roots in{" "}
                <span className="text-[var(--color-secondary-400)]">
                  Robotics & Intelligent Systems
                </span>
              </h2>

              <p className="font-mono text-base text-[var(--color-text-secondary)] mb-6">
                VNX Robotics was founded with deep roots in robotics,
                reinforcement learning, intelligent systems, and industrial
                automation thinking.
              </p>

              <div className="space-y-3 mb-6">
                {[
                  "systems engineering",
                  "robotics development",
                  "industrial automation",
                  "operational understanding",
                  "long-term technology strategy",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary-400)]" />
                    <span className="font-mono text-sm text-[var(--color-text-secondary)] capitalize">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-l-2 border-[var(--color-secondary-400)] pl-4">
                <p className="font-mono text-sm italic text-[var(--color-text-secondary)]">
                  &ldquo;Successful automation systems are built not only
                  through advanced robotics, but through scalable architecture,
                  operational reliability, intelligent integration, and
                  disciplined engineering execution.&rdquo;
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== TEAM & ENGINEERING CULTURE ========== */}
      <section
        ref={sectionRefs.culture}
        className="relative py-5 overflow-hidden bg-[var(--color-dark-200)]"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView.culture ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-2">
              Building Multidisciplinary{" "}
              <span className="text-[var(--color-secondary-400)]">
                Engineering Capability
              </span>
            </h2>
            <p className="font-mono text-sm text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              VNX Robotics is progressively building teams across key technology
              domains
            </p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {teamCapabilities.map((capability, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView.culture ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 text-center transition-all duration-300 hover:border-[var(--color-secondary-400)]/30"
              >
                <h4 className="font-heading text-base font-semibold text-white group-hover:text-[var(--color-secondary-400)] transition-colors">
                  {capability}
                </h4>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView.culture ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 text-center"
          >
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                "long-term engineering thinking",
                "operational understanding",
                "practical deployment",
                "continuous technical growth",
              ].map((value, idx) => (
                <span
                  key={idx}
                  className="rounded-full border border-[var(--color-primary-500)]/30 bg-[var(--color-primary-500)]/10 px-4 py-2 font-mono text-xs text-[var(--color-primary-400)]"
                >
                  {value}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== TECHNOLOGY & CAPABILITY GROWTH ========== */}
      <section
        ref={sectionRefs.growth}
        className="relative py-10 overflow-hidden bg-[var(--color-dark-200)]"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView.growth ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-2">
              Progressive{" "}
              <span className="text-[var(--color-secondary-400)]">
                Technology Development
              </span>
            </h2>
            <p className="font-mono text-sm text-[var(--color-text-secondary)]">
              Our strategic growth roadmap
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {growthStages.map((stage, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView.growth ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative flex gap-6 pb-8"
              >
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-[var(--color-secondary-400)] z-10" />
                  {idx < growthStages.length - 1 && (
                    <div className="w-px h-full bg-gradient-to-b from-[var(--color-secondary-400)] to-[var(--color-primary-500)] opacity-50" />
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-xs text-[var(--color-secondary-400)] uppercase tracking-wider">
                      {stage.stage}
                    </span>
                    <span className="font-mono text-xs text-[var(--color-text-muted)]">
                      {stage.year}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-white">
                    {stage.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== LATEST NEWS & UPDATES ========== */}
      <section ref={sectionRefs.news} className="relative py-5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView.news ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-2">
              Latest{" "}
              <span className="text-[var(--color-secondary-400)]">
                News & Updates
              </span>
            </h2>
            <p className="font-mono text-sm text-[var(--color-text-secondary)]">
              Stay informed about our latest developments
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {newsUpdates.map((news, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView.news ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="group rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-[var(--color-secondary-400)]/30"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-[var(--color-secondary-400)]">
                    {news.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    <IoCalendarOutline
                      size={12}
                      className="text-[var(--color-text-muted)]"
                    />
                    <span className="font-mono text-xs text-[var(--color-text-muted)]">
                      {news.date}
                    </span>
                  </div>
                </div>
                <h3 className="font-heading text-lg font-semibold text-white mb-2 group-hover:text-[var(--color-secondary-400)] transition-colors">
                  {news.title}
                </h3>
                <p className="font-mono text-sm text-[var(--color-text-secondary)]">
                  {news.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FUTURE DIRECTION CTA ========== */}
      <section className="relative py-20 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,186,34,0.05),transparent_60%)]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-4">
            Building Toward Intelligent{" "}
            <span className="text-[var(--color-secondary-400)]">
              Autonomous Infrastructure
            </span>
          </h2>
          <p className="font-mono text-base text-[var(--color-text-secondary)] mb-8">
            Join us in shaping the future of industrial automation, robotics
            systems, and intelligent operational technologies.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/careers" className="btn-primary">
              Explore Careers →
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
