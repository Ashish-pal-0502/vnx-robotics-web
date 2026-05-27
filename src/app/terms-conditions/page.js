"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

export default function TermsPage() {
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
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-secondary-400)] transition-colors mb-8 font-mono text-sm group"
            >
              <IoArrowBack
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back to Home
            </Link>

            {/* Title */}
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Terms & Conditions
            </h1>
            <p className="font-body text-[var(--color-text-secondary)] mb-8">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
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
                1. Acceptance of Terms
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                By accessing or using VNX Robotics' website and services, you
                agree to be bound by these Terms & Conditions. If you disagree
                with any part, please do not use our services.
              </p>
            </div>

            {/* 2. Use of Services */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-white mb-3">
                2. Use of Services
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed mb-3">
                You agree to use our services only for lawful purposes and in
                accordance with these terms. You shall not:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-body text-[var(--color-text-secondary)]">
                <li>Violate any applicable laws or regulations</li>
                <li>Interfere with or disrupt our services or servers</li>
                <li>
                  Attempt to gain unauthorized access to any part of our systems
                </li>
                <li>Use our services for any harmful or malicious purpose</li>
              </ul>
            </div>

            {/* 3. Intellectual Property */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-white mb-3">
                3. Intellectual Property
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                All content, trademarks, logos, and intellectual property on
                this site are owned by VNX Robotics. You may not reproduce,
                distribute, or modify any content without our explicit written
                consent.
              </p>
            </div>

            {/* 4. User Accounts */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-white mb-3">
                4. User Accounts
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                When you create an account, you are responsible for maintaining
                the confidentiality of your credentials. You agree to notify us
                immediately of any unauthorized use of your account.
              </p>
            </div>

            {/* 5. Limitation of Liability */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-white mb-3">
                5. Limitation of Liability
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                VNX Robotics shall not be liable for any indirect, incidental,
                or consequential damages arising from your use of our services.
                Our total liability shall not exceed the amount paid by you, if
                any.
              </p>
            </div>

            {/* 6. Privacy */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-white mb-3">
                6. Privacy Policy
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                Your privacy is important to us. Please review our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-[var(--color-secondary-400)] hover:underline"
                >
                  Privacy Policy
                </Link>{" "}
                to understand how we collect and use your information.
              </p>
            </div>

            {/* 7. Modifications */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-white mb-3">
                7. Modifications to Terms
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                We reserve the right to modify these terms at any time. Changes
                will be effective immediately upon posting. Your continued use
                of our services constitutes acceptance of the modified terms.
              </p>
            </div>

            {/* 8. Contact */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-white mb-3">
                8. Contact Us
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                If you have any questions about these Terms & Conditions, please
                contact us at:{" "}
                <a
                  href="mailto:legal@vnxrobotics.com"
                  className="text-[var(--color-secondary-400)] hover:underline"
                >
                  legal@vnxrobotics.com
                </a>
              </p>
            </div>

            {/* Divider */}
            <div className="pt-8 border-t border-white/10">
              <p className="font-mono text-xs text-[var(--color-text-muted)] text-center">
                © {new Date().getFullYear()} VNX Robotics. All rights reserved.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
