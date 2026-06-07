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
  FiUserCheck,
  FiUserX,
  FiCalendar,
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

  // Calculate statistics
  const adminCount = users.filter((u) => u.role === "admin").length;
  const userCount = users.filter((u) => u.role === "user").length;

  // Loading skeleton
  if (loading) {
    return (
      <div className="bg-[#111827] rounded-2xl shadow-xl border border-[#27324a] overflow-hidden animate-pulse">
        <div className="p-6 border-b border-[#27324a]">
          <div className="flex justify-between items-center">
            <div className="space-y-3">
              <div className="h-8 w-48 bg-[#1f2638] rounded-lg"></div>
              <div className="h-4 w-64 bg-[#1f2638] rounded-lg"></div>
            </div>
            <div className="h-12 w-32 bg-[#1f2638] rounded-xl"></div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-20 bg-[#1f2638] rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#111827] rounded-2xl shadow-xl border border-[#27324a] overflow-hidden">
      {/* Header Section - Dark Theme */}
      <div className="bg-linear-to-r from-[#0088db]/10 to-[#006db1]/10 border-b border-[#27324a] px-6 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-linear-to-br from-[#0088db] to-[#006db1] rounded-2xl flex items-center justify-center text-white shadow-lg">
              <FiUsers size={28} />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-heading font-bold text-[#f3f4f6]">
                User Management
              </h1>
              <p className="text-[#a1a1aa] text-sm mt-1">
                Manage user roles, permissions, and access
              </p>
            </div>
          </div>

          <div className="bg-[#0b1020] rounded-2xl px-6 py-3 shadow-md border border-[#27324a]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0088db]/10 rounded-xl flex items-center justify-center">
                <FiUsers className="text-[#0088db]" size={20} />
              </div>
              <div>
                <p className="text-[#71717a] text-xs uppercase tracking-wide">
                  Total Users
                </p>
                <p className="text-2xl font-bold text-[#f3f4f6]">
                  {users.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-[#0b1020]/30 border-b border-[#27324a]">
        <div className="bg-[#0b1020] rounded-xl p-4 shadow-md border border-[#27324a]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#a1a1aa] text-sm font-medium">
                Administrators
              </p>
              <p className="text-2xl font-bold text-[#f3f4f6] mt-1">
                {adminCount}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
              <FiShield className="text-red-500" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-[#0b1020] rounded-xl p-4 shadow-md border border-[#27324a]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#a1a1aa] text-sm font-medium">
                Regular Users
              </p>
              <p className="text-2xl font-bold text-[#f3f4f6] mt-1">
                {userCount}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
              <FiUser className="text-green-500" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-6 border-b border-[#27324a] bg-[#111827]">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717a]"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by name or email..."
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

          {/* Filter Button (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center justify-center gap-2 px-4 py-3 bg-[#0b1020] border border-[#27324a] rounded-xl hover:bg-[#1f2638] transition"
          >
            <FiFilter size={18} className="text-[#a1a1aa]" />
            <span className="font-medium text-[#f3f4f6]">Filters</span>
            {filterRole !== "all" && (
              <span className="w-2 h-2 bg-[#ffba22] rounded-full"></span>
            )}
          </button>

          {/* Filter Options */}
          <div className={`${showFilters ? "flex" : "hidden"} md:flex gap-3`}>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-3 rounded-xl border border-[#27324a] focus:border-[#0088db] outline-none bg-[#0b1020] text-[#f3f4f6] hover:bg-[#1f2638] transition cursor-pointer"
            >
              <option value="all">All Roles</option>
              <option value="admin">👑 Admin</option>
              <option value="user">👤 User</option>
            </select>

            {(searchQuery || filterRole !== "all") && (
              <button
                onClick={clearFilters}
                className="px-4 py-3 text-[#a1a1aa] hover:text-[#f3f4f6] border border-[#27324a] rounded-xl hover:bg-[#1f2638] transition whitespace-nowrap font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchQuery || filterRole !== "all") && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[#27324a]">
            <span className="text-sm text-[#71717a]">Active filters:</span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#0088db]/10 text-[#0088db] rounded-lg text-xs font-medium">
                Search: {searchQuery}
                <button
                  onClick={() => setSearchQuery("")}
                  className="hover:text-[#006db1]"
                >
                  <FiX size={12} />
                </button>
              </span>
            )}
            {filterRole !== "all" && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-500/10 text-purple-400 rounded-lg text-xs font-medium">
                Role: {filterRole === "admin" ? "Admin" : "User"}
                <button
                  onClick={() => setFilterRole("all")}
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

      {/* Mobile View */}
      <div className="md:hidden divide-y divide-[#27324a]">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="p-6 hover:bg-[#1f2638] transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#0088db] to-[#006db1] flex items-center justify-center text-white font-bold text-lg shadow-md">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#f3f4f6]">
                      {user.name}
                    </h3>
                    <p className="text-xs text-[#71717a] mt-0.5">
                      ID: {user._id.slice(-8)}
                    </p>
                  </div>
                </div>

                <div
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    user.role === "admin"
                      ? "bg-red-500/10 text-red-400"
                      : "bg-green-500/10 text-green-400"
                  }`}
                >
                  {user.role === "admin" ? "Admin" : "User"}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-[#a1a1aa] mb-4">
                <FiMail size={14} className="shrink-0 text-[#71717a]" />
                <span className="break-all">{user.email}</span>
              </div>

              <div className="flex gap-3">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-[#27324a] outline-none text-sm font-medium bg-[#0b1020] text-[#f3f4f6] focus:border-[#0088db]"
                >
                  <option value="user">👤 User</option>
                  <option value="admin">👑 Admin</option>
                </select>

                <button
                  onClick={() => handleDelete(user._id)}
                  className="px-4 py-2.5 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition font-medium"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto bg-[#1f2638] rounded-full flex items-center justify-center mb-4">
              <FiUsers size={32} className="text-[#71717a]" />
            </div>
            <p className="text-[#a1a1aa] font-medium">No users found</p>
            {(searchQuery || filterRole !== "all") && (
              <button
                onClick={clearFilters}
                className="mt-4 text-[#0088db] hover:text-[#006db1] underline text-sm"
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
          <thead className="bg-[#0b1020] border-b border-[#27324a]">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#27324a]">
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={user._id}
                  className="hover:bg-[#1f2638] transition group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#0088db] to-[#006db1] flex items-center justify-center text-white font-bold text-sm shadow-md">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-[#f3f4f6]">
                          {user.name}
                        </p>
                        <p className="text-xs text-[#71717a]">
                          ID: {user._id.slice(-8)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-[#a1a1aa]">
                      <FiMail size={14} className="text-[#71717a]" />
                      <span className="text-sm">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                      className={`px-3 py-2 rounded-lg text-sm font-medium border outline-none transition cursor-pointer ${
                        user.role === "admin"
                          ? "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20"
                          : "bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20"
                      }`}
                    >
                      <option value="user">👤 User</option>
                      <option value="admin">👑 Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition font-medium flex items-center gap-2 ml-auto"
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
                    <div className="w-20 h-20 bg-[#1f2638] rounded-full flex items-center justify-center mb-4">
                      <FiUsers size={32} className="text-[#71717a]" />
                    </div>
                    <p className="text-[#a1a1aa] font-medium">No users found</p>
                    {(searchQuery || filterRole !== "all") && (
                      <button
                        onClick={clearFilters}
                        className="mt-4 text-[#0088db] hover:text-[#006db1] underline text-sm"
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
        <div className="px-6 py-4 border-t border-[#27324a] bg-[#0b1020]/30">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-[#71717a]">
              Showing page{" "}
              <span className="font-semibold text-[#f3f4f6]">
                {currentPage}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-[#f3f4f6]">{totalPages}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="px-4 py-2 rounded-xl border border-[#27324a] bg-[#0b1020] hover:bg-[#1f2638] disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-2 text-sm font-medium text-[#a1a1aa]"
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
                      className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        currentPage === pageNum
                          ? "bg-linear-to-r from-[#0088db] to-[#006db1] text-white shadow-md"
                          : "bg-[#0b1020] border border-[#27324a] hover:bg-[#1f2638] text-[#a1a1aa]"
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
                className="px-4 py-2 rounded-xl border border-[#27324a] bg-[#0b1020] hover:bg-[#1f2638] disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-2 text-sm font-medium text-[#a1a1aa]"
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
