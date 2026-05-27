"use client";

import { motion } from "framer-motion";
import Link from "next/link";

function BlogCard({ blog, index }) {
  return (
    <Link href={`/blogs/${blog.id}`}>
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
            src={blog.image}
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
          {/* CATEGORY BADGE - Optional */}
          {/* {blog.category && (
            <div className="mb-2">
              <span className="inline-block rounded-full border border-[var(--color-secondary-400)]/30 bg-[var(--color-secondary-400)]/10 px-2 py-0.5 font-mono text-[10px] text-[var(--color-secondary-400)]">
                {blog.category}
              </span>
            </div>
          )} */}

          {/* DATE */}
          <p className="font-body text-xs text-white/80">{blog.date}</p>

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
          >
            {blog.title}
          </h3>

          {/* DESC */}
          <p
            className="
              mt-2
              max-w-[95%]
              font-body
              text-xs
              text-white/80
              line-clamp-3
            "
          >
            {blog.description}
          </p>

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
