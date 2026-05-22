"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

export default function MobileMenu({ open, setOpen, navLinks }) {
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
          <div className="flex flex-col justify-center h-[80vh] px-8">
            <div className="flex flex-col gap-8">
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
                        <h3 className="text-3xl font-medium text-white group-hover:text-gray-300 transition">
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
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}