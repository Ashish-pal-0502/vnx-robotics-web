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

      // Extract unique categories
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
      "Are you sure you want to delete this robot?",
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
    if (selectedCategory === "all") return robots;
    return robots.filter((robot) => robot.category === selectedCategory);
  }, [robots, selectedCategory]);

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

  /* =========================
     LOADING UI
  ========================= */
  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
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
        <div className="p-4 md:p-6 space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="rounded-2xl border border-gray-200 p-4">
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
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1f3b57] to-[#31597f] shadow-lg">
              <FiCpu className="text-white text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1f3b57]">
                Robots Management
              </h2>
              <p className="text-sm text-gray-500">
                Manage all robots with their specifications and features
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white px-5 py-3 shadow-sm w-fit">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Total Robots
            </p>
            <h3 className="text-2xl font-bold text-[#1f3b57]">
              {filteredRobots.length}
            </h3>
          </div>
        </div>
      </div>

      {/* CATEGORY FILTER */}
      {categories.length > 0 && (
        <div className="px-5 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-wrap items-center gap-3">
            <FiTag className="text-gray-400" />
            <span className="text-sm font-medium text-gray-700">
              Filter by category:
            </span>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg text-sm transition ${
                selectedCategory === "all"
                  ? "bg-[#1f3b57] text-white"
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
                    ? "bg-[#1f3b57] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* EMPTY */}
      {filteredRobots.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#eef5ff] mb-5">
            <FiCpu className="text-4xl text-[#1f3b57]" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            {robots.length === 0
              ? "No Robots Found"
              : "No Robots in this Category"}
          </h3>
          <p className="text-gray-500">
            {robots.length === 0
              ? "There are currently no robots available."
              : "Try selecting a different category."}
          </p>
        </div>
      ) : (
        <>
          {/* ROBOT LIST */}
          <div className="p-4 md:p-6 space-y-6">
            {paginatedRobots.map((robot) => {
              const cleanName = stripHtml(robot.name);
              const cleanDescription = stripHtml(robot.description);

              return (
                <div
                  key={robot._id}
                  className="border border-gray-200 rounded-2xl bg-white p-4 md:p-5 hover:shadow-md transition"
                >
                  <div className="flex flex-col lg:flex-row gap-5">
                    {/* IMAGE */}
                    {robot.images?.[0]?.url && (
                      <img
                        src={robot.images[0].url}
                        alt={cleanName}
                        className="w-full lg:w-32 h-52 lg:h-32 rounded-2xl object-cover border border-gray-200 shrink-0"
                      />
                    )}

                    {/* CONTENT */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                        <div>
                          <h3 className="font-semibold text-xl text-[#1f3b57]">
                            {cleanName || "Untitled Robot"}
                          </h3>
                          {robot.category && (
                            <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full mt-1">
                              <FiTag size={10} />
                              {robot.category}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <FiCalendar size={13} />
                          {new Date(robot.createdAt).toLocaleDateString()}
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm leading-relaxed mb-3">
                        {cleanDescription?.slice(0, 200) || "No description"}
                        {cleanDescription?.length > 200 && "..."}
                      </p>

                      {/* SPECIFICATIONS */}
                      {robot.specifications &&
                        robot.specifications.length > 0 && (
                          <div className="mb-3">
                            <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-2">
                              <FiGrid size={12} />
                              <span>Technical Specifications</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {robot.specifications
                                .slice(0, 4)
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
                              {robot.specifications.length > 4 && (
                                <div className="text-xs text-blue-500">
                                  +{robot.specifications.length - 4} more
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                      {/* KEY POINTS */}
                      {robot.keyPoints && robot.keyPoints.length > 0 && (
                        <div className="mb-3">
                          <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-2">
                            <FiList size={12} />
                            <span>Key Features</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {robot.keyPoints.slice(0, 3).map((point, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                              >
                                {point}
                              </span>
                            ))}
                            {robot.keyPoints.length > 3 && (
                              <span className="text-xs text-blue-500">
                                +{robot.keyPoints.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* APPLICATIONS */}
                      {robot.applications && robot.applications.length > 0 && (
                        <div className="mb-4">
                          <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-2">
                            <FiTarget size={12} />
                            <span>Applications</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {robot.applications.slice(0, 3).map((app, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full"
                              >
                                {app}
                              </span>
                            ))}
                            {robot.applications.length > 3 && (
                              <span className="text-xs text-blue-500">
                                +{robot.applications.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* ACTIONS */}
                      <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-gray-100">
                        <button
                          onClick={() => onEdit(robot)}
                          className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#1f3b57] text-white text-sm hover:bg-[#2a4d72] transition"
                        >
                          <FiEdit2 size={15} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(robot._id)}
                          className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 text-sm hover:bg-red-100 transition"
                        >
                          <FiTrash2 size={15} />
                          Delete
                        </button>
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
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <FiChevronLeft />
                    Previous
                  </button>
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

export default ListRobot;
