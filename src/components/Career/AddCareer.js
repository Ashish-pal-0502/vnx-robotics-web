"use client";
import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import apiClient from "@/api/client";
import toast from "react-hot-toast";
import {
  FiBriefcase,
  FiMapPin,
  FiFileText,
  FiLink,
  FiAlertCircle,
  FiPlus,
  FiEdit2,
  FiClock,
  FiGrid,
  FiX,
  FiBold,
  FiItalic,
  FiUnderline,
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiList,
  FiCode,
  FiType,
} from "react-icons/fi";

function AddCareer({ onSuccess, editingCareer, onCancel }) {
  const [loading, setLoading] = useState(false);
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

  // Initialize TipTap editor for description
  const descriptionEditor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-[#0088db] underline hover:text-[#006db1]",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      Placeholder.configure({
        placeholder: "Write detailed job description including responsibilities, requirements, and benefits...",
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({
        ...prev,
        description: editor.getHTML(),
      }));
    },
  });

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

      // Set editor content if editing
      if (descriptionEditor && editingCareer?.description) {
        descriptionEditor.commands.setContent(editingCareer.description);
      }
    }
  }, [editingCareer, descriptionEditor]);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Validate URL helper
  const isValidUrl = (url) => {
    if (!url || url.trim() === "") return false;
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === "http:" || urlObj.protocol === "https:";
    } catch {
      return false;
    }
  };

  // Validate form
  const validateForm = () => {
    // Check for empty fields
    if (!formData.title || formData.title.trim() === "") {
      setError("Job title is required.");
      return false;
    }
    
    // Check description - handle empty or just empty tags
    const descText = formData.description.replace(/<[^>]*>/g, '').trim();
    if (!descText || descText === "") {
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
    if (!formData.applyLink || formData.applyLink.trim() === "") {
      setError("Apply link is required.");
      return false;
    }

    // Validate URL format
    if (!isValidUrl(formData.applyLink)) {
      setError("Please enter a valid URL (e.g., https://example.com)");
      return false;
    }

    // Validate field lengths
    if (formData.title.length > 100) {
      setError("Job title must be less than 100 characters.");
      return false;
    }
    if (formData.category.length > 50) {
      setError("Category must be less than 50 characters.");
      return false;
    }
    if (formData.location.length > 100) {
      setError("Location must be less than 100 characters.");
      return false;
    }

    // Check description length (stripping HTML tags)
    const plainText = formData.description.replace(/<[^>]*>/g, '');
    if (plainText.length < 50) {
      setError("Job description must be at least 50 characters.");
      return false;
    }

    return true;
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      location: "",
      jobType: "Full Time",
      category: "",
      applyLink: "",
    });
    setError("");
    if (descriptionEditor) {
      descriptionEditor.commands.clearContent();
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    const payload = {
      title: formData.title.trim(),
      description: formData.description,
      location: formData.location.trim(),
      jobType: formData.jobType,
      category: formData.category.trim(),
      applyLink: formData.applyLink.trim(),
    };

    try {
      setLoading(true);

      if (editingCareer?._id) {
        const res = await apiClient.put(
          `/career/update/${editingCareer._id}`,
          payload,
        );
        toast.success(res?.data?.message || "Career updated successfully");
        if (onSuccess) onSuccess();
      } else {
        const res = await apiClient.post("/career/create", payload);
        toast.success(res?.data?.message || "Career created successfully");
        resetForm();
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      console.error("Career submit error:", err);

      // Handle different error scenarios
      if (err?.response?.status === 409) {
        toast.error("A career with this title already exists.");
        setError("A career position with this title already exists.");
      } else if (err?.response?.status === 400) {
        const message =
          err?.response?.data?.message || "Invalid data provided.";
        toast.error(message);
        setError(message);
      } else if (err?.response?.status === 401) {
        toast.error("You are not authorized. Please login again.");
        setError("Authentication failed. Please login again.");
      } else {
        toast.error("Failed to save career. Please try again.");
        setError(
          err?.response?.data?.message ||
            err?.response?.data?.error ||
            err?.message ||
            "Unable to save career. Please try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    resetForm();
    if (onCancel) onCancel();
  };

  // Toolbar Button Component
  const ToolbarButton = ({ onClick, active, children, icon: Icon, title }) => (
    <button
      onClick={onClick}
      type="button"
      title={title}
      className={`p-2 rounded-lg transition-all text-sm font-medium ${
        active
          ? "bg-linear-to-r from-[#0088db] to-[#006db1] text-white shadow-md"
          : "text-[#a1a1aa] hover:bg-[#1f2638] hover:text-[#f3f4f6]"
      }`}
    >
      {Icon ? <Icon size={18} /> : children}
    </button>
  );

  // Description Editor Toolbar
  const DescriptionToolbar = () => {
    if (!descriptionEditor) return null;

    return (
      <div className="flex flex-wrap gap-1 mb-3 p-2 border border-[#27324a] rounded-xl bg-[#0b1020]">
        {/* Text Formatting */}
        <div className="flex items-center gap-1 border-r border-[#27324a] pr-2 mr-1">
          <ToolbarButton
            onClick={() => descriptionEditor.chain().focus().toggleBold().run()}
            active={descriptionEditor.isActive("bold")}
            icon={FiBold}
            title="Bold"
          />
          <ToolbarButton
            onClick={() => descriptionEditor.chain().focus().toggleItalic().run()}
            active={descriptionEditor.isActive("italic")}
            icon={FiItalic}
            title="Italic"
          />
          <ToolbarButton
            onClick={() => descriptionEditor.chain().focus().toggleUnderline().run()}
            active={descriptionEditor.isActive("underline")}
            icon={FiUnderline}
            title="Underline"
          />
        </div>

        {/* Headings */}
        <div className="flex items-center gap-1 border-r border-[#27324a] pr-2 mr-1">
          <ToolbarButton
            onClick={() => descriptionEditor.chain().focus().toggleHeading({ level: 1 }).run()}
            active={descriptionEditor.isActive("heading", { level: 1 })}
            children="H1"
            title="Heading 1"
          />
          <ToolbarButton
            onClick={() => descriptionEditor.chain().focus().toggleHeading({ level: 2 }).run()}
            active={descriptionEditor.isActive("heading", { level: 2 })}
            children="H2"
            title="Heading 2"
          />
          <ToolbarButton
            onClick={() => descriptionEditor.chain().focus().toggleHeading({ level: 3 }).run()}
            active={descriptionEditor.isActive("heading", { level: 3 })}
            children="H3"
            title="Heading 3"
          />
        </div>

        {/* Alignment */}
        <div className="flex items-center gap-1 border-r border-[#27324a] pr-2 mr-1">
          <ToolbarButton
            onClick={() => descriptionEditor.chain().focus().setTextAlign("left").run()}
            active={descriptionEditor.isActive({ textAlign: "left" })}
            icon={FiAlignLeft}
            title="Align Left"
          />
          <ToolbarButton
            onClick={() => descriptionEditor.chain().focus().setTextAlign("center").run()}
            active={descriptionEditor.isActive({ textAlign: "center" })}
            icon={FiAlignCenter}
            title="Align Center"
          />
          <ToolbarButton
            onClick={() => descriptionEditor.chain().focus().setTextAlign("right").run()}
            active={descriptionEditor.isActive({ textAlign: "right" })}
            icon={FiAlignRight}
            title="Align Right"
          />
        </div>

        {/* Lists */}
        <div className="flex items-center gap-1">
          <ToolbarButton
            onClick={() => descriptionEditor.chain().focus().toggleBulletList().run()}
            active={descriptionEditor.isActive("bulletList")}
            icon={FiList}
            title="Bullet List"
          />
          <ToolbarButton
            onClick={() => descriptionEditor.chain().focus().toggleOrderedList().run()}
            active={descriptionEditor.isActive("orderedList")}
            children="1."
            title="Numbered List"
          />
          <ToolbarButton
            onClick={() => descriptionEditor.chain().focus().toggleCodeBlock().run()}
            active={descriptionEditor.isActive("codeBlock")}
            icon={FiCode}
            title="Code Block"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0b1020] to-[#050816] p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-linear-to-br from-[#0088db] to-[#006db1] rounded-xl shadow-lg">
                <FiBriefcase className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-[#f3f4f6]">
                  {editingCareer?._id
                    ? "Update Career Position"
                    : "Add New Career"}
                </h1>
                <p className="text-sm text-[#a1a1aa] mt-1">
                  {editingCareer?._id
                    ? "Update existing career opportunity details"
                    : "Create a new career opportunity for job seekers"}
                </p>
              </div>
            </div>
            {onCancel && (
              <button
                onClick={handleCancel}
                className="p-2 hover:bg-[#1f2638] rounded-lg transition-colors"
                aria-label="Close"
              >
                <FiX size={24} className="text-[#a1a1aa]" />
              </button>
            )}
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-[#111827] rounded-2xl shadow-xl border border-[#27324a] overflow-hidden">
          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* ERROR ALERT */}
              {error && (
                <div className="flex items-start gap-3 p-4 bg-red-500/10 border-l-4 border-red-500 rounded-lg animate-shake">
                  <FiAlertCircle
                    className="text-red-500 mt-0.5 shrink-0"
                    size={20}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-red-400">Error</p>
                    <p className="text-sm text-red-300">{error}</p>
                  </div>
                  <button
                    onClick={() => setError("")}
                    className="text-red-400 hover:text-red-300"
                  >
                    <FiX size={18} />
                  </button>
                </div>
              )}

              {/* Two Column Layout for Desktop */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* TITLE */}
                  <div>
                    <label className="block text-sm font-semibold text-[#f3f4f6] mb-2">
                      Job Title <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiBriefcase className="text-[#71717a]" size={18} />
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
                        maxLength={100}
                        className="w-full border border-[#27324a] rounded-xl pl-10 pr-16 py-3 outline-none focus:ring-2 focus:ring-[#0088db]/20 focus:border-[#0088db] transition bg-[#0b1020] text-[#f3f4f6] placeholder:text-[#71717a] disabled:bg-[#1f2638] disabled:cursor-not-allowed"
                        disabled={loading}
                      />
                      <div className="absolute right-3 top-3 text-xs text-[#71717a]">
                        {formData.title.length}/100
                      </div>
                    </div>
                  </div>

                  {/* LOCATION */}
                  <div>
                    <label className="block text-sm font-semibold text-[#f3f4f6] mb-2">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMapPin className="text-[#71717a]" size={18} />
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
                        maxLength={100}
                        className="w-full border border-[#27324a] rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#0088db]/20 focus:border-[#0088db] transition bg-[#0b1020] text-[#f3f4f6] placeholder:text-[#71717a] disabled:bg-[#1f2638] disabled:cursor-not-allowed"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* JOB TYPE */}
                  <div>
                    <label className="block text-sm font-semibold text-[#f3f4f6] mb-2">
                      Job Type <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiClock className="text-[#71717a]" size={18} />
                      </div>
                      <select
                        value={formData.jobType}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            jobType: e.target.value,
                          }))
                        }
                        className="w-full border border-[#27324a] rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#0088db]/20 focus:border-[#0088db] bg-[#0b1020] text-[#f3f4f6] transition appearance-none cursor-pointer disabled:bg-[#1f2638] disabled:cursor-not-allowed"
                        disabled={loading}
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
                    <label className="block text-sm font-semibold text-[#f3f4f6] mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiGrid className="text-[#71717a]" size={18} />
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
                        maxLength={50}
                        className="w-full border border-[#27324a] rounded-xl pl-10 pr-16 py-3 outline-none focus:ring-2 focus:ring-[#0088db]/20 focus:border-[#0088db] transition bg-[#0b1020] text-[#f3f4f6] placeholder:text-[#71717a] disabled:bg-[#1f2638] disabled:cursor-not-allowed"
                        disabled={loading}
                      />
                      <div className="absolute right-3 top-3 text-xs text-[#71717a]">
                        {formData.category.length}/50
                      </div>
                    </div>
                  </div>

                  {/* APPLY LINK */}
                  <div>
                    <label className="block text-sm font-semibold text-[#f3f4f6] mb-2">
                      Apply Link <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLink className="text-[#71717a]" size={18} />
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
                        className="w-full border border-[#27324a] rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#0088db]/20 focus:border-[#0088db] transition bg-[#0b1020] text-[#f3f4f6] placeholder:text-[#71717a] disabled:bg-[#1f2638] disabled:cursor-not-allowed"
                        disabled={loading}
                      />
                    </div>
                    <p className="text-xs text-[#71717a] mt-1">
                      Application link where candidates can apply for this
                      position
                    </p>
                  </div>
                </div>

                {/* Right Column - Description with Rich Editor */}
                <div className="space-y-6">
                  {/* DESCRIPTION with Rich Editor */}
                  <div>
                    <label className="block text-sm font-semibold text-[#f3f4f6] mb-2">
                      Job Description <span className="text-red-500">*</span>
                    </label>
                    
                    {/* Toolbar */}
                    <DescriptionToolbar />
                    
                    {/* Editor */}
                    <div className="border border-[#27324a] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#0088db]/20 focus-within:border-[#0088db] transition bg-[#0b1020]">
                      <EditorContent
                        editor={descriptionEditor}
                        className="prose max-w-none p-4 min-h-80 text-[#f3f4f6]"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-[#71717a]">
                        Tip: Include key responsibilities, requirements, and benefits. Use formatting for better readability.
                      </p>
                      <span className="text-xs text-[#71717a]">
                        {formData.description.replace(/<[^>]*>/g, '').length} chars
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guidelines Section */}
              <div className="mt-6 p-4 bg-[#0088db]/10 rounded-xl border border-[#0088db]/20">
                <div className="flex items-start gap-3">
                  <FiAlertCircle
                    className="text-[#0088db] mt-0.5 shrink-0"
                    size={18}
                  />
                  <div className="text-sm text-[#a1a1aa]">
                    <p className="font-medium mb-2 text-[#f3f4f6]">
                      Job Posting Tips:
                    </p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Use clear and descriptive job titles</li>
                      <li>Include specific requirements and qualifications</li>
                      <li>Mention salary range if possible (optional)</li>
                      <li>Add company culture and benefits information</li>
                      <li>Provide a valid application link for candidates</li>
                      <li>Use formatting to make the description scannable</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* FORM ACTIONS */}
              <div className="pt-4 flex gap-3">
                {onCancel && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={loading}
                    className="flex-1 py-4 rounded-full transition-all font-heading font-semibold bg-[#0b1020] hover:bg-[#1f2638] text-[#a1a1aa] border border-[#27324a] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 py-4 rounded-full transition-all font-heading font-semibold flex items-center justify-center gap-2 ${
                    loading
                      ? "bg-[#27324a] cursor-not-allowed text-[#71717a]"
                      : "btn-primary"
                  }`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
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

      {/* Global Styles */}
      <style jsx global>{`
        .ProseMirror {
          outline: none;
          min-height: 200px;
        }

        .ProseMirror p {
          margin: 0 0 0.75rem 0;
          line-height: 1.6;
          color: #f3f4f6;
        }

        .ProseMirror h1 {
          font-size: 2rem;
          font-weight: 700;
          margin: 1rem 0;
          line-height: 1.2;
          color: #0088db;
        }

        .ProseMirror h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0.8rem 0;
          line-height: 1.3;
          color: #ffba22;
        }

        .ProseMirror h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0.6rem 0;
          line-height: 1.4;
          color: #a1a1aa;
        }

        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 1.5rem;
          margin: 0.75rem 0;
          color: #f3f4f6;
        }

        .ProseMirror li {
          margin-bottom: 0.25rem;
          color: #a1a1aa;
        }

        .ProseMirror code {
          background: #1f2638;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-size: 0.9rem;
          font-family: monospace;
          color: #ffba22;
        }

        .ProseMirror pre {
          background: #050816;
          color: #f9fafb;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1rem 0;
          border: 1px solid #27324a;
        }

        .ProseMirror pre code {
          background: transparent;
          padding: 0;
          color: inherit;
        }

        .ProseMirror blockquote {
          border-left: 4px solid #ffba22;
          padding-left: 1rem;
          color: #a1a1aa;
          margin: 1rem 0;
          font-style: italic;
        }

        .ProseMirror a {
          color: #0088db;
          text-decoration: underline;
        }

        .ProseMirror a:hover {
          color: #ffba22;
        }

        .ProseMirror:focus {
          outline: none;
        }

        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #71717a;
          pointer-events: none;
          height: 0;
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default AddCareer;