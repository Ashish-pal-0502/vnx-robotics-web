"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import apiClient from "./../../api/client";
import Pagination from "./../Pagination/Pagination";
import BlogBanner from "./BlogBanner";
import BlogCard from "./BlogCard";

const BlogsDetails = () => {
  const [error, setError] = useState();
  const [blogList, setBlogList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getAllBlog(currentPage);
  }, [currentPage]);

  const getAllBlog = async (page = 1) => {
    try {
      setIsLoading(true);
      const response = await apiClient.get("/blog/get", {
        pageNumber: page,
        pageSize: 12,
      });
      console.log("reso", response);
      if (response.ok) {
        setBlogList(response?.data?.data);

        setTotalPages(response.data.pageCount || 1);
        setCurrentPage(page);
      } else {
        setError(response.status);
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen bg-linear-to-b from-amber-50 to-white">
  //       <Loader />
  //     </div>
  //   );
  // }

  const displayBlogs = blogList?.blogs || [];

  return (
    <div className="min-h-screen font-primary mt-20 bg-linear-to-b from-amber-50 via-white to-amber-25 font-figtree">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-6 h-6 bg-amber-200 rounded-full opacity-20"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(i) * 30, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto px-4 lg:px-0 py-8">
        <BlogBanner
          title="VNX Insights"
          subtitle="Exploring Robotics, AI Innovations, and the Future of Intelligent Automation"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          {displayBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 mt-5 lg:grid-cols-3 gap-8">
              {displayBlogs.map((blogData, index) => (
                <motion.div
                  key={blogData._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <BlogCard blogData={blogData} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-32 h-32 mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-amber-100 rounded-full opacity-50 animate-pulse"></div>
              </div>
              <h3 className="text-2xl font-bold text-amber-800 mb-3">
                No Sweet Stories Found
              </h3>
            </motion.div>
          )}
        </motion.div>

        {displayBlogs.length > 0 && totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BlogsDetails;
