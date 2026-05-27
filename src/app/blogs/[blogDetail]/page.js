"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import parse from "html-react-parser";
import {
  IoArrowBack,
  IoCalendarOutline,
  IoTimeOutline,
  IoPersonOutline,
  IoShareSocialOutline,
} from "react-icons/io5";
import apiClient from "@/api/client";
import toast from "react-hot-toast";

export default function BlogDetailPage() {
  const params = useParams();
  const blogSlug = params.blogDetail;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const getBlogBySlug = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/blog/get/${blogSlug}`);

      if (response.ok) {
        setBlog(response?.data?.data?.blog);
      } else {
        toast.error(response?.data?.message || "Failed to fetch blog");
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
      toast.error("Failed to load blog post");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (blogSlug) {
      getBlogBySlug();
    }
  }, [blogSlug]);

  if (loading) {
    return (
      <main className="bg-[var(--color-dark-100)] min-h-screen flex items-center justify-center">
        <div className="text-center px-6">
          <div className="w-12 h-12 border-4 border-[var(--color-secondary-400)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[var(--color-text-secondary)]">
            Loading article...
          </p>
        </div>
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="bg-[var(--color-dark-100)] min-h-screen font-body flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="font-heading text-4xl font-bold text-white mb-4">
            Blog Not Found
          </h1>
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
    <main className="bg-[var(--color-dark-100)] min-h-screen">
      {/* ========== HERO SECTION ========== */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden">
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
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-3xl h-[40vh] rounded-full bg-[var(--color-primary-500)]/8 blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back Button */}
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-secondary-400)] transition-colors mb-8 font-mono text-sm group"
            >
              <IoArrowBack
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back to all stories
            </Link>

            {/* Category Badge */}
            {blog.category && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-secondary-400)]/20 bg-[var(--color-secondary-400)]/5 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary-400)]" />
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-secondary-400)]">
                  {blog.category}
                </span>
              </div>
            )}

            {/* Title */}
            <h1
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white mb-6"
              dangerouslySetInnerHTML={{
                __html: blog?.heading || "",
              }}
            />

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-white/10">
              <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
                <IoCalendarOutline size={16} />
                <span className="font-mono text-sm">
                  {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
                <IoTimeOutline size={16} />
                <span className="font-mono text-sm">{"3 min read"}</span>
              </div>
              {/* {blog.readTime && (
              )} */}
              <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
                <IoPersonOutline size={16} />
                <span className="font-mono text-sm">{"Dharmendra Dev"}</span>
              </div>
              {/* {blog.author && (
              )} */}
            </div>

            {/* Featured Image */}
            {blog.image && blog.image[0]?.url && (
              <div className="relative rounded-2xl overflow-hidden border border-white/10 mb-10 aspect-[16/9]">
                <Image
                  src={blog.image[0].url}
                  alt={blog.heading || blog.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-3 mb-8">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success("Link copied to clipboard!");
                }}
                className="inline-flex items-center cursor-pointer gap-2 px-5 py-2.5 rounded-lg border border-white/10 bg-white/[0.02] font-mono text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-secondary-400)] hover:border-[var(--color-secondary-400)]/30 transition-all"
              >
                <IoShareSocialOutline size={16} /> Share
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== CONTENT SECTION ========== */}
      <section className="relative pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="blog-content text-white font-body"
          >
            {parse(blog.content || "", {
              replace: (node) => {
                // Optional: Customize specific elements
                if (node.name === "img") {
                  return (
                    <div className="relative w-full h-[400px] my-8 rounded-xl overflow-hidden">
                      <Image
                        src={node.attribs.src}
                        alt={node.attribs.alt || "Blog image"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  );
                }
                return node;
              },
            })}
          </motion.article>

          {/* Divider */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/blogs"
                className="btn-secondary inline-flex items-center gap-2"
              >
                ← All Articles
              </Link>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success("Link copied to clipboard!");
                }}
                className="inline-flex items-center cursor-pointer gap-2 px-5 py-2.5 rounded-lg border border-white/10 bg-white/[0.02] font-mono text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-secondary-400)] transition-all"
              >
                <IoShareSocialOutline size={16} /> Share this article
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
