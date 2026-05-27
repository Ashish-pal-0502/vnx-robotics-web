"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  IoCallOutline,
  IoCheckmarkCircle,
  IoDocumentTextOutline,
  IoLocationOutline,
  IoMailOutline,
  IoPersonOutline,
  IoSendOutline,
} from "react-icons/io5";
import emailjs from "@emailjs/browser";

export default function ContactPage() {
  const sectionRefs = {
    hero: useRef(null),
    form: useRef(null),
  };

  const formRef = useRef(null);

  const isInView = {
    hero: useInView(sectionRefs.hero, { once: true, amount: 0.3 }),
    form: useInView(sectionRefs.form, { once: true, amount: 0.2 }),
  };

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    inquiryType: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const inquiryTypes = [
    "Robotics Consulting",
    "Co-creation Partnership",
    "Dedicated Engineering Teams",
    "Careers",
    "General Inquiry",
    "Technology Collaboration",
  ];

  // EmailJS configuration - Replace with your actual keys
  const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    // Log the submitted values to console
    console.log("=== Contact Form Submission ===");
    console.log("Name:", formData.name);
    console.log("Phone:", formData.phone);
    console.log("Email:", formData.email);
    console.log("Inquiry Type:", formData.inquiryType);
    console.log("Message:", formData.message);
    console.log("==============================");

    // Prepare template parameters for EmailJS
    const templateParams = {
      user_name: formData.name,
      email: formData.email,
      phone: formData.phone,
      inquiryType: formData.inquiryType,
      message: formData.message,
      time: new Date().toLocaleString(),
    };

    try {
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      );

      setIsSubmitted(true);

      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        inquiryType: "",
        message: "",
      });

      // Hide success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Email sending failed:", error);
      setErrorMessage(
        "Failed to send message. Please try again or contact us directly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="bg-[var(--color-dark-100)]">
      {/* ========== HERO SECTION - REDESIGNED ========== */}
      <section
        ref={sectionRefs.hero}
        className="relative pb-16 pt-32 overflow-hidden"
      >
        {/* Simple Grid Background */}
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
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-3xl h-[40vh] rounded-full bg-[#0088db]/8 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView.hero ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--color-secondary-400)]/20 bg-[var(--color-secondary-400)]/5 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary-400)]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-secondary-400)]">
                Get in Touch
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5">
              Let's Start a{" "}
              <span className="text-[var(--color-secondary-400)]">
                Conversation
              </span>
            </h1>

            {/* Description */}
            <p className="font-mono text-base md:text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Tell us what you need — robotics consulting, co-creation, or
              dedicated engineering teams.
            </p>

            {/* Second Line Highlight */}
            <p className="font-mono text-base md:text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto mt-2">
              <span className="text-[var(--color-secondary-400)]">
                We're always looking for passionate individuals
              </span>{" "}
              to join our mission in shaping the future of robotics.
            </p>

            {/* Decorative Line */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[var(--color-secondary-400)]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary-400)]" />
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[var(--color-secondary-400)]" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== CONTACT FORM SECTION ========== */}
      <section ref={sectionRefs.form} className="relative pb-10">
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

        <div className="absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-[#006db1]/15 blur-3xl" />
        <div className="absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-[#ffba22]/5 blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView.form ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-[var(--color-dark-200)] to-[var(--color-dark-300)] rounded-2xl border border-white/10 p-8 md:p-12"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* NAME */}
              <div>
                <label className="block font-mono text-sm text-[var(--color-text-secondary)] mb-2 uppercase tracking-wide">
                  NAME
                </label>
                <div className="relative">
                  <IoPersonOutline
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                    size={18}
                  />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-white/10 bg-white/[0.02] pl-12 pr-4 py-3 font-mono text-base text-white placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-secondary-400)] focus:outline-none transition-colors"
                    placeholder="Jonnie Dawson"
                  />
                </div>
              </div>

              {/* PHONE NUMBER */}
              <div>
                <label className="block font-mono text-sm text-[var(--color-text-secondary)] mb-2 uppercase tracking-wide">
                  PHONE NUMBER
                </label>
                <div className="relative">
                  <IoCallOutline
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                    size={18}
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-white/10 bg-white/[0.02] pl-12 pr-4 py-3 font-mono text-base text-white placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-secondary-400)] focus:outline-none transition-colors"
                    placeholder="+91 00000 00000"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="block font-mono text-sm text-[var(--color-text-secondary)] mb-2 uppercase tracking-wide">
                  EMAIL
                </label>
                <div className="relative">
                  <IoMailOutline
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                    size={18}
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-white/10 bg-white/[0.02] pl-12 pr-4 py-3 font-mono text-base text-white placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-secondary-400)] focus:outline-none transition-colors"
                    placeholder="hello@vnxrobotics.com"
                  />
                </div>
              </div>

              {/* INQUIRY TYPE */}
              <div>
                <label className="block font-mono text-sm text-[var(--color-text-secondary)] mb-2 uppercase tracking-wide">
                  INQUIRY TYPE
                </label>
                <select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 font-mono text-base text-white focus:border-[var(--color-secondary-400)] focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="" className="bg-[var(--color-dark-300)]">
                    Select inquiry type
                  </option>
                  {inquiryTypes.map((type, idx) => (
                    <option
                      key={idx}
                      value={type}
                      className="bg-[var(--color-dark-300)]"
                    >
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* MESSAGE */}
              <div>
                <label className="block font-mono text-sm text-[var(--color-text-secondary)] mb-2 uppercase tracking-wide">
                  MESSAGE
                </label>
                <div className="relative">
                  <IoDocumentTextOutline
                    className="absolute left-4 top-4 text-[var(--color-text-muted)]"
                    size={18}
                  />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full rounded-lg border border-white/10 bg-white/[0.02] pl-12 pr-4 py-3 font-mono text-base text-white placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-secondary-400)] focus:outline-none transition-colors resize-none"
                    placeholder="I'd love to learn more about your services"
                  />
                </div>
              </div>

              {/* ERROR MESSAGE */}
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg bg-red-500/10 border border-red-500/30 p-4 text-center"
                >
                  <p className="font-mono text-sm text-red-400">
                    {errorMessage}
                  </p>
                </motion.div>
              )}

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send <IoSendOutline size={16} />
                  </>
                )}
              </button>

              {/* SUCCESS MESSAGE */}
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg bg-green-500/10 border border-green-500/30 p-4 text-center"
                >
                  <p className="font-mono text-sm text-green-400">
                    ✓ Thank you! Your inquiry has been sent. We'll get back to
                    you within 24-48 hours.
                  </p>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </section>

      {/* ========== CONTACT INFO SECTION ========== */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-[var(--color-dark-200)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView.form ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center p-6 rounded-xl border border-white/10 bg-white/[0.02]"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--color-secondary-400)]/10 flex items-center justify-center mx-auto mb-4">
                <IoCallOutline
                  size={24}
                  className="text-[var(--color-secondary-400)]"
                />
              </div>
              <h3 className="font-heading text-lg font-semibold text-white mb-2">
                Phone
              </h3>
              <p className="font-mono text-sm text-[var(--color-text-secondary)]">
                +91 00000 00000
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView.form ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center p-6 rounded-xl border border-white/10 bg-white/[0.02]"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--color-secondary-400)]/10 flex items-center justify-center mx-auto mb-4">
                <IoMailOutline
                  size={24}
                  className="text-[var(--color-secondary-400)]"
                />
              </div>
              <h3 className="font-heading text-lg font-semibold text-white mb-2">
                Email
              </h3>
              <p className="font-mono text-sm text-[var(--color-text-secondary)]">
                hello@vnxrobotics.com
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView.form ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center p-6 rounded-xl border border-white/10 bg-white/[0.02]"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--color-secondary-400)]/10 flex items-center justify-center mx-auto mb-4">
                <IoLocationOutline
                  size={24}
                  className="text-[var(--color-secondary-400)]"
                />
              </div>
              <h3 className="font-heading text-lg font-semibold text-white mb-2">
                Location
              </h3>
              <p className="font-mono text-sm text-[var(--color-text-secondary)]">
                Ho Chi Minh City, Vietnam
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== RESPONSE NOTE ========== */}
      <section className="relative py-12">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 text-[var(--color-text-muted)]">
            <IoCheckmarkCircle size={16} />
            <span className="font-mono text-xs">
              We typically respond within 24-48 hours
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
