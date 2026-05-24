"use client";

import { motion } from "framer-motion";

function BlogCard({ blog, index }) {
  return (
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
        {/* DATE */}
        <p className="font-body text-xs text-white/80">
          {blog.date}
        </p>

        {/* TITLE */}
        <h3
          className="
            mt-3
            font-body
            text-lg
            font-regulae
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
          "
        >
          {blog.description}
        </p>
      </div>
    </motion.div>
  );
}

export default BlogCard;