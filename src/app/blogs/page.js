"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import BlogCard from "@/components/Cards/BlogCard";
import apiClient from "./../../api/client";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const sectionRefs = {
    hero: useRef(null),
    grid: useRef(null),
  };

  const isInView = {
    hero: useInView(sectionRefs.hero, { once: true, amount: 0.3 }),
    grid: useInView(sectionRefs.grid, { once: true, amount: 0.2 }),
  };

  // Get unique categories for filter (optional)
  const categories = ["All", ...new Set(blogs.map((blog) => blog.category))];

  const getAllBlogs = async () => {
    const response = await apiClient.get("/blog/get");

    if (response.ok) {
      setBlogs(response?.data?.blogs || []);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <main className="bg-[var(--color-dark-100)]">
      {/* ========== HERO SECTION ========== */}
      <section
        ref={sectionRefs.hero}
        className="relative pb-5 pt-32  overflow-hidden"
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

        {/* Subtle Radial Glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-3xl h-[40vh] rounded-full bg-[#0088db]/8 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView.hero ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--color-secondary-400)]/20 bg-[var(--color-secondary-400)]/5 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary-400)]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-secondary-400)]">
                Insights & Resources
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5">
              Our Latest{" "}
              <span className="text-[var(--color-secondary-400)]">Stories</span>
            </h1>

            {/* Description */}
            <p className="font-mono text-base md:text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Explore insights, innovations, and real-world stories shaping the
              future of robotics, AI systems, and intelligent automation.
            </p>

            {/* Decorative Line */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="h-[1px] w-12 bg-linear-to-r from-transparent to-[var(--color-secondary-400)]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary-400)]" />
              <div className="h-[1px] w-12 bg-linear-to-l from-transparent to-[var(--color-secondary-400)]" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== BLOG GRID SECTION ========== */}
      <section ref={sectionRefs.grid} className="relative py-10">
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
          {/* Blog Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs?.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView.grid ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <BlogCard blog={blog} index={index} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="relative py-10 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,186,34,0.05),transparent_60%)]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-4">
            Want to{" "}
            <span className="text-[var(--color-secondary-400)]">
              Share Your Story
            </span>
            ?
          </h2>
          <p className="font-mono text-base text-[var(--color-text-secondary)] mb-8">
            Have insights or innovations to share? We're always looking for
            guest contributors and industry experts.
          </p>
          <Link
            href="/contact"
            className="btn-primary inline-flex items-center gap-2"
          >
            Contact Us →
          </Link>
        </div>
      </section>
    </main>
  );
}
