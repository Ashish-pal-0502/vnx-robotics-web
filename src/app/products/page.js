"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect } from "react";
import {
  IoArrowForward,
  IoBuildOutline,
  IoCodeSlashOutline,
  IoEyeOutline,
  IoFlaskOutline,
  IoGitBranchOutline,
  IoGitNetworkOutline,
  IoHardwareChipOutline,
  IoRocketOutline,
} from "react-icons/io5";

export default function ProductsPage() {
  const sectionRefs = {
    hero: useRef(null),
    products: useRef(null),
  };

  const isInView = {
    hero: useInView(sectionRefs.hero, { once: true, amount: 0.1 }),
    products: useInView(sectionRefs.products, { once: true, amount: 0.1 }),
  };

  const productCategories = [
    {
      id: "robotics",
      title: "Robotics Products",
      icon: <IoGitNetworkOutline size={28} />,
      description:
        "Advanced robotics platforms for industrial mobility and autonomous operations",
      link: "/robotics",
      items: [
        "Quadruped Robots",
        "Single-Leg Quadruped Development Kit",
        "Future AMR Products",
        "Educational & Research Robots",
      ],
    },
    {
      id: "embedded",
      title: "Embedded Products",
      icon: <IoHardwareChipOutline size={28} />,
      description:
        "Embedded systems and controllers powering intelligent robotics",
      link: "",
      items: [
        "AMR Power Distribution Board - Standard Version",
        "AMR Power Distribution Board - Jetson Nano Integrated",
        "Reception / Interface Board",
        "Future Embedded Controllers",
      ],
    },
    {
      id: "industrial",
      title: "Industrial Automation Products",
      icon: <IoBuildOutline size={28} />,
      description:
        "Complete automation solutions for manufacturing and logistics",
      link: "",
      items: [
        "Conveyor Systems",
        "Picking & Sorting Systems",
        "Automation Controllers",
        "Vision Inspection Systems",
      ],
    },
    {
      id: "software",
      title: "Software Products",
      icon: <IoCodeSlashOutline size={28} />,
      description: "Intelligent software platforms for operational excellence",
      link: "",
      items: [
        "Smart Factory Solution",
        "Operational Dashboards",
        "Robotics Middleware",
        "Warehouse Intelligence Platform",
      ],
    },
  ];

  const roboticsHighlights = [
    {
      icon: <IoEyeOutline size={24} />,
      title: "Robotics Vision",
      description: "Advanced perception systems for autonomous navigation",
    },
    {
      icon: <IoGitBranchOutline size={24} />,
      title: "AI & Locomotion",
      description: "Reinforcement learning for dynamic movement",
    },
    {
      icon: <IoFlaskOutline size={24} />,
      title: "Research & Innovation",
      description: "Pushing boundaries in robotics technology",
    },
    {
      icon: <IoRocketOutline size={24} />,
      title: "Robot Demonstrations",
      description: "Showcasing real-world capabilities",
    },
  ];

  return (
    <main className="bg-[var(--color-dark-100)]">
      {/* ========== HERO SECTION ========== */}

      <section
        ref={sectionRefs.hero}
        className="relative min-h-[60vh] lg:min-h-screen  flex items-center overflow-hidden pt-24 pb-12 md:pt-32 md:pb-20"
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
                Our Portfolio
              </span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase leading-tight text-white mb-5">
              Our Products
            </h1>

            <p className="font-mono text-base md:text-lg text-[var(--color-text-secondary)] max-w-2xl">
              Explore our comprehensive range of robotics, embedded systems,
              industrial automation, and software solutions.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/contact" className="btn-primary">
                Discuss Your Requirements →
              </Link>
              <Link href="/solutions" className="btn-secondary">
                Explore Solutions
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== PRODUCT CATEGORIES ========== */}
      <section
        ref={sectionRefs.products}
        className="relative py-4 overflow-hidden"
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
          {/* Product Categories Grid */}
          <div className="grid gap-8 md:grid-cols-2">
            {productCategories.map((category, idx) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView.products ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true, amount: 0.1 }}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-[var(--color-primary-500)]/30 transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-[var(--color-primary-500)] group-hover:text-[var(--color-secondary-400)] transition-colors">
                      {category.icon}
                    </div>
                    {category.link && (
                      <Link
                        href={category.link}
                        className="inline-flex items-center gap-1 text-sm font-mono text-[var(--color-text-muted)] hover:text-[var(--color-secondary-400)] transition-colors"
                      >
                        View all <IoArrowForward size={12} />
                      </Link>
                    )}
                  </div>

                  <h3 className="font-heading text-2xl font-semibold text-white mb-2">
                    {category.title}
                  </h3>

                  <p className="font-mono text-sm text-[var(--color-text-secondary)] mb-4">
                    {category.description}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-white/10">
                    {category.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-[var(--color-secondary-400)]" />
                        <span className="font-body text-sm text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)] transition-colors">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Robotics Highlights Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView.products ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, amount: 0.1 }}
            className="mt-20"
          >
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-secondary-400)]/20 bg-[var(--color-secondary-400)]/5 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary-400)]" />
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-secondary-400)]">
                  Innovation Focus
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white">
                Robotics &{" "}
                <span className="text-[var(--color-secondary-400)]">
                  Research
                </span>
              </h2>
              <p className="font-mono text-sm text-[var(--color-text-secondary)] mt-3 max-w-2xl mx-auto">
                Pushing the boundaries of what's possible in robotics technology
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {roboticsHighlights.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView.products ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  className="text-center p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[var(--color-primary-500)]/30 transition-all duration-300 group"
                >
                  <div className="text-[var(--color-secondary-400)] mb-3 flex justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-[var(--color-text-muted)]">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView.products ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true, amount: 0.1 }}
            className="mt-20 text-center"
          >
            <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-400)]/10 p-8">
              <h3 className="font-heading text-2xl md:text-3xl font-semibold text-white mb-3">
                Need a Custom Solution?
              </h3>
              <p className="font-body text-[var(--color-text-secondary)] mb-6 max-w-2xl mx-auto">
                We develop tailored robotics and automation products for
                specific industrial requirements.
              </p>
              <Link
                href="/contact"
                className="btn-primary inline-flex items-center gap-2"
              >
                Contact Us <IoArrowForward size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
