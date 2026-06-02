"use client";

import React, { useEffect, useMemo, useState } from "react";
import apiClient from "@/api/client";
import toast from "react-hot-toast";
import {
  FiEdit2,
  FiTrash2,
  FiCalendar,
  FiCpu,
  FiChevronLeft,
  FiChevronRight,
  FiTag,
  FiList,
  FiTarget,
  FiGrid,
  FiSearch,
  FiX,
  FiFilter,
  FiChevronDown,
  FiChevronUp,
  FiInfo,
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

const ListRobot = ({ onEdit }) => {
  const [robots, setRobots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [expandedRobot, setExpandedRobot] = useState(null);
  const [categories, setCategories] = useState([]);

  /* =========================
     FETCH ROBOTS
  ========================= */
  const fetchRobots = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/robot/get", {
        params: {
          page: 1,
          limit: 100,
        },
      });

      const robotsData = response?.data?.robots || [];
      setRobots(robotsData);

      const uniqueCategories = [
        ...new Set(robotsData.map((r) => r.category).filter(Boolean)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Fetch robots failed:", error);
      toast.error("Failed to fetch robots");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRobots();
  }, []);

  /* =========================
     DELETE ROBOT
  ========================= */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this robot? This action cannot be undone.",
    );
    if (!confirmDelete) return;

    try {
      const res = await apiClient.delete(`/robot/delete/${id}`);
      toast.success(res?.data?.message || "Robot deleted successfully");
      fetchRobots();
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete robot");
    }
  };

  /* =========================
     FILTERED ROBOTS
  ========================= */
  const filteredRobots = useMemo(() => {
    let filtered = robots;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (robot) => robot.category === selectedCategory,
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((robot) => {
        const name = stripHtml(robot.name).toLowerCase();
        const description = stripHtml(robot.description).toLowerCase();
        const category = (robot.category || "").toLowerCase();
        return (
          name.includes(query) ||
          description.includes(query) ||
          category.includes(query)
        );
      });
    }

    return filtered;
  }, [robots, selectedCategory, searchQuery]);

  /* =========================
     PAGINATION
  ========================= */
  const totalPages = Math.ceil(filteredRobots.length / ITEMS_PER_PAGE);
  const paginatedRobots = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRobots.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredRobots, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const toggleExpand = (id) => {
    setExpandedRobot(expandedRobot === id ? null : id);
  };

  /* =========================
     LOADING UI
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
                <FiCpu className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Robots Management
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Manage all robots with their specifications and features
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl px-5 py-3 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Total Robots
              </p>
              <h3 className="text-2xl font-bold text-[#1f3b57]">
                {filteredRobots.length}
              </h3>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Search and Filter Bar */}
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
                  placeholder="Search by name, description, or category..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
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

              {/* Filter Toggle Button (Mobile) */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl"
              >
                <FiFilter />
                Filters
                {selectedCategory !== "all" && (
                  <span className="w-2 h-2 bg-[#1f3b57] rounded-full"></span>
                )}
              </button>
            </div>

            {/* Category Filters */}
            <div
              className={`${showFilters ? "flex" : "hidden"} md:flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-gray-200`}
            >
              <FiTag className="text-gray-400" />
              <span className="text-sm font-medium text-gray-700">
                Category:
              </span>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-sm transition ${
                  selectedCategory === "all"
                    ? "bg-[#1f3b57] text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-sm transition ${
                    selectedCategory === category
                      ? "bg-[#1f3b57] text-white shadow-md"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
              {selectedCategory !== "all" && (
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setCurrentPage(1);
                  }}
                  className="text-xs text-red-500 hover:text-red-600"
                >
                  Clear filter
                </button>
              )}
            </div>
          </div>

          {/* Empty State */}
          {filteredRobots.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
                <FiCpu size={40} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {robots.length === 0 ? "No Robots Found" : "No Matching Robots"}
              </h3>
              <p className="text-gray-500 max-w-md">
                {robots.length === 0
                  ? "There are currently no robots available. Add your first robot!"
                  : searchQuery || selectedCategory !== "all"
                    ? "Try adjusting your search or filter criteria."
                    : "No robots available in this category."}
              </p>
              {(searchQuery || selectedCategory !== "all") && (
                <button
                  onClick={clearSearch}
                  className="mt-6 px-6 py-2 bg-[#1f3b57] text-white rounded-xl hover:bg-[#2a4d72] transition"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Robot Cards */}
              <div className="divide-y divide-gray-100">
                {paginatedRobots.map((robot) => {
                  const cleanName = stripHtml(robot.name);
                  const cleanDescription = stripHtml(robot.description);
                  const isExpanded = expandedRobot === robot._id;

                  return (
                    <div
                      key={robot._id}
                      className="p-4 md:p-6 hover:bg-gray-50 transition group"
                    >
                      <div className="flex flex-col lg:flex-row gap-5">
                        {/* Image */}
                        {robot.images?.[0]?.url && (
                          <div className="relative lg:w-32 h-48 lg:h-32 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                            <img
                              src={robot.images[0].url}
                              alt={cleanName}
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                            />
                          </div>
                        )}

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          {/* Header */}
                          <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg md:text-xl text-gray-800">
                                {cleanName || "Untitled Robot"}
                              </h3>
                              {robot.category && (
                                <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full mt-2">
                                  <FiTag size={10} />
                                  {robot.category}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-400">
                              <div className="flex items-center gap-1">
                                <FiCalendar size={12} />
                                {new Date(robot.createdAt).toLocaleDateString()}
                              </div>
                              <button
                                onClick={() => toggleExpand(robot._id)}
                                className="text-gray-400 hover:text-[#1f3b57] transition lg:hidden"
                              >
                                {isExpanded ? (
                                  <FiChevronUp size={16} />
                                ) : (
                                  <FiChevronDown size={16} />
                                )}
                              </button>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-gray-600 text-sm leading-relaxed mb-3">
                            {isExpanded || cleanDescription?.length <= 120
                              ? cleanDescription || "No description available"
                              : `${cleanDescription?.slice(0, 120)}...`}
                            {!isExpanded && cleanDescription?.length > 120 && (
                              <button
                                onClick={() => toggleExpand(robot._id)}
                                className="text-blue-500 hover:text-blue-600 ml-1 text-xs font-medium"
                              >
                                Read more
                              </button>
                            )}
                          </p>

                          {/* Specifications */}
                          {robot.specifications &&
                            robot.specifications.length > 0 && (
                              <div className="mb-3">
                                <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-2">
                                  <FiGrid size={12} />
                                  <span>Technical Specifications</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                                  {robot.specifications
                                    .slice(0, isExpanded ? undefined : 4)
                                    .map((spec, idx) => (
                                      <div
                                        key={idx}
                                        className="flex items-baseline gap-2 text-xs bg-gray-50 rounded-lg px-3 py-2"
                                      >
                                        <span className="font-medium text-gray-600">
                                          {spec.label}:
                                        </span>
                                        <span className="text-gray-500 truncate">
                                          {spec.value}
                                        </span>
                                      </div>
                                    ))}
                                  {!isExpanded &&
                                    robot.specifications.length > 4 && (
                                      <div className="text-xs text-blue-500 flex items-center">
                                        +{robot.specifications.length - 4} more
                                      </div>
                                    )}
                                </div>
                              </div>
                            )}

                          {/* Key Features & Applications - Two Column Layout */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            {/* Key Features */}
                            {robot.keyPoints && robot.keyPoints.length > 0 && (
                              <div>
                                <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-2">
                                  <FiList size={12} />
                                  <span>Key Features</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {robot.keyPoints
                                    .slice(0, isExpanded ? undefined : 3)
                                    .map((point, idx) => (
                                      <span
                                        key={idx}
                                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                                      >
                                        {point}
                                      </span>
                                    ))}
                                  {!isExpanded &&
                                    robot.keyPoints.length > 3 && (
                                      <span className="text-xs text-blue-500">
                                        +{robot.keyPoints.length - 3} more
                                      </span>
                                    )}
                                </div>
                              </div>
                            )}

                            {/* Applications */}
                            {robot.applications &&
                              robot.applications.length > 0 && (
                                <div>
                                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-2">
                                    <FiTarget size={12} />
                                    <span>Applications</span>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {robot.applications
                                      .slice(0, isExpanded ? undefined : 3)
                                      .map((app, idx) => (
                                        <span
                                          key={idx}
                                          className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full"
                                        >
                                          {app}
                                        </span>
                                      ))}
                                    {!isExpanded &&
                                      robot.applications.length > 3 && (
                                        <span className="text-xs text-blue-500">
                                          +{robot.applications.length - 3} more
                                        </span>
                                      )}
                                  </div>
                                </div>
                              )}
                          </div>

                          {/* Expanded Content */}
                          {isExpanded &&
                            (robot.specifications?.length > 4 ||
                              robot.keyPoints?.length > 3 ||
                              robot.applications?.length > 3) && (
                              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                                <div className="flex items-center gap-2 mb-3">
                                  <FiInfo
                                    size={14}
                                    className="text-[#1f3b57]"
                                  />
                                  <span className="text-sm font-semibold text-gray-700">
                                    Additional Details
                                  </span>
                                </div>
                                {robot.specifications &&
                                  robot.specifications.length > 4 && (
                                    <div className="mb-3">
                                      <div className="text-xs font-medium text-gray-600 mb-2">
                                        More Specifications:
                                      </div>
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {robot.specifications
                                          .slice(4)
                                          .map((spec, idx) => (
                                            <div
                                              key={idx}
                                              className="flex items-baseline gap-2 text-xs"
                                            >
                                              <span className="font-medium text-gray-600">
                                                {spec.label}:
                                              </span>
                                              <span className="text-gray-500">
                                                {spec.value}
                                              </span>
                                            </div>
                                          ))}
                                      </div>
                                    </div>
                                  )}
                                {robot.keyPoints &&
                                  robot.keyPoints.length > 3 && (
                                    <div className="mb-3">
                                      <div className="text-xs font-medium text-gray-600 mb-2">
                                        More Features:
                                      </div>
                                      <div className="flex flex-wrap gap-2">
                                        {robot.keyPoints
                                          .slice(3)
                                          .map((point, idx) => (
                                            <span
                                              key={idx}
                                              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                                            >
                                              {point}
                                            </span>
                                          ))}
                                      </div>
                                    </div>
                                  )}
                                {robot.applications &&
                                  robot.applications.length > 3 && (
                                    <div>
                                      <div className="text-xs font-medium text-gray-600 mb-2">
                                        More Applications:
                                      </div>
                                      <div className="flex flex-wrap gap-2">
                                        {robot.applications
                                          .slice(3)
                                          .map((app, idx) => (
                                            <span
                                              key={idx}
                                              className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full"
                                            >
                                              {app}
                                            </span>
                                          ))}
                                      </div>
                                    </div>
                                  )}
                              </div>
                            )}

                          {/* Actions */}
                          <div className="flex items-center gap-3 pt-3 border-t border-gray-100 mt-2">
                            <button
                              onClick={() => onEdit(robot)}
                              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#1f3b57] text-white text-sm hover:bg-[#2a4d72] transition shadow-sm"
                            >
                              <FiEdit2 size={14} />
                              Edit Robot
                            </button>
                            <button
                              onClick={() => handleDelete(robot._id)}
                              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 text-sm hover:bg-red-100 transition"
                            >
                              <FiTrash2 size={14} />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="border-t border-gray-100 px-4 py-5 md:px-6 bg-gray-50/50">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-500">
                      Showing{" "}
                      <span className="font-semibold text-gray-700">
                        {paginatedRobots.length}
                      </span>{" "}
                      of{" "}
                      <span className="font-semibold text-gray-700">
                        {filteredRobots.length}
                      </span>{" "}
                      robots
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

export default ListRobot;
