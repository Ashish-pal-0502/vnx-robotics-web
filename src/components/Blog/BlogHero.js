"use client";
import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";

import Link from "next/link";
import Loader from "../loader/Loader";
import { ArrowRight } from "lucide-react";
import apiClient from "./../../api/client";
import Loader from "./../Utility/Loader";

const BlogHero = () => {
  const [error, setError] = useState();
  const [blogList, setBlogList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPageNo, setCurrentPageNo] = useState(1);

  useEffect(() => {
    getAllBlog();
  }, [currentPageNo]);

  const getAllBlog = async () => {
    try {
      const response = await apiClient.get("/blog", {
        pageNumber: currentPageNo,
      });
      if (response.ok) {
        setBlogList(response?.data);
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

  const allblogs = blogList.blogs;
  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mt-8 sm:mt-1 mx-auto p-5 sm:p-10 md:p-12 bg-white">
      <div className="  border-b mb-5 flex justify-between mt-4 md:mt-0">
        <div className="text-black flex items-center pb-2 pr-2 border-b-2 border-black uppercase ">
          <a href="#" className="font-semibold inline-block text-black text-xl">
            Blogs
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 lg:px-0">
        {allblogs && allblogs.length > 0 ? (
          allblogs.slice(0, 3).map((blogData) => (
            <div key={blogData._id} className="flex">
              <BlogCard blogData={blogData} />
            </div>
          ))
        ) : (
          <p>No blogs available</p>
        )}
      </div>

      <Link
        href="/new-arrivals"
        className="flex items-center justify-center gap-2 mt-10 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
      >
        <span>View All</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default BlogHero;
