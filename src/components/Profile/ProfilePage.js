"use client";
import React, { useEffect, useState } from "react";
import apiClient from "@/api/client";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiShield,
  FiCheckCircle,
  FiXCircle,
  FiEdit2,
  FiSave,
  FiX,
  FiCalendar,
  FiMapPin,
  FiBriefcase,
  FiGlobe,
  FiUserCheck,
} from "react-icons/fi";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const [updating, setUpdating] = useState(false);

  const fetchProfile = async () => {
    try {
      const response = await apiClient.get("/user/me");
      const userData =
        response?.data?.user || response?.data?.data?.user || null;
      setProfile(userData);
      setEditedProfile(userData || {});
    } catch (err) {
      console.error("Failed to load profile:", err);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile({ ...profile });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile({ ...profile });
  };

  const handleSave = async () => {
    try {
      setUpdating(true);
      const updateData = {
        name: editedProfile.name,
        phone: editedProfile.phone,
      };
      const response = await apiClient.put("/user/update-profile", updateData);
      toast.success(response?.data?.message || "Profile updated successfully");
      setProfile(editedProfile);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
      toast.error(err?.response?.data?.message || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  const handleChange = (e) => {
    setEditedProfile({
      ...editedProfile,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#0b1020] to-[#050816] p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#111827] rounded-2xl border border-[#27324a] overflow-hidden animate-pulse">
            <div className="h-32 bg-linear-to-r from-[#0088db] to-[#006db1]"></div>
            <div className="p-8">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-[#1f2638] -mt-12 mb-4"></div>
                <div className="h-6 w-48 bg-[#1f2638] rounded mb-2"></div>
                <div className="h-4 w-32 bg-[#1f2638] rounded"></div>
              </div>
              <div className="mt-8 space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-12 bg-[#1f2638] rounded-xl"></div>
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-linear-to-br from-[#0088db] to-[#006db1] rounded-xl shadow-lg">
              <FiUser className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-[#f3f4f6]">
                My Profile
              </h1>
              <p className="text-sm text-[#a1a1aa] mt-1">
                View and manage your personal information
              </p>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-[#111827] rounded-2xl shadow-xl border border-[#27324a] overflow-hidden">
          {/* Cover Image / Header */}
          <div className="h-32 bg-linear-to-r from-[#0088db] to-[#006db1] relative"></div>

          {/* Avatar - Fixed positioning */}
          <div className="px-6 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-12 mb-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-[#111827] p-1 shadow-lg border border-[#27324a]">
                  <div className="w-full h-full rounded-full bg-linear-to-br from-[#0088db] to-[#006db1] flex items-center justify-center text-white text-3xl font-heading font-bold">
                    {profile?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="name"
                      value={editedProfile.name || ""}
                      onChange={handleChange}
                      className="w-full md:w-96 px-4 py-2 border border-[#27324a] rounded-lg focus:ring-2 focus:ring-[#0088db]/20 focus:border-[#0088db] outline-none bg-[#0b1020] text-[#f3f4f6] placeholder:text-[#71717a]"
                      placeholder="Full Name"
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-heading font-bold text-[#f3f4f6]">
                      {profile?.name || "User Name"}
                    </h2>
                    <p className="text-[#a1a1aa] text-sm">
                      Member since{" "}
                      {new Date(profile?.createdAt).getFullYear() || "2024"}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pb-8 px-6 md:px-8">
            {/* Profile Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Email */}
              <div className="flex items-start gap-3 p-4 bg-[#0b1020] rounded-xl border border-[#27324a]">
                <div className="p-2 bg-[#111827] rounded-lg shadow-sm border border-[#27324a]">
                  <FiMail className="text-[#0088db]" size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#71717a] uppercase tracking-wide">
                    Email Address
                  </p>
                  <p className="text-[#f3f4f6] font-medium truncate">
                    {profile?.email || "Not provided"}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3 p-4 bg-[#0b1020] rounded-xl border border-[#27324a]">
                <div className="p-2 bg-[#111827] rounded-lg shadow-sm border border-[#27324a]">
                  <FiPhone className="text-[#0088db]" size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#71717a] uppercase tracking-wide">
                    Phone Number
                  </p>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={editedProfile.phone || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-1 border border-[#27324a] rounded-lg focus:ring-2 focus:ring-[#0088db]/20 focus:border-[#0088db] outline-none bg-[#0b1020] text-[#f3f4f6] placeholder:text-[#71717a] text-sm"
                      placeholder="Phone number"
                    />
                  ) : (
                    <p className="text-[#f3f4f6] font-medium">
                      {profile?.phone || "Not provided"}
                    </p>
                  )}
                </div>
              </div>

              {/* Role */}
              <div className="flex items-start gap-3 p-4 bg-[#0b1020] rounded-xl border border-[#27324a]">
                <div className="p-2 bg-[#111827] rounded-lg shadow-sm border border-[#27324a]">
                  <FiShield className="text-[#0088db]" size={18} />
                </div>
                <div>
                  <p className="text-xs text-[#71717a] uppercase tracking-wide">
                    Role
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`inline-flex px-2 py-1 rounded-lg text-xs font-medium ${
                        profile?.role === "admin"
                          ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                          : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      }`}
                    >
                      {profile?.role || profile?.userType || "User"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Verification Status */}
              <div className="flex items-start gap-3 p-4 bg-[#0b1020] rounded-xl border border-[#27324a]">
                <div className="p-2 bg-[#111827] rounded-lg shadow-sm border border-[#27324a]">
                  {profile?.is_verified ? (
                    <FiCheckCircle className="text-emerald-400" size={18} />
                  ) : (
                    <FiXCircle className="text-red-400" size={18} />
                  )}
                </div>
                <div>
                  <p className="text-xs text-[#71717a] uppercase tracking-wide">
                    Verification Status
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${
                        profile?.is_verified
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-red-500/10 text-red-400 border border-red-500/20"
                      }`}
                    >
                      {profile?.is_verified ? (
                        <>
                          <FiCheckCircle size={12} />
                          Verified
                        </>
                      ) : (
                        <>
                          <FiXCircle size={12} />
                          Not Verified
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info (if available) */}
            {(profile?.location || profile?.company || profile?.website) && (
              <div className="mb-8">
                <h3 className="text-md font-heading font-semibold text-[#f3f4f6] mb-4 flex items-center gap-2">
                  <FiUserCheck size={18} className="text-[#0088db]" />
                  Additional Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile?.location && (
                    <div className="flex items-center gap-2 text-sm text-[#a1a1aa]">
                      <FiMapPin size={14} className="text-[#71717a]" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                  {profile?.company && (
                    <div className="flex items-center gap-2 text-sm text-[#a1a1aa]">
                      <FiBriefcase size={14} className="text-[#71717a]" />
                      <span>{profile.company}</span>
                    </div>
                  )}
                  {profile?.website && (
                    <div className="flex items-center gap-2 text-sm text-[#a1a1aa]">
                      <FiGlobe size={14} className="text-[#71717a]" />
                      <a
                        href={profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0088db] hover:text-[#006db1] underline"
                      >
                        {profile.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Account Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="text-center p-3 bg-[#0b1020] rounded-xl border border-[#27324a]">
                <p className="text-xs text-[#71717a]">Member Since</p>
                <p className="text-sm font-semibold text-[#f3f4f6] mt-1">
                  {new Date(profile?.createdAt).toLocaleDateString() || "N/A"}
                </p>
              </div>
              <div className="text-center p-3 bg-[#0b1020] rounded-xl border border-[#27324a]">
                <p className="text-xs text-[#71717a]">Last Active</p>
                <p className="text-sm font-semibold text-[#f3f4f6] mt-1">
                  {new Date(profile?.updatedAt).toLocaleDateString() || "N/A"}
                </p>
              </div>
              <div className="text-center p-3 bg-[#0b1020] rounded-xl border border-[#27324a]">
                <p className="text-xs text-[#71717a]">Account ID</p>
                <p className="text-sm font-semibold text-[#f3f4f6] mt-1 truncate">
                  {profile?._id?.slice(-8) || "N/A"}
                </p>
              </div>
              <div className="text-center p-3 bg-[#0b1020] rounded-xl border border-[#27324a]">
                <p className="text-xs text-[#71717a]">Status</p>
                <p className="text-sm font-semibold text-emerald-400 mt-1">
                  Active
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-end pt-6 border-t border-[#27324a]">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    disabled={updating}
                    className="px-6 py-2 rounded-xl border border-[#27324a] text-[#a1a1aa] hover:bg-[#1f2638] transition font-medium flex items-center justify-center gap-2"
                  >
                    <FiX size={18} />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={updating}
                    className="px-6 py-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {updating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#050816]"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <FiSave size={18} />
                        Save Changes
                      </>
                    )}
                  </button>
                </>
              ) : (
                <button onClick={handleEdit} className="px-6 py-2 btn-primary">
                  <FiEdit2 size={18} />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 p-4 bg-[#0088db]/10 rounded-xl border border-[#0088db]/20">
          <div className="flex items-start gap-3">
            <FiShield className="text-[#0088db] mt-0.5" size={18} />
            <div className="text-sm text-[#a1a1aa]">
              <p className="font-medium mb-1 text-[#f3f4f6]">Security Note</p>
              <p className="text-[#a1a1aa]">
                Your personal information is protected. Contact support if you
                need to update sensitive information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
