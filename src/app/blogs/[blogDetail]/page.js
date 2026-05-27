"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  IoArrowBack,
  IoCalendarOutline,
  IoTimeOutline,
  IoPersonOutline,
  IoShareSocialOutline,
  IoBookmarkOutline,
} from "react-icons/io5";

// Blog data - In the future, fetch this from an API or database
const blogsData = {
  1: {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1400&auto=format&fit=crop",
    date: "May 15, 2026",
    title:
      "The Future of Warehouse Robotics: AMRs and Intelligent Orchestration",
    description:
      "Exploring how autonomous mobile robots and intelligent software are transforming modern warehouse operations and logistics efficiency.",
    category: "Robotics",
    readTime: "5 min read",
    author: "Engineering Team",
    content: `
      <p>The warehouse of tomorrow is already taking shape today. Autonomous Mobile Robots (AMRs) and intelligent orchestration software are revolutionizing how goods move through distribution centers, creating unprecedented levels of efficiency and flexibility.</p>
      
      <h2>The Rise of Autonomous Mobile Robots</h2>
      <p>Unlike traditional automated guided vehicles (AGVs) that require fixed paths and magnetic tape, modern AMRs use advanced sensors, LiDAR, and AI-powered navigation to move dynamically through warehouse environments. This flexibility allows them to adapt to changing layouts, avoid obstacles, and collaborate safely with human workers.</p>
      
      <p>Key advantages of AMR systems include:</p>
      <ul>
        <li>Rapid deployment without infrastructure modifications</li>
        <li>Scalable fleet management</li>
        <li>Real-time optimization of material flow</li>
        <li>Seamless integration with warehouse management systems</li>
      </ul>
      
      <h2>Intelligent Orchestration: The Brain Behind the Fleet</h2>
      <p>Having robots is one thing; coordinating them effectively is another. Intelligent orchestration platforms serve as the central nervous system of automated warehouses, managing task allocation, traffic control, battery management, and real-time optimization.</p>
      
      <p>These platforms use sophisticated algorithms to determine which robot should handle which task, when robots should recharge, and how to optimize travel paths to minimize congestion and maximize throughput.</p>
      
      <h2>Real-World Impact</h2>
      <p>Companies implementing AMR and orchestration solutions are seeing dramatic improvements: 2-3x increases in productivity, 99.9%+ order accuracy, and ROI within 12-18 months. As technology continues to mature and costs decrease, warehouse automation is becoming accessible to operations of all sizes.</p>
      
      <h2>The Road Ahead</h2>
      <p>Looking forward, we can expect even greater integration between AMRs, conveyor systems, sorters, and other automated equipment. Machine learning will enable predictive analytics for maintenance and throughput optimization. And collaborative robots will work ever more seamlessly alongside human teammates.</p>
      
      <p>At VNX Robotics, we're at the forefront of this transformation, developing intelligent warehouse solutions that adapt to your unique operational needs. The future of warehouse automation is intelligent, flexible, and connected — and it's arriving faster than you might think.</p>
    `,
  },
  2: {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=1400&auto=format&fit=crop",
    date: "May 10, 2026",
    title: "Quadruped Robotics: From Lab to Industrial Inspection",
    description:
      "How legged robots are moving beyond research into real-world industrial applications for inspection and monitoring.",
    category: "Robotics",
    readTime: "4 min read",
    author: "Robotics Team",
    content: `
      <p>Quadruped robots have captured the public imagination with their remarkable agility and lifelike movement. But beyond the viral videos, these remarkable machines are finding serious applications in industrial inspection and monitoring.</p>
      
      <h2>Why Legged Robots?</h2>
      <p>Wheeled robots excel on flat, prepared surfaces. But many industrial environments — construction sites, outdoor facilities, disaster zones — feature uneven terrain, stairs, debris, and obstacles that challenge traditional mobility solutions. Quadruped robots, with their ability to navigate complex environments, fill this critical gap.</p>
      
      <h2>Industrial Applications</h2>
      <p>Today's quadruped robots are being deployed for:</p>
      <ul>
        <li><strong>Industrial Inspection:</strong> Visual and thermal inspection of equipment in hard-to-reach areas</li>
        <li><strong>Facility Monitoring:</strong> Regular patrols of large industrial facilities</li>
        <li><strong>Hazardous Environment Operations:</strong> Inspection of areas dangerous for human entry</li>
        <li><strong>Construction Site Monitoring:</strong> Progress tracking and safety monitoring</li>
      </ul>
      
      <h2>Technology Stack</h2>
      <p>Modern quadruped platforms integrate advanced sensors including LiDAR, stereo cameras, thermal imagers, and gas detectors. Onboard processing enables real-time navigation and data analysis, while 5G connectivity allows remote operation and data streaming.</p>
      
      <h2>Development at VNX Robotics</h2>
      <p>Our quadruped program is focused on developing robust mobility systems for challenging industrial environments. We're engineering platforms that can traverse stairs, navigate debris, and operate in adverse weather conditions — bringing advanced inspection capabilities to where they're needed most.</p>
      
      <p>While still in active development, our quadruped platform represents a significant step toward autonomous industrial inspection and monitoring. We're excited about the potential to keep human workers safe while gathering critical operational data in challenging environments.</p>
    `,
  },
};

export default function BlogDetailPage() {
  const params = useParams();
  const blogId = params.blogDetail;
  const blog = blogsData[blogId];

  if (!blog) {
    return (
      <main className="bg-[var(--color-dark-100)] min-h-screen font-body flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-4xl font-bold text-white mb-4">Blog Not Found</h1>
          <p className="text-[var(--color-text-secondary)] mb-8">
            The article you're looking for doesn't exist.
          </p>
          <Link
            href="/blogs"
            className="btn-primary inline-flex items-center gap-2"
          >
            <IoArrowBack size={16} /> Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[var(--color-dark-100)] ">
      {/* ========== HERO SECTION ========== */}
      <section className="relative max-w-7xl mx-auto px-6 pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden">
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

        <div className="relative z-10 max-w-7xl mx-auto px-6 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back Button */}
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2  font-body text-[var(--color-text-secondary)] hover:text-[var(--color-secondary-400)] transition-colors mb-8 font-mono text-sm"
            >
              <IoArrowBack size={16} /> Back to all stories
            </Link>

            {/* Title */}
            <h1 className="font-heading text-3xl md:text-4xl font-heading font-medium text-white mb-6 max-w-4xl">
              {blog.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 font-mono mb-8 text-[var(--color-text-muted)]">
              <div className="flex items-center gap-2">
                <IoCalendarOutline size={16} />
                <span className="font-mono text-sm">{blog.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <IoTimeOutline size={16} />
                <span className="font-mono text-sm">{blog.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <IoPersonOutline size={16} />
                <span className="font-mono text-sm">{blog.author}</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="rounded-2xl overflow-hidden border border-white/10 mb-10">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10">
              <button className="inline-flex items-center font-body gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/[0.02] text-sm font-mono text-[var(--color-text-secondary)] hover:text-[var(--color-secondary-400)] transition-colors">
                <IoShareSocialOutline size={16} /> Share
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== CONTENT SECTION ========== */}
      <section className="relative py-5">
        <div className="max-w-4xl mx-auto px-6">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-invert prose-lg fond-body max-w-none text-white"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Divider */}
          <div className="my-12 pt-8 border-t border-white/10">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <Link href="/blogs" className="btn-secondary">
                Read More Articles →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
