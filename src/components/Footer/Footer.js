import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-secondary-400 text-[#9E5413] mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">VNX Robotics</h2>
          <p className="text-sm leading-relaxed">
            Delivering advanced robotics, automation, and AI-driven solutions
            for modern industries. Innovation meets precision.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/blogs">Blogs</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Technologies</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/technologies">AI & Robotics</Link>
            </li>
            <li>
              <Link href="/technologies">Automation Systems</Link>
            </li>
            <li>
              <Link href="/3d-prototype">3D Prototyping</Link>
            </li>
            <li>
              <Link href="/technologies">IoT Solutions</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: info@vnxrobotics.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Location: India</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#9E5413]/30 py-4 text-center text-sm">
        © {new Date().getFullYear()} VNX Robotics. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
