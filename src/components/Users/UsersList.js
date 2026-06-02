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
  FiSearch,
  FiFilter,
  FiX,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch users with search and filter
  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("page", page);
      if (debouncedSearch) params.append("search", debouncedSearch);

      const res = await apiClient.get(`/user/get-users?${params.toString()}`);

      let fetchedUsers = res?.data?.users || [];

      // Apply role filter on client side (if backend doesn't support it)
      if (filterRole !== "all") {
        fetchedUsers = fetchedUsers.filter((user) => user.role === filterRole);
      }

      setUsers(fetchedUsers);
      setTotalPages(res?.data?.totalPages || 1);
      setCurrentPage(Number(res?.data?.currentPage || 1));
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage, debouncedSearch, filterRole]);

  // Handle role change
  const handleRoleChange = async (id, role) => {
    try {
      const res = await apiClient.patch(`/user/change-privilege/${id}`, {
        role,
      });

      toast.success(res?.data?.message || "Role updated successfully");

      setUsers((prev) =>
        prev.map((user) => (user._id === id ? { ...user, role } : user)),
      );
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  // Handle delete user
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user? This action cannot be undone.",
    );

    if (!confirmDelete) return;

    try {
      const res = await apiClient.delete(`/user/delete-user/${id}`);

      toast.success(res?.data?.message || "User deleted successfully");

      if (users.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      } else {
        fetchUsers(currentPage);
      }
    } catch (error) {
      toast.error("Delete failed. Please try again.");
    }
  };

  // Clear filters
  const clearFilters = () => {
    setSearchQuery("");
    setFilterRole("all");
    setShowFilters(false);
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <div className="space-y-3">
              <div className="h-8 w-48 bg-gray-200 rounded-lg"></div>
              <div className="h-4 w-64 bg-gray-100 rounded-lg"></div>
            </div>
            <div className="h-12 w-32 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-20 bg-gray-100 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#1f3b57] to-[#2c4d6e] px-6 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center text-white">
              <FiUsers size={28} />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white">
                User Management
              </h1>
              <p className="text-white/80 text-sm mt-1">
                Manage user roles, permissions, and access
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-2xl px-6 py-3">
            <div className="flex items-center gap-3">
              <FiUsers className="text-white/80" />
              <div>
                <p className="text-white/60 text-xs uppercase tracking-wide">
                  Total Users
                </p>
                <p className="text-white text-2xl font-bold">{users.length}</p>
              </div>
            </div>
          </div>
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
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#1f3b57] focus:ring-2 focus:ring-[#1f3b57]/20 outline-none transition-all"
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

          {/* Filter Button (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl"
          >
            <FiFilter />
            Filters
            {filterRole !== "all" && (
              <span className="w-2 h-2 bg-[#1f3b57] rounded-full"></span>
            )}
          </button>

          {/* Filter Options */}
          <div
            className={`${showFilters ? "flex" : "hidden"} md:flex flex-col md:flex-row gap-3`}
          >
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1f3b57] outline-none bg-white"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>

            {(searchQuery || filterRole !== "all") && (
              <button
                onClick={clearFilters}
                className="px-4 py-3 text-gray-600 hover:text-gray-800 border border-gray-200 rounded-xl hover:bg-gray-50 transition whitespace-nowrap"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden divide-y divide-gray-100">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="p-6 hover:bg-gray-50 transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1f3b57] to-[#2c4d6e] flex items-center justify-center text-white font-bold text-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{user.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      ID: {user._id.slice(-8)}
                    </p>
                  </div>
                </div>

                <div
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    user.role === "admin"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {user.role === "admin" ? "Admin" : "User"}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <FiMail size={14} className="shrink-0" />
                <span className="break-all">{user.email}</span>
              </div>

              <div className="flex gap-3">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm font-medium"
                >
                  <option value="user">👤 User</option>
                  <option value="admin">👑 Admin</option>
                </select>

                <button
                  onClick={() => handleDelete(user._id)}
                  className="px-4 py-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition font-medium"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FiUsers size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">No users found</p>
            {(searchQuery || filterRole !== "all") && (
              <button
                onClick={clearFilters}
                className="mt-4 text-[#1f3b57] hover:underline text-sm"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50/50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1f3b57] to-[#2c4d6e] flex items-center justify-center text-white font-bold text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-400">
                          {user._id.slice(-8)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FiMail size={14} className="text-gray-400" />
                      <span className="text-sm">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                      className={`px-3 py-2 rounded-lg text-sm font-medium border outline-none transition ${
                        user.role === "admin"
                          ? "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                          : "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                      }`}
                    >
                      <option value="user">👤 User</option>
                      <option value="admin">👑 Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium flex items-center gap-2 ml-auto"
                    >
                      <FiTrash2 size={16} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <FiUsers size={32} className="text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium">No users found</p>
                    {(searchQuery || filterRole !== "all") && (
                      <button
                        onClick={clearFilters}
                        className="mt-4 text-[#1f3b57] hover:underline text-sm"
                      >
                        Clear filters
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500">
              Showing page{" "}
              <span className="font-semibold text-[#1f3b57]">
                {currentPage}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-[#1f3b57]">{totalPages}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2 text-sm font-medium"
              >
                <FiChevronLeft size={16} />
                Previous
              </button>

              <div className="hidden sm:flex gap-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
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
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-lg text-sm font-semibold transition ${
                        currentPage === pageNum
                          ? "bg-[#1f3b57] text-white shadow-md"
                          : "bg-white border border-gray-200 hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2 text-sm font-medium"
              >
                Next
                <FiChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;
