"use client";

import React, { useEffect, useMemo, useState } from "react";
import apiClient from "@/api/client";
import toast from "react-hot-toast";
import {
  FiEdit2,
  FiTrash2,
  FiCalendar,
  FiFileText,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const ITEMS_PER_PAGE = 5;

const stripHtml = (html) => {
  if (!html) return "";

  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const BlogList = ({ onEdit }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  /* =========================
     FETCH BLOGS
  ========================= */
  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const response = await apiClient.get("/blog/get", {
        params: {
          page: 1,
          limit: 100,
        },
      });

      setBlogs(response?.data?.data?.blogs || []);
    } catch (error) {
      console.error("Fetch blogs failed:", error);

      toast.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  /* =========================
     DELETE BLOG
  ========================= */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?",
    );

    if (!confirmDelete) return;

    try {
      const res = await apiClient.delete(`/blog/delete/${id}`);

      toast.success(res?.data?.message || "Blog deleted successfully");

      fetchBlogs();
    } catch (error) {
      console.error("Delete failed:", error);

      toast.error("Failed to delete blog");
    }
  };

  /* =========================
     PAGINATION
  ========================= */
  const totalPages = Math.ceil(blogs.length / ITEMS_PER_PAGE);

  const paginatedBlogs = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return blogs.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [blogs, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================
     LOADING UI
  ========================= */
  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
        {/* HEADER */}
        <div className="border-b border-gray-200 px-5 py-5 md:px-8 bg-gradient-to-r from-[#f8fbff] to-[#fffdf7]">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-gray-200 animate-pulse" />

              <div className="space-y-2">
                <div className="h-5 w-44 rounded bg-gray-200 animate-pulse" />

                <div className="h-4 w-32 rounded bg-gray-100 animate-pulse" />
              </div>
            </div>

            <div className="h-16 w-32 rounded-2xl bg-gray-100 animate-pulse" />
          </div>
        </div>

        {/* SKELETON */}
        <div className="p-4 md:p-6 space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 p-4"
            >
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-2xl bg-gray-200 animate-pulse shrink-0" />

                <div className="flex-1 space-y-3">
                  <div className="h-5 w-52 rounded bg-gray-200 animate-pulse" />

                  <div className="h-4 w-full rounded bg-gray-100 animate-pulse" />

                  <div className="h-4 w-3/4 rounded bg-gray-100 animate-pulse" />

                  <div className="flex justify-between items-center pt-2 gap-3 flex-wrap">
                    <div className="h-4 w-32 rounded bg-gray-100 animate-pulse" />

                    <div className="flex gap-2">
                      <div className="h-10 w-20 rounded-xl bg-gray-200 animate-pulse" />

                      <div className="h-10 w-20 rounded-xl bg-red-100 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
      {/* HEADER */}
      <div className="border-b border-gray-200 px-5 py-5 md:px-8 bg-gradient-to-r from-[#f8fbff] to-[#fffdf7]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1f3b57] to-[#31597f] shadow-lg">
              <FiFileText className="text-white text-2xl" />
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1f3b57]">
                Blogs Management
              </h2>

              <p className="text-sm text-gray-500">
                Manage all blogs
              </p>
            </div>
          </div>

          {/* TOTAL */}
          <div className="rounded-2xl border border-gray-200 bg-white px-5 py-3 shadow-sm w-fit">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Total Blogs
            </p>

            <h3 className="text-2xl font-bold text-[#1f3b57]">
              {blogs.length}
            </h3>
          </div>
        </div>
      </div>

      {/* EMPTY */}
      {blogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#eef5ff] mb-5">
            <FiFileText className="text-4xl text-[#1f3b57]" />
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            No Blogs Found
          </h3>

          <p className="text-gray-500">
            There are currently no blogs available.
          </p>
        </div>
      ) : (
        <>
          {/* BLOG LIST */}
          <div className="p-4 md:p-6 space-y-4">
            {paginatedBlogs.map((blog) => {
              const cleanHeading = stripHtml(blog.heading);

              const cleanDescription = stripHtml(
                blog.mdesc || blog.content,
              );

              return (
                <div
                  key={blog._id}
                  className="border border-gray-200 rounded-2xl bg-white p-4 md:p-5 hover:shadow-md transition"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* IMAGE */}
                    {blog.image?.[0]?.url && (
                      <img
                        src={blog.image[0].url}
                        alt={cleanHeading}
                        className="w-full sm:w-24 md:w-28 h-52 sm:h-24 md:h-28 rounded-2xl object-cover border border-gray-200 shrink-0"
                      />
                    )}

                    {/* CONTENT */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base md:text-lg text-[#1f3b57] line-clamp-1">
                        {cleanHeading || "Untitled Blog"}
                      </h3>

                      <p className="text-sm text-gray-500 line-clamp-2 leading-6 mt-1">
                        {cleanDescription?.slice(0, 120) ||
                          "No description"}
                      </p>

                      {/* FOOTER */}
                      <div className="mt-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <FiCalendar size={13} />

                          {new Date(blog.createdAt).toLocaleDateString()}
                        </div>

                        {/* ACTIONS */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <button
                            onClick={() => onEdit(blog)}
                            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#1f3b57] text-white text-sm hover:bg-[#2a4d72] transition"
                          >
                            <FiEdit2 size={15} />
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(blog._id)}
                            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 text-sm hover:bg-red-100 transition"
                          >
                            <FiTrash2 size={15} />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="border-t border-gray-200 px-4 py-5 md:px-8 bg-[#fafcff]">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <p className="text-sm text-gray-500">
                  Showing page{" "}
                  <span className="font-semibold text-[#111827]">
                    {currentPage}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-[#111827]">
                    {totalPages}
                  </span>
                </p>

                <div className="flex items-center gap-2 flex-wrap justify-center">
                  {/* PREVIOUS */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <FiChevronLeft />
                    Previous
                  </button>

                  {/* PAGE BUTTONS */}
                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1,
                  ).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`h-11 w-11 rounded-xl text-sm font-semibold transition ${
                        currentPage === page
                          ? "bg-[#1f3b57] text-white shadow-md"
                          : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  {/* NEXT */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                    <FiChevronRight />
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BlogList;