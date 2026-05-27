"use client";
import React, { useEffect, useState } from "react";
import apiClient from "@/api/client";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchProfile = async () => {
    try {
      const response = await apiClient.get("/user/me");
      setProfile(response?.data?.data?.user || null);
    } catch (err) {
      console.error("Failed to load profile:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-10 shadow-sm">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-10 shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Profile Page</h2>
      <div className="space-y-3">
        <p>
          <span className="font-semibold">Name:</span> {profile?.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {profile?.email}
        </p>
        {profile?.phone && (
          <p>
            <span className="font-semibold">Phone:</span> {profile?.phone}
          </p>
        )}
        <p>
          <span className="font-semibold">Role:</span>{" "}
          {profile?.role || profile?.userType || "user"}
        </p>
        {typeof profile?.is_verified !== "undefined" && (
          <p>
            <span className="font-semibold">Verified:</span>{" "}
            {profile?.is_verified ? "Yes" : "No"}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
