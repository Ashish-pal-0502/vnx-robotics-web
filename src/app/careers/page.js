"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  IoLocationOutline,
  IoTimeOutline,
  IoBriefcaseOutline,
  IoArrowForward,
  IoSearchOutline,
  IoFilterOutline,
} from "react-icons/io5";

// Dummy career data matching your backend schema
const careersData = [
  {
    id: 1,
    title: "Senior Robotics Engineer",
    description:
      "Design and develop autonomous robotic systems for industrial automation. Experience with ROS, C++, and control systems required.",
    applyLink: "/careers/robotics-engineer",
    postedBy: "Engineering Team",
    location: "Bangalore, India",
    type: "Full-time",
    department: "Robotics",
    postedAt: "2026-05-15",
  },
  {
    id: 2,
    title: "Embedded Systems Engineer",
    description:
      "Develop firmware and embedded software for robotics platforms. Strong C/C++, RTOS, and microcontroller experience needed.",
    applyLink: "/careers/embedded-engineer",
    postedBy: "Engineering Team",
    location: "Remote",
    type: "Full-time",
    department: "Embedded",
    postedAt: "2026-05-10",
  },
  {
    id: 3,
    title: "Controls & Automation Specialist",
    description:
      "Design control systems for industrial automation. Experience with PLC, SCADA, and motion control systems.",
    applyLink: "/careers/controls-specialist",
    postedBy: "Automation Team",
    location: "Mumbai, India",
    type: "Full-time",
    department: "Automation",
    postedAt: "2026-05-05",
  },
  {
    id: 4,
    title: "Machine Learning Engineer",
    description:
      "Develop AI models for robotics perception and decision making. Experience with Python, TensorFlow, and computer vision.",
    applyLink: "/careers/ml-engineer",
    postedBy: "AI Team",
    location: "Bangalore, India",
    type: "Full-time",
    department: "AI/ML",
    postedAt: "2026-04-28",
  },
  {
    id: 5,
    title: "Full Stack Developer",
    description:
      "Build web platforms for robotics fleet management. Experience with React, Node.js, and cloud infrastructure.",
    applyLink: "/careers/fullstack-developer",
    postedBy: "Software Team",
    location: "Remote",
    type: "Full-time",
    department: "Software",
    postedAt: "2026-04-20",
  },
  {
    id: 6,
    title: "Robotics Intern",
    description:
      "Join our robotics team for hands-on experience in autonomous systems development.",
    applyLink: "/careers/robotics-intern",
    postedBy: "Engineering Team",
    location: "Bangalore, India",
    type: "Internship",
    department: "Robotics",
    postedAt: "2026-05-01",
  },
];

export default function CareersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [visibleJobs, setVisibleJobs] = useState([]);
  const sectionRef = useRef(null);

  const departments = [
    "All",
    "Robotics",
    "Embedded",
    "Automation",
    "AI/ML",
    "Software",
  ];

  useEffect(() => {
    let filtered = careersData;

    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (selectedDepartment !== "All") {
      filtered = filtered.filter(
        (job) => job.department === selectedDepartment,
      );
    }

    setVisibleJobs(filtered);
  }, [searchTerm, selectedDepartment]);

  return (
    <main className="bg-[var(--color-dark-100)] min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden">
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

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-3xl h-[40vh] rounded-full bg-[var(--color-primary-500)]/8 blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-secondary-400)]/20 bg-[var(--color-secondary-400)]/5 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary-400)]" />
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-secondary-400)]">
                Join Our Team
              </span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Build the Future of{" "}
              <span className="text-[var(--color-secondary-400)]">
                Robotics
              </span>
            </h1>

            <p className="font-body text-base text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Join us in developing intelligent automation and robotics systems
              that transform industrial operations worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="relative py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            <div className="relative w-full md:w-96">
              <IoSearchOutline
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                size={18}
              />
              <input
                type="text"
                placeholder="Search positions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-white/10 bg-white/[0.02] font-mono text-sm text-white placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-secondary-400)]/50 transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              <IoFilterOutline
                size={18}
                className="text-[var(--color-text-muted)]"
              />
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-4 py-1.5 rounded-full font-mono text-xs transition-all whitespace-nowrap ${
                    selectedDepartment === dept
                      ? "bg-[var(--color-secondary-400)] text-black font-semibold"
                      : "border border-white/10 text-[var(--color-text-secondary)] hover:border-[var(--color-secondary-400)]/30"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Jobs Grid */}
          <div className="grid gap-4">
            {visibleJobs.length > 0 ? (
              visibleJobs.map((job, idx) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:border-[var(--color-secondary-400)]/30 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-0.5 rounded-full bg-[var(--color-secondary-400)]/10 text-[var(--color-secondary-400)] font-mono text-xs">
                          {job.department}
                        </span>
                        <span className="px-2 py-0.5 rounded-full border border-white/10 font-mono text-xs text-[var(--color-text-muted)]">
                          {job.type}
                        </span>
                      </div>

                      <h3 className="font-heading text-xl font-semibold text-white mb-2 group-hover:text-[var(--color-secondary-400)] transition-colors">
                        {job.title}
                      </h3>

                      <p className="font-body text-sm text-[var(--color-text-secondary)] mb-3 line-clamp-2">
                        {job.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-1.5">
                          <IoLocationOutline
                            size={14}
                            className="text-[var(--color-text-muted)]"
                          />
                          <span className="font-mono text-xs text-[var(--color-text-muted)]">
                            {job.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <IoBriefcaseOutline
                            size={14}
                            className="text-[var(--color-text-muted)]"
                          />
                          <span className="font-mono text-xs text-[var(--color-text-muted)]">
                            {job.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <IoTimeOutline
                            size={14}
                            className="text-[var(--color-text-muted)]"
                          />
                          <span className="font-mono text-xs text-[var(--color-text-muted)]">
                            Posted:{" "}
                            {new Date(job.postedAt).toLocaleDateString(
                              "en-US",
                              { month: "short", day: "numeric" },
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Link
                      href={job.applyLink}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/10 bg-white/[0.02] font-mono text-sm text-white hover:bg-[var(--color-secondary-400)] hover:text-black hover:border-transparent transition-all whitespace-nowrap"
                    >
                      Apply Now <IoArrowForward size={14} />
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="font-body text-[var(--color-text-secondary)]">
                  No positions found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="relative py-16 mt-8">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-2">
              Why Join{" "}
              <span className="text-[var(--color-secondary-400)]">
                VNX Robotics?
              </span>
            </h2>
            <p className="font-body text-sm text-[var(--color-text-secondary)]">
              Be part of something extraordinary
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Innovative Technology",
                desc: "Work on cutting-edge robotics and AI systems",
              },
              {
                title: "Growth Culture",
                desc: "Continuous learning and career development",
              },
              {
                title: "Global Impact",
                desc: "Build solutions that transform industries worldwide",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-xl border border-white/10 bg-white/[0.02]"
              >
                <h3 className="font-heading text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-[var(--color-text-secondary)]">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="font-heading text-2xl md:text-3xl font-semibold text-white mb-3">
            Don't see the perfect role?
          </h3>
          <p className="font-body text-[var(--color-text-secondary)] mb-6">
            Send us your resume and we'll reach out when opportunities match
            your skills.
          </p>
          <Link
            href="/contact"
            className="btn-secondary inline-flex items-center gap-2"
          >
            Contact Us <IoArrowForward size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
