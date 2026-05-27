"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";

export default function RoboticsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [activeProgram, setActiveProgram] = useState(0);

  const programs = [
    {
      title: "Quadruped Robotics Platform",
      subtitle: "Industrial Inspection & Autonomous Mobility",
      description:
        "Advanced quadruped robotics platform under active development for industrial inspection, autonomous mobility, and intelligent operational applications in challenging environments.",
      tags: [
        "Mobility Systems",
        "Embedded Control",
        "Robotics Middleware",
        "Intelligent Locomotion",
      ],
      status: "Active Development",
      videoSrc: "/roboVideos/Industrial_automation.mp4", // Replace with actual video
      imageSrc: "/images/quadruped.jpeg", // Fallback image
    },
    {
      title: "Reception & Interactive Robotics",
      subtitle: "Human-Robot Interaction Platform",
      description:
        "Interactive robotics platform designed for future human-robot operational environments, featuring autonomous navigation, intelligent response systems, and service robotics capabilities.",
      tags: [
        "Human Interaction",
        "Autonomous Navigation",
        "Robotics Software",
        "Embedded Systems",
      ],
      status: "Development Program",
      videoSrc: "/mp4/HeroV1.mp4", // Replace with actual video
      imageSrc: "/roboImages/quadruped.jpeg", // Fallback image
    },
  ];

  const techStack = [
    {
      name: "Robotics Middleware",
      description: "ROS 2 infrastructure and distributed robotics systems",
    },
    {
      name: "Embedded Systems",
      description:
        "Real-time control systems and intelligent hardware platforms",
    },
    {
      name: "Mobility Systems",
      description: "Actuation, locomotion, and robotics motion systems",
    },
    {
      name: "Operational Intelligence",
      description: "Software systems supporting autonomous operations",
    },
    {
      name: "AI & Autonomy",
      description:
        "Future intelligent decision-making and autonomous robotics infrastructure",
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
              Advanced Robotics Programs
            </span>
            <div className="h-[2px] w-12 bg-[var(--color-secondary-400)]" />
          </div>

          <h2 className="font-heading text-2xl font-semibold uppercase leading-tight text-[var(--color-text-primary)] md:text-4xl">
            Building Next-Generation
            <br />
            <span className="text-[var(--color-secondary-500)]">
              Robotics Systems
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl font-mono text-sm leading-relaxed text-[var(--color-text-secondary)] md:text-base">
            Developing intelligent robotics platforms for industrial automation,
            mobility, inspection, and future autonomous systems
          </p>
        </motion.div>

        {/* Robotics Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-20 rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm md:p-12"
        >
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 font-heading text-2xl font-semibold text-white">
                Robotics Built for Real Industrial Systems
              </h3>
              <p className="font-mono text-sm leading-relaxed text-[var(--color-text-secondary)]">
                VNX Robotics approaches robotics as part of larger intelligent
                operational ecosystems combining automation, embedded systems,
                software infrastructure, and industrial intelligence.
              </p>
            </div>
            <div className="space-y-3">
              {[
                "Operational Usefulness",
                "Intelligent Mobility",
                "Scalable Autonomy",
                "Long-term Robotics Infrastructure",
              ].map((focus, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary-500)]" />
                  <span className="font-mono text-sm text-[var(--color-text-secondary)]">
                    {focus}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="mb-20">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-heading text-2xl font-semibold text-white md:text-3xl">
                Current Development Programs
              </h3>
              <p className="mt-2 font-mono text-sm text-[var(--color-text-muted)]">
                Active robotics initiatives showing real engineering progress
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
                  {idx === 0 ? "Quadruped" : "Interactive Robot"}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            key={activeProgram}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0b1020] to-transparent"
          >
            <div className="grid md:grid-cols-2">
              {/* Visual Side - Video/Image */}
              <div className="relative aspect-video md:aspect-auto bg-gradient-to-br from-[#006db1]/10 to-transparent overflow-hidden">
                {/* Video Player */}
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
                  {/* Fallback image if video fails */}
                  <img
                    src={programs[activeProgram].imageSrc}
                    alt={programs[activeProgram].title}
                    className="w-full h-full object-cover"
                  />
                </video>

                {/* Gradient Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Status Badge */}
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
                  Learn more about this program <IoArrowForward size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Robotics Technologies */}
        <div className="mb-20">
          <div className="mb-10 text-center">
            <h3 className="font-heading text-2xl font-semibold text-white md:text-3xl">
              Robotics Technology Stack
            </h3>
            <p className="mt-2 font-mono text-sm text-[var(--color-text-muted)]">
              Technical capabilities powering our robotics development
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
          <h3 className="mb-4 font-heading text-2xl font-semibold text-white md:text-3xl">
            Building the Future of Intelligent Robotics Systems
          </h3>
          <p className="mx-auto mb-8 max-w-xl font-mono text-sm text-[var(--color-text-secondary)]">
            Explore collaboration opportunities and advanced robotics programs
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Discuss Collaboration →
            </Link>
            <Link href="/robotics" className="btn-secondary">
              Explore Robotics Programs
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
