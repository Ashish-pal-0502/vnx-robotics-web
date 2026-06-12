

"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { IoCheckmarkCircle, IoFlashOutline } from "react-icons/io5";
import { IoLogoLinkedin, IoLogoTwitter } from "react-icons/io5";
import { useTranslation } from "react-i18next";

export default function AboutPage() {
  const { t } = useTranslation();
  const sectionRefs = {
    hero: useRef(null),
    introduction: useRef(null),
    visionMission: useRef(null),
    coreValues: useRef(null),
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
    coreValues: useInView(sectionRefs.coreValues, { once: true, amount: 0.2 }),
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
    t("aboutPage.engineeringCapabilities.roboticsEngineering"),
    t("aboutPage.engineeringCapabilities.controlsAutomation"),
    t("aboutPage.engineeringCapabilities.embeddedSystems"),
    t("aboutPage.engineeringCapabilities.industrialSoftware"),
    t("aboutPage.engineeringCapabilities.operationalIntelligence"),
    t("aboutPage.engineeringCapabilities.systemsIntegration"),
  ];

  const coreValuesList = [
    {
      title: t("aboutPage.coreValues.motionExcellence"),
      description: t("aboutPage.coreValues.motionExcellenceDesc"),
    },
    {
      title: t("aboutPage.coreValues.controlPrecision"),
      description: t("aboutPage.coreValues.controlPrecisionDesc"),
    },
    {
      title: t("aboutPage.coreValues.practicalInnovation"),
      description: t("aboutPage.coreValues.practicalInnovationDesc"),
    },
    {
      title: t("aboutPage.coreValues.technologicalAutonomy"),
      description: t("aboutPage.coreValues.technologicalAutonomyDesc"),
    },
  ];

  const businessPhilosophyItems = [
    {
      title: t("aboutPage.businessPhilosophy.uncompromisingQuality"),
      description: t("aboutPage.businessPhilosophy.uncompromisingQualityDesc"),
    },
    {
      title: t("aboutPage.businessPhilosophy.unmatchedValue"),
      description: t("aboutPage.businessPhilosophy.unmatchedValueDesc"),
    },
    {
      title: t("aboutPage.businessPhilosophy.trustedPartnership"),
      description: t("aboutPage.businessPhilosophy.trustedPartnershipDesc"),
    },
  ];

  const growthStages = [
    {
      stage: t("aboutPage.stages.stage1"),
      title: t("aboutPage.stages.stage1Title"),
      year: t("aboutPage.stages.stage1Year"),
    },
    {
      stage: t("aboutPage.stages.stage2"),
      title: t("aboutPage.stages.stage2Title"),
      year: t("aboutPage.stages.stage2Year"),
    },
    {
      stage: t("aboutPage.stages.stage3"),
      title: t("aboutPage.stages.stage3Title"),
      year: t("aboutPage.stages.stage3Year"),
    },
    {
      stage: t("aboutPage.stages.stage4"),
      title: t("aboutPage.stages.stage4Title"),
      year: t("aboutPage.stages.stage4Year"),
    },
  ];

  const leaders = [
    {
      name: "Pham Thanh Huu",
      role: "Founder & Chief Executive Officer",
      bio: t("aboutPage.leadershipBio.huuBio"),
      image: "/leaders/huu.png",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Dr. Pramod Pal",
      role: "Co-founder & Chief Technology Officer",
      bio: t("aboutPage.leadershipBio.pramodBio"),
      image: "/leaders/pramod.png",
      linkedin: "https://www.linkedin.com/in/pramodiisc",
      twitter: "https://x.com/pramodiisc",
    },
    {
      name: "Ejiri Kent",
      role: "Chief Executive Officer, VNX Robotics Japan",
      bio: t("aboutPage.leadershipBio.kentBio"),
      image: "/leaders/kent.png",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Nobuhiro Sadakuni",
      role: "Chief Operating Officer, VNX Robotics Japan",
      bio: t("aboutPage.leadershipBio.sadakuniBio"),
      image: "/leaders/sada.png",
      linkedin: "#",
      twitter: "https://x.com/sadakuni1967",
    },
    {
      name: "Andrew Woo",
      role: "Director, Korea Business Development",
      bio: t("aboutPage.leadershipBio.andrewBio"),
      image: "/leaders/andrew.png",
      linkedin: "https://vn.linkedin.com/in/wooandrew",
      twitter: "https://x.com/woo_andrew",
    },
  ];

  const engineeringValues = [
    "long-term engineering thinking",
    "operational understanding",
    "practical deployment",
    "continuous technical growth",
  ];

  return (
    <main className="bg-[var(--color-dark-100)]">
      {/* ========== HERO SECTION ========== */}
      <section
        ref={sectionRefs.hero}
        className="relative min-h-[60vh] lg:min-h-screen flex items-center overflow-hidden pt-24 pb-12 md:pt-32 md:pb-20"
      >
        {/* Grid Background */}
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

        {/* Centered Blue Gradient */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-2xl h-[40vh] max-h-[400px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(0,136,219,0.3) 0%, rgba(0,109,177,0.15) 50%, transparent 100%)",
          }}
        />

        <div className="relative z-20 max-w-7xl px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView.hero ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="h-[2px] w-12 bg-[var(--color-secondary-400)]" />
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-secondary-400)]">
                {t("aboutPage.badge")}
              </span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase leading-tight text-white mb-5">
              {t("aboutPage.heading")}{" "}
              <span className="text-[var(--color-secondary-400)]">
                {t("aboutPage.headingHighlight")}
              </span>
            </h1>

            <p className="font-mono text-base md:text-lg text-[var(--color-text-secondary)] max-w-2xl">
              {t("aboutPage.description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========== COMPANY INTRODUCTION ========== */}
      <section ref={sectionRefs.introduction} className="relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView.introduction ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-4">
                {t("aboutPage.introductionTitle")}{" "}
                <span className="text-[var(--color-secondary-400)]">
                  {t("aboutPage.introductionHighlight")}
                </span>
              </h2>

              <div className="space-y-3">
                {t("aboutPage.introductionItems", { returnObjects: true }).map(
                  (item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <IoCheckmarkCircle
                        className="text-[var(--color-secondary-400)] shrink-0"
                        size={18}
                      />
                      <span className="font-mono text-sm text-[var(--color-text-secondary)] capitalize">
                        {item}
                      </span>
                    </div>
                  ),
                )}
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
                  <div className="h-0.5 w-8 bg-[var(--color-secondary-400)]" />
                  <span className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-secondary-400)]">
                    {t("aboutPage.ourApproach")}
                  </span>
                </div>
                <p className="font-mono text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {t("aboutPage.approachText")}
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
              className="rounded-xl border border-white/10 bg-white/2 p-8"
            >
              <div className="mb-4 text-[var(--color-secondary-400)]">
                <IoFlashOutline size={32} />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-white mb-4">
                {t("aboutPage.vision")}
              </h3>
              <p className="font-mono text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {t("aboutPage.visionText")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView.visionMission ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-xl border border-white/10 bg-white/2 p-8"
            >
              <div className="mb-4 text-[var(--color-secondary-400)]">
                <IoCheckmarkCircle size={32} />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-white mb-4">
                {t("aboutPage.mission")}
              </h3>
              <p className="font-mono text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {t("aboutPage.missionText")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== CORE VALUES ========== */}
      <section
        ref={sectionRefs.coreValues}
        className="relative py-5 overflow-hidden bg-[var(--color-dark-200)]"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView.coreValues ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-2">
              {t("aboutPage.coreValues.title")}{" "}
              <span className="text-[var(--color-secondary-400)]">
                {t("aboutPage.coreValues.title").split(" ").pop()}
              </span>
            </h2>
            <p className="font-mono text-sm text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              {t("aboutPage.coreValues.subtitle")}
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {coreValuesList.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView.coreValues ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-[var(--color-secondary-400)]/40 hover:bg-white/[0.05]"
              >
                <div className="mb-4 h-1 w-12 bg-[var(--color-secondary-400)] group-hover:w-16 transition-all duration-300" />
                <h3 className="font-heading text-xl font-semibold text-white mb-3 group-hover:text-[var(--color-secondary-400)] transition-colors">
                  {value.title}
                </h3>
                <p className="font-mono text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== BUSINESS PHILOSOPHY ========== */}
      <section className="relative py-5 overflow-hidden">
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="mb-3 flex justify-center">
              <div className="h-[2px] w-12 bg-[var(--color-secondary-400)]" />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-4">
              {t("aboutPage.businessPhilosophy.title")}{" "}
              <span className="text-[var(--color-secondary-400)]">
                {t("aboutPage.businessPhilosophy.title").split(" ").pop()}
              </span>
            </h2>
            <p className="font-heading text-5xl md:text-6xl font-bold text-[var(--color-secondary-400)] mb-6">
              {t("aboutPage.businessPhilosophy.highlight")}
            </p>
            <div className="max-w-3xl mx-auto space-y-4">
              <p className="font-mono text-xl text-white leading-relaxed">
                {t("aboutPage.businessPhilosophy.subtitle")}
              </p>
              <p className="font-mono text-lg text-[var(--color-text-secondary)] leading-relaxed">
                {t("aboutPage.businessPhilosophy.subtitleSecond")}
              </p>
            </div>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3 mt-12">
            {businessPhilosophyItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group rounded-xl border border-white/10 bg-white/[0.02] p-8 text-center transition-all duration-300 hover:border-[var(--color-secondary-400)]/40 hover:bg-white/[0.05]"
              >
                <div className="mb-4 h-1 w-12 bg-[var(--color-secondary-400)] mx-auto group-hover:w-20 transition-all duration-300" />
                <h3 className="font-heading text-xl font-semibold text-white mb-3 group-hover:text-[var(--color-secondary-400)] transition-colors">
                  {item.title}
                </h3>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="font-heading text-2xl font-semibold text-white">
              {t("aboutPage.businessPhilosophy.highlight")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========== OUR LEADERSHIP ========== */}
      <section className="relative py-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-logo text-4xl md:text-5xl font-regular text-[var(--color-secondary-400)]">
              {t("aboutPage.ourLeadership")}
            </h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {leaders.map((leader, idx) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10"
              >
                <div className="relative h-[450px] lg:h-[500px]">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="h-auto lg:h-full w-full object-cover grayscale"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-heading text-2xl text-white">
                      {leader.name}
                    </h3>

                    <p className="font-body text-sm text-gray-300">
                      {leader.role}
                    </p>
                    {leader.bio && (
                      <p className="font-mono mt-3 text-xs text-gray-200 line-clamp-3">
                        {leader.bio}
                      </p>
                    )}

                    <div className="mt-4 flex gap-3">
                      <a
                        href={leader.twitter}
                        target="_blank"
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/30 backdrop-blur"
                      >
                        <IoLogoTwitter />
                      </a>

                      <a
                        href={leader.linkedin}
                        target="_blank"
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/30 backdrop-blur"
                      >
                        <IoLogoLinkedin />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
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
              {t("aboutPage.engineeringTitle")}{" "}
              <span className="text-[var(--color-secondary-400)]">
                {t("aboutPage.engineeringHighlight")}
              </span>
            </h2>
            <p className="font-mono text-sm text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              {t("aboutPage.engineeringSubtitle")}
            </p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {teamCapabilities.map((capability, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView.culture ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group rounded-xl border border-white/10 bg-white/2 p-5 text-center transition-all duration-300 hover:border-[var(--color-secondary-400)]/30"
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
              {engineeringValues.map((value, idx) => (
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
              {t("aboutPage.technologyTitle")}{" "}
              <span className="text-[var(--color-secondary-400)]">
                {t("aboutPage.technologyHighlight")}
              </span>
            </h2>
            <p className="font-mono text-sm text-[var(--color-text-secondary)]">
              {t("aboutPage.technologySubtitle")}
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

      {/* ========== FUTURE DIRECTION CTA ========== */}
      <section className="relative py-20 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,186,34,0.05),transparent_60%)]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-4">
            {t("aboutPage.futureTitle")}{" "}
            <span className="text-[var(--color-secondary-400)]">
              {t("aboutPage.futureHighlight")}
            </span>
          </h2>
          <p className="font-mono text-base text-[var(--color-text-secondary)] mb-8">
            {t("aboutPage.futureText")}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/careers" className="btn-primary">
              {t("aboutPage.exploreCareers")}
            </Link>
            <Link href="/contact" className="btn-secondary">
              {t("aboutPage.contactUs")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
