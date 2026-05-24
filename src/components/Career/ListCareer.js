// components/Career/ListCareer.jsx
"use client";
import React, { useState, useEffect } from 'react';
import apiClient from '@/api/client';

function ListCareer({ onEdit }) {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchCareers = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/career/get-all");
      setCareers(response?.data?.data?.data || []);
      setError("");
    } catch (err) {
      console.error("Failed to load careers:", err);
      const serverMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message;
      setError(serverMessage || "Unable to load careers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this career listing?")) {
      return;
    }

    try {
      await apiClient.delete(`/career/delete/${id}`);
      setMessage("Career deleted successfully.");
      fetchCareers(); // Refresh the list
      
      // Auto clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Delete career failed:", err);
      setError("Unable to delete career. Please try again.");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleEdit = (career) => {
    if (onEdit) {
      onEdit(career);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading careers...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">Career Listings</h2>

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

      {careers.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No career listings found.</p>
      ) : (
        <div className="space-y-4">
          {careers.map((career) => (
            <div
              key={career._id}
              className="border rounded-xl p-4 flex flex-col gap-4 hover:shadow-md transition"
            >
              <div>
                <h3 className="font-semibold text-lg text-[#1f3b57]">
                  {career.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {career.description}
                </p>
                {career.applyLink && (
                  <a
                    href={career.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline inline-block mt-2"
                  >
                    Apply link →
                  </a>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleEdit(career)}
                  className="text-sm px-4 py-2 rounded-lg bg-[#1f3b57] text-white hover:bg-[#2a4d72] transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(career._id)}
                  className="text-sm px-4 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListCareer;