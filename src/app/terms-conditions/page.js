"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { useTranslation } from "react-i18next";

export default function TermsPage() {
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
              {t("termsPage.backToHome")}
            </button>

            {/* Title */}
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              {t("termsPage.title")}
            </h1>
            <p className="font-body text-[var(--color-text-secondary)] mb-8">
              {t("termsPage.lastUpdated", {
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
            {/* 1. Acceptance */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-white mb-3">
                {t("termsPage.acceptanceTitle")}
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                {t("termsPage.acceptanceText")}
              </p>
            </div>

            {/* 2. Use of Services */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-white mb-3">
                {t("termsPage.useOfServicesTitle")}
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed mb-3">
                {t("termsPage.useOfServicesText")}
              </p>
              <ul className="list-disc pl-6 space-y-2 font-body text-[var(--color-text-secondary)]">
                <li>{t("termsPage.useOfServicesItem1")}</li>
                <li>{t("termsPage.useOfServicesItem2")}</li>
                <li>{t("termsPage.useOfServicesItem3")}</li>
                <li>{t("termsPage.useOfServicesItem4")}</li>
              </ul>
            </div>

            {/* 3. Intellectual Property */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-white mb-3">
                {t("termsPage.intellectualPropertyTitle")}
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                {t("termsPage.intellectualPropertyText")}
              </p>
            </div>

            {/* 4. User Accounts */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-white mb-3">
                {t("termsPage.userAccountsTitle")}
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                {t("termsPage.userAccountsText")}
              </p>
            </div>

            {/* 5. Limitation of Liability */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-white mb-3">
                {t("termsPage.limitationLiabilityTitle")}
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                {t("termsPage.limitationLiabilityText")}
              </p>
            </div>

            {/* 6. Privacy */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-white mb-3">
                {t("termsPage.privacyTitle")}
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                {t("termsPage.privacyText")}{" "}
                <Link
                  href="/privacy-policy"
                  className="text-[var(--color-secondary-400)] hover:underline"
                >
                  {t("termsPage.privacyLink")}
                </Link>{" "}
                {t("termsPage.privacyTextSuffix")}
              </p>
            </div>

            {/* 7. Modifications */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-white mb-3">
                {t("termsPage.modificationsTitle")}
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                {t("termsPage.modificationsText")}
              </p>
            </div>

            {/* 8. Contact */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-white mb-3">
                {t("termsPage.contactTitle")}
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                {t("termsPage.contactText")}{" "}
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
                {t("termsPage.copyright", { year: new Date().getFullYear() })}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
