"use client";

import React, { useEffect, useMemo, useState } from "react";
import apiClient from "@/api/client";
import toast from "react-hot-toast";
import {
  FiEdit2,
  FiTrash2,
  FiExternalLink,
  FiBriefcase,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiMapPin,
  FiTag,
  FiClock,
  FiFilter,
  FiX,
  FiSearch,
  FiUsers,
  FiTrendingUp,
  FiAward,
} from "react-icons/fi";

const ITEMS_PER_PAGE = 6;

const ListCareer = ({ onEdit }) => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJobType, setSelectedJobType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [jobTypes, setJobTypes] = useState([]);

  /* =========================
     FETCH CAREERS
  ========================= */
  const fetchCareers = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/career/get-all");
      const careersData = response?.data?.data || [];
      setCareers(careersData);

      // Extract unique job types
      const uniqueJobTypes = [
        ...new Set(careersData.map((c) => c.jobType).filter(Boolean)),
      ];
      setJobTypes(uniqueJobTypes);
    } catch (error) {
      console.error("Fetch careers failed:", error);
      toast.error("Failed to fetch careers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  /* =========================
     DELETE CAREER
  ========================= */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this career opportunity?",
    );
    if (!confirmDelete) return;

    try {
      const res = await apiClient.delete(`/career/delete/${id}`);
      toast.success(res?.data?.message || "Career deleted successfully");
      fetchCareers();
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete career");
    }
  };

  /* =========================
     REMOVE HTML TAGS
  ========================= */
  const stripHtml = (html) => {
    if (!html) return "";
    return html
      .replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  /* =========================
     FILTERED CAREERS
  ========================= */
  const filteredCareers = useMemo(() => {
    let filtered = careers;

    // Apply job type filter
    if (selectedJobType !== "all") {
      filtered = filtered.filter(
        (career) => career.jobType === selectedJobType,
      );
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (career) =>
          stripHtml(career.title).toLowerCase().includes(query) ||
          stripHtml(career.description).toLowerCase().includes(query) ||
          (career.location && career.location.toLowerCase().includes(query)) ||
          (career.category && career.category.toLowerCase().includes(query)),
      );
    }

    return filtered;
  }, [careers, selectedJobType, searchQuery]);

  /* =========================
     PAGINATION
  ========================= */
  const totalPages = Math.ceil(filteredCareers.length / ITEMS_PER_PAGE);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedJobType, searchQuery]);

  const paginatedCareers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredCareers.slice(startIndex, endIndex);
  }, [filteredCareers, currentPage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* =========================
     GET JOB TYPE STYLES (Dark Theme)
  ========================= */
  const getJobTypeStyles = (jobType) => {
    const styles = {
      "Full Time": {
        bg: "bg-emerald-500/10",
        text: "text-emerald-400",
        border: "border-emerald-500/20",
        icon: "💼",
      },
      "Part Time": {
        bg: "bg-blue-500/10",
        text: "text-blue-400",
        border: "border-blue-500/20",
        icon: "⏰",
      },
      Internship: {
        bg: "bg-purple-500/10",
        text: "text-purple-400",
        border: "border-purple-500/20",
        icon: "🎓",
      },
      Contract: {
        bg: "bg-amber-500/10",
        text: "text-amber-400",
        border: "border-amber-500/20",
        icon: "📄",
      },
      Remote: {
        bg: "bg-indigo-500/10",
        text: "text-indigo-400",
        border: "border-indigo-500/20",
        icon: "🏠",
      },
    };
    return (
      styles[jobType] || {
        bg: "bg-gray-500/10",
        text: "text-gray-400",
        border: "border-gray-500/20",
        icon: "📌",
      }
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedJobType("all");
    setShowFilters(false);
  };

  // Calculate statistics
  const stats = useMemo(() => {
    const total = careers.length;
    const uniqueCategories = [
      ...new Set(careers.map((c) => c.category).filter(Boolean)),
    ].length;
    const jobTypeCount = careers.reduce((acc, curr) => {
      acc[curr.jobType] = (acc[curr.jobType] || 0) + 1;
      return acc;
    }, {});
    return { total, uniqueCategories, jobTypeCount };
  }, [careers]);

  /* =========================
     LOADING SKELETON (Dark Theme)
  ========================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#0b1020] to-[#050816] p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            {/* Header Skeleton */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-linear-to-br from-[#1f2638] to-[#1f2638] rounded-2xl"></div>
                <div className="space-y-2">
                  <div className="h-8 w-64 bg-[#1f2638] rounded-lg"></div>
                  <div className="h-4 w-48 bg-[#1f2638] rounded-lg"></div>
                </div>
              </div>
            </div>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-[#111827] rounded-2xl p-6 border border-[#27324a]"
                >
                  <div className="h-20 bg-[#1f2638] rounded-xl"></div>
                </div>
              ))}
            </div>

            {/* Content Skeleton */}
            <div className="bg-[#111827] rounded-2xl border border-[#27324a] overflow-hidden">
              <div className="p-6 space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-32 bg-[#1f2638] rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0b1020] to-[#050816] p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-linear-to-br from-[#0088db] to-[#006db1] rounded-2xl shadow-lg">
              <FiBriefcase className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold bg-linear-to-r from-[#0088db] to-[#ffba22] bg-clip-text text-transparent">
                Careers Management
              </h1>
              <p className="text-[#a1a1aa] mt-1">
                Manage and track all job opportunities
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Cards - Dark Theme */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#111827] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#27324a]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#a1a1aa] text-sm font-medium mb-1">
                  Total Positions
                </p>
                <p className="text-3xl font-bold text-[#f3f4f6]">
                  {stats.total}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                <FiBriefcase className="text-emerald-400" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-[#111827] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#27324a]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#a1a1aa] text-sm font-medium mb-1">
                  Categories
                </p>
                <p className="text-3xl font-bold text-[#f3f4f6]">
                  {stats.uniqueCategories}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                <FiTag className="text-purple-400" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-[#111827] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#27324a]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#a1a1aa] text-sm font-medium mb-1">
                  Job Types
                </p>
                <p className="text-3xl font-bold text-[#f3f4f6]">
                  {Object.keys(stats.jobTypeCount).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                <FiTrendingUp className="text-blue-400" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Card - Dark Theme */}
        <div className="bg-[#111827] rounded-2xl shadow-xl border border-[#27324a] overflow-hidden">
          {/* Search and Filters Bar */}
          <div className="p-6 border-b border-[#27324a] bg-[#111827]">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <FiSearch
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717a]"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search by title, description, location, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-10 py-3 rounded-xl border border-[#27324a] focus:border-[#0088db] focus:ring-2 focus:ring-[#0088db]/20 outline-none transition-all bg-[#0b1020] text-[#f3f4f6] placeholder:text-[#71717a]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#71717a] hover:text-[#a1a1aa]"
                  >
                    <FiX size={18} />
                  </button>
                )}
              </div>

              {/* Filter Toggle Button (Mobile) */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center justify-center gap-2 px-4 py-3 bg-[#0b1020] border border-[#27324a] rounded-xl hover:bg-[#1f2638] transition"
              >
                <FiFilter size={18} className="text-[#a1a1aa]" />
                <span className="font-medium text-[#f3f4f6]">Filters</span>
                {selectedJobType !== "all" && (
                  <span className="w-2 h-2 bg-[#ffba22] rounded-full"></span>
                )}
              </button>

              {/* Job Type Filters */}
              <div
                className={`${showFilters ? "flex" : "hidden"} lg:flex flex-wrap gap-2`}
              >
                <button
                  onClick={() => setSelectedJobType("all")}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedJobType === "all"
                      ? "bg-linear-to-r from-[#0088db] to-[#006db1] text-white shadow-md"
                      : "bg-[#0b1020] text-[#a1a1aa] hover:bg-[#1f2638] border border-[#27324a]"
                  }`}
                >
                  All Jobs
                </button>
                {jobTypes.map((type) => {
                  const styles = getJobTypeStyles(type);
                  return (
                    <button
                      key={type}
                      onClick={() => setSelectedJobType(type)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                        selectedJobType === type
                          ? "bg-linear-to-r from-[#0088db] to-[#006db1] text-white shadow-md"
                          : `${styles.bg} ${styles.text} border ${styles.border} hover:shadow-sm`
                      }`}
                    >
                      <span className="mr-1">{styles.icon}</span>
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Filters Display */}
            {(searchQuery || selectedJobType !== "all") && (
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[#27324a]">
                <span className="text-sm text-[#71717a]">Active filters:</span>
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#0088db]/10 text-[#0088db] rounded-lg text-xs">
                    Search: {searchQuery}
                    <button
                      onClick={() => setSearchQuery("")}
                      className="hover:text-[#006db1]"
                    >
                      <FiX size={12} />
                    </button>
                  </span>
                )}
                {selectedJobType !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-500/10 text-purple-400 rounded-lg text-xs">
                    Type: {selectedJobType}
                    <button
                      onClick={() => setSelectedJobType("all")}
                      className="hover:text-purple-300"
                    >
                      <FiX size={12} />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="text-sm text-[#71717a] hover:text-[#a1a1aa] underline"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Empty State - Dark Theme */}
          {filteredCareers.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <div className="w-32 h-32 bg-linear-to-br from-[#1f2638] to-[#1f2638] rounded-full flex items-center justify-center mb-6">
                <FiBriefcase className="text-5xl text-[#71717a]" />
              </div>
              <h3 className="text-2xl font-semibold text-[#f3f4f6] mb-2">
                {careers.length === 0
                  ? "No Careers Found"
                  : "No Matching Careers"}
              </h3>
              <p className="text-[#a1a1aa] max-w-md">
                {careers.length === 0
                  ? "Get started by creating your first career opportunity."
                  : "Try adjusting your search or filter criteria to find what you're looking for."}
              </p>
              {(searchQuery || selectedJobType !== "all") && (
                <button
                  onClick={clearFilters}
                  className="mt-6 px-6 py-2.5 btn-primary"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Career Cards Grid - Dark Theme */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {paginatedCareers.map((career) => {
                    const jobStyles = getJobTypeStyles(career.jobType);
                    const description = stripHtml(career.description);
                    const truncatedDesc =
                      description.length > 120
                        ? description.substring(0, 120) + "..."
                        : description;

                    return (
                      <div
                        key={career._id}
                        className="group bg-[#0b1020] rounded-2xl border border-[#27324a] hover:border-[#0088db]/30 hover:shadow-xl transition-all duration-300 overflow-hidden"
                      >
                        {/* Card Header */}
                        <div className="p-6 pb-4 border-b border-[#27324a]">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-[#f3f4f6] mb-2 line-clamp-2">
                                {stripHtml(career.title)}
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                <span
                                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-semibold ${jobStyles.bg} ${jobStyles.text} border ${jobStyles.border}`}
                                >
                                  <span>{jobStyles.icon}</span>
                                  {career.jobType}
                                </span>
                                {career.category && (
                                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#1f2638] text-[#a1a1aa] rounded-xl text-xs font-medium border border-[#27324a]">
                                    <FiTag size={12} />
                                    {career.category}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-1 ml-4">
                              <button
                                onClick={() => onEdit(career)}
                                className="p-2 text-[#71717a] hover:text-[#0088db] hover:bg-[#1f2638] rounded-xl transition-all duration-200"
                                title="Edit"
                              >
                                <FiEdit2 size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(career._id)}
                                className="p-2 text-[#71717a] hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200"
                                title="Delete"
                              >
                                <FiTrash2 size={18} />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-6 pt-4 space-y-4">
                          {/* Location */}
                          {career.location && (
                            <div className="flex items-center gap-2 text-sm text-[#a1a1aa]">
                              <FiMapPin
                                className="text-[#71717a] shrink-0"
                                size={16}
                              />
                              <span>{career.location}</span>
                            </div>
                          )}

                          {/* Description Preview */}
                          <div className="bg-[#050816] rounded-xl p-4 border border-[#27324a]">
                            <p className="text-sm text-[#a1a1aa] leading-relaxed">
                              {truncatedDesc || "No description provided"}
                            </p>
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-2 text-xs text-[#71717a]">
                              <FiCalendar size={14} />
                              <span>
                                Posted{" "}
                                {new Date(
                                  career.createdAt,
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            {career.applyLink && (
                              <a
                                href={career.applyLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 btn-primary text-sm"
                              >
                                Apply Now
                                <FiExternalLink size={14} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pagination - Dark Theme */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-[#27324a] bg-[#0b1020]/30">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-[#71717a]">
                      Showing{" "}
                      <span className="font-semibold text-[#f3f4f6]">
                        {paginatedCareers.length}
                      </span>{" "}
                      of{" "}
                      <span className="font-semibold text-[#f3f4f6]">
                        {filteredCareers.length}
                      </span>{" "}
                      careers
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-xl border border-[#27324a] bg-[#0b1020] hover:bg-[#1f2638] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 text-sm font-medium text-[#a1a1aa]"
                      >
                        <FiChevronLeft size={16} />
                        Previous
                      </button>

                      <div className="hidden md:flex gap-2">
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
                                className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                  currentPage === pageNum
                                    ? "bg-linear-to-r from-[#0088db] to-[#006db1] text-white shadow-md"
                                    : "bg-[#0b1020] border border-[#27324a] hover:bg-[#1f2638] text-[#a1a1aa]"
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
                        className="px-4 py-2 rounded-xl border border-[#27324a] bg-[#0b1020] hover:bg-[#1f2638] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 text-sm font-medium text-[#a1a1aa]"
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

export default ListCareer;
