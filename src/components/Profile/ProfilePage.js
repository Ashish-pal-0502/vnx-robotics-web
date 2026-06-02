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
      const userData = response?.data?.user || response?.data?.data?.user || null;
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-pulse">
            <div className="h-32 bg-gradient-to-r from-[#1f3b57] to-[#2c4d6e]"></div>
            <div className="p-8">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 -mt-12 mb-4"></div>
                <div className="h-6 w-48 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-32 bg-gray-100 rounded"></div>
              </div>
              <div className="mt-8 space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-12 bg-gray-100 rounded-xl"></div>
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-[#1f3b57] to-[#2c4d6e] rounded-xl shadow-lg">
              <FiUser className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                My Profile
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                View and manage your personal information
              </p>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Cover Image / Header */}
          <div className="h-32 bg-gradient-to-r from-[#1f3b57] to-[#2c4d6e] relative"></div>

          {/* Avatar - Fixed positioning */}
          <div className="px-6 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-12 mb-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-white p-1 shadow-lg">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#1f3b57] to-[#2c4d6e] flex items-center justify-center text-white text-3xl font-bold">
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
                      className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f3b57]/20 focus:border-[#1f3b57] outline-none"
                      placeholder="Full Name"
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {profile?.name || "User Name"}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      Member since {new Date(profile?.createdAt).getFullYear() || "2024"}
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
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <FiMail className="text-[#1f3b57]" size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Email Address</p>
                  <p className="text-gray-800 font-medium truncate">{profile?.email || "Not provided"}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <FiPhone className="text-[#1f3b57]" size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Phone Number</p>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={editedProfile.phone || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f3b57]/20 focus:border-[#1f3b57] outline-none text-sm"
                      placeholder="Phone number"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">
                      {profile?.phone || "Not provided"}
                    </p>
                  )}
                </div>
              </div>

              {/* Role */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <FiShield className="text-[#1f3b57]" size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Role</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-flex px-2 py-1 rounded-lg text-xs font-medium ${
                      profile?.role === "admin" 
                        ? "bg-purple-100 text-purple-700" 
                        : "bg-blue-100 text-blue-700"
                    }`}>
                      {profile?.role || profile?.userType || "User"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Verification Status */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  {profile?.is_verified ? (
                    <FiCheckCircle className="text-green-500" size={18} />
                  ) : (
                    <FiXCircle className="text-red-500" size={18} />
                  )}
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Verification Status</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${
                      profile?.is_verified 
                        ? "bg-green-100 text-green-700" 
                        : "bg-red-100 text-red-700"
                    }`}>
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
                <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FiUserCheck size={18} />
                  Additional Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile?.location && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiMapPin size={14} />
                      <span>{profile.location}</span>
                    </div>
                  )}
                  {profile?.company && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiBriefcase size={14} />
                      <span>{profile.company}</span>
                    </div>
                  )}
                  {profile?.website && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiGlobe size={14} />
                      <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {profile.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Account Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="text-center p-3 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500">Member Since</p>
                <p className="text-sm font-semibold text-gray-800 mt-1">
                  {new Date(profile?.createdAt).toLocaleDateString() || "N/A"}
                </p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500">Last Active</p>
                <p className="text-sm font-semibold text-gray-800 mt-1">
                  {new Date(profile?.updatedAt).toLocaleDateString() || "N/A"}
                </p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500">Account ID</p>
                <p className="text-sm font-semibold text-gray-800 mt-1 truncate">
                  {profile?._id?.slice(-8) || "N/A"}
                </p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500">Status</p>
                <p className="text-sm font-semibold text-green-600 mt-1">Active</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-end pt-6 border-t border-gray-100">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    disabled={updating}
                    className="px-6 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition font-medium flex items-center justify-center gap-2"
                  >
                    <FiX size={18} />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={updating}
                    className="px-6 py-2 bg-gradient-to-r from-[#1f3b57] to-[#2c4d6e] text-white rounded-xl hover:shadow-lg transition font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {updating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
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
                <button
                  onClick={handleEdit}
                  className="px-6 py-2 bg-gradient-to-r from-[#1f3b57] to-[#2c4d6e] text-white rounded-xl hover:shadow-lg transition font-medium flex items-center justify-center gap-2"
                >
                  <FiEdit2 size={18} />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <div className="flex items-start gap-3">
            <FiShield className="text-blue-600 mt-0.5" size={18} />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Security Note</p>
              <p className="text-blue-700">
                Your personal information is protected. Contact support if you need to update sensitive information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;