"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BsGlobe } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState(false);

  const languages = [
    { code: "en", label: "ENG" },
    { code: "vi", label: "VIE" },
    { code: "ja", label: "JPN" },
  ];
  const changeLanguage = (lng) => {
    console.log("lang", lng);

    setIsLangOpen(false);
    i18n.changeLanguage(lng);
  };

  const navLinks = [
    { name: t("navbar.home"), href: "/" },
    { name: t("navbar.products"), href: "/products" },
    { name: t("navbar.services"), href: "/services" },
    { name: t("navbar.technologies"), href: "/technologies" },
    { name: t("navbar.prototype"), href: "/3d-prototype" },
    { name: t("navbar.blogs"), href: "/blogs" },
    { name: t("navbar.about"), href: "/about" },
    { name: t("navbar.careers"), href: "/careers" },
  ];

  return (
    <header className="w-full font-primary fixed top-0 left-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#FBDBA0]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-lg md:text-xl font-semibold tracking-wide text-[#9E5413] font-sans"
          >
            VNX Robotics
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[#9E5413] hover:text-[#F79E1C] transition duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div
            className="relative"
            onMouseEnter={() => setIsLangOpen(true)}
            onMouseLeave={() => setIsLangOpen(false)}
          >
            <button className="p-2 rounded-full hover:bg-gray-100">
              <BsGlobe size={18} />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 -mt-2 w-24 bg-white border rounded-lg shadow-md overflow-hidden">
                {languages.map((lang) => {
                  const isActive = i18n.language === lang.code;
                  return (
                    <div
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`flex justify-between px-3 py-2 text-sm cursor-pointer ${
                        isActive
                          ? "bg-gray-100 font-semibold"
                          : "hover:bg-gray-100"
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

          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="px-5 py-2 rounded-full bg-[#F79E1C] text-white text-sm font-medium hover:bg-[#9E5413] transition duration-300"
            >
              Contact Us
            </Link>
          </div>

          <button
            className="lg:hidden text-[#9E5413]"
            onClick={() => setOpen(!open)}
          >
            {open ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-[#FBDBA0]">
          <div className="flex flex-col px-4 py-5 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-[#9E5413] text-base font-medium hover:text-[#F79E1C] transition"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 text-center px-5 py-2 rounded-full bg-[#F79E1C] text-white font-medium hover:bg-[#9E5413] transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
