"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  IoFlashOutline,
  IoGitNetworkOutline,
  IoHardwareChipOutline,
  IoRocketOutline,
} from "react-icons/io5";

import apiClient from "./../../api/client";
import RobotCard from "./../../components/Cards/robotCard";

export default function RoboticsPage() {
  const sectionRefs = {
    hero: useRef(null),
    philosophy: useRef(null),
    programs: useRef(null),
    technologies: useRef(null),
    approach: useRef(null),
  };

  const isInView = {
    hero: useInView(sectionRefs.hero, { once: true, amount: 0.3 }),
    philosophy: useInView(sectionRefs.philosophy, { once: true, amount: 0.2 }),
    programs: useInView(sectionRefs.programs, { once: true, amount: 0.2 }),
    technologies: useInView(sectionRefs.technologies, {
      once: true,
      amount: 0.2,
    }),
    approach: useInView(sectionRefs.approach, { once: true, amount: 0.2 }),
  };

  const futurePrograms = [
    {
      title: "Warehouse Robotics",
      description:
        "Autonomous material handling and intelligent warehouse mobility systems",
      icon: <IoHardwareChipOutline size={24} />,
    },
    {
      title: "Agriculture Robotics",
      description:
        "Intelligent systems for agricultural operations and outdoor environments",
      icon: <IoFlashOutline size={24} />,
    },
    {
      title: "Autonomous Industrial Systems",
      description: "Advanced autonomous systems for industrial operations",
      icon: <IoRocketOutline size={24} />,
    },
    {
      title: "Drone & Hybrid Systems",
      description:
        "Intelligent aerial and hybrid operational robotics technologies",
      icon: <IoGitNetworkOutline size={24} />,
    },
  ];

  const techStack = [
    {
      name: "Robotics Middleware",
      description: "ROS 2 infrastructure and distributed systems",
    },
    {
      name: "Embedded Systems",
      description: "Real-time control and intelligent hardware",
    },
    {
      name: "Mobility Systems",
      description: "Actuation, locomotion, and motion systems",
    },
    {
      name: "Operational Intelligence",
      description: "Software for autonomous operations",
    },
    {
      name: "AI & Autonomy",
      description: "Intelligent decision-making systems",
    },
  ];

  const [robots, setRobots] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllRobots = async () => {
    try {
      const response = await apiClient.get("/robot/get");

      // if (response.ok && response.data?.success) {
      //   const robotsData = response.data.robots || [];
      //   setRobots(robotsData);
      // }

      if (response.ok && response.data?.success) {
        const robotsData = response.data.robots || [];
        // Filter only development robots
        const developmentRobots = robotsData.filter(
          (robot) => robot.is_development === true,
        );
        setRobots(developmentRobots);
      }
    } catch (error) {
      console.error("Error fetching robots:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllRobots();
  }, []);

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
                Advanced Robotics Systems
              </span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase leading-tight text-white mb-5">
              Advanced Robotics Systems
            </h1>

            <p className="font-mono text-base md:text-lg text-[var(--color-text-secondary)] max-w-2xl">
              Developing intelligent robotics platforms for industrial
              automation, mobility, inspection, and future autonomous systems.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/contact" className="btn-primary">
                Discuss Collaboration →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== CURRENT ROBOTICS PROGRAMS ========== */}
      <section
        id="programs"
        ref={sectionRefs.programs}
        className="relative py-16 overflow-hidden bg-[var(--color-dark-200)]"
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView.programs ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-2">
              Development{" "}
              <span className="text-[var(--color-secondary-400)]">
                Programs
              </span>
            </h2>
            <p className="font-mono text-sm text-[var(--color-text-secondary)]">
              Active robotics initiatives showing real engineering progress
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-20">
              <div className="animate-pulse text-white">
                Loading robotics programs...
              </div>
            </div>
          ) : robots.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {robots.map((robot, idx) => (
                <RobotCard
                  key={robot._id || idx}
                  robot={robot}
                  index={idx}
                  isInView={isInView.programs}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-[var(--color-text-secondary)]">
                No robotics programs found.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ========== FUTURE ROBOTICS PLATFORMS ========== */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView.programs ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-2">
              Expanding{" "}
              <span className="text-[var(--color-secondary-400)]">
                Robotics Programs
              </span>
            </h2>
            <p className="font-mono text-sm text-[var(--color-text-secondary)]">
              Strategic directions for future autonomous systems
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {futurePrograms.map((program, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView.programs ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-6 text-center transition-all duration-300 hover:border-[var(--color-secondary-400)]/30"
              >
                <div className="mb-3 flex justify-center text-[var(--color-secondary-400)]">
                  {program.icon}
                </div>
                <h4 className="font-heading text-lg font-semibold text-white mb-2">
                  {program.title}
                </h4>
                <p className="font-mono text-xs text-[var(--color-text-secondary)]">
                  {program.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CORE ROBOTICS TECHNOLOGIES ========== */}
      <section
        ref={sectionRefs.technologies}
        className="relative py-16 overflow-hidden bg-[var(--color-dark-200)]"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView.technologies ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-2">
              Robotics{" "}
              <span className="text-[var(--color-secondary-400)]">
                Technology Stack
              </span>
            </h2>
            <p className="font-mono text-sm text-[var(--color-text-secondary)]">
              Technical capabilities powering our robotics development
            </p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {techStack.map((tech, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView.technologies ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-all duration-300 hover:border-[var(--color-secondary-400)]/30"
              >
                <h4 className="font-heading text-base font-semibold text-white mb-2 group-hover:text-[var(--color-secondary-400)] transition-colors">
                  {tech.name}
                </h4>
                <p className="font-mono text-xs text-[var(--color-text-secondary)]">
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="relative py-20 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,186,34,0.08),transparent_60%)]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-4">
            Building the Future of{" "}
            <span className="text-[var(--color-secondary-400)]">
              Intelligent Robotics
            </span>
          </h2>
          <p className="font-mono text-base text-[var(--color-text-secondary)] mb-8">
            Explore collaboration opportunities and advanced robotics programs
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Discuss Collaboration →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
