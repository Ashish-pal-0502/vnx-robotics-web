"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import useAuth from "@/auth/useAuth";
import apiClient from "@/api/client";
import toast from "react-hot-toast";

export default function Footer() {
  const router = useRouter();
const { user, logOut } = useAuth();


const handleLogout = async () => {
  try {
    const response = await apiClient.post("/user/logout");
    // console.log("resopsne of logout",response)

    if (response?.ok) {
      toast.success("Logged out successfully");

      logOut();              //  clear frontend auth
      router.replace("/");   //  redirect
    } else {
      toast.error(response?.data?.message || "Logout failed");
    }
  } catch (error) {
    console.error(error);
    toast.error("Logout failed");
  }
};
  return (
    <footer className=" bg-linear-to-r from-black via-[#0a0a23] to-[#2d0b5a] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* TOP SECTION */}
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          {/* LEFT - SOCIAL */}
          <div>
            <div className="flex gap-4 mb-6">
              <div className="border border-gray-600 p-3 rounded-full cursor-pointer hover:bg-white hover:text-black transition">
                <FaXTwitter />
              </div>
              <div className="border border-gray-600 p-3 rounded-full cursor-pointer hover:bg-white hover:text-black transition">
                <FaFacebookF />
              </div>
              <div className="border border-gray-600 p-3 rounded-full cursor-pointer hover:bg-white hover:text-black transition">
                <FaInstagram />
              </div>
              <div className="border border-gray-600 p-3 rounded-full cursor-pointer hover:bg-white hover:text-black transition">
                <FaLinkedinIn />
              </div>
            </div>

            {/* LOGIN BUTTON */}
       {user ? (
  <button
    onClick={handleLogout}
    className="bg-red-500 cursor-pointer text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition"
  >
    Logout
  </button>
) : (
  <button
    onClick={() => router.push("/login")}
    className="bg-white cursor-pointer text-black px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition"
  >
    Login
  </button>
)}
          </div>

          {/* RIGHT LINKS */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 text-sm">
            {/* COMPANY */}
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/products">Products</Link>
                </li>
                <li>
                  <Link href="/blogs">Blogs</Link>
                </li>
                <li>
                  <Link href="/careers">Careers</Link>
                </li>
              </ul>
            </div>

            {/* CONTACT */}
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/contact">Contact Form</Link>
                </li>
                <li>
                  <Link href="/support">Help and Support</Link>
                </li>
                <li>
                  <Link href="/faqs">FAQs</Link>
                </li>
              </ul>
            </div>

            {/* LEGAL */}
            <div>
              <h3 className="font-semibold mb-4">Legal Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/cookie-policy">Cookie Policy</Link>
                </li>
                <li>
                  <Link href="/disclaimer">Disclaimer</Link>
                </li>
                <li>
                  <Link href="/copyright">Copyright</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-300 gap-4">
          {/* LOGO + COPYRIGHT */}
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-blue-400">VNX</span>
            <span className="text-xs tracking-widest">ROBOTICS</span>
            <span className="ml-4">
              © {new Date().getFullYear()} VNX Robotics. All Rights Reserved.
            </span>
          </div>

          {/* TERMS */}
          <div className="flex gap-3">
            <Link href="/terms">Terms & Conditions</Link>
            <span>-</span>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
