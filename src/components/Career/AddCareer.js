"use client";
import React, { useEffect, useState } from "react";
import apiClient from "@/api/client";
import toast from "react-hot-toast";
import { 
  FiBriefcase, 
  FiMapPin, 
  FiFileText, 
  FiTag, 
  FiLink, 
  FiAlertCircle,
  FiCheckCircle,
  FiSave,
  FiPlus,
  FiEdit2,
  FiClock,
  FiGrid
} from "react-icons/fi";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-[#1f3b57] to-[#2c4d6e] rounded-xl shadow-lg">
              <FiBriefcase className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {editingCareer?._id ? "Update Career Position" : "Add New Career"}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {editingCareer?._id 
                  ? "Update existing career opportunity details"
                  : "Create a new career opportunity for job seekers"}
              </p>
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* ERROR ALERT */}
              {error && (
                <div className="flex items-start gap-3 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                  <FiAlertCircle className="text-red-500 mt-0.5 shrink-0" size={20} />
                  <div>
                    <p className="font-medium text-red-800">Error</p>
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              )}

              {/* SUCCESS ALERT */}
              {message && (
                <div className="flex items-start gap-3 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
                  <FiCheckCircle className="text-green-500 mt-0.5 shrink-0" size={20} />
                  <div>
                    <p className="font-medium text-green-800">Success</p>
                    <p className="text-sm text-green-700">{message}</p>
                  </div>
                </div>
              )}

              {/* Two Column Layout for Desktop */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* TITLE */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Job Title <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiBriefcase className="text-gray-400" size={18} />
                      </div>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        placeholder="e.g., Senior Software Engineer"
                        className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#1f3b57]/20 focus:border-[#1f3b57] transition"
                      />
                    </div>
                  </div>

                  {/* LOCATION */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMapPin className="text-gray-400" size={18} />
                      </div>
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
                        className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#1f3b57]/20 focus:border-[#1f3b57] transition"
                      />
                    </div>
                  </div>

                  {/* JOB TYPE */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Job Type <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiClock className="text-gray-400" size={18} />
                      </div>
                      <select
                        value={formData.jobType}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            jobType: e.target.value,
                          }))
                        }
                        className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#1f3b57]/20 focus:border-[#1f3b57] bg-white transition appearance-none cursor-pointer"
                      >
                        {jobTypeOptions.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* CATEGORY */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiGrid className="text-gray-400" size={18} />
                      </div>
                      <input
                        type="text"
                        value={formData.category}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }))
                        }
                        placeholder="e.g., Engineering, Marketing, Sales"
                        className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#1f3b57]/20 focus:border-[#1f3b57] transition"
                      />
                    </div>
                  </div>

                  {/* APPLY LINK */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Apply Link
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLink className="text-gray-400" size={18} />
                      </div>
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
                        className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#1f3b57]/20 focus:border-[#1f3b57] transition"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Optional: Add external application link
                    </p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* DESCRIPTION */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Job Description <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3 pointer-events-none">
                        <FiFileText className="text-gray-400" size={18} />
                      </div>
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        placeholder="Write detailed job description including responsibilities, requirements, and benefits..."
                        rows={12}
                        className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#1f3b57]/20 focus:border-[#1f3b57] transition resize-y"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Tip: Include key responsibilities, requirements, and benefits
                    </p>
                  </div>
                </div>
              </div>

              {/* Guidelines Section */}
              <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <div className="flex items-start gap-3">
                  <FiAlertCircle className="text-blue-600 mt-0.5 shrink-0" size={18} />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-2">Job Posting Tips:</p>
                    <ul className="space-y-1 text-blue-700">
                      <li>• Use clear and descriptive job titles</li>
                      <li>• Include specific requirements and qualifications</li>
                      <li>• Mention salary range if possible (optional)</li>
                      <li>• Add company culture and benefits information</li>
                      <li>• Proofread before posting</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-xl transition-all font-semibold flex items-center justify-center gap-2 ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#1f3b57] to-[#2c4d6e] hover:shadow-lg transform hover:scale-[1.02] text-white"
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      {editingCareer?._id ? (
                        <>
                          <FiEdit2 size={18} />
                          Update Career
                        </>
                      ) : (
                        <>
                          <FiPlus size={18} />
                          Create Career
                        </>
                      )}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCareer;