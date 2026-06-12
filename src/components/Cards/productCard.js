// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";
// import { IoArrowForward } from "react-icons/io5";
// import { useTranslation } from "react-i18next";

// export default function ProductCard({ product, index }) {
//   const { t } = useTranslation();
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 25 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4, delay: index * 0.08 }}
//       className="
//         group
//         relative
//         overflow-hidden
//         rounded-2xl
//         bg-white/[0.03]
//         border
//         border-white/10
//         transition-all
//         duration-500
//         hover:border-yellow-500
//         cursor-pointer
//       "
//     >
//       {/* Red top highlight */}
//       <div className="absolute left-0 top-0 h-1 w-0 bg-[#ff2a2a] transition-all duration-500 group-hover:w-full" />

//       {/* Image */}
//       <div className="aspect-[4/3] overflow-hidden">
//         <img
//           src={product.image?.[0]?.url || "https://placehold.co/800x600"}
//           alt={product.title}
//           className="
//             h-full
//             w-full
//             object-cover
//             transition-transform
//             duration-700
//             group-hover:scale-105
//           "
//           onError={(e) => {
//             if (
//               !e.target.src.includes("placehold.co") &&
//               !e.target.src.includes("placeholder")
//             ) {
//               e.target.src =
//                 "https://placehold.co/800x600/1a1a2e/white?text=No+Image";
//             }
//           }}
//         />
//       </div>

//       {/* Content */}
//       <div className="p-6">
//         <h3 className="font-heading text-2xl font-semibold text-white mb-3">
//           {product.title}
//         </h3>

//         <p className="text-sm leading-relaxed text-[var(--color-text-secondary)] line-clamp-3">
//           {product.description}
//         </p>

//         <Link
//           href={`/robotics/${product.slug || product._id}`}
//           className="
//             mt-6
//             inline-flex
//             items-center
//             gap-2
//             text-[var(--color-secondary-400)]
//             font-medium
//             opacity-0
//             translate-y-2
//             transition-all
//             duration-300
//             group-hover:opacity-100
//             group-hover:translate-y-0
//             cursor-pointer
//           "
//         >
//           {t("productCard.learnMore")}
//           <IoArrowForward />
//         </Link>
//       </div>
//     </motion.div>
//   );
// }


"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";
import { useTranslation } from "react-i18next";

export default function ProductCard({ product, index }) {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        bg-white/[0.03]
        border
        border-white/10
        transition-all
        duration-500
        hover:border-yellow-500
        cursor-pointer
        flex
        flex-col
        h-full
      "
    >
      {/* Red top highlight */}
      <div className="absolute left-0 top-0 h-1 w-0 bg-[#ff2a2a] transition-all duration-500 group-hover:w-full z-10" />

      {/* Image Container - 4:3 Aspect Ratio */}
      <div className="relative w-full pt-[75%] overflow-hidden bg-black/30">
        <img
          src={product.image?.[0]?.url || "https://placehold.co/800x600"}
          alt={product.title}
          className="absolute top-0 left-0 w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            if (
              !e.target.src.includes("placehold.co") &&
              !e.target.src.includes("placeholder")
            ) {
              e.target.src =
                "https://placehold.co/800x600/1a1a2e/white?text=No+Image";
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Content - Reduced padding like RobotCard */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-heading text-lg font-semibold text-white mb-1 line-clamp-2">
          {product.title}
        </h3>

        <p className="font-mono text-xs text-[var(--color-text-secondary)] mb-3 line-clamp-3 flex-1">
          {product.description}
        </p>

        <Link
          href={`/robotics/${product.slug || product._id}`}
          className="
            inline-flex
            items-center
            gap-1.5
            font-mono
            text-xs
            text-[var(--color-secondary-400)]
            hover:gap-2
            transition-all
            mt-auto
            w-fit
          "
        >
          {t("productCard.learnMore")}
          <IoArrowForward size={12} />
        </Link>
      </div>
    </motion.div>
  );
}