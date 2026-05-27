"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  IoArrowBack,
  IoArrowForward,
  IoCheckmarkCircle,
  IoHardwareChipOutline,
  IoGitNetworkOutline,
  IoCodeSlashOutline,
  IoFlashOutline,
} from "react-icons/io5";

const robotData = {
  quadruped: {
    name: "Quadruped Robotics Platform",
    subtitle: "Industrial Inspection & Autonomous Mobility",
    description:
      "Advanced quadruped robotics platform under active development for industrial inspection, autonomous mobility, and intelligent operational applications in challenging environments.",
    fullDescription:
      "The VNX Quadruped robotics platform represents a significant step forward in autonomous mobility for industrial environments. Designed to navigate rough terrain, inspect critical infrastructure, and collect real-time data, this platform is being developed for the most demanding operational conditions.",
    image:
      "https://images.unsplash.com/photo-1535378917042-10a22c95931a?q=80&w=1200&auto=format&fit=crop",
    status: "Active Development",
    tags: [
      "Mobility Systems",
      "Embedded Control",
      "Robotics Middleware",
      "Intelligent Locomotion",
    ],
    features: [
      "Industrial inspection capabilities",
      "Autonomous navigation in rough terrain",
      "Real-time data processing and transmission",
      "Modular payload system for various sensors",
      "Remote operation and monitoring",
      "Obstacle detection and avoidance",
    ],
    technologies: [
      {
        name: "Locomotion Control",
        desc: "Advanced gait algorithms for stability",
      },
      { name: "Sensor Fusion", desc: "LiDAR, cameras, and IMU integration" },
      {
        name: "Edge Computing",
        desc: "Onboard processing for real-time decisions",
      },
      {
        name: "ROS 2 Middleware",
        desc: "Modular robotics software architecture",
      },
    ],
    applications: [
      "Industrial facility inspection",
      "Infrastructure monitoring",
      "Search and rescue operations",
      "Hazardous environment exploration",
      "Construction site monitoring",
    ],
  },
  reception: {
    name: "Reception & Interactive Robot",
    subtitle: "Human-Robot Interaction Platform",
    description:
      "Interactive robotics platform designed for future human-robot operational environments, featuring autonomous navigation, intelligent response systems, and service robotics capabilities.",
    fullDescription:
      "The Reception Robot is being developed as a versatile human-interaction platform for service environments. Featuring autonomous navigation, natural language processing, and intelligent response systems, this platform aims to transform customer service and operational assistance.",
    image:
      "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=1200&auto=format&fit=crop",
    status: "Development Program",
    tags: [
      "Human Interaction",
      "Autonomous Navigation",
      "Robotics Software",
      "Embedded Systems",
    ],
    features: [
      "Natural language processing",
      "Autonomous navigation and mapping",
      "Facial recognition and personalization",
      "Multi-modal interaction (voice/touch)",
      "Remote assistance capabilities",
      "Integration with building systems",
    ],
    technologies: [
      {
        name: "Conversational AI",
        desc: "Natural language understanding and response",
      },
      {
        name: "SLAM Navigation",
        desc: "Simultaneous localization and mapping",
      },
      { name: "Computer Vision", desc: "Facial and object recognition" },
      { name: "Cloud Integration", desc: "Remote monitoring and updates" },
    ],
    applications: [
      "Corporate reception and greeting",
      "Hospitality and customer service",
      "Healthcare assistance",
      "Retail guidance and information",
      "Event and exhibition support",
    ],
  },
};

export default function RobotDetailPage() {
  const { slug } = useParams();
  const robot = robotData[slug];

  if (!robot) {
    return (
      <div className="min-h-screen bg-[var(--color-dark-100)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Robot Program Not Found
          </h1>
          <p className="text-[var(--color-text-secondary)] mb-8">
            The robotics program you're looking for doesn't exist.
          </p>
          <Link href="/robotics" className="btn-primary">
            Back to Robotics
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-[var(--color-dark-100)]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
          <img
            src={robot.image}
            alt={robot.name}
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
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Link
              href="/robotics"
              className="inline-flex items-center gap-2 font-mono text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-secondary-400)] transition-colors mb-6"
            >
              <IoArrowBack size={14} /> Back to Robotics
            </Link>

            <div className="mb-5 flex items-center gap-3">
              <div className="h-[2px] w-12 bg-[var(--color-secondary-400)]" />
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-secondary-400)]">
                {robot.status}
              </span>
            </div>

            <h1 className="font-heading text-4xl font-bold uppercase leading-tight text-white mb-4">
              {robot.name}
            </h1>

            <p className="font-mono text-lg text-[var(--color-secondary-400)] mb-4">
              {robot.subtitle}
            </p>

            <p className="font-mono text-base text-[var(--color-text-secondary)] max-w-2xl">
              {robot.description}
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/contact" className="btn-primary">
                Discuss Collaboration →
              </Link>
              <Link href="/robotics" className="btn-secondary">
                View All Programs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="relative py-15 px-6 md:px-12 ">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-4">
                Program Overview
              </h2>
              <p className="font-mono text-base text-[var(--color-text-secondary)] mb-6">
                {robot.fullDescription}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {robot.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="rounded-full border border-[var(--color-secondary-400)]/30 bg-[var(--color-secondary-400)]/10 px-3 py-1 font-mono text-xs text-[var(--color-secondary-400)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-[#0b1020] to-transparent rounded-xl border border-white/10 p-6"
            >
              <h3 className="font-heading text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <IoCheckmarkCircle
                  className="text-[var(--color-secondary-400)]"
                  size={24}
                />
                Key Features
              </h3>
              <div className="space-y-3">
                {robot.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary-400)]" />
                    <span className="font-mono text-sm text-[var(--color-text-secondary)]">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="relative py-15 px-6 md:px-12  overflow-hidden bg-[var(--color-dark-200)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-2">
              Core{" "}
              <span className="text-[var(--color-secondary-400)]">
                Technologies
              </span>
            </h2>
            <p className="font-mono text-sm text-[var(--color-text-secondary)]">
              Technical foundation powering this robotics platform
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {robot.technologies.map((tech, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-5 text-center hover:border-[var(--color-secondary-400)]/30 transition-all duration-300"
              >
                <div className="mb-3 flex justify-center">
                  {idx === 0 && (
                    <IoHardwareChipOutline
                      size={32}
                      className="text-[var(--color-secondary-400)]"
                    />
                  )}
                  {idx === 1 && (
                    <IoGitNetworkOutline
                      size={32}
                      className="text-[var(--color-secondary-400)]"
                    />
                  )}
                  {idx === 2 && (
                    <IoCodeSlashOutline
                      size={32}
                      className="text-[var(--color-secondary-400)]"
                    />
                  )}
                  {idx === 3 && (
                    <IoFlashOutline
                      size={32}
                      className="text-[var(--color-secondary-400)]"
                    />
                  )}
                </div>
                <h4 className="font-heading text-base font-semibold text-white mb-2">
                  {tech.name}
                </h4>
                <p className="font-mono text-xs text-[var(--color-text-secondary)]">
                  {tech.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="relative py-15 px-6 md:px-12 ">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-4">
                Potential{" "}
                <span className="text-[var(--color-secondary-400)]">
                  Applications
                </span>
              </h2>
              <p className="font-mono text-base text-[var(--color-text-secondary)] mb-6">
                This robotics platform is being developed for a range of
                industrial and commercial applications:
              </p>
              <div className="space-y-3">
                {robot.applications.map((app, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[var(--color-secondary-400)]" />
                    <span className="font-mono text-sm text-[var(--color-text-secondary)]">
                      {app}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-[#0b1020] to-transparent rounded-xl border border-white/10 p-8 text-center"
            >
              <h3 className="font-heading text-xl font-semibold text-white mb-3">
                Development Status
              </h3>
              <div className="mb-4">
                <span className="inline-block rounded-full bg-[var(--color-secondary-400)]/20 px-4 py-2 font-mono text-sm text-[var(--color-secondary-400)] border border-[var(--color-secondary-400)]/30">
                  {robot.status}
                </span>
              </div>
              <p className="font-mono text-sm text-[var(--color-text-secondary)] mb-6">
                This platform is under active development. For collaboration
                inquiries, partnerships, or to discuss custom applications,
                please contact our robotics team.
              </p>
              <Link
                href="/contact"
                className="btn-secondary inline-flex items-center gap-2"
              >
                Partner With Us <IoArrowForward size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-28 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,186,34,0.05),transparent_60%)]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-4">
            Interested in This{" "}
            <span className="text-[var(--color-secondary-400)]">
              Robotics Program
            </span>
            ?
          </h2>
          <p className="font-mono text-base text-[var(--color-text-secondary)] mb-8">
            Let's discuss how this platform can be adapted for your specific
            industrial needs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Start a Conversation →
            </Link>
            <Link href="/robotics" className="btn-secondary">
              Explore Other Programs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
