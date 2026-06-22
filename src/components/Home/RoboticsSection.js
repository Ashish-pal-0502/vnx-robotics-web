"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";
import { useTranslation } from "react-i18next";

export default function RoboticsSection() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [activeProgram, setActiveProgram] = useState(0);

  const programs = [
    {
      title: t("roboticsSection.programs.reception.title"),
      subtitle: t("roboticsSection.programs.reception.subtitle"),
      description: t("roboticsSection.programs.reception.description"),
      tags: [
        t("roboticsSection.programs.reception.tags.humanInteraction"),
        t("roboticsSection.programs.reception.tags.autonomousNavigation"),
        t("roboticsSection.programs.reception.tags.roboticsSoftware"),
        t("roboticsSection.programs.reception.tags.embeddedSystems"),
      ],
      status: t("roboticsSection.programs.reception.status"),
      videoSrc: "/mp4/receptionHome.mp4",
      imageSrc: "/roboImages/quadruped.jpeg",
    },
    {
      title: t("roboticsSection.programs.quadruped.title"),
      subtitle: t("roboticsSection.programs.quadruped.subtitle"),
      description: t("roboticsSection.programs.quadruped.description"),
      tags: [
        t("roboticsSection.programs.quadruped.tags.mobilitySystems"),
        t("roboticsSection.programs.quadruped.tags.embeddedControl"),
        t("roboticsSection.programs.quadruped.tags.roboticsMiddleware"),
        t("roboticsSection.programs.quadruped.tags.intelligentLocomotion"),
      ],
      status: t("roboticsSection.programs.quadruped.status"),
      videoSrc: "/mp4/quadRobo.mp4",
      imageSrc: "/images/quadruped.jpeg",
    },
  ];

  const techStack = [
    {
      name: t("roboticsSection.techStackItems.roboticsMiddleware.name"),
      description: t(
        "roboticsSection.techStackItems.roboticsMiddleware.description",
      ),
    },
    {
      name: t("roboticsSection.techStackItems.embeddedSystems.name"),
      description: t(
        "roboticsSection.techStackItems.embeddedSystems.description",
      ),
    },
    {
      name: t("roboticsSection.techStackItems.mobilitySystems.name"),
      description: t(
        "roboticsSection.techStackItems.mobilitySystems.description",
      ),
    },
    {
      name: t("roboticsSection.techStackItems.operationalIntelligence.name"),
      description: t(
        "roboticsSection.techStackItems.operationalIntelligence.description",
      ),
    },
    {
      name: t("roboticsSection.techStackItems.aiAutonomy.name"),
      description: t("roboticsSection.techStackItems.aiAutonomy.description"),
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--color-dark-100)] py-5"
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
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      {/* Glow Effects */}
      <div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-[#006db1]/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#ffba22]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-[2px] w-12 bg-[var(--color-secondary-400)]" />
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-secondary-400)]">
              {t("roboticsSection.badge")}
            </span>
            <div className="h-[2px] w-12 bg-[var(--color-secondary-400)]" />
          </div>

          <h2 className="font-heading text-2xl font-semibold uppercase leading-tight text-[var(--color-text-primary)] md:text-4xl">
            {t("roboticsSection.headingPrefix")}
            <br />
            <span className="text-[var(--color-secondary-500)]">
              {t("roboticsSection.headingHighlight")}
            </span>
          </h2>
        </motion.div>

        <div className="mb-20">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-heading text-2xl font-semibold text-white md:text-3xl">
                {t("roboticsSection.developmentPrograms")}
              </h3>
              <p className="mt-2 font-mono text-sm text-[var(--color-text-muted)]">
                {t("roboticsSection.developmentSubtitle")}
              </p>
            </div>
            <div className="flex gap-2">
              {programs.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveProgram(idx)}
                  className={`px-4 py-2 text-sm cursor-pointer font-mono transition-all duration-300 rounded-full ${
                    activeProgram === idx
                      ? "bg-[var(--color-primary-500)] text-black"
                      : "border border-white/20 text-[var(--color-text-secondary)] hover:border-white/40"
                  }`}
                >
                  {idx === 0
                    ? t("roboticsSection.receptionRobot")
                    : t("roboticsSection.quadrupedRobot")}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            key={activeProgram}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-[#0b1020] to-transparent"
          >
            <div className="grid md:grid-cols-2">
              {/* Visual Side - Video/Image */}
              <div className="relative aspect-video md:aspect-auto bg-gradient-to-br from-[#006db1]/10 to-transparent overflow-hidden">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  poster={programs[activeProgram].imageSrc}
                >
                  <source
                    src={programs[activeProgram].videoSrc}
                    type="video/mp4"
                  />
                  <img
                    src={programs[activeProgram].imageSrc}
                    alt={programs[activeProgram].title}
                    className="w-full h-full object-cover"
                  />
                </video>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute bottom-4 right-4">
                  <span className="rounded-full bg-[var(--color-primary-500)]/20 backdrop-blur-sm px-3 py-1 font-mono text-xs text-[var(--color-primary-500)] border border-[var(--color-primary-500)]/30">
                    {programs[activeProgram].status}
                  </span>
                </div>
              </div>

              {/* Content Side */}
              <div className="p-6 md:p-8">
                <h4 className="mb-2 font-heading text-2xl font-semibold text-white">
                  {programs[activeProgram].title}
                </h4>
                <p className="mb-4 font-mono text-sm text-[var(--color-primary-400)]">
                  {programs[activeProgram].subtitle}
                </p>
                <p className="mb-6 font-mono text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {programs[activeProgram].description}
                </p>
                <div className="mb-6 flex flex-wrap gap-2">
                  {programs[activeProgram].tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-[var(--color-text-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href="/robotics"
                  className="inline-flex items-center gap-2 font-mono text-sm text-[var(--color-primary-500)] transition-all hover:gap-3"
                >
                  {t("roboticsSection.learnMore")} <IoArrowForward size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Robotics Technologies */}
        <div className="mb-20">
          <div className="mb-10 text-center">
            <h3 className="font-heading text-2xl font-semibold text-white md:text-3xl">
              {t("roboticsSection.techStack")}
            </h3>
            <p className="mt-2 font-mono text-sm text-[var(--color-text-muted)]">
              {t("roboticsSection.techSubtitle")}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {techStack.map((tech, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.1 * idx }}
                whileHover={{ scale: 1.02 }}
                className="group relative cursor-pointer rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-all duration-300 hover:border-[var(--color-primary-500)]/30"
              >
                <h4 className="mb-2 font-heading text-base font-semibold text-white group-hover:text-[var(--color-primary-400)]">
                  {tech.name}
                </h4>
                <p className="font-mono text-xs leading-relaxed text-[var(--color-text-secondary)]">
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="mx-auto mb-8 max-w-xl font-mono text-sm text-[var(--color-text-secondary)]">
            {t("roboticsSection.exploreCollaboration")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              {t("roboticsSection.discussCollaboration")}
            </Link>
            <Link href="/robotics" className="btn-secondary">
              {t("roboticsSection.exploreRobotics")}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
