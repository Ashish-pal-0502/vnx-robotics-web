"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const stripHtml = (html) => {
  if (!html) return "";
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

export default function RobotCard({ robot, index, isInView }) {
  const { t } = useTranslation();

  return (
    <motion.div
      key={robot._id || index}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group relative rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden transition-all duration-300 hover:border-[var(--color-primary-500)]/30 h-full flex flex-col"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={
            robot.images?.[0]?.url ||
            "https://placehold.co/800x600/1a1a2e/white?text=No+Image"
          }
          alt={stripHtml(robot.name)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            // Only change if it's not already the placeholder
            if (!e.target.src.includes("placehold.co")) {
              e.target.src =
                "https://placehold.co/800x600/1a1a2e/white?text=No+Image";
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute top-4 right-4">
          <span className="rounded-full bg-[var(--color-secondary-400)]/20 backdrop-blur-sm px-3 py-1 font-mono text-xs text-[var(--color-secondary-400)] border border-[var(--color-secondary-400)]/30">
            {t("robotCard.activeDevelopment")}
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-heading text-xl font-semibold text-white mb-2 line-clamp-1">
          {stripHtml(robot.name)}
        </h3>
        <p className="font-mono text-sm text-[var(--color-secondary-400)] mb-3">
          {robot.category || t("robotCard.roboticsPlatform")}
        </p>
        <p className="font-mono text-sm text-[var(--color-text-secondary)] mb-4 line-clamp-2 flex-1">
          {stripHtml(robot.description || t("robotCard.defaultDescription"))}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {robot.keyPoints?.slice(0, 3).map((point, tagIdx) => (
            <span
              key={tagIdx}
              className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-[var(--color-text-muted)]"
            >
              {point}
            </span>
          ))}
          {(!robot.keyPoints || robot.keyPoints.length === 0) && (
            <>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-[var(--color-text-muted)]">
                {t("robotCard.roboticsPlatform")}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-[var(--color-text-muted)]">
                {t("robotCard.intelligentSystems")}
              </span>
            </>
          )}
        </div>

        <Link
          href={`/robotics/${robot.slug || robot._id}`}
          className="inline-flex items-center gap-2 font-mono text-sm text-[var(--color-secondary-400)] hover:gap-3 transition-all mt-auto"
        >
          {t("robotCard.learnMore")} <IoArrowForward size={14} />
        </Link>
      </div>
    </motion.div>
  );
}
