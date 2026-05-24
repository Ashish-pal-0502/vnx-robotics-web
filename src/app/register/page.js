"use client";

import apiClient from "@/api/client";
import React, { useState } from "react";
import Link from "next/link";
import VerifyOtpModal from "./../../components/Modals/VerifyOtpModal";
import useAuth from "./../../auth/useAuth";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function Page() {
  const { logIn } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  //  OTP STATES
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [verifyLoading, setVerifyLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ REGISTER
  const registerUser = async () => {
    try {
      setLoading(true);
      setMessage("");

      console.log("payload", form);

      const response = await apiClient.post("/user/register", form);
      console.log("response", response);
      if (response.ok) {
        setMessage("OTP sent to your email");

        // ✅ OPEN OTP MODAL
        setIsOtpOpen(true);
      } else {
        toast.error(response?.data?.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setMessage(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ✅ VERIFY OTP
  const handleVerifyOtp = async (otpValue) => {
    try {
      setVerifyLoading(true);

      console.log("verify email", {
        email: form.email,
        otp: otpValue,
      });

      const response = await apiClient.post("/user/verify", {
        email: form.email,
        otp: otpValue,
      });

      console.log("verify response", response);
      if (response?.status !== 200) {
        throw new Error(response?.data?.message);
      }
      if (response?.ok) {
        toast.success(response?.data?.message || "Login successful");

        logIn(response?.data?.data?.accessToken);

        router.replace("/"); //  redirect to home
      } else {
        toast.error(response?.data?.message || "Login failed");
      }
      setIsOtpOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setVerifyLoading(false);
    }
  };

  // ✅ RESEND OTP
  const handleResendOtp = async () => {
    console.log("email", form.email);
    try {
      const response = await apiClient.post("/user/send-otp", {
        email: form.email,
      });
      console.log("resend response", response);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    const idToken = credentialResponse?.credential;

    try {
      const response = await apiClient.post(`/user/google-auth`, {
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        tokenId: idToken,
      });

      if (response?.ok) {
        toast.success(response?.data?.message || "Login successful");

        logIn(response?.data?.data?.accessToken);

        router.replace("/"); // ✅ redirect
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
      {/* 🔥 BACKGROUND */}
      <div className="absolute inset-0 bg-linear-to-br from-black via-[#050816] to-blue-900"></div>

      {/* ✨ GLOW */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-500/30 blur-3xl rounded-full"></div>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-md mt-28 mb-10 p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-white">Create Account</h1>
          <p className="text-gray-400 text-sm mt-2">
            Register to get started with VNX Robotics
          </p>
        </div>

        {/* FORM */}
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email address"
              autoComplete="off"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* MESSAGE */}
          {message && (
            <p className="text-sm text-center mt-4 text-yellow-400">
              {message}
            </p>
          )}

          {/* BUTTON */}
          <button
            type="button"
            onClick={registerUser}
            disabled={loading}
            className="w-full mt-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition cursor-pointer disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* DIVIDER */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/20"></div>
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-white/20"></div>
        </div>

        {/* GOOGLE BUTTON */}
        <div className="w-full flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={handleGoogleLoginError}
            size="large"
            text="signup_with"
            shape="rectangular"
          />
        </div>

        {/* LOGIN CTA */}
        <div className="text-center mt-6 text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-400 font-semibold hover:underline"
          >
            Login
          </Link>
        </div>
      </div>

      {isOtpOpen && (
        <VerifyOtpModal
          email={form.email}
          otp={otp}
          setOtp={setOtp}
          isEmailMode={true}
          verifyLoading={verifyLoading}
          onVerify={handleVerifyOtp}
          onResend={handleResendOtp}
        />
      )}
    </div>
  );
}

export default Page;
