import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaClock } from "react-icons/fa";

const BlogCard = ({ blogData }) => {
  const wordsPerMinute = 200;
  const wordCount = blogData?.content?.split(/\s+/).length || 0;
  const readTime = Math.ceil(wordCount / wordsPerMinute);

  const cleanHeading =
    blogData?.heading?.replace(/<[^>]*>/g, "") || "Blog Post";
  const shortHeading =
    cleanHeading.length > 60
      ? cleanHeading.substring(0, 60) + "..."
      : cleanHeading;

  const cleanContent = blogData?.content?.replace(/<[^>]*>/g, "") || "";
  const previewContent =
    cleanContent.length > 100
      ? cleanContent.substring(0, 100) + "..."
      : cleanContent;

  return (
    <motion.div whileHover={{ y: -8 }} className="group">
      <div className="w-full border border-amber-200 font-primary rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white flex flex-col h-full">
        <div className="relative h-48 overflow-hidden">
          <Link href={`/blogs/${encodeURIComponent(blogData?._id)}`}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="relative h-full"
            >
              {blogData?.image?.[0]?.url ? (
                <Image
                  className="object-cover"
                  src={blogData.image[0]?.url}
                  alt={cleanHeading}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-amber-100 to-orange-100 flex items-center justify-center"></div>
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {/* <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full">
                  Honey Blog
                </span>
              </div> */}
            </motion.div>
          </Link>
        </div>

        <div className="flex flex-col grow p-6">
          <div className="mb-4">
            <div className="flex items-center gap-2 text-sm text-[#211D1DBF] mb-2">
              <FaClock className="w-4 h-4" />
              <span>{readTime} min read</span>
              <span className="mx-2">•</span>
              <span className="text-[#211D1DBF]">Sweet Read</span>
            </div>

            <Link href={`/blogs/${encodeURIComponent(blogData?._id)}`}>
              <h3 className="font-bold text-xl text-gray-900 hover:text-amber-600 transition-colors truncate mb-3">
                {shortHeading}
              </h3>
            </Link>

            <p className="text-gray-600 text-sm line-clamp-2 mb-4">
              {previewContent}
            </p>
          </div>

          <div className="mt-auto pt-4 border-t border-amber-100">
            <div className="flex items-center justify-between">
              <Link
                href={`/blogs/${encodeURIComponent(blogData?._id)}`}
                className="flex items-center gap-2 text-[#E56A5C] transition-colors group/read"
              >
                <span>Read Full Story</span>
                <motion.span
                  animate={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  className="inline-block"
                >
                  <FaArrowRight className="w-4 h-4 group-hover/read:translate-x-1 transition-transform" />
                </motion.span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
