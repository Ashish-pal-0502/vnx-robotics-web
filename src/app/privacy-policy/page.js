"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { useTranslation } from "react-i18next";

export default function PrivacyPolicyPage() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <main className="bg-[var(--color-dark-100)] min-h-screen">
      {/* Hero Section */}
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
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-secondary-400)] transition-colors mb-8 font-mono text-sm group cursor-pointer"
            >
              <IoArrowBack
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              {t("privacyPolicyPage.backToHome")}
            </button>

            {/* Title */}
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              {t("privacyPolicyPage.title")}
            </h1>
            <p className="font-body text-[var(--color-text-secondary)] mb-8">
              {t("privacyPolicyPage.lastUpdated", {
                date: new Date().toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }),
              })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* 1. Introduction */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-white mb-3">
                {t("privacyPolicyPage.introductionTitle")}
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                {t("privacyPolicyPage.introductionText")}
              </p>
            </div>

            {/* 2. Information We Collect */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-white mb-3">
                {t("privacyPolicyPage.infoCollectTitle")}
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed mb-3">
                {t("privacyPolicyPage.infoCollectText")}
              </p>
              <ul className="list-disc pl-6 space-y-2 font-body text-[var(--color-text-secondary)]">
                <li>{t("privacyPolicyPage.infoCollectItem1")}</li>
                <li>{t("privacyPolicyPage.infoCollectItem2")}</li>
                <li>{t("privacyPolicyPage.infoCollectItem3")}</li>
                <li>{t("privacyPolicyPage.infoCollectItem4")}</li>
              </ul>
            </div>

            {/* 3. How We Use Your Information */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-white mb-3">
                {t("privacyPolicyPage.howWeUseTitle")}
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed mb-3">
                {t("privacyPolicyPage.howWeUseText")}
              </p>
              <ul className="list-disc pl-6 space-y-2 font-body text-[var(--color-text-secondary)]">
                <li>{t("privacyPolicyPage.howWeUseItem1")}</li>
                <li>{t("privacyPolicyPage.howWeUseItem2")}</li>
                <li>{t("privacyPolicyPage.howWeUseItem3")}</li>
                <li>{t("privacyPolicyPage.howWeUseItem4")}</li>
                <li>{t("privacyPolicyPage.howWeUseItem5")}</li>
              </ul>
            </div>

            {/* 4. Cookies & Tracking */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-white mb-3">
                {t("privacyPolicyPage.cookiesTitle")}
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                {t("privacyPolicyPage.cookiesText")}
              </p>
            </div>

            {/* 5. Data Sharing */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-white mb-3">
                {t("privacyPolicyPage.dataSharingTitle")}
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                {t("privacyPolicyPage.dataSharingText")}
              </p>
            </div>

            {/* 6. Data Security */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-white mb-3">
                {t("privacyPolicyPage.dataSecurityTitle")}
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                {t("privacyPolicyPage.dataSecurityText")}
              </p>
            </div>

            {/* 7. Your Rights */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-white mb-3">
                {t("privacyPolicyPage.privacyRightsTitle")}
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed mb-3">
                {t("privacyPolicyPage.privacyRightsText")}
              </p>
              <ul className="list-disc pl-6 space-y-2 font-body text-[var(--color-text-secondary)]">
                <li>{t("privacyPolicyPage.privacyRightsItem1")}</li>
                <li>{t("privacyPolicyPage.privacyRightsItem2")}</li>
                <li>{t("privacyPolicyPage.privacyRightsItem3")}</li>
                <li>{t("privacyPolicyPage.privacyRightsItem4")}</li>
              </ul>
            </div>

            {/* 8. Third-Party Links */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-white mb-3">
                {t("privacyPolicyPage.thirdPartyTitle")}
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                {t("privacyPolicyPage.thirdPartyText")}
              </p>
            </div>

            {/* 9. Children's Privacy */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-white mb-3">
                {t("privacyPolicyPage.childrenPrivacyTitle")}
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                {t("privacyPolicyPage.childrenPrivacyText")}
              </p>
            </div>

            {/* 10. Changes to Policy */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-white mb-3">
                {t("privacyPolicyPage.changesTitle")}
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                {t("privacyPolicyPage.changesText")}
              </p>
            </div>

            {/* 11. Contact Us */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-white mb-3">
                {t("privacyPolicyPage.contactTitle")}
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                {t("privacyPolicyPage.contactText")}{" "}
                <a
                  href="mailto:info@vnxrobotics.com"
                  target="_blank"
                  className="text-[var(--color-secondary-400)] hover:underline"
                >
                  info@vnxrobotics.com
                </a>
              </p>
            </div>

            {/* Divider */}
            <div className="pt-8 border-t border-white/10">
              <p className="font-mono text-xs text-[var(--color-text-muted)] text-center">
                {t("privacyPolicyPage.copyright", {
                  year: new Date().getFullYear(),
                })}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
