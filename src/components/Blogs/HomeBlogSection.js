"use client";

import BlogCard from './../Cards/BlogCard';

const blogs = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1400&auto=format&fit=crop",
    date: "April 29, 2026",
    title: "Blog Heading",
    description:
      "Opening our new Tokyo hub to better serve entertainment and sports markets in Asia-Pacific.",
  },

  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=1400&auto=format&fit=crop",
    date: "April 29, 2026",
    title: "Blog Heading",
    description:
      "A deep dive into the technology that keeps authenticity intact when translating across languages.",
  },

  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1400&auto=format&fit=crop",
    date: "April 29, 2026",
    title: "Blog Heading",
    description:
      "Lessons from the Australian Open partnership and what it means for the future of fan engagement.",
  },
];

function HomeBlogSection() {
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
        Insights & Resources
      </span>
    </div>

    {/* HEADING */}
    <h2 className="font-heading text-2xl font-semibold leading-tight text-white md:text-4xl">
      Our Latest{" "}
      <span className="text-[var(--color-secondary-400)]">
        Stories
      </span>
    </h2>

    {/* DESCRIPTION */}
    <p className="mt-5 max-w-2xl font-mono text-sm leading-8 text-white">
      Explore insights, innovations, and real-world stories shaping
      the future of robotics, AI systems, and intelligent automation.
    </p>
  </div>

  {/* RIGHT CTA */}
  <div className="flex items-center">
    <button className="btn-primary">
      <span>All Stories →</span>
    </button>
  </div>
</div>

        {/* BLOG GRID */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 xl:grid-cols-3">
          {blogs.map((blog, index) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeBlogSection;