"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  IoArrowForward,
  IoFlashOutline,
  IoGitNetworkOutline,
  IoHardwareChipOutline,
  IoRocketOutline,
} from "react-icons/io5";
import apiClient from "./../../api/client";

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

      if (response.ok && response.data?.success) {
        const robotsData = response.data.robots || [];
        setRobots(robotsData);
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

  // Helper function to strip HTML tags from name/description
  const stripHtml = (html) => {
    if (!html) return "";
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    <main className="bg-[var(--color-dark-100)]">
      {/* ========== HERO SECTION ========== */}
      <section
        ref={sectionRefs.hero}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 to-transparent z-10" />
          <img
            src="https://t4.ftcdn.net/jpg/08/71/75/11/360_F_871751180_OQ5s1vtuENqTMDdEIP6uUuCveboNAisn.jpg"
            alt="Robotics hero"
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
            <div className="grid gap-8 md:grid-cols-2">
              {robots.map((robot, idx) => (
                <motion.div
                  key={robot._id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView.programs ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group relative rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden transition-all duration-300 hover:border-[var(--color-primary-500)]/30"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={
                        robot.images?.[0]?.url ||
                        "https://placehold.co/800x600/1a1a2e/white?text=No+Image"
                      }
                      alt={stripHtml(robot.name)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = "/images/placeholder-robot.jpg";
                      }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
                    <div className="absolute top-4 right-4">
                      <span className="rounded-full bg-[var(--color-secondary-400)]/20 backdrop-blur-sm px-3 py-1 font-mono text-xs text-[var(--color-secondary-400)] border border-[var(--color-secondary-400)]/30">
                        Active Development
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-heading text-xl font-semibold text-white mb-2">
                      {stripHtml(robot.name)}
                    </h3>
                    <p className="font-mono text-sm text-[var(--color-secondary-400)] mb-3">
                      {robot.category || "Robotics Platform"}
                    </p>
                    <p className="font-mono text-sm text-[var(--color-text-secondary)] mb-4">
                      {stripHtml(
                        robot.description ||
                          "Advanced robotics platform under development for industrial and commercial applications.",
                      )}
                    </p>

                    {/* Key Points / Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {robot.keyPoints?.slice(0, 3).map((point, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-[var(--color-text-muted)]"
                        >
                          {point}
                        </span>
                      ))}
                      {(!robot.keyPoints || robot.keyPoints.length === 0) && (
                        <>
                          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-[var(--color-text-muted)]">
                            Robotics Platform
                          </span>
                          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-[var(--color-text-muted)]">
                            Intelligent Systems
                          </span>
                        </>
                      )}
                    </div>

                    <Link
                      href={`/robotics/${robot.slug || robot._id}`}
                      className="inline-flex items-center gap-2 font-mono text-sm text-[var(--color-secondary-400)] hover:gap-3 transition-all"
                    >
                      Learn more about this program <IoArrowForward size={14} />
                    </Link>
                  </div>
                </motion.div>
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
      <section className="relative py-10">
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
        className="relative py-10 overflow-hidden bg-[var(--color-dark-200)]"
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
      <section className="relative py-15 overflow-hidden border-t border-white/5">
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
            <Link href="#programs" className="btn-secondary">
              Explore Robotics Programs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
