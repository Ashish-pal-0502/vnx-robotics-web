// components/Career/AddCareer.jsx
"use client";
import React, { useState } from 'react';
import apiClient from '@/api/client';

function AddCareer({ onSuccess, editingCareer }) {
  const [formData, setFormData] = useState({
    title: editingCareer?.title || "",
    description: editingCareer?.description || "",
    applyLink: editingCareer?.applyLink || "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!formData.title || !formData.description) {
      setError("Job title and description are required.");
      return;
    }

    const payload = {
      title: formData.title,
      description: formData.description,
      applyLink: formData.applyLink,
    };

    try {
      setLoading(true);
      
      if (editingCareer?._id) {
        await apiClient.put(`/career/update/${editingCareer._id}`, payload);
        setMessage("Career updated successfully.");
      } else {
        await apiClient.post("/career/create", payload);
        setMessage("Career created successfully.");
      }
      
      // Reset form for new entry, but keep for edit mode
      if (!editingCareer) {
        setFormData({ title: "", description: "", applyLink: "" });
      }
      
      // Call onSuccess callback to refresh list or navigate
      if (onSuccess) {
        onSuccess();
      }
      
      // Auto clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
      
    } catch (err) {
      console.error("Submit career failed:", err);
      const serverMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message;
      setError(
        serverMessage ||
          "Unable to save career. Please check your inputs and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">
        {editingCareer?._id ? "Edit Career" : "Add Career"}
      </h2>

      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
          {message}
        </div>
      )}
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Job Title"
          required
          className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#1f3b57]"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Job Description"
          required
          className="w-full border rounded-xl px-4 py-3 outline-none h-32 focus:ring-2 focus:ring-[#1f3b57]"
        />

        <input
          type="url"
          name="applyLink"
          value={formData.applyLink}
          onChange={handleChange}
          placeholder="Apply Link (optional)"
          className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#1f3b57]"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-[#1f3b57] text-white px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2a4d72] transition"
        >
          {loading ? "Saving..." : (editingCareer?._id ? "Update Career" : "Save Career")}
        </button>
      </form>
    </div>
  );
}

export default AddCareer;