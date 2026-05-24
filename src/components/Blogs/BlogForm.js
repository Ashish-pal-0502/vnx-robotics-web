"use client";

import React, { useEffect, useState } from "react";
import apiClient from "@/api/client";

const BlogForm = ({ editData = null, onSuccess }) => {
  const [submitting, setSubmitting] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [blogForm, setBlogForm] = useState({
    heading: "",
    content: "",
    mtitle: "",
    mdesc: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (editData) {
      setBlogForm({
        heading: editData.heading || "",
        content: editData.content || "",
        mtitle: editData.mtitle || "",
        mdesc: editData.mdesc || "",
        imageUrl: editData.image?.[0]?.url || "",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBlogForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setBlogForm({
      heading: "",
      content: "",
      mtitle: "",
      mdesc: "",
      imageUrl: "",
    });
  };

  const handleSubmit = async () => {
    setError("");
    setMessage("");

    if (!blogForm.heading || !blogForm.content) {
      setError("Heading and content are required.");
      return;
    }

    const payload = {
      heading: blogForm.heading,
      content: blogForm.content,
      mtitle: blogForm.mtitle,
      mdesc: blogForm.mdesc,
    };

    if (blogForm.imageUrl) {
      payload.images = [
        {
          url: blogForm.imageUrl,
          key: `blog-${Date.now()}`,
        },
      ];
    }

    try {
      setSubmitting(true);

      if (editData?._id) {
        await apiClient.put(
          `/blog/update/${editData._id}`,
          payload
        );

        setMessage("Blog updated successfully.");
      } else {
        await apiClient.post("/blog/create", payload);

        setMessage("Blog created successfully.");

        resetForm();
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error(err);

      const serverMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message;

      setError(serverMessage || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">
        {editData ? "Update Blog" : "Add Blog"}
      </h2>

      <div className="space-y-4">
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {message && (
          <p className="text-sm text-green-600">{message}</p>
        )}

        <input
          type="text"
          name="heading"
          value={blogForm.heading}
          onChange={handleChange}
          placeholder="Blog Title"
          className="w-full border rounded-xl px-4 py-3 outline-none"
        />

        <textarea
          rows="5"
          name="content"
          value={blogForm.content}
          onChange={handleChange}
          placeholder="Write blog content..."
          className="w-full border rounded-xl px-4 py-3 outline-none"
        />

        <input
          type="text"
          name="mtitle"
          value={blogForm.mtitle}
          onChange={handleChange}
          placeholder="Meta Title"
          className="w-full border rounded-xl px-4 py-3 outline-none"
        />

        <input
          type="text"
          name="mdesc"
          value={blogForm.mdesc}
          onChange={handleChange}
          placeholder="Meta Description"
          className="w-full border rounded-xl px-4 py-3 outline-none"
        />

        <input
          type="text"
          name="imageUrl"
          value={blogForm.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border rounded-xl px-4 py-3 outline-none"
        />

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="bg-[#1f3b57] text-white px-6 py-3 rounded-xl disabled:opacity-50"
        >
          {submitting
            ? "Submitting..."
            : editData
            ? "Update Blog"
            : "Publish Blog"}
        </button>
      </div>
    </div>
  );
};

export default BlogForm;