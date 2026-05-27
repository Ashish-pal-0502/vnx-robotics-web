"use client";

import { motion } from "framer-motion";
import Link from "next/link";

function BlogCard({ blog, index }) {
  return (
    <Link href={`/blogs/${blog?.slug}`}>
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
          delay: index * 0.12,
        }}
        viewport={{ once: true }}
        whileHover={{
          y: -4,
        }}
        className="group cursor-pointer"
      >
        {/* IMAGE */}
        <div className="overflow-hidden rounded-sm">
          <img
            src={blog.image[0]?.url}
            alt={blog.title}
            className="
              h-[220px]
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-[1.03]
            "
          />
        </div>

        {/* CONTENT */}
        <div className="pt-5">
          {/* DATE */}
          <p className="font-body text-xs text-white/80">
            {new Date(blog?.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
              timeZone: "Asia/Kolkata",
            })}
          </p>

          {/* TITLE */}
          <h3
            className="
    mt-3
    font-body
    text-lg
    font-regular
    text-white
    transition-colors
    duration-300
    group-hover:text-[var(--color-secondary-400)]
  "
            dangerouslySetInnerHTML={{
              __html: blog?.heading || "",
            }}
          />

          {/* DESC */}
          <div
            className="
    mt-2
    max-w-[95%]
    font-body
    text-xs
    text-white/80
    line-clamp-3
  "
            dangerouslySetInnerHTML={{
              __html: blog?.content || "",
            }}
          />

          {/* READ MORE LINK */}
          <div className="mt-4 flex items-center gap-2 text-xs font-mono text-[var(--color-secondary-400)] opacity-0 transition-all duration-300 group-hover:opacity-100">
            Read more <span className="text-sm">→</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default BlogCard;
