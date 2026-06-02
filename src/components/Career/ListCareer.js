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
} from "react-icons/fi";

const ITEMS_PER_PAGE = 5;

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
      "Are you sure you want to delete this career?",
    );
    if (!confirmDelete) return;

    try {
      const res = await apiClient.delete(`/career/delete/${id}`);
      toast.success(res?.data?.message || "Career deleted");
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
     GET JOB TYPE COLOR
  ========================= */
  const getJobTypeColor = (jobType) => {
    const colors = {
      "Full Time": "bg-green-100 text-green-700 border-green-200",
      "Part Time": "bg-blue-100 text-blue-700 border-blue-200",
      Internship: "bg-purple-100 text-purple-700 border-purple-200",
      Contract: "bg-orange-100 text-orange-700 border-orange-200",
      Remote: "bg-teal-100 text-teal-700 border-teal-200",
    };
    return colors[jobType] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedJobType("all");
    setShowFilters(false);
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
                <div className="h-16 w-32 bg-gray-100 rounded-xl"></div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-24 bg-gray-100 rounded-xl"></div>
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
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-[#1f3b57] to-[#2c4d6e] rounded-xl shadow-lg">
              <FiBriefcase className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Careers Management
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage all job openings and applications
              </p>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Stats */}
          <div className="bg-gradient-to-r from-[#1f3b57] to-[#2c4d6e] px-6 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center text-white">
                  <FiBriefcase size={22} />
                </div>
                <div>
                  <p className="text-white/60 text-xs uppercase tracking-wide">
                    Total Careers
                  </p>
                  <p className="text-white text-3xl font-bold">
                    {filteredCareers.length}
                  </p>
                </div>
              </div>
              {(searchQuery || selectedJobType !== "all") && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-xl text-white hover:bg-white/20 transition"
                >
                  <FiX size={16} />
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Search and Filters */}
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by title, description, location, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#1f3b57] focus:ring-2 focus:ring-[#1f3b57]/20 outline-none transition-all bg-white"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FiX size={18} />
                  </button>
                )}
              </div>

              {/* Filter Toggle Button (Mobile) */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl"
              >
                <FiFilter />
                Filters
                {selectedJobType !== "all" && (
                  <span className="w-2 h-2 bg-[#1f3b57] rounded-full"></span>
                )}
              </button>

              {/* Job Type Filters */}
              <div
                className={`${showFilters ? "flex" : "hidden"} md:flex flex-wrap gap-2`}
              >
                <button
                  onClick={() => setSelectedJobType("all")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    selectedJobType === "all"
                      ? "bg-[#1f3b57] text-white shadow-md"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  All Jobs
                </button>
                {jobTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedJobType(type)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      selectedJobType === type
                        ? "bg-[#1f3b57] text-white shadow-md"
                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Empty State */}
          {filteredCareers.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
                <FiBriefcase className="text-4xl text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {careers.length === 0
                  ? "No Careers Found"
                  : "No Matching Careers"}
              </h3>
              <p className="text-gray-500 max-w-md">
                {careers.length === 0
                  ? "There are currently no career opportunities available."
                  : "Try adjusting your search or filter criteria."}
              </p>
              {(searchQuery || selectedJobType !== "all") && (
                <button
                  onClick={clearFilters}
                  className="mt-6 px-6 py-2 bg-[#1f3b57] text-white rounded-xl hover:bg-[#2a4d72] transition"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Job Title
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginatedCareers.map((career, index) => (
                      <tr
                        key={career._id}
                        className="hover:bg-gray-50/50 transition group"
                      >
                        <td className="px-6 py-4">
                          <div className="max-w-[280px]">
                            <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">
                              {stripHtml(career.title)}
                            </h3>
                            {career.applyLink && (
                              <a
                                href={career.applyLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-blue-600 mt-1 hover:underline"
                              >
                                Apply Now
                                <FiExternalLink size={10} />
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="max-w-[320px] text-sm text-gray-500 line-clamp-2">
                            {stripHtml(career.description)?.slice(0, 100) ||
                              "No description"}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5">
                            <FiMapPin className="text-gray-400 text-sm" />
                            <span className="text-sm text-gray-700">
                              {career.location || "Not specified"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getJobTypeColor(career.jobType)}`}
                          >
                            {career.jobType || "Not specified"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5">
                            <FiTag className="text-gray-400 text-sm" />
                            <span className="text-sm text-gray-700">
                              {career.category || "Not specified"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <FiCalendar size={14} />
                            {new Date(career.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => onEdit(career)}
                              className="p-2 text-gray-600 hover:text-[#1f3b57] hover:bg-gray-100 rounded-lg transition"
                              title="Edit"
                            >
                              <FiEdit2 size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(career._id)}
                              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                              title="Delete"
                            >
                              <FiTrash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden divide-y divide-gray-100">
                {paginatedCareers.map((career) => (
                  <div
                    key={career._id}
                    className="p-6 hover:bg-gray-50 transition"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-base leading-6">
                          {stripHtml(career.title)}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <span
                            className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${getJobTypeColor(career.jobType)}`}
                          >
                            {career.jobType || "Not specified"}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => onEdit(career)}
                          className="p-2 text-gray-600 hover:text-[#1f3b57] rounded-lg transition"
                        >
                          <FiEdit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(career._id)}
                          className="p-2 text-gray-600 hover:text-red-600 rounded-lg transition"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FiMapPin
                          className="text-gray-400 shrink-0"
                          size={14}
                        />
                        <span>
                          {career.location || "Location not specified"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FiTag className="text-gray-400 shrink-0" size={14} />
                        <span>
                          {career.category || "Category not specified"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <FiCalendar size={12} />
                        {new Date(career.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 leading-6 mb-3">
                      {stripHtml(career.description)?.slice(0, 120) ||
                        "No description"}
                      {stripHtml(career.description)?.length > 120 && "..."}
                    </p>

                    {career.applyLink && (
                      <a
                        href={career.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
                      >
                        Apply Now
                        <FiExternalLink size={12} />
                      </a>
                    )}
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-500">
                      Showing{" "}
                      <span className="font-semibold text-gray-700">
                        {paginatedCareers.length}
                      </span>{" "}
                      of{" "}
                      <span className="font-semibold text-gray-700">
                        {filteredCareers.length}
                      </span>{" "}
                      careers
                    </div>

                    <div className="flex items-center gap-2">
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

export default ListCareer;
