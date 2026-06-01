"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const logos = [
  { src: "/partnerLogo/IVS.png", alt: "IVS Partner" },
  { src: "/partnerLogo/IMACS.png", alt: "IMACS Partner" },
  {
    src: "/partnerLogo/brain_health_lab.jpeg",
    alt: "Brain Health Lab Partner",
  },
  { src: "/partnerLogo/CTgroup.png", alt: "CT Group Partner" },
  { src: "/partnerLogo/ITR.png", alt: "ITR Partner" },
  { src: "/partnerLogo/shoeagtech.png", alt: "Shoe Ag Tech Partner" },
];

export default function TrustedBy() {
  const { t } = useTranslation();
  const duplicated = [...logos, ...logos];

  return (
    <section className="relative overflow-hidden bg-[var(--color-dark-100)] py-5">
      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* BLUE GLOW */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-[#006db1]/20 blur-3xl" />

      {/* YELLOW GLOW */}
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#ffba22]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* TOP LABEL */}
        <div className="mb-5 flex items-center gap-3">
          <div className="h-[2px] w-12 bg-[var(--color-secondary-400)]" />
          <span className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-secondary-400)]">
            {t("trustedBy.industryRecognition")}
          </span>
        </div>

        {/* HEADING */}
        <div className="mb-14 max-w-2xl">
          <h2 className="font-heading text-2xl font-semibold uppercase leading-tight text-[var(--color-text-primary)] md:text-4xl">
            {t("trustedBy.headingPrefix")}{" "}
            <span className="text-[var(--color-secondary-400)]">
              {t("trustedBy.headingHighlight")}
            </span>{" "}
            {t("trustedBy.headingSuffix")}
          </h2>

          <p className="mt-5 max-w-2xl font-mono text-sm leading-8 text-[var(--color-text-secondary)]">
            {t("trustedBy.description")}
          </p>
        </div>

        {/* LOGO STRIP */}
        <div className="relative overflow-hidden rounded-[32px] border border-white/8 bg-white/[0.02] backdrop-blur-xl">
          {/* FADE LEFT */}
          <div className="absolute left-0 top-0 z-10 h-full w-28 bg-gradient-to-r from-[var(--color-dark-100)] to-transparent" />

          {/* FADE RIGHT */}
          <div className="absolute right-0 top-0 z-10 h-full w-28 bg-gradient-to-l from-[var(--color-dark-100)] to-transparent" />

          <motion.div
            className="flex w-max items-center gap-10 py-5"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 24,
              ease: "linear",
            }}
          >
            {duplicated.map((logo, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -4,
                  scale: 1.03,
                }}
                transition={{
                  duration: 0.18,
                }}
                className="
                  group
                  flex
                  min-w-[180px]
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-white/6
                  bg-white/[0.015]
                  px-6
                  py-4
                  transition-all
                  duration-200
                  hover:border-[#006db1]/30
                  hover:bg-[#006db1]/[0.04]
                "
              >
                <img
                  src={logo.src}
                  alt={t(`trustedBy.partners.${logo.alt.replace(/ /g, "")}`)}
                  className="
                    h-22
                    object-contain
                    grayscale
                    opacity-60
                    transition-all
                    duration-300
                    group-hover:grayscale-0
                    group-hover:opacity-100
                  "
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
