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
  FiSearch,
  FiX,
  FiFilter,
  FiGrid,
  FiList,
  FiEye,
  FiClock,
  FiTag,
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
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("list");

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
      setBlogs(response?.data?.blogs || []);
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
      "Are you sure you want to delete this blog? This action cannot be undone.",
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
     SEARCH & FILTER
  ========================= */
  const filteredBlogs = useMemo(() => {
    let filtered = blogs;

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((blog) => {
        const cleanHeading = stripHtml(blog.heading).toLowerCase();
        const cleanDescription = stripHtml(
          blog.mdesc || blog.content,
        ).toLowerCase();
        return cleanHeading.includes(query) || cleanDescription.includes(query);
      });
    }

    // Apply sorting
    if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === "title") {
      filtered.sort((a, b) =>
        stripHtml(a.heading).localeCompare(stripHtml(b.heading)),
      );
    }

    return filtered;
  }, [blogs, searchQuery, sortBy]);

  /* =========================
     PAGINATION
  ========================= */
  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);

  const paginatedBlogs = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBlogs.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredBlogs, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  /* =========================
     HIGHLIGHT TEXT
  ========================= */
  const highlightText = (text, query) => {
    if (!query || !text) return text;
    const regex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi",
    );
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark
          key={index}
          className="bg-yellow-200 text-gray-900 px-0.5 rounded"
        >
          {part}
        </mark>
      ) : (
        part
      ),
    );
  };

  /* =========================
     LOADING SKELETON
  ========================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-pulse">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div className="space-y-3">
                  <div className="h-8 w-48 bg-gray-200 rounded-lg"></div>
                  <div className="h-4 w-64 bg-gray-100 rounded-lg"></div>
                </div>
                <div className="h-12 w-32 bg-gray-100 rounded-xl"></div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-32 bg-gray-100 rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-[#1f3b57] to-[#2c4d6e] rounded-xl shadow-lg">
                <FiFileText className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Blog Management
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Manage, edit and organize your blog posts
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="flex gap-3">
              <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-100">
                <p className="text-xs text-gray-500 uppercase">Total Blogs</p>
                <p className="text-2xl font-bold text-[#1f3b57]">
                  {blogs.length}
                </p>
              </div>
              {searchQuery && (
                <div className="bg-blue-50 rounded-xl px-4 py-2 shadow-sm border border-blue-100">
                  <p className="text-xs text-blue-600 uppercase">
                    Search Results
                  </p>
                  <p className="text-2xl font-bold text-blue-700">
                    {filteredBlogs.length}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Search and Filters Bar */}
          <div className="border-b border-gray-100 bg-gray-50/50 p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <FiSearch
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search blogs by title or description..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full pl-11 pr-10 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#1f3b57]/20 focus:border-[#1f3b57] transition"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FiX size={18} />
                  </button>
                )}
              </div>

              {/* Sort and View Options */}
              <div className="flex gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#1f3b57]/20 text-sm"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="title">Sort by Title</option>
                </select>

                <div className="flex border border-gray-200 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-3 px-4 transition ${viewMode === "list" ? "bg-[#1f3b57] text-white" : "text-gray-600 hover:bg-gray-50"}`}
                    title="List View"
                  >
                    <FiList size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-3 px-4 transition ${viewMode === "grid" ? "bg-[#1f3b57] text-white" : "text-gray-600 hover:bg-gray-50"}`}
                    title="Grid View"
                  >
                    <FiGrid size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Empty State */}
          {filteredBlogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
                {searchQuery ? (
                  <FiSearch size={40} className="text-gray-400" />
                ) : (
                  <FiFileText size={40} className="text-gray-400" />
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {searchQuery ? "No Matching Blogs Found" : "No Blogs Yet"}
              </h3>
              <p className="text-gray-500 max-w-md">
                {searchQuery
                  ? `No blogs match "${searchQuery}". Try a different search term.`
                  : "There are currently no blog posts available."}
              </p>
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="mt-6 px-6 py-2 bg-[#1f3b57] text-white rounded-xl hover:bg-[#2a4d72] transition"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Blog List View */}
              {viewMode === "list" && (
                <div className="divide-y divide-gray-100">
                  {paginatedBlogs.map((blog, index) => {
                    const cleanHeading = stripHtml(blog.heading);
                    const cleanDescription = stripHtml(
                      blog.mdesc || blog.content,
                    );
                    const firstImage =
                      blog.images?.[0]?.url || blog.image?.[0]?.url;

                    return (
                      <div
                        key={blog._id}
                        className="p-4 md:p-6 hover:bg-gray-50 transition group"
                      >
                        <div className="flex flex-col md:flex-row gap-4">
                          {/* Image */}
                          {firstImage && (
                            <div className="relative md:w-48 h-48 md:h-32 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                              <img
                                src={firstImage}
                                alt={cleanHeading}
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                              />
                            </div>
                          )}

                          {/* Content */}
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg md:text-xl text-gray-800 mb-2 line-clamp-1">
                              {searchQuery
                                ? highlightText(
                                    cleanHeading || "Untitled",
                                    searchQuery,
                                  )
                                : cleanHeading || "Untitled"}
                            </h3>

                            <p className="text-gray-500 text-sm leading-6 line-clamp-2 mb-3">
                              {searchQuery && cleanDescription
                                ? highlightText(
                                    cleanDescription.slice(0, 150),
                                    searchQuery,
                                  )
                                : cleanDescription?.slice(0, 150) ||
                                  "No description available"}
                            </p>

                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <div className="flex items-center gap-4 text-xs text-gray-400">
                                <div className="flex items-center gap-1">
                                  <FiCalendar size={12} />
                                  {new Date(
                                    blog.createdAt,
                                  ).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-1">
                                  <FiClock size={12} />
                                  {new Date(blog.createdAt).toLocaleTimeString(
                                    [],
                                    { hour: "2-digit", minute: "2-digit" },
                                  )}
                                </div>
                                {blog.category && (
                                  <div className="flex items-center gap-1">
                                    <FiTag size={12} />
                                    {blog.category}
                                  </div>
                                )}
                              </div>

                              <div className="flex gap-2">
                                <button
                                  onClick={() => onEdit(blog)}
                                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1f3b57] text-white text-sm hover:bg-[#2a4d72] transition shadow-sm"
                                >
                                  <FiEdit2 size={14} />
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(blog._id)}
                                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 text-sm hover:bg-red-100 transition"
                                >
                                  <FiTrash2 size={14} />
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
              )}

              {/* Blog Grid View */}
              {viewMode === "grid" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                  {paginatedBlogs.map((blog) => {
                    const cleanHeading = stripHtml(blog.heading);
                    const cleanDescription = stripHtml(
                      blog.mdesc || blog.content,
                    );
                    const firstImage =
                      blog.images?.[0]?.url || blog.image?.[0]?.url;

                    return (
                      <div
                        key={blog._id}
                        className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300"
                      >
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden bg-gray-100">
                          {firstImage ? (
                            <img
                              src={firstImage}
                              alt={cleanHeading}
                              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                              <FiFileText size={48} className="text-gray-400" />
                            </div>
                          )}
                          <div className="absolute top-2 right-2">
                            <span className="bg-black/50 backdrop-blur text-white text-xs px-2 py-1 rounded-full">
                              {new Date(blog.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[3rem]">
                            {searchQuery
                              ? highlightText(
                                  cleanHeading || "Untitled",
                                  searchQuery,
                                )
                              : cleanHeading || "Untitled"}
                          </h3>

                          <p className="text-gray-500 text-sm leading-6 line-clamp-3 mb-4 min-h-[4.5rem]">
                            {cleanDescription?.slice(0, 100) ||
                              "No description available"}
                          </p>

                          <div className="flex gap-2">
                            <button
                              onClick={() => onEdit(blog)}
                              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#1f3b57] text-white text-sm hover:bg-[#2a4d72] transition"
                            >
                              <FiEdit2 size={14} />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(blog._id)}
                              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-50 text-red-600 text-sm hover:bg-red-100 transition"
                            >
                              <FiTrash2 size={14} />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="border-t border-gray-100 px-4 py-5 md:px-6 bg-gray-50/50">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-500">
                      Showing{" "}
                      <span className="font-semibold text-gray-700">
                        {paginatedBlogs.length}
                      </span>{" "}
                      of{" "}
                      <span className="font-semibold text-gray-700">
                        {filteredBlogs.length}
                      </span>{" "}
                      blogs
                      {searchQuery && (
                        <span className="ml-2 text-blue-600">(Filtered)</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 flex-wrap justify-center">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2 text-sm font-medium"
                      >
                        <FiChevronLeft size={16} />
                        Previous
                      </button>

                      <div className="hidden sm:flex gap-2">
                        {Array.from(
                          { length: Math.min(5, totalPages) },
                          (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                              pageNum = i + 1;
                            } else if (currentPage <= 3) {
                              pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                              pageNum = totalPages - 4 + i;
                            } else {
                              pageNum = currentPage - 2 + i;
                            }

                            return (
                              <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={`w-10 h-10 rounded-lg text-sm font-semibold transition ${
                                  currentPage === pageNum
                                    ? "bg-[#1f3b57] text-white shadow-md"
                                    : "bg-white border border-gray-200 hover:bg-gray-50 text-gray-700"
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          },
                        )}
                      </div>

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2 text-sm font-medium"
                      >
                        Next
                        <FiChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
