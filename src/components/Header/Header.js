"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Services", href: "/services" },
    { name: "Technologies", href: "/technologies" },
    { name: "3D Prototype", href: "/3d-prototype" },
    { name: "Blogs", href: "/blogs" },
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
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
