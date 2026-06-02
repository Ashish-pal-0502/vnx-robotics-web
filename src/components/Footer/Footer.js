"use client";

import Link from "next/link";
import {
  FaInstagram,
  FaLinkedinIn,
  FaArrowRight,
  FaFacebookF,
  FaTiktok,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineLogin, HiOutlineLogout } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import useAuth from "@/auth/useAuth";
import apiClient from "@/api/client";
import toast from "react-hot-toast";

export default function Footer() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user, logOut } = useAuth();

  const handleLogout = async () => {
    try {
      const response = await apiClient.post("/user/logout");

      if (response?.ok) {
        toast.success(t("footer.logoutSuccess") || "Logged out successfully");

        logOut();
        router.replace("/");
      } else {
        toast.error(
          response?.data?.message ||
            t("footer.logoutFailed") ||
            "Logout failed",
        );
      }
    } catch (error) {
      console.error(error);
      toast.error(t("footer.logoutFailed") || "Logout failed");
    }
  };

  const footerLinks = [
    {
      title: t("footer.solutions"),
      links: [
        { name: t("footer.products"), href: "/products" },
        { name: t("footer.robotics"), href: "/robotics" },
        { name: t("footer.industries"), href: "/industries" },
      ],
    },
    {
      title: t("footer.resources"),
      links: [
        { name: t("footer.blogs"), href: "/blogs" },
        { name: t("footer.careers"), href: "/careers" },
        { name: t("footer.termsConditions"), href: "/terms-conditions" },
      ],
    },
    {
      title: t("footer.company"),
      links: [
        { name: t("footer.about"), href: "/aboutus" },
        { name: t("footer.contact"), href: "/contact" },
        { name: t("footer.privacyPolicy"), href: "/privacy-policy" },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[var(--color-dark-100)] text-white">
      {/* SUBTLE GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,136,219,0.08),transparent_35%)]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-12">
        {/* TOP */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* LEFT */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[3px] text-[var(--color-secondary-400)] mb-5">
              {t("footer.companyName")}
            </p>

            <h2 className="font-logo text-3xl md:text-5xl leading-none uppercase">
              {t("footer.tagline")}
            </h2>

            <p className="mt-5 max-w-md font-body text-sm leading-7 text-[var(--color-text-secondary)]">
              {t("footer.description")}
            </p>

            <div className="mt-8 flex items-center gap-3">
              {user ? (
                <>
                  {/* USER INFO */}
                  <div className="hidden sm:flex flex-col mr-2">
                    <span className="text-sm font-semibold text-white leading-none">
                      {user?.name}
                    </span>

                    <span className="text-[11px] uppercase tracking-[0.18em] text-white/40 mt-1">
                      {user?.userType}
                    </span>
                  </div>

                  {/* DASHBOARD */}
                  {user && user.userType === "admin" && (
                    <button
                      onClick={() => router.push("/dashboard")}
                      className="btn-primary cursor-pointer flex items-center gap-2"
                    >
                      <span>{t("footer.dashboard")}</span>

                      <FaArrowRight size={12} className="opacity-80" />
                    </button>
                  )}

                  {/* LOGOUT */}
                  <button
                    onClick={handleLogout}
                    className="btn-secondary cursor-pointer flex items-center gap-2"
                  >
                    <span>{t("footer.logout")}</span>
                    <HiOutlineLogout size={17} />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => router.push("/login")}
                  className="btn-primary cursor-pointer flex items-center gap-2"
                >
                  <span>{t("footer.login")}</span>

                  <FaArrowRight size={12} className="opacity-80" />
                </button>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="font-heading text-sm uppercase tracking-[2px] mb-5 text-white">
                  {section.title}
                </h3>

                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="font-body text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-secondary-400)] transition"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-8 border-t border-white/10" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          {/* COPYRIGHT */}
          <p className="font-mono text-xs text-[var(--color-text-muted)]">
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </p>

          {/* SOCIAL + LINKS */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              {[
                {
                  icon: <FaLinkedinIn size={14} />,
                  href: "https://www.linkedin.com/company/vnxrobotics",
                },
                {
                  icon: <FaInstagram size={14} />,
                  href: "https://www.instagram.com/vnxrobotics/",
                },
                {
                  icon: <FaXTwitter size={14} />,
                  href: "https://x.com/vnxrobotics",
                },
                {
                  icon: <FaFacebookF size={13} />,
                  href: "https://www.facebook.com/profile.php?id=61590478439594",
                },
                {
                  icon: <FaTiktok size={14} />,
                  href: "https://www.tiktok.com/@vnxrobotics",
                },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[var(--color-text-secondary)] transition hover:border-[var(--color-primary-500)] hover:text-white"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
