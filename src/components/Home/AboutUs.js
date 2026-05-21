"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  return (
    <section className="bg-black text-white py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* LEFT IMAGE SECTION */}
        <div className="relative w-full flex justify-center">
          {/* OUTER BORDER BOX */}
          <div className="absolute -top-6 -right-6 w-[90%] h-[90%] border border-white/40 rounded-2xl"></div>

          {/* IMAGE */}
          <div className="relative w-full max-w-md rounded-2xl overflow-hidden">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhLBrRWq1cK4oiLri1KNXBpqrrsoWrVKx2_w&s"
              alt="about robotics"
              width={500}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-6">
            About Us
          </h2>

          <p className="text-gray-400 leading-relaxed mb-8">
            We build intelligent robotics solutions designed for real-world
            applications in industrial automation and smart systems. Our focus
            is on delivering precision, efficiency, and innovation through
            advanced AI-powered technologies.
            <br />
            <br />
            From autonomous robots to scalable automation platforms, we help
            businesses transform operations and stay ahead in the future of
            technology.
          </p>

          {/* BUTTON */}
          <Link
            href="/about"
            className="inline-block px-6 py-3 border border-white rounded-full hover:bg-white hover:text-black transition"
          >
            Know More
          </Link>
        </div>
      </div>
    </section>
  );
}
