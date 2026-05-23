"use client";

import React, { useEffect, useState } from "react";
import apiClient from "@/api/client";

const BlogList = ({ onEdit }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // FETCH BLOGS
  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const response = await apiClient.get("/blog/get", {
        params: {
          page: 1,
          limit: 20,
        },
      });

      setBlogs(response?.data?.data?.blogs || []);
    } catch (error) {
      console.error("Fetch blogs failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // DELETE BLOG
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      await apiClient.delete(`/blog/delete/${id}`);

      fetchBlogs();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (loading) {
    return <p>Loading blogs...</p>;
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">All Blogs</h2>

      <div className="space-y-4">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="border rounded-xl p-4 flex flex-col md:flex-row justify-between gap-4"
          >
            <div>
              <h3 className="font-semibold text-lg">
                {blog.heading}
              </h3>

              <p className="text-sm text-gray-500">
                {blog.mdesc ||
                  blog.content?.slice(0, 80) ||
                  "No description"}
              </p>

              <p className="text-xs text-gray-400 mt-2">
                Created:{" "}
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onEdit(blog)}
                className="px-4 py-2 rounded-lg bg-gray-100 text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(blog._id)}
                className="px-4 py-2 rounded-lg bg-red-50 text-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;