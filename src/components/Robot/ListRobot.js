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
  FiAlertTriangle,
  FiVideo,
  FiPlay,
  FiXCircle,
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
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  /* =========================
     FETCH ROBOTS - Show all robots (including development)
  ========================= */
  const fetchRobots = async () => {
    try {
      setLoading(true);
      // Fetch all robots - no filtering by development status
      const response = await apiClient.get("/robot/get", {
        params: {
          page: 1,
          limit: 100,
        },
      });

      const robotsData =
        response?.data?.data?.robots || response?.data?.robots || [];
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
     VIDEO MODAL HANDLERS
  ========================= */
  const openVideoModal = (video) => {
    setSelectedVideo(video);
    setVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    setVideoModalOpen(false);
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

  // Count development robots
  const developmentCount = robots.filter(
    (r) => r.is_development === true,
  ).length;
  const productionCount = robots.filter(
    (r) => r.is_development !== true,
  ).length;

  // Count robots with videos
  const robotsWithVideos = robots.filter(
    (r) => r.video && r.video.length > 0,
  ).length;

  /* =========================
     LOADING UI (Dark Theme)
  ========================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#0b1020] to-[#050816] p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#111827] rounded-2xl border border-[#27324a] overflow-hidden animate-pulse">
            <div className="p-6 border-b border-[#27324a]">
              <div className="flex justify-between items-center">
                <div className="space-y-3">
                  <div className="h-8 w-48 bg-[#1f2638] rounded-lg"></div>
                  <div className="h-4 w-64 bg-[#1f2638] rounded-lg"></div>
                </div>
                <div className="h-16 w-32 bg-[#1f2638] rounded-xl"></div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
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
    <div className="min-h-screen bg-linear-to-br from-[#0b1020] to-[#050816] p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Video Modal */}
        {videoModalOpen && selectedVideo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={closeVideoModal}
          >
            <div
              className="relative max-w-4xl w-full bg-[#111827] rounded-2xl overflow-hidden border border-[#27324a] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeVideoModal}
                className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition"
              >
                <FiXCircle size={24} />
              </button>
              <video
                src={selectedVideo.url}
                controls
                autoPlay
                className="w-full max-h-[80vh] object-contain"
              />
              <div className="p-4 bg-[#0b1020] border-t border-[#27324a]">
                <p className="text-[#f3f4f6] font-medium">Video Preview</p>
                <p className="text-sm text-[#71717a] mt-1">
                  Click outside to close
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Header Section */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-linear-to-br from-[#0088db] to-[#006db1] rounded-xl shadow-lg">
                <FiCpu className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-[#f3f4f6]">
                  Robots Management
                </h1>
                <p className="text-sm text-[#a1a1aa] mt-1">
                  Manage all robots with their specifications and features
                </p>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              {/* Total Robots Counter */}
              <div className="bg-[#111827] rounded-xl px-5 py-3 shadow-md border border-[#27324a]">
                <p className="text-xs text-[#71717a] uppercase tracking-wide">
                  Total Robots
                </p>
                <h3 className="text-2xl font-bold text-[#0088db]">
                  {robots.length}
                </h3>
              </div>

              {/* Robots with Videos Counter */}
              {robotsWithVideos > 0 && (
                <div className="bg-[#111827] rounded-xl px-4 py-3 shadow-md border border-[#27324a]">
                  <p className="text-xs text-[#71717a] uppercase tracking-wide flex items-center gap-1">
                    <FiVideo size={10} />
                    With Videos
                  </p>
                  <h3 className="text-2xl font-bold text-purple-400">
                    {robotsWithVideos}
                  </h3>
                </div>
              )}

              {/* Production Robots Counter */}
              {productionCount > 0 && (
                <div className="bg-[#111827] rounded-xl px-4 py-3 shadow-md border border-[#27324a]">
                  <p className="text-xs text-[#71717a] uppercase tracking-wide">
                    Production
                  </p>
                  <h3 className="text-2xl font-bold text-emerald-400">
                    {productionCount}
                  </h3>
                </div>
              )}

              {/* Development Robots Counter */}
              {developmentCount > 0 && (
                <div className="bg-[#111827] rounded-xl px-4 py-3 shadow-md border border-[#ffba22]/30">
                  <p className="text-xs text-[#71717a] uppercase tracking-wide flex items-center gap-1">
                    <FiAlertTriangle size={10} className="text-[#ffba22]" />
                    Development
                  </p>
                  <h3 className="text-2xl font-bold text-[#ffba22]">
                    {developmentCount}
                  </h3>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-[#111827] rounded-2xl shadow-xl border border-[#27324a] overflow-hidden">
          {/* Search and Filter Bar */}
          <div className="border-b border-[#27324a] bg-[#0b1020] p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <FiSearch
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717a]"
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
                  className="w-full pl-11 pr-10 py-3 rounded-xl border border-[#27324a] bg-[#0b1020] text-[#f3f4f6] placeholder:text-[#71717a] focus:outline-none focus:ring-2 focus:ring-[#0088db]/20 focus:border-[#0088db] transition"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#71717a] hover:text-[#a1a1aa]"
                  >
                    <FiX size={18} />
                  </button>
                )}
              </div>

              {/* Filter Toggle Button (Mobile) */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center justify-center gap-2 px-4 py-3 bg-[#0b1020] border border-[#27324a] rounded-xl"
              >
                <FiFilter className="text-[#a1a1aa]" />
                <span className="text-[#f3f4f6]">Filters</span>
                {selectedCategory !== "all" && (
                  <span className="w-2 h-2 bg-[#0088db] rounded-full"></span>
                )}
              </button>
            </div>

            {/* Category Filters */}
            <div
              className={`${showFilters ? "flex" : "hidden"} md:flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-[#27324a]`}
            >
              <FiTag className="text-[#71717a]" />
              <span className="text-sm font-medium text-[#a1a1aa]">
                Category:
              </span>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-sm transition ${
                  selectedCategory === "all"
                    ? "bg-linear-to-r from-[#0088db] to-[#006db1] text-white shadow-md"
                    : "bg-[#0b1020] text-[#a1a1aa] hover:bg-[#1f2638] border border-[#27324a]"
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
                      ? "bg-linear-to-r from-[#0088db] to-[#006db1] text-white shadow-md"
                      : "bg-[#0b1020] text-[#a1a1aa] hover:bg-[#1f2638] border border-[#27324a]"
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
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Clear filter
                </button>
              )}
            </div>
          </div>

          {/* Empty State - Dark Theme */}
          {filteredRobots.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <div className="w-24 h-24 bg-linear-to-br from-[#1f2638] to-[#1f2638] rounded-full flex items-center justify-center mb-6">
                <FiCpu size={40} className="text-[#71717a]" />
              </div>
              <h3 className="text-xl font-semibold text-[#f3f4f6] mb-2">
                {robots.length === 0 ? "No Robots Found" : "No Matching Robots"}
              </h3>
              <p className="text-[#a1a1aa] max-w-md">
                {robots.length === 0
                  ? "There are currently no robots available. Add your first robot!"
                  : searchQuery || selectedCategory !== "all"
                    ? "Try adjusting your search or filter criteria."
                    : "No robots available in this category."}
              </p>
              {(searchQuery || selectedCategory !== "all") && (
                <button
                  onClick={clearSearch}
                  className="mt-6 px-6 py-2 bg-linear-to-r from-[#0088db] to-[#006db1] text-white font-semibold rounded-xl hover:shadow-lg transition"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Robot Cards - Dark Theme */}
              <div className="divide-y divide-[#27324a]">
                {paginatedRobots.map((robot) => {
                  const cleanName = stripHtml(robot.name);
                  const cleanDescription = stripHtml(robot.description);
                  const isExpanded = expandedRobot === robot._id;
                  const isDevelopment = robot.is_development === true;
                  const robotVideos = robot.video || [];

                  return (
                    <div
                      key={robot._id}
                      className={`p-4 md:p-6 hover:bg-[#1f2638] transition group relative ${
                        isDevelopment ? "bg-[#ffba22]/5" : ""
                      }`}
                    >
                      {/* Development Mode Badge */}
                      {isDevelopment && (
                        <div className="absolute top-4 right-4 z-10">
                          <span className="inline-flex items-center gap-1.5 bg-[#ffba22]/20 text-[#ffba22] text-xs px-2.5 py-1 rounded-full border border-[#ffba22]/30">
                            <FiAlertTriangle size={12} />
                            Development Mode
                          </span>
                        </div>
                      )}

                      <div className="flex flex-col lg:flex-row gap-5">
                        {/* Image */}
                        {robot.images?.[0]?.url && (
                          <div className="relative lg:w-32 h-48 lg:h-32 rounded-xl overflow-hidden bg-[#0b1020] border border-[#27324a] shrink-0">
                            <img
                              src={robot.images[0].url}
                              alt={cleanName}
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                            />
                            {isDevelopment && (
                              <div className="absolute inset-0 bg-linear-to-t from-[#ffba22]/20 to-transparent" />
                            )}
                          </div>
                        )}

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          {/* Header */}
                          <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                            <div className="flex-1">
                              <h3 className="font-heading font-semibold text-lg md:text-xl text-[#f3f4f6]">
                                {cleanName || "Untitled Robot"}
                              </h3>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {robot.category && (
                                  <span className="inline-flex items-center gap-1 text-xs bg-[#0088db]/10 text-[#0088db] px-2 py-1 rounded-full">
                                    <FiTag size={10} />
                                    {robot.category}
                                  </span>
                                )}
                                {robotVideos.length > 0 && (
                                  <span className="inline-flex items-center gap-1 text-xs bg-purple-500/10 text-purple-400 px-2 py-1 rounded-full">
                                    <FiVideo size={10} />
                                    {robotVideos.length} Video
                                    {robotVideos.length !== 1 ? "s" : ""}
                                  </span>
                                )}
                                {isDevelopment && (
                                  <span className="inline-flex items-center gap-1 text-xs bg-[#ffba22]/10 text-[#ffba22] px-2 py-1 rounded-full">
                                    <FiAlertTriangle size={10} />
                                    In Development
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-[#71717a]">
                              <div className="flex items-center gap-1">
                                <FiCalendar size={12} />
                                {new Date(robot.createdAt).toLocaleDateString()}
                              </div>
                              <button
                                onClick={() => toggleExpand(robot._id)}
                                className="text-[#71717a] hover:text-[#0088db] transition lg:hidden"
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
                          <p className="text-[#a1a1aa] text-sm leading-relaxed mb-3">
                            {isExpanded || cleanDescription?.length <= 120
                              ? cleanDescription || "No description available"
                              : `${cleanDescription?.slice(0, 120)}...`}
                            {!isExpanded && cleanDescription?.length > 120 && (
                              <button
                                onClick={() => toggleExpand(robot._id)}
                                className="text-[#0088db] hover:text-[#006db1] ml-1 text-xs font-medium"
                              >
                                Read more
                              </button>
                            )}
                          </p>

                          {/* Videos Section */}
                          {robotVideos.length > 0 && (
                            <div className="mb-3">
                              <div className="flex items-center gap-2 text-xs font-semibold text-[#a1a1aa] mb-2">
                                <FiVideo size={12} />
                                <span>Videos ({robotVideos.length})</span>
                              </div>
                              <div className="flex flex-wrap gap-3">
                                {robotVideos
                                  .slice(0, isExpanded ? undefined : 2)
                                  .map((video, idx) => (
                                    <button
                                      key={idx}
                                      onClick={() => openVideoModal(video)}
                                      className="flex items-center gap-2 px-3 py-2 bg-[#0b1020] border border-[#27324a] rounded-lg hover:border-purple-500/50 hover:bg-[#1f2638] transition group/video"
                                    >
                                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                                        <FiPlay
                                          size={14}
                                          className="text-purple-400"
                                        />
                                      </div>
                                      <span className="text-sm text-[#a1a1aa] group-hover/video:text-purple-400">
                                        Video {idx + 1}
                                      </span>
                                    </button>
                                  ))}
                                {!isExpanded && robotVideos.length > 2 && (
                                  <button
                                    onClick={() => toggleExpand(robot._id)}
                                    className="text-xs text-[#0088db] hover:text-[#006db1]"
                                  >
                                    +{robotVideos.length - 2} more videos
                                  </button>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Specifications */}
                          {robot.specifications &&
                            robot.specifications.length > 0 && (
                              <div className="mb-3">
                                <div className="flex items-center gap-2 text-xs font-semibold text-[#a1a1aa] mb-2">
                                  <FiGrid size={12} />
                                  <span>Technical Specifications</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                                  {robot.specifications
                                    .slice(0, isExpanded ? undefined : 4)
                                    .map((spec, idx) => (
                                      <div
                                        key={idx}
                                        className="flex items-baseline gap-2 text-xs bg-[#0b1020] rounded-lg px-3 py-2 border border-[#27324a]"
                                      >
                                        <span className="font-medium text-[#a1a1aa]">
                                          {spec.label}:
                                        </span>
                                        <span className="text-[#71717a] truncate">
                                          {spec.value}
                                        </span>
                                      </div>
                                    ))}
                                  {!isExpanded &&
                                    robot.specifications.length > 4 && (
                                      <div className="text-xs text-[#0088db] flex items-center">
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
                                <div className="flex items-center gap-2 text-xs font-semibold text-[#a1a1aa] mb-2">
                                  <FiList size={12} />
                                  <span>Key Features</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {robot.keyPoints
                                    .slice(0, isExpanded ? undefined : 3)
                                    .map((point, idx) => (
                                      <span
                                        key={idx}
                                        className="text-xs bg-[#1f2638] text-[#a1a1aa] px-2 py-1 rounded-full border border-[#27324a]"
                                      >
                                        {point}
                                      </span>
                                    ))}
                                  {!isExpanded &&
                                    robot.keyPoints.length > 3 && (
                                      <span className="text-xs text-[#0088db]">
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
                                  <div className="flex items-center gap-2 text-xs font-semibold text-[#a1a1aa] mb-2">
                                    <FiTarget size={12} />
                                    <span>Applications</span>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {robot.applications
                                      .slice(0, isExpanded ? undefined : 3)
                                      .map((app, idx) => (
                                        <span
                                          key={idx}
                                          className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full border border-emerald-500/20"
                                        >
                                          {app}
                                        </span>
                                      ))}
                                    {!isExpanded &&
                                      robot.applications.length > 3 && (
                                        <span className="text-xs text-[#0088db]">
                                          +{robot.applications.length - 3} more
                                        </span>
                                      )}
                                  </div>
                                </div>
                              )}
                          </div>

                          {/* Expanded Content */}
                          {isExpanded && (
                            <div className="mt-4 space-y-4">
                              {/* All Videos in Expanded View */}
                              {robotVideos.length > 2 && (
                                <div className="p-4 bg-[#0b1020] rounded-xl border border-[#27324a]">
                                  <div className="flex items-center gap-2 mb-3">
                                    <FiVideo
                                      size={14}
                                      className="text-purple-400"
                                    />
                                    <span className="text-sm font-semibold text-[#f3f4f6]">
                                      All Videos ({robotVideos.length})
                                    </span>
                                  </div>
                                  <div className="flex flex-wrap gap-3">
                                    {robotVideos.map((video, idx) => (
                                      <button
                                        key={idx}
                                        onClick={() => openVideoModal(video)}
                                        className="flex items-center gap-2 px-3 py-2 bg-[#1f2638] border border-[#27324a] rounded-lg hover:border-purple-500/50 transition"
                                      >
                                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                                          <FiPlay
                                            size={14}
                                            className="text-purple-400"
                                          />
                                        </div>
                                        <span className="text-sm text-[#a1a1aa]">
                                          Video {idx + 1}
                                        </span>
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Extra Specifications */}
                              {robot.specifications &&
                                robot.specifications.length > 4 && (
                                  <div className="p-4 bg-[#0b1020] rounded-xl border border-[#27324a]">
                                    <div className="flex items-center gap-2 mb-3">
                                      <FiInfo
                                        size={14}
                                        className="text-[#0088db]"
                                      />
                                      <span className="text-sm font-semibold text-[#f3f4f6]">
                                        Additional Specifications
                                      </span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                      {robot.specifications
                                        .slice(4)
                                        .map((spec, idx) => (
                                          <div
                                            key={idx}
                                            className="flex items-baseline gap-2 text-xs"
                                          >
                                            <span className="font-medium text-[#a1a1aa]">
                                              {spec.label}:
                                            </span>
                                            <span className="text-[#71717a]">
                                              {spec.value}
                                            </span>
                                          </div>
                                        ))}
                                    </div>
                                  </div>
                                )}

                              {/* Extra Key Features */}
                              {robot.keyPoints &&
                                robot.keyPoints.length > 3 && (
                                  <div className="p-4 bg-[#0b1020] rounded-xl border border-[#27324a]">
                                    <div className="flex items-center gap-2 mb-3">
                                      <FiList
                                        size={14}
                                        className="text-[#0088db]"
                                      />
                                      <span className="text-sm font-semibold text-[#f3f4f6]">
                                        More Features
                                      </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                      {robot.keyPoints
                                        .slice(3)
                                        .map((point, idx) => (
                                          <span
                                            key={idx}
                                            className="text-xs bg-[#1f2638] text-[#a1a1aa] px-2 py-1 rounded-full border border-[#27324a]"
                                          >
                                            {point}
                                          </span>
                                        ))}
                                    </div>
                                  </div>
                                )}

                              {/* Extra Applications */}
                              {robot.applications &&
                                robot.applications.length > 3 && (
                                  <div className="p-4 bg-[#0b1020] rounded-xl border border-[#27324a]">
                                    <div className="flex items-center gap-2 mb-3">
                                      <FiTarget
                                        size={14}
                                        className="text-[#0088db]"
                                      />
                                      <span className="text-sm font-semibold text-[#f3f4f6]">
                                        More Applications
                                      </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                      {robot.applications
                                        .slice(3)
                                        .map((app, idx) => (
                                          <span
                                            key={idx}
                                            className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full border border-emerald-500/20"
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
                          <div className="flex items-center gap-3 pt-3 border-t border-[#27324a] mt-2">
                            <button
                              onClick={() => onEdit(robot)}
                              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-[#0088db] to-[#006db1] text-white text-sm hover:shadow-lg transition shadow-md"
                            >
                              <FiEdit2 size={14} />
                              Edit Robot
                            </button>
                            <button
                              onClick={() => handleDelete(robot._id)}
                              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 text-sm hover:bg-red-500/20 transition"
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

              {/* Pagination - Dark Theme */}
              {totalPages > 1 && (
                <div className="border-t border-[#27324a] px-4 py-5 md:px-6 bg-[#0b1020]/30">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-[#71717a]">
                      Showing{" "}
                      <span className="font-semibold text-[#f3f4f6]">
                        {paginatedRobots.length}
                      </span>{" "}
                      of{" "}
                      <span className="font-semibold text-[#f3f4f6]">
                        {filteredRobots.length}
                      </span>{" "}
                      robots
                      {searchQuery && (
                        <span className="ml-2 text-[#0088db]">(Filtered)</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 flex-wrap justify-center">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-xl border border-[#27324a] bg-[#0b1020] hover:bg-[#1f2638] disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-2 text-sm font-medium text-[#a1a1aa]"
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
                                className={`w-10 h-10 rounded-xl text-sm font-semibold transition ${
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
                        className="px-4 py-2 rounded-xl border border-[#27324a] bg-[#0b1020] hover:bg-[#1f2638] disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-2 text-sm font-medium text-[#a1a1aa]"
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
