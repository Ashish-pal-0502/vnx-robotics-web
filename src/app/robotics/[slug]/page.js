"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoArrowBack, IoCheckmarkCircle } from "react-icons/io5";
import apiClient from "./../../../api/client";

export default function RobotDetailPage() {
  const { slug } = useParams();
  const [robot, setRobot] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoUrl =
    robot?.video?.url || "https://www.youtube.com/embed/dQw4w9WgXcQ";

  // Helper function to strip HTML tags
  const stripHtml = (html) => {
    if (!html) return "";
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const getRobotBySlug = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/robot/get/${slug}`);

      if (response.ok && response.data?.success) {
        setRobot(response.data.robot);
        setError(false);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Error fetching robot:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      getRobotBySlug();
    }
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-dark-100)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="w-16 h-16 border-4 border-[var(--color-secondary-400)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[var(--color-text-secondary)]">
              Loading robot details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !robot) {
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
          <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 to-transparent z-10" />
          <img
            src={robot.images?.[0]?.url || "/images/placeholder-robot.jpg"}
            alt={stripHtml(robot.name)}
            className="h-full w-full object-cover"
            onError={(e) => {
              if (
                e.target.src !==
                "https://placehold.co/800x600/1a1a2e/white?text=No+Image"
              ) {
                e.target.src =
                  "https://placehold.co/800x600/1a1a2e/white?text=No+Image";
              }
            }}
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

        <div className="relative pt-32 z-20 max-w-7xl px-6 md:px-12 py-20">
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

            <h1 className="font-heading text-4xl font-bold uppercase leading-tight text-white mb-4">
              {stripHtml(robot.name)}
            </h1>

            <p className="font-mono text-lg text-[var(--color-secondary-400)] mb-4">
              {robot.category || "Robotics Platform"}
            </p>

            <p className="font-mono text-base text-[var(--color-text-secondary)] max-w-2xl">
              {stripHtml(
                robot.description ||
                  "Advanced robotics platform under development for industrial and commercial applications.",
              )}
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

      {/* Video Section */}
      <section className="relative py-16 px-6 md:px-12 bg-[var(--color-dark-100)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-2">
              Robot in{" "}
              <span className="text-[var(--color-secondary-400)]">Action</span>
            </h2>
            <p className="font-mono text-sm text-[var(--color-text-secondary)]">
              Watch the demonstration video
            </p>
          </motion.div>

          <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/50">
            <video
              controls
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full"
              poster={robot.images?.[0]?.url}
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="relative py-15 px-6 md:px-12">
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
                {stripHtml(robot.description) || "No description available."}
              </p>

              {/* Tags / Key Points */}
              <div className="flex flex-wrap gap-2 mb-6">
                {robot.keyPoints?.map((point, idx) => (
                  <span
                    key={idx}
                    className="rounded-full border border-[var(--color-secondary-400)]/30 bg-[var(--color-secondary-400)]/10 px-3 py-1 font-mono text-xs text-[var(--color-secondary-400)]"
                  >
                    {point}
                  </span>
                ))}
                {(!robot.keyPoints || robot.keyPoints.length === 0) && (
                  <>
                    <span className="rounded-full border border-[var(--color-secondary-400)]/30 bg-[var(--color-secondary-400)]/10 px-3 py-1 font-mono text-xs text-[var(--color-secondary-400)]">
                      Robotics Platform
                    </span>
                    <span className="rounded-full border border-[var(--color-secondary-400)]/30 bg-[var(--color-secondary-400)]/10 px-3 py-1 font-mono text-xs text-[var(--color-secondary-400)]">
                      Intelligent Systems
                    </span>
                  </>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-linear-to-br from-[#0b1020] to-transparent rounded-xl border border-white/10 p-6"
            >
              <h3 className="font-heading text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <IoCheckmarkCircle
                  className="text-[var(--color-secondary-400)]"
                  size={24}
                />
                Key Specifications
              </h3>
              <div className="space-y-3">
                {robot.specifications?.map((spec, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary-400)] mt-1.5" />
                    <div>
                      <span className="font-mono text-sm text-[var(--color-text-secondary)]">
                        <strong className="text-white">{spec.label}:</strong>{" "}
                        {spec.value}
                      </span>
                    </div>
                  </div>
                ))}
                {(!robot.specifications ||
                  robot.specifications.length === 0) && (
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary-400)]" />
                    <span className="font-mono text-sm text-[var(--color-text-secondary)]">
                      No specifications available
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="relative py-15 px-6 md:px-12 overflow-hidden bg-[var(--color-dark-200)]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-2">
              Potential{" "}
              <span className="text-[var(--color-secondary-400)]">
                Applications
              </span>
            </h2>
            <p className="font-mono text-sm text-[var(--color-text-secondary)]">
              Key use cases and applications for this robotics platform
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {robot.applications?.map((application, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:border-[var(--color-secondary-400)]/30 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-2">
                  <IoCheckmarkCircle
                    className="text-[var(--color-secondary-400)]"
                    size={18}
                  />
                  <h4 className="font-heading text-base font-semibold text-white">
                    {application}
                  </h4>
                </div>
              </motion.div>
            ))}
            {(!robot.applications || robot.applications.length === 0) && (
              <div className="col-span-full text-center py-10">
                <p className="text-[var(--color-text-secondary)]">
                  No applications listed yet.
                </p>
              </div>
            )}
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
