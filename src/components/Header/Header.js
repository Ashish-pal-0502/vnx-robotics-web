

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { BsGlobe } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

import MobileMenu from "./MobileMenu";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      // Use requestAnimationFrame for smoother performance
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Don't hide header when at the very top
          if (currentScrollY <= 50) {
            setIsVisible(true);
          }
          // Scrolling down & past the header height (150px)
          else if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
            setIsVisible(false); // Hide header
          } 
          // Scrolling up
          else if (currentScrollY < lastScrollY.current) {
            setIsVisible(true); // Show header
          }
          
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    {
      name: t("navbar.homepage"),
      href: "/",
      description:
        "Identity, vision, and core capabilities.",
    },
    {
      name: t("navbar.industries"),
      href: "/industries",
      description:
        "Warehouse, manufacturing, robotics, agriculture, embedded systems.",
    },
    {
      name: t("navbar.solutions"),
      href: "/solutions",
      description:
        "Automation systems, warehouse systems, robotics, software, integration.",
    },
    {
      name: t("navbar.robotics"),
      href: "/robotics",
      description:
        "Quadrupeds, autonomous systems, robotics platforms.",
    },
    {
      name: t("navbar.about"),
      href: "/about",
      description:
        "Vision, leadership philosophy, collaborations, team, latest updates.",
    },
    {
      name: t("navbar.careers"),
      href: "/careers",
      description:
        "Engineering culture, robotics, automation, embedded systems growth.",
    },
  ];

  return (
    <>
      {/* HEADER */}
      <header 
        className={`fixed top-4 left-0 z-50 font-heading flex w-full justify-center transition-all duration-500 ease-in-out ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-32 opacity-0"
        }`}
      >
        
        {/* NAVBAR */}
        <div className="w-[95%] max-w-7xl rounded-full border border-white/15 bg-black/40 backdrop-blur-xl px-6 py-4 shadow-2xl">
          
          <div className="flex items-center justify-between">
            
            {/* LOGO */}
            <Link href="/" className="flex items-center">
              <Image
                src="/icons/vnxlogo.png"
                alt="VNX Robotics"
                width={70}
                height={30}
                priority
                className="h-auto w-auto object-contain"
              />
            </Link>

            {/* DESKTOP NAV - CENTERED */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-regular text-white absolute left-1/2 transform -translate-x-1/2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="transition duration-300 hover:text-gray-300 whitespace-nowrap"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-4">
              
              {/* LANGUAGE */}
              <div
                className="relative hidden lg:block"
                onMouseEnter={() => setIsLangOpen(true)}
                onMouseLeave={() => setIsLangOpen(false)}
              >
                <button className="rounded-full border border-white/20 p-2 text-white transition hover:bg-white/10">
                  <BsGlobe size={16} />
                </button>

                {isLangOpen && (
                  <div className="absolute right-0 mt-0 w-24 overflow-hidden rounded-xl border border-white/10 bg-black/80 backdrop-blur-xl">
                    {languages.map((lang) => {
                      const isActive = i18n.language === lang.code;

                      return (
                        <div
                          key={lang.code}
                          onClick={() => changeLanguage(lang.code)}
                          className={`flex cursor-pointer items-center justify-between px-3 py-2 text-sm text-white transition ${
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
                className="hidden lg:flex items-center rounded-full border border-white px-5 py-2 text-sm text-white transition-all duration-300 hover:bg-white hover:text-black"
              >
                {t("navbar.contactBtn")}
              </Link>

              {/* MOBILE MENU BUTTON */}
              <button
                onClick={() => setOpen(true)}
                className="text-white lg:hidden"
              >
                <FiMenu size={28} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <MobileMenu
        open={open}
        setOpen={setOpen}
        navLinks={navLinks}
      />
    </>
  );
}