

"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { BsGlobe } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function MobileMenu({ open, setOpen, navLinks }) {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const languages = [
    { code: "en", label: "ENG" },
    { code: "vi", label: "VIE" },
    { code: "ja", label: "JPN" },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed inset-0 z-999 bg-black"
        >
          {/* TOP BAR */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
            <h2 className="text-white text-xl font-semibold">
              Menu
            </h2>

            <button
              onClick={() => setOpen(false)}
              className="text-white"
            >
              <FiX size={30} />
            </button>
          </div>

          {/* NAVIGATION */}
          <div className="flex flex-col h-[calc(100vh-80px)] overflow-y-auto px-6 py-4">
            <div className="flex flex-col gap-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.08 * index,
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="group block"
                  >
                    <div className="flex items-end justify-between border-b border-white/10 pb-4">
                      <div>
                        <h3 className="text-2xl font-medium text-white group-hover:text-gray-300 transition">
                          {link.name}
                        </h3>

                        <p className="mt-2 text-sm text-gray-400 max-w-xs">
                          {link.description}
                        </p>
                      </div>

                      <span className="text-gray-500 text-xl">
                        →
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}

              {/* LANGUAGE SELECTOR IN MOBILE */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * navLinks.length }}
                className="pt-4"
              >
                <div className="border-b border-white/10 pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-medium text-white">
                      Language
                    </h3>
                    <button
                      onClick={() => setIsLangOpen(!isLangOpen)}
                      className="rounded-full border border-white/20 p-2 text-white transition hover:bg-white/10"
                    >
                      <BsGlobe size={20} />
                    </button>
                  </div>
                  
                  {isLangOpen && (
                    <div className="mt-3 space-y-2">
                      {languages.map((lang) => {
                        const isActive = i18n.language === lang.code;
                        return (
                          <div
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={`flex cursor-pointer items-center justify-between px-4 py-3 rounded-lg transition ${
                              isActive
                                ? "bg-white/20 font-semibold"
                                : "hover:bg-white/10"
                            }`}
                          >
                            <span className="text-white text-lg">
                              {lang.label}
                            </span>
                            {isActive && <FaCheck size={14} className="text-white" />}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* CONTACT BUTTON IN MOBILE */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * (navLinks.length + 1) }}
                className="pt-2"
              >
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center rounded-full border border-white px-6 py-3 text-white text-lg font-medium transition-all duration-300 hover:bg-white hover:text-black w-full"
                >
                  {t("navbar.contactBtn")}
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}