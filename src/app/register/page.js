"use client";

import apiClient from "@/api/client";
import React, { useState } from "react";

function Page() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async () => {
    try {
      setLoading(true);
      setMessage("");

      console.log("payload", form);

      const response = await apiClient.post("/user/register", form);

      console.log("response", response);

      // setMessage("Registration successful! Check your email.");
    } catch (err) {
      console.error(err);
      setMessage(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 font-primary px-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-lg font-semibold text-accent-400">
            Create Account
          </h1>
          <p className="text-gray-500 text-sm mt-2">Register to get started</p>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-400"
          />
        </div>

        {/* Message */}
        {message && (
          <p className="text-sm text-center text-accent-400">{message}</p>
        )}

        {/* Button */}
        <button
          onClick={registerUser}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-accent-400 text-white font-medium hover:opacity-90 transition duration-200 shadow-md disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <span className="text-accent-400 cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Page;
