// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import { useTranslation } from "react-i18next";
// import { BsGlobe } from "react-icons/bs";
// import { FaCheck } from "react-icons/fa";
// import { FiMenu, FiX } from "react-icons/fi";

// export default function Header() {
//   const [open, setOpen] = useState(false);
//   const [isLangOpen, setIsLangOpen] = useState(false);
//   const { t, i18n } = useTranslation();

//   const languages = [
//     { code: "en", label: "ENG" },
//     { code: "vi", label: "VIE" },
//     { code: "ja", label: "JPN" },
//   ];

//   const changeLanguage = (lng) => {
//     i18n.changeLanguage(lng);
//     setIsLangOpen(false);
//   };

//   const navLinks = [
//     { name: t("navbar.home"), href: "/" },
//     { name: t("navbar.about"), href: "/about" },
//     { name: t("navbar.products"), href: "/products" },
//     { name: t("navbar.careers"), href: "/careers" },
//     { name: t("navbar.blogs"), href: "/blogs" },
//   ];

//   return (
//     <header className="fixed top-4 left-0 w-full z-50 flex justify-center">
//       {/* FLOATING NAVBAR CONTAINER */}
//       <div className="w-[95%] max-w-7xl px-6 py-6 rounded-full bg-black/40 backdrop-blur-lg border border-white/20 shadow-lg flex items-center justify-between">
//         {/* LOGO */}
//         <Link href="/" className="flex items-center ">
//           <Image
//               src="/icons/vnxlogo.png"
//               alt="VNX Robotics"
//               width={60}
//               height={20}
//               priority
//               className="h-auto w-auto object-contain"
//             />
//         </Link>

//         {/* NAV LINKS */}
//         <nav className="hidden lg:flex items-center gap-10 text-white text-sm font-medium">
//           {navLinks.map((link, i) => (
//             <Link
//               key={i}
//               href={link.href}
//               className="hover:text-gray-300 transition"
//             >
//               {link.name}
//             </Link>
//           ))}
//         </nav>

//         {/* RIGHT SIDE */}
//         <div className="flex items-center gap-4">
//           {/* LANGUAGE */}
//           <div
//             className="relative"
//             onMouseEnter={() => setIsLangOpen(true)}
//             onMouseLeave={() => setIsLangOpen(false)}
//           >
//             <button className="p-2 rounded-full border border-white/30 text-white hover:bg-white/10">
//               <BsGlobe size={16} />
//             </button>

//             {isLangOpen && (
//               <div className="absolute right-0 mt-0 w-24 bg-black/80 backdrop-blur-md border border-white/20 rounded-md shadow-lg overflow-hidden">
//                 {languages.map((lang) => {
//                   const isActive = i18n.language === lang.code;
//                   return (
//                     <div
//                       key={lang.code}
//                       onClick={() => changeLanguage(lang.code)}
//                       className={`flex justify-between items-center px-3 py-2 text-sm cursor-pointer text-white ${
//                         isActive
//                           ? "bg-white/20 font-semibold"
//                           : "hover:bg-white/10"
//                       }`}
//                     >
//                       {lang.label}
//                       {isActive && <FaCheck size={12} />}
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>

//           {/* CONTACT BUTTON */}
//           <Link
//             href="/contact"
//             className="hidden lg:block px-5 py-2 rounded-full border border-white text-white text-sm hover:bg-white hover:text-black transition"
//           >
//             Contact us
//           </Link>

//           {/* MOBILE MENU */}
//           <button
//             className="lg:hidden text-white"
//             onClick={() => setOpen(!open)}
//           >
//             {open ? <FiX size={24} /> : <FiMenu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* MOBILE DROPDOWN */}
//       {open && (
//         <div className="absolute top-20 w-[95%] bg-black/90 backdrop-blur-lg border border-white/20 rounded-xl p-5 lg:hidden">
//           <div className="flex flex-col gap-4 text-white">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 href={link.href}
//                 onClick={() => setOpen(false)}
//                 className="hover:text-gray-300"
//               >
//                 {link.name}
//               </Link>
//             ))}

//             <Link
//               href="/contact"
//               onClick={() => setOpen(false)}
//               className="mt-2 text-center px-5 py-2 rounded-full border border-white hover:bg-white hover:text-black transition"
//             >
//               Contact us
//             </Link>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }



"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BsGlobe } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

import MobileMenu from "./MobileMenu";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const { i18n } = useTranslation();

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
      name: "Homepage",
      href: "/",
      description:
        "Identity, vision, and core capabilities.",
    },
    {
      name: "Industries",
      href: "/industries",
      description:
        "Warehouse, manufacturing, robotics, agriculture, embedded systems.",
    },
    {
      name: "Solutions",
      href: "/solutions",
      description:
        "Automation systems, warehouse systems, robotics, software, integration.",
    },
    {
      name: "Robotics",
      href: "/robotics",
      description:
        "Quadrupeds, autonomous systems, robotics platforms.",
    },
    {
      name: "About Us",
      href: "/about",
      description:
        "Vision, leadership philosophy, collaborations, team, latest updates.",
    },
    {
      name: "Careers",
      href: "/careers",
      description:
        "Engineering culture, robotics, automation, embedded systems growth.",
    },
    {
      name: "Contact",
      href: "/contact",
      description:
        "Industrial projects, partnerships, robotics collaboration, recruitment.",
    },
  ];

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-4 left-0 z-50 flex w-full justify-center">
        
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

            {/* DESKTOP NAV */}
            <nav className="hidden xl:flex items-center gap-10 text-sm font-medium text-white">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="transition duration-300 hover:text-gray-300"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-4">
              
              {/* LANGUAGE */}
              <div
                className="relative hidden md:block"
                onMouseEnter={() => setIsLangOpen(true)}
                onMouseLeave={() => setIsLangOpen(false)}
              >
                <button className="rounded-full border border-white/20 p-2 text-white transition hover:bg-white/10">
                  <BsGlobe size={16} />
                </button>

                {isLangOpen && (
                  <div className="absolute right-0 mt-3 w-24 overflow-hidden rounded-xl border border-white/10 bg-black/80 backdrop-blur-xl">
                    {languages.map((lang) => {
                      const isActive =
                        i18n.language === lang.code;

                      return (
                        <div
                          key={lang.code}
                          onClick={() =>
                            changeLanguage(lang.code)
                          }
                          className={`flex cursor-pointer items-center justify-between px-3 py-2 text-sm text-white transition ${
                            isActive
                              ? "bg-white/20 font-semibold"
                              : "hover:bg-white/10"
                          }`}
                        >
                          {lang.label}

                          {isActive && (
                            <FaCheck size={12} />
                          )}
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
                Contact us
              </Link>

              {/* MOBILE MENU BUTTON */}
              <button
                onClick={() => setOpen(true)}
                className="text-white xl:hidden"
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