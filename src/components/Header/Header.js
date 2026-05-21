"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BsGlobe } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const [open, setOpen] = useState(false);
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

  const navLinks = [
    { name: t("navbar.home"), href: "/" },
    { name: t("navbar.about"), href: "/about" },
    { name: t("navbar.products"), href: "/products" },
    { name: t("navbar.careers"), href: "/careers" },
    { name: t("navbar.blogs"), href: "/blogs" },
  ];

  return (
    <header className="fixed top-4 left-0 w-full z-50 flex justify-center">
      {/* FLOATING NAVBAR CONTAINER */}
      <div className="w-[95%] max-w-7xl px-6 py-6 rounded-full bg-black/20 backdrop-blur-lg border border-white/20 shadow-lg flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-1">
          <span className="text-2xl font-bold text-blue-500">VN</span>
          <span className="text-2xl font-bold text-yellow-400">X</span>
          <span className="text-xs tracking-widest text-white ml-1">
            ROBOTICS
          </span>
        </Link>

        {/* NAV LINKS */}
        <nav className="hidden lg:flex items-center gap-10 text-white text-sm font-medium">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className="hover:text-gray-300 transition"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {/* LANGUAGE */}
          <div
            className="relative"
            onMouseEnter={() => setIsLangOpen(true)}
            onMouseLeave={() => setIsLangOpen(false)}
          >
            <button className="p-2 rounded-full border border-white/30 text-white hover:bg-white/10">
              <BsGlobe size={16} />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-0 w-24 bg-black/80 backdrop-blur-md border border-white/20 rounded-md shadow-lg overflow-hidden">
                {languages.map((lang) => {
                  const isActive = i18n.language === lang.code;
                  return (
                    <div
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`flex justify-between items-center px-3 py-2 text-sm cursor-pointer text-white ${
                        isActive
                          ? "bg-white/20 font-semibold"
                          : "hover:bg-white/10"
                      }`}
                    >
                      {lang.label}
                      {isActive && <FaCheck size={12} />}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* CONTACT BUTTON */}
          <Link
            href="/contact"
            className="hidden lg:block px-5 py-2 rounded-full border border-white text-white text-sm hover:bg-white hover:text-black transition"
          >
            Contact us
          </Link>

          {/* MOBILE MENU */}
          <button
            className="lg:hidden text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div className="absolute top-20 w-[95%] bg-black/90 backdrop-blur-lg border border-white/20 rounded-xl p-5 lg:hidden">
          <div className="flex flex-col gap-4 text-white">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="hover:text-gray-300"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 text-center px-5 py-2 rounded-full border border-white hover:bg-white hover:text-black transition"
            >
              Contact us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
