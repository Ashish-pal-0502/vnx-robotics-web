

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { BsGlobe } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { IoArrowForward } from "react-icons/io5";
import { useState, useEffect } from "react";
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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <AnimatePresence mode="wait">
      {open && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[998] bg-black/60 backdrop-blur-sm"
          />
          
          {/* Sidebar Menu */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="fixed right-0 top-0 bottom-0 z-[999] w-full max-w-xl bg-black/95 backdrop-blur-xl shadow-2xl"
          >
           

            {/* TOP BAR */}
<motion.div 
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1, duration: 0.4 }}
  className="flex items-center justify-between px-6 py-6 border-b border-white/10"
>
  <Link href="/" onClick={() => setOpen(false)}>
    <Image
      src="/icons/vnxlogo.png"
      alt="VNX Robotics"
      width={60}
      height={40}
      priority
      className="h-auto w-auto object-contain"
    />
  </Link>

  <button
    onClick={() => setOpen(false)}
    className="text-white transition-transform hover:scale-110 active:scale-95"
  >
    <FiX size={30} />
  </button>
</motion.div>

            {/* NAVIGATION - with hidden scrollbar */}
            <div className="flex flex-col h-[calc(100vh-80px)] overflow-y-auto px-6 py-4 no-scrollbar">
              <div className="flex flex-col gap-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.1 * index,
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="group block"
                    >
                      <div className="flex items-end justify-between border-b border-white/10 pb-4 transition-all duration-300 hover:border-white/30">
                        <div>
                          <h3 className=" text-xl  md:text-2xl font-regular font-heading text-white group-hover:text-[#0088db] transition-colors duration-300">
                            {link.name}
                          </h3>

                          <p className="mt-2 text-xs md:text-sm font-mono text-gray-300 max-w-xs group-hover:text-gray-300 transition-colors duration-300">
                            {link.description}
                          </p>
                        </div>

                        <motion.div
                          whileHover={{ x: 5 }}
                          className="text-gray-500 text-xl group-hover:text-[#0088db] transition-all duration-300"
                        >
                          <IoArrowForward size={20} />
                        </motion.div>
                      </div>
                    </Link>
                  </motion.div>
                ))}

                {/* LANGUAGE SELECTOR IN MOBILE */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: 0.1 * navLinks.length, 
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                  className="pt-4"
                >
                  <div className="border-b border-white/10 pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-2xl font-medium font-heading text-white">
                        Language
                      </h3>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsLangOpen(!isLangOpen)}
                        className="rounded-full border border-white/20 p-2 text-white transition-all duration-300 hover:bg-white/10 hover:border-white/40"
                      >
                        <BsGlobe size={20} />
                      </motion.button>
                    </div>
                    
                    <AnimatePresence>
                      {isLangOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="mt-3 space-y-2 overflow-hidden"
                        >
                          {languages.map((lang, idx) => {
                            const isActive = i18n.language === lang.code;
                            return (
                              <motion.div
                                key={lang.code}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                onClick={() => changeLanguage(lang.code)}
                                className={`flex cursor-pointer items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 ${
                                  isActive
                                    ? "bg-[#0088db]/20 font-semibold border border-[#0088db]/50"
                                    : "hover:bg-white/10"
                                }`}
                              >
                                <span className={`text-lg font-mono ${isActive ? "text-[#0088db]" : "text-white"}`}>
                                  {lang.label}
                                </span>
                                {isActive && <FaCheck size={14} className="text-[#0088db]" />}
                              </motion.div>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                {/* CONTACT BUTTON IN MOBILE */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: 0.1 * (navLinks.length + 1), 
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                  className="pt-2"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href="/contact"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-white text-lg font-medium transition-all duration-300 hover:bg-white hover:text-black hover:border-white w-full backdrop-blur-sm font-heading"
                    >
                      {t("navbar.contactBtn")}
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}