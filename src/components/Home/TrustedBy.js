"use client";

import { motion } from "framer-motion";

const logos = [
  "https://img.freepik.com/free-vector/colorful-letter-gradient-logo-design_474888-2309.jpg?semt=ais_hybrid&w=740&q=80",
  "https://images-platform.99static.com//M_JP7kgnSN9bGBbY6C4b5uKOUmw=/115x78:615x578/fit-in/500x500/99designs-contests-attachments/86/86740/attachment_86740648",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG7uUjJ1OVysvtKhIz3kScBz9EtR1slcxrdQ&s",
  "https://cdn.dribbble.com/userupload/33433742/file/original-221b856958a5221ea81722dd5a90cd0d.jpg?format=webp&resize=400x300&vertical=center",
  "https://dynamic.brandcrowd.com/asset/logo/aab13f0f-cf94-4331-b2b6-56fec5511224/logo-search-grid-1x?logoTemplateVersion=1&v=639059534289730000&layout=auto-1-1",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbdvFjdb4QKh4h_RKHQLhQCvR_9IAp1PWWaA&s",
];

export default function TrustedBy() {
  const duplicated = [...logos, ...logos];

  return (
    <section className="bg-black py-16 overflow-hidden">
      {/* TITLE */}
      <h2 className="text-center text-gray-400 text-sm mb-10">Trusted by</h2>

      {/* MARQUEE */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-16 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
        >
          {duplicated.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center min-w-40 opacity-70 hover:opacity-100 transition"
            >
              <img
                src={logo}
                alt="company logo"
                className="h-10 object-contain grayscale hover:grayscale-0 transition duration-300"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
