"use client";

import { useEffect, useState } from "react";
import apiClient from "@/api/client";
import toast from "react-hot-toast";
import {
  FiUsers,
  FiTrash2,
  FiShield,
  FiUser,
  FiChevronLeft,
  FiChevronRight,
  FiMail,
} from "react-icons/fi";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  /* =========================
     FETCH USERS
  ========================= */
  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);

      const res = await apiClient.get(`/user/get-users?page=${page}`);

      setUsers(res?.data?.data?.users || []);
      setTotalPages(res?.data?.data?.totalPages || 1);
      setCurrentPage(Number(res?.data?.data?.currentPage || 1));
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  /* =========================
     CHANGE ROLE
  ========================= */
  const handleRoleChange = async (id, role) => {
    try {
      const res = await apiClient.patch(`/user/change-privilege/${id}`, {
        role,
      });

      toast.success(res?.data?.message || "Role updated");

      setUsers((prev) =>
        prev.map((user) => (user._id === id ? { ...user, role } : user)),
      );
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  /* =========================
     DELETE USER
  ========================= */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmDelete) return;

    try {
      const res = await apiClient.delete(`/user/delete-user/${id}`);

      toast.success(res?.data?.message || "User deleted");

      if (users.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      } else {
        fetchUsers(currentPage);
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  /* =========================
     LOADING UI
  ========================= */
  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
        {/* HEADER SKELETON */}
        <div className="border-b border-gray-200 px-6 py-6 bg-gradient-to-r from-[#f8fbff] to-[#fffdf7]">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-gray-200 animate-pulse" />

              <div className="space-y-3">
                <div className="h-5 w-52 rounded bg-gray-200 animate-pulse" />

                <div className="h-4 w-40 rounded bg-gray-100 animate-pulse" />
              </div>
            </div>

            <div className="h-16 w-36 rounded-2xl bg-gray-100 animate-pulse" />
          </div>
        </div>

        {/* TABLE SKELETON */}
        <div className="p-6 hidden md:block">
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-24 rounded-2xl bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* MOBILE CARD SKELETON */}
        <div className="grid gap-4 p-4 md:hidden">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gray-200 animate-pulse" />

                <div className="flex-1 space-y-3">
                  <div className="h-4 w-40 rounded bg-gray-200 animate-pulse" />

                  <div className="h-3 w-52 rounded bg-gray-100 animate-pulse" />
                </div>
              </div>

              <div className="mt-5 h-12 rounded-xl bg-gray-100 animate-pulse" />

              <div className="mt-4 h-12 rounded-xl bg-gray-100 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
      {/* HEADER */}
      <div className="px-6 md:px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-[#f8fbff] to-[#fffdf7]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#1f3b57] flex items-center justify-center text-white shadow-md">
              <FiUsers size={22} />
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1f3b57]">
                Users Management
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Manage user roles and permissions
              </p>
            </div>
          </div>

          {/* TOTAL */}
          <div className="flex items-center gap-3 bg-white border border-gray-200 px-5 py-3 rounded-2xl shadow-sm w-fit">
            <div className="w-10 h-10 rounded-xl bg-[#eef5ff] flex items-center justify-center text-[#1f3b57]">
              <FiUsers />
            </div>

            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Total Users
              </p>

              <h4 className="text-xl font-bold text-[#1f3b57]">
                {users.length}
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div className="block md:hidden p-4 space-y-4">
        {users?.length > 0 ? (
          users.map((user) => (
            <div
              key={user._id}
              className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm"
            >
              {/* USER */}
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-[#eef5ff] flex items-center justify-center text-[#1f3b57]">
                  <FiUser size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-[#1f3b57] text-base break-words">
                    {user.name}
                  </h3>

                  <div className="flex items-start gap-2 text-sm text-gray-500 mt-1 break-all">
                    <FiMail size={14} className="mt-1 shrink-0" />

                    <span>{user.email}</span>
                  </div>
                </div>
              </div>

              {/* ROLE */}
              <div className="mt-5">
                <label className="text-xs font-medium text-gray-500 block mb-2 uppercase tracking-wide">
                  User Role
                </label>

                <select
                  value={user.role}
                  onChange={(e) =>
                    handleRoleChange(user._id, e.target.value)
                  }
                  className={`w-full px-4 py-3 rounded-xl text-sm border outline-none transition font-medium ${
                    user.role === "admin"
                      ? "bg-red-50 text-red-600 border-red-200"
                      : "bg-green-50 text-green-700 border-green-200"
                  }`}
                >
                  <option value="user">User</option>

                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* ACTIONS */}
              <div className="mt-5">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded-xl transition font-medium"
                >
                  <FiTrash2 />
                  Delete User
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
              <FiUsers size={26} />
            </div>

            <p className="text-gray-500">No users found</p>
          </div>
        )}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block">
        <div className="grid grid-cols-[1.4fr_1.5fr_1fr_140px] gap-4 px-8 py-5 bg-[#f8fafc] border-b border-gray-200">
          <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            User
          </div>

          <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Email Address
          </div>

          <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Role
          </div>

          <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 text-right">
            Actions
          </div>
        </div>

        <div>
          {users?.length > 0 ? (
            users.map((user, index) => (
              <div
                key={user._id}
                className={`grid grid-cols-[1.4fr_1.5fr_1fr_140px] gap-4 px-8 py-5 items-center transition hover:bg-[#fafcff] ${
                  index !== users.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                {/* USER */}
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-[#eef5ff] flex items-center justify-center text-[#1f3b57] shadow-sm">
                    <FiUser size={20} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-semibold text-[#1f3b57] truncate">
                      {user.name}
                    </h3>

                    <p className="text-xs text-gray-400 mt-1 truncate">
                      ID: {user._id.slice(0, 8)}...
                    </p>
                  </div>
                </div>

                {/* EMAIL */}
                <div className="flex items-center gap-2 text-gray-600 min-w-0">
                  <FiMail size={15} className="shrink-0" />

                  <span className="truncate">{user.email}</span>
                </div>

                {/* ROLE */}
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center ${
                      user.role === "admin"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    <FiShield size={16} />
                  </div>

                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChange(user._id, e.target.value)
                    }
                    className={`w-full max-w-[140px] px-4 py-2.5 rounded-xl text-sm border outline-none font-medium transition ${
                      user.role === "admin"
                        ? "bg-red-50 text-red-600 border-red-200"
                        : "bg-green-50 text-green-700 border-green-200"
                    }`}
                  >
                    <option value="user">User</option>

                    <option value="admin">Admin</option>
                  </select>
                </div>

                {/* ACTION */}
                <div className="flex justify-end">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition font-medium whitespace-nowrap"
                  >
                    <FiTrash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 text-gray-500">
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
                  <FiUsers size={26} />
                </div>

                No users found
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="px-6 py-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* INFO */}
          <div className="text-sm text-gray-500">
            Page{" "}
            <span className="font-semibold text-[#1f3b57]">
              {currentPage}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[#1f3b57]">
              {totalPages}
            </span>
          </div>

          {/* BUTTONS */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {/* PREV */}
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="h-11 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
            >
              <FiChevronLeft />
              Prev
            </button>

            {/* PAGE NUMBERS */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-11 h-11 rounded-xl text-sm font-semibold transition ${
                  currentPage === index + 1
                    ? "bg-[#1f3b57] text-white shadow-md"
                    : "bg-white border border-gray-200 hover:bg-gray-50 text-gray-700"
                }`}
              >
                {index + 1}
              </button>
            ))}

            {/* NEXT */}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="h-11 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
            >
              Next
              <FiChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;