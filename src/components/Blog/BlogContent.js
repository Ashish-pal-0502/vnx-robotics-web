"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Parser } from "html-to-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaQuoteLeft,
} from "react-icons/fa";
import apiClient from "./../../api/client";
// import Loader from "./../Utility/Loader";

const BlogContent = ({ blogid }) => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [readTime, setReadTime] = useState(0);
  const cleanHeading = data.heading?.replace(/<[^>]*>/g, "") || "Blog Post";

  useEffect(() => {
    fetchBlog();
  }, [blogid]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.get(`/blog/get/${blogid}`);

      const blog = response?.data?.data?.blog;

      if (!blog) {
        throw new Error("Blog not found");
      }

      setData(blog);

      // ⏱ Read time calculation
      const wordsPerMinute = 200;
      const wordCount = blog?.content?.split(/\s+/).length || 0;
      setReadTime(Math.ceil(wordCount / wordsPerMinute));
    } catch (error) {
      console.error("Fetch Blog Error:", error);
      setError(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };
  const cleanHtml = (html) => {
    if (!html) return "";

    let cleaned = html
      .replace(
        /<h([1-6])><strong>(.*?)<\/strong><\/h([1-6])>/g,
        "<h$1>$2</h$1>",
      )
      .replace(
        /<strong>(.*?)<\/strong>/g,
        "<strong class='text-[#E56A5C]'>$1</strong>",
      )
      .replace(/<h1>/g, "<h1 class='text-3xl font-bold text-black mt-8 mb-4'>")
      .replace(
        /<h2>/g,
        "<h2 class='text-2xl font-bold text-[#E56A5C] mt-6 mb-3'>",
      )
      .replace(
        /<h3>/g,
        "<h3 class='text-xl font-semibold text-[#E56A5C] mt-5 mb-2'>",
      )
      .replace(/<p>/g, "<p class='mb-4 text-gray-700 leading-relaxed'>")
      .replace(/<ul>/g, "<ul class='list-disc pl-6 mb-4 text-gray-700'>")
      .replace(/<ol>/g, "<ol class='list-decimal pl-6 mb-4 text-gray-700'>")
      .replace(/<li>/g, "<li class='mb-2'>")
      .replace(
        /<table>/g,
        "<table class='w-full border-collapse border border-amber-200 mb-6'>",
      )
      .replace(
        /<th>/g,
        "<th class='border border-amber-200 bg-amber-50 p-3 text-left'>",
      )
      .replace(/<td>/g, "<td class='border border-amber-200 p-3'>");

    return cleaned;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShare = async () => {
    if (!navigator.share) {
      console.log("Web Share API not supported");
      return;
    }

    await navigator.share({
      title: cleanHeading,
      text: "Check out this honey",
      url: window.location.href,
    });
  };

  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-linear-to-b from-amber-50 to-white">
  //       <Loader />
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-b font-primary from-amber-50 to-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md p-8"
        >
          <div className="w-32 h-32 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center"></div>
          <h2 className="text-2xl font-bold text-amber-800 mb-3">
            Sweet Error!
          </h2>
          <p className="text-amber-600 mb-6">{error}</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-amber-500 text-white rounded-full font-semibold hover:bg-amber-600 transition-colors"
          >
            Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-32 font-primary bg-linear-to-b from-amber-50 via-white to-amber-25 font-figtree">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-amber-200 rounded-full opacity-20"
            animate={{
              y: [0, -80, 0],
              x: [0, Math.sin(i) * 40, 0],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-amber-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 cursor-pointer text-gray-950 font-semibold"
          >
            <FaArrowLeft />
            <span>Back to Blogs</span>
          </button>
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          {data?.image?.[0] ? (
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent z-10"></div>
              <Image
                src={data.image[0]}
                alt={cleanHeading}
                width={1200}
                height={400}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          ) : (
            <div className="w-full h-64 bg-linear-to-r from-amber-200 to-orange-200 rounded-3xl flex items-center justify-center"></div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight ">
            {data.heading?.replace(/<[^>]*>/g, "") || "Blog Post"}
          </h1>

          <div className="flex relative flex-nowrap items-center justify-between text-sm text-[#211D1DBF] mb-8">
            <div className="flex flex-row gap-4 flex-wrap items-center">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="w-4 h-4" />
                <span>{formatDate(data.createdAt)}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaClock className="w-4 h-4" />
                <span>{readTime} min read</span>
              </div>

              <div className="flex items-center gap-2">
                <span>Motherland Honey</span>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="relative flex items-center justify-center w-6 h-6 md:w-9 md:h-9 p-2 rounded-full"
            >
              <Image
                src="/icons/share.png"
                alt="Share product"
                fill
                className="w-3 h-3 cursor-pointer md:w-5 md:h-5 object-contain"
              />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative mb-10"
        >
          <div className="bg-linear-to-r from-amber-50 to-orange-50 rounded-3xl p-8 border-l-4 border-amber-400">
            <FaQuoteLeft className="w-8 h-8 text-gray-700 mb-4" />
            <p className="text-xl italic text-[#E56A5C]">
              "Pure honey is nature's sweetest gift, carrying the essence of
              flowers and the wisdom of bees."
            </p>
            <p className="text-gray-950 mt-4 font-semibold">Motherland Honey</p>
          </div>
        </motion.div>

        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="prose prose-lg max-w-none"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-lg border border-amber-100">
            <AnimatePresence mode="wait">
              {Parser().parse(cleanHtml(data.content || ""))}
            </AnimatePresence>
          </div>
        </motion.article>
      </div>
    </div>
  );
};

export default BlogContent;
