"use client";
import React, { useEffect, useState } from "react";
import apiClient from "@/api/client";
import toast from "react-hot-toast";

function AddCareer({ onSuccess, editingCareer }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    jobType: "Full Time",
    category: "",
    applyLink: "",
  });

  // Job type options
  const jobTypeOptions = [
    "Full Time",
    "Part Time",
    "Internship",
    "Contract",
    "Remote",
  ];

  // Load edit data
  useEffect(() => {
    if (editingCareer) {
      setFormData({
        title: editingCareer?.title || "",
        description: editingCareer?.description || "",
        location: editingCareer?.location || "",
        jobType: editingCareer?.jobType || "Full Time",
        category: editingCareer?.category || "",
        applyLink: editingCareer?.applyLink || "",
      });
    }
  }, [editingCareer]);

  // Validate
  const validateForm = () => {
    if (!formData.title || formData.title.trim() === "") {
      setError("Job title is required.");
      return false;
    }
    if (!formData.description || formData.description.trim() === "") {
      setError("Job description is required.");
      return false;
    }
    if (!formData.location || formData.location.trim() === "") {
      setError("Job location is required.");
      return false;
    }
    if (!formData.category || formData.category.trim() === "") {
      setError("Job category is required.");
      return false;
    }
    return true;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!validateForm()) return;

    const payload = {
      title: formData.title,
      description: formData.description,
      location: formData.location,
      jobType: formData.jobType,
      category: formData.category,
      applyLink: formData.applyLink,
    };

    try {
      setLoading(true);

      if (editingCareer?._id) {
        const res = await apiClient.put(
          `/career/update/${editingCareer._id}`,
          payload,
        );
        toast.success(res?.data?.message || "Career updated successfully");
      } else {
        const res = await apiClient.post("/career/create", payload);
        toast.success(res?.data?.message || "Career created successfully");
        // Reset form
        setFormData({
          title: "",
          description: "",
          location: "",
          jobType: "Full Time",
          category: "",
          applyLink: "",
        });
      }

      if (onSuccess) {
        onSuccess();
      }

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (err) {
      console.error("Career submit error:", err);
      toast.error("Submit career failed. Please try again.");
      const serverMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message;
      setError(serverMessage || "Unable to save career. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">
        {editingCareer?._id ? "Update Career" : "Add Career"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ERROR */}
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>
        )}

        {/* SUCCESS */}
        {message && (
          <div className="p-3 bg-green-100 text-green-700 rounded-lg">
            {message}
          </div>
        )}

        {/* TITLE */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            placeholder="Enter job title"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#1f3b57]"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            placeholder="Write job description..."
            rows={8}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#1f3b57] resize-y"
          />
        </div>

        {/* LOCATION */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                location: e.target.value,
              }))
            }
            placeholder="e.g., New York, NY or Remote"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#1f3b57]"
          />
        </div>

        {/* JOB TYPE */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Type <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.jobType}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                jobType: e.target.value,
              }))
            }
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#1f3b57] bg-white"
          >
            {jobTypeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* CATEGORY */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                category: e.target.value,
              }))
            }
            placeholder="e.g., Engineering, Marketing, Sales, Design"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#1f3b57]"
          />
        </div>

        {/* APPLY LINK */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Apply Link
          </label>
          <input
            type="url"
            value={formData.applyLink}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                applyLink: e.target.value,
              }))
            }
            placeholder="https://example.com/careers/apply"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#1f3b57]"
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#1f3b57] text-white px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2a4d72] transition font-medium"
        >
          {loading
            ? "Saving..."
            : editingCareer?._id
              ? "Update Career"
              : "Add Career"}
        </button>
      </form>
    </div>
  );
}

export default AddCareer;