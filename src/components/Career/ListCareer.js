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
} from "react-icons/fi";

const ITEMS_PER_PAGE = 5;

const ListCareer = ({ onEdit }) => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  /* =========================
     FETCH CAREERS
  ========================= */
  const fetchCareers = async () => {
    try {
      setLoading(true);

      const response = await apiClient.get("/career/get-all");

      setCareers(response?.data?.data?.data || []);
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
     PAGINATION
  ========================= */
  const totalPages = Math.ceil(careers.length / ITEMS_PER_PAGE);

  const paginatedCareers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return careers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [careers, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================
     LOADING
  ========================= */
  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
        {/* HEADER */}
        <div className="border-b border-gray-200 px-5 py-5 md:px-8 bg-gradient-to-r from-[#f8fbff] to-[#fffaf0]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-gray-200 animate-pulse" />

              <div>
                <div className="h-6 w-52 rounded-lg bg-gray-200 animate-pulse mb-2" />

                <div className="h-4 w-36 rounded-lg bg-gray-100 animate-pulse" />
              </div>
            </div>

            <div className="h-16 w-28 rounded-2xl bg-gray-100 animate-pulse" />
          </div>
        </div>

        {/* TABLE SKELETON */}
        <div className="overflow-x-auto hidden lg:block">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-[#f8fafc] border-b border-gray-200">
              <tr>
                <th className="px-8 py-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Job Title
                </th>

                <th className="px-8 py-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Description
                </th>

                <th className="px-8 py-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Apply Link
                </th>

                <th className="px-8 py-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Created
                </th>

                <th className="px-8 py-5 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="border-b border-gray-100">
                  {/* TITLE */}
                  <td className="px-8 py-6">
                    <div className="space-y-3">
                      <div className="h-5 w-48 rounded bg-gray-200 animate-pulse" />

                      <div className="h-4 w-32 rounded bg-gray-100 animate-pulse" />
                    </div>
                  </td>

                  {/* DESCRIPTION */}
                  <td className="px-8 py-6">
                    <div className="space-y-3">
                      <div className="h-4 w-full max-w-[380px] rounded bg-gray-200 animate-pulse" />

                      <div className="h-4 w-[300px] rounded bg-gray-100 animate-pulse" />
                    </div>
                  </td>

                  {/* LINK */}
                  <td className="px-8 py-6">
                    <div className="h-10 w-28 rounded-xl bg-blue-100 animate-pulse" />
                  </td>

                  {/* DATE */}
                  <td className="px-8 py-6">
                    <div className="h-4 w-28 rounded bg-gray-200 animate-pulse" />
                  </td>

                  {/* ACTIONS */}
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-end gap-3">
                      <div className="h-10 w-24 rounded-xl bg-gray-200 animate-pulse" />

                      <div className="h-10 w-24 rounded-xl bg-red-100 animate-pulse" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE SKELETON */}
        <div className="grid gap-4 p-4 lg:hidden">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="space-y-4">
                <div className="h-5 w-48 rounded bg-gray-200 animate-pulse" />

                <div className="h-4 w-full rounded bg-gray-100 animate-pulse" />

                <div className="h-4 w-3/4 rounded bg-gray-100 animate-pulse" />

                <div className="h-10 w-32 rounded-xl bg-blue-100 animate-pulse" />

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="h-11 rounded-xl bg-gray-200 animate-pulse" />

                  <div className="h-11 rounded-xl bg-red-100 animate-pulse" />
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
      <div className="border-b border-gray-200 px-5 py-5 md:px-8 bg-gradient-to-r from-[#f8fbff] to-[#fffaf0]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#006db1] to-[#0088db] shadow-lg">
              <FiBriefcase className="text-white text-2xl" />
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#111827]">
                Careers Management
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Manage all job openings
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white px-5 py-3 shadow-sm">
            <p className="text-xs uppercase tracking-wider text-gray-500">
              Total Careers
            </p>

            <h3 className="text-2xl font-bold text-[#1f3b57]">
              {careers.length}
            </h3>
          </div>
        </div>
      </div>

      {/* EMPTY */}
      {careers.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#eef6ff] mb-5">
            <FiBriefcase className="text-4xl text-[#006db1]" />
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            No Careers Found
          </h3>

          <p className="text-gray-500 max-w-md">
            There are currently no career opportunities available.
          </p>
        </div>
      ) : (
        <>
          {/* DESKTOP TABLE */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead className="bg-[#f8fafc]">
                <tr>
                  <th className="px-8 py-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Job Title
                  </th>

                  <th className="px-8 py-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Description
                  </th>

                  <th className="px-8 py-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Apply Link
                  </th>

                  <th className="px-8 py-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Created
                  </th>

                  <th className="px-8 py-5 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedCareers.map((career) => (
                  <tr
                    key={career._id}
                    className="border-t border-gray-100 transition hover:bg-[#f9fbff]"
                  >
                    {/* TITLE */}
                    <td className="px-8 py-6">
                      <div className="max-w-[250px]">
                        <h3 className="font-semibold text-[#111827] text-base line-clamp-2">
                          {stripHtml(career.title)}
                        </h3>
                      </div>
                    </td>

                    {/* DESCRIPTION */}
                    <td className="px-8 py-6">
                      <p className="max-w-[400px] text-sm leading-7 text-gray-500 line-clamp-2">
                        {stripHtml(career.description)?.slice(0, 160) ||
                          "No description"}
                      </p>
                    </td>

                    {/* APPLY LINK */}
                    <td className="px-8 py-6">
                      {career.applyLink ? (
                        <a
                          href={career.applyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-[#006db1] transition hover:bg-blue-100"
                        >
                          Open Link
                          <FiExternalLink />
                        </a>
                      ) : (
                        <span className="text-sm text-gray-400">No link</span>
                      )}
                    </td>

                    {/* CREATED */}
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <FiCalendar />

                        {new Date(career.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => onEdit(career)}
                          className="inline-flex items-center gap-2 rounded-xl bg-[#1f3b57] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2a4d72]"
                        >
                          <FiEdit2 />
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(career._id)}
                          className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                        >
                          <FiTrash2 />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARDS */}
          <div className="grid gap-4 p-4 lg:hidden">
            {paginatedCareers.map((career) => (
              <div
                key={career._id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#111827] leading-7">
                      {stripHtml(career.title)}
                    </h3>

                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                      <FiCalendar />

                      {new Date(career.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-gray-500">
                  {stripHtml(career.description)?.slice(0, 160) ||
                    "No description"}
                  ...
                </p>

                {career.applyLink && (
                  <a
                    href={career.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2 text-sm font-medium text-[#006db1] transition hover:bg-blue-100"
                  >
                    Apply Link
                    <FiExternalLink />
                  </a>
                )}

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => onEdit(career)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#1f3b57] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#2a4d72]"
                  >
                    <FiEdit2 />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(career._id)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-100"
                  >
                    <FiTrash2 />
                    Delete
                  </button>
                </div>
              </div>
            ))}
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

export default ListCareer;