"use client";

import apiClient from "@/api/client";
import React, { useState } from "react";

function Page() {
  const [user, setUser] = useState();

  const loginUser = async () => {
    try {
      const response = await apiClient.post("/user/login", {
        email: "erdkydv@gmail.com",
        password: "Dh@12345",
      });

      console.log("response", response);
      // setUser(response.data.user);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-400 font-primary px-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-lg font-semibold text-accent-400">
            Welcome Back
          </h1>
          <p className="text-gray-500 text-sm mt-2">Login to continue</p>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            defaultValue="erdkydv@gmail.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-400"
          />

          <input
            type="password"
            placeholder="Password"
            defaultValue="Dh@12345"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary-400"
          />
        </div>

        {/* Button */}
        <button
          onClick={loginUser}
          className="w-full py-3 rounded-xl bg-accent-400 text-white font-medium hover:opacity-90 transition duration-200 shadow-md"
        >
          Login
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <span className="text-accent-400 cursor-pointer hover:underline">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Page;
