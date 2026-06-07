"use client";
import Link from "next/link";
import react, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import BlogCard from "./../Cards/BlogCard";
import apiClient from "./../../api/client";

function HomeBlogSection() {
  const { t } = useTranslation();
  const [blogs, setBlogs] = useState([]);

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
    <section className="relative overflow-hidden bg-black py-5">
      {/* DARK BG GRADIENT */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,186,34,0.18),transparent_28%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(37,0,120,0.55),transparent_38%)]" />

      {/* CONTAINER */}
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* TOP AREA */}
        <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          {/* LEFT */}
          <div className="max-w-3xl">
            {/* TOP LABEL */}
            <div className="mb-5 flex items-center gap-3">
              <div className="h-[2px] w-12 bg-[var(--color-secondary-400)]" />

              <span className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-secondary-400)]">
                {t("homeBlogSection.badge")}
              </span>
            </div>

            {/* HEADING */}
            <h2 className="font-heading text-2xl font-semibold leading-tight text-white md:text-4xl">
              {t("homeBlogSection.headingPrefix")}{" "}
              <span className="text-[var(--color-secondary-400)]">
                {t("homeBlogSection.headingHighlight")}
              </span>
            </h2>

            {/* DESCRIPTION */}
            <p className="mt-5 max-w-2xl font-mono text-sm leading-8 text-white">
              {t("homeBlogSection.description")}
            </p>
          </div>

          {/* RIGHT CTA */}
          <div className="flex items-center">
            <Link href="/blogs" className="btn-primary cursor-pointer">
              <span>{t("homeBlogSection.allStories")}</span>
            </Link>
          </div>
        </div>

        {/* BLOG GRID */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 xl:grid-cols-3">
          {blogs?.slice(0, 3)?.map((blog, index) => (
            <BlogCard key={blog._id} blog={blog} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeBlogSection;
