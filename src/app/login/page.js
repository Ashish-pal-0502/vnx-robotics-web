"use client";

import apiClient from "@/api/client";
import React, { useState } from "react";
import Link from "next/link";
import useAuth from './../../auth/useAuth';
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


function Page() {
  const router = useRouter()
   const {logIn} = useAuth()
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = async () => {
    try {
      setLoading(true);

      // console.log("LOGIN DATA:", form);

      const response = await apiClient.post("/user/login", {
        email: form.email,
        password: form.password,
      });

      // console.log("response", response);
    if (response?.ok) {
      toast.success(response?.data?.message || "Login successful");

      logIn(response?.data?.data?.accessToken);

      router.replace("/"); //  redirect to home
    } else {
      toast.error(response?.data?.message || "Login failed");
    }

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  
  const handleGoogleLogin = async (credentialResponse) => {
    const idToken = credentialResponse?.credential;
    // console.log("payload",  {
    //     client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    //     tokenId: idToken,
    //   })
    try {
      const response = await apiClient.post(`/user/google-auth`, {
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        tokenId: idToken,
       
      });

      // console.log("response of gogole", response )

    if (response?.ok) {
  toast.success(response?.data?.message || "Login successful");

  logIn(response?.data?.data?.accessToken);

  router.replace("/"); //  redirect here also
} else {
        toast.error(response.data.message || "Google login failed");
      }
    } catch (error) {
      console.error("Google login failed:", error);
      toast.error("Google login failed. Please try again.");
    }
  };

  const handleGoogleLoginError = () => {
    toast.error("Google Login Failed");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* 🔥 BACKGROUND GRADIENT */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-900 via-black to-yellow-600 opacity-90"></div>

      {/* ✨ GLOW EFFECTS (premium touch) */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-yellow-400/30 blur-3xl rounded-full"></div>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-md mt-28 mb-10 p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-white">Welcome Back</h1>
          <p className="text-gray-400 text-sm mt-2">
            Login to continue to VNX Robotics
          </p>
        </div>

        {/* FORM */}
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-5">
            {/* EMAIL */}
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            {/* PASSWORD */}
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            />
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="button"
            onClick={loginUser}
            disabled={loading}
            className="w-full mt-6 py-3 rounded-xl bg-white text-black font-semibold cursor-pointer hover:bg-gray-200 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* SIGNUP CTA */}
        <div className="text-center mt-6 text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-yellow-400 font-semibold hover:underline cursor-pointer"
          >
            Sign up
          </Link>
        </div>

        {/* DIVIDER */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/20"></div>
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-white/20"></div>
        </div>

        {/* GOOGLE BUTTON */}
        {/* <button className="w-full py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition cursor-pointer">
          Continue with Google
        </button> */}
           <div className="w-full flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={handleGoogleLoginError}
              size="large"
              text="signin_with"
              shape="rectangular"
            />
          </div>
      </div>
    </div>
  );
}

export default Page;
