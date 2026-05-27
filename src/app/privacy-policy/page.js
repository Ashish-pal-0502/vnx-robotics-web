"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

export default function PrivacyPolicyPage() {
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
              Privacy Policy
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
            {/* 1. Introduction */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-white mb-3">
                1. Introduction
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                At VNX Robotics, we take your privacy seriously. This Privacy
                Policy explains how we collect, use, disclose, and safeguard
                your information when you visit our website or use our services.
              </p>
            </div>

            {/* 2. Information We Collect */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-white mb-3">
                2. Information We Collect
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed mb-3">
                We may collect the following types of information:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-body text-[var(--color-text-secondary)]">
                <li>
                  Personal identification information (name, email address,
                  phone number)
                </li>
                <li>Company information (company name, industry, position)</li>
                <li>
                  Technical data (IP address, browser type, device information)
                </li>
                <li>Usage data (pages visited, time spent, interactions)</li>
              </ul>
            </div>

            {/* 3. How We Use Your Information */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-white mb-3">
                3. How We Use Your Information
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed mb-3">
                We use the collected information for:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-body text-[var(--color-text-secondary)]">
                <li>Providing and maintaining our services</li>
                <li>
                  Communicating with you about updates, promotions, or support
                </li>
                <li>Improving our website and user experience</li>
                <li>Analyzing usage patterns and trends</li>
                <li>Protecting against unauthorized or illegal activity</li>
              </ul>
            </div>

            {/* 4. Cookies & Tracking */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-white mb-3">
                4. Cookies & Tracking Technologies
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                We use cookies and similar tracking technologies to enhance your
                experience. You can control cookie preferences through your
                browser settings. However, disabling cookies may affect certain
                features of our website.
              </p>
            </div>

            {/* 5. Data Sharing */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-white mb-3">
                5. Data Sharing & Disclosure
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                We do not sell your personal information. We may share your data
                with trusted third-party service providers who assist in
                operating our website, conducting business, or serving you, as
                long as they agree to keep your information confidential.
              </p>
            </div>

            {/* 6. Data Security */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-white mb-3">
                6. Data Security
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                We implement industry-standard security measures to protect your
                information. However, no method of transmission over the
                internet is 100% secure, and we cannot guarantee absolute
                security.
              </p>
            </div>

            {/* 7. Your Rights */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-white mb-3">
                7. Your Privacy Rights
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed mb-3">
                Depending on your location, you may have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-body text-[var(--color-text-secondary)]">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </div>

            {/* 8. Third-Party Links */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-white mb-3">
                8. Third-Party Links
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                Our website may contain links to third-party sites. We are not
                responsible for the privacy practices or content of those sites.
                We encourage you to read their privacy policies.
              </p>
            </div>

            {/* 9. Children's Privacy */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-white mb-3">
                9. Children's Privacy
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                Our services are not intended for individuals under 16 years of
                age. We do not knowingly collect personal information from
                children under 16.
              </p>
            </div>

            {/* 10. Changes to Policy */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-white mb-3">
                10. Changes to This Privacy Policy
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                We may update this Privacy Policy from time to time. Changes
                will be posted on this page with an updated revision date. We
                encourage you to review this policy periodically.
              </p>
            </div>

            {/* 11. Contact Us */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-white mb-3">
                11. Contact Us
              </h2>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                If you have questions about this Privacy Policy or how we handle
                your data, please contact us at:{" "}
                <a
                  href="mailto:privacy@vnxrobotics.com"
                  className="text-[var(--color-secondary-400)] hover:underline"
                >
                  privacy@vnxrobotics.com
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
