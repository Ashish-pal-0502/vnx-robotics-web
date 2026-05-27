// "use client";

// import apiClient from "@/api/client";
// import React, { useState } from "react";
// import Link from "next/link";
// import VerifyOtpModal from "./../../components/Modals/VerifyOtpModal";
// import useAuth from "./../../auth/useAuth";
// import { GoogleLogin } from "@react-oauth/google";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";

// function Page() {
//   const { logIn } = useAuth();
//   const router = useRouter();
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   //  OTP STATES
//   const [isOtpOpen, setIsOtpOpen] = useState(false);
//   const [otp, setOtp] = useState(["", "", "", ""]);
//   const [verifyLoading, setVerifyLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // ✅ REGISTER
//   const registerUser = async () => {
//     try {
//       setLoading(true);
//       setMessage("");

//       console.log("payload", form);

//       const response = await apiClient.post("/user/register", form);
//       console.log("response", response);
//       if (response.ok) {
//         setMessage("OTP sent to your email");

//         // ✅ OPEN OTP MODAL
//         setIsOtpOpen(true);
//       } else {
//         toast.error(response?.data?.message || "Login failed");
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage(err?.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ VERIFY OTP
//   const handleVerifyOtp = async (otpValue) => {
//     try {
//       setVerifyLoading(true);

//       console.log("verify email", {
//         email: form.email,
//         otp: otpValue,
//       });

//       const response = await apiClient.post("/user/verify", {
//         email: form.email,
//         otp: otpValue,
//       });

//       console.log("verify response", response);
//       if (response?.status !== 200) {
//         throw new Error(response?.data?.message);
//       }
//       if (response?.ok) {
//         toast.success(response?.data?.message || "Login successful");

//         logIn(response?.data?.data?.accessToken);

//         router.replace("/"); //  redirect to home
//       } else {
//         toast.error(response?.data?.message || "Login failed");
//       }
//       setIsOtpOpen(false);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setVerifyLoading(false);
//     }
//   };

//   // ✅ RESEND OTP
//   const handleResendOtp = async () => {
//     console.log("email", form.email);
//     try {
//       const response = await apiClient.post("/user/send-otp", {
//         email: form.email,
//       });
//       console.log("resend response", response);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleGoogleLogin = async (credentialResponse) => {
//     const idToken = credentialResponse?.credential;

//     try {
//       const response = await apiClient.post(`/user/google-auth`, {
//         client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
//         tokenId: idToken,
//       });

//       if (response?.ok) {
//         toast.success(response?.data?.message || "Login successful");

//         logIn(response?.data?.data?.accessToken);

//         router.replace("/"); // ✅ redirect
//       } else {
//         toast.error(response.data.message || "Google login failed");
//       }
//     } catch (error) {
//       console.error("Google login failed:", error);
//       toast.error("Google login failed. Please try again.");
//     }
//   };

//   const handleGoogleLoginError = () => {
//     toast.error("Google Login Failed");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
//       {/* 🔥 BACKGROUND */}
//       <div className="absolute inset-0 bg-linear-to-br from-black via-[#050816] to-blue-900"></div>

//       {/* ✨ GLOW */}
//       <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/30 blur-3xl rounded-full"></div>
//       <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-500/30 blur-3xl rounded-full"></div>

//       {/* CARD */}
//       <div className="relative z-10 w-full max-w-md mt-28 mb-10 p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
//         {/* HEADER */}
//         <div className="text-center mb-8">
//           <h1 className="text-2xl font-semibold text-white">Create Account</h1>
//           <p className="text-gray-400 text-sm mt-2">
//             Register to get started with VNX Robotics
//           </p>
//         </div>

//         {/* FORM */}
//         <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
//           <div className="space-y-5">
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               value={form.name}
//               onChange={handleChange}
//               className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
//             />

//             <input
//               type="email"
//               name="email"
//               placeholder="Email address"
//               autoComplete="off"
//               value={form.email}
//               onChange={handleChange}
//               className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
//             />

//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               autoComplete="new-password"
//               value={form.password}
//               onChange={handleChange}
//               className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 outline-none"
//             />
//           </div>

//           {/* MESSAGE */}
//           {message && (
//             <p className="text-sm text-center mt-4 text-yellow-400">
//               {message}
//             </p>
//           )}

//           {/* BUTTON */}
//           <button
//             type="button"
//             onClick={registerUser}
//             disabled={loading}
//             className="w-full mt-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition cursor-pointer disabled:opacity-50"
//           >
//             {loading ? "Registering..." : "Register"}
//           </button>
//         </form>

//         {/* DIVIDER */}
//         <div className="flex items-center gap-3 my-6">
//           <div className="flex-1 h-px bg-white/20"></div>
//           <span className="text-xs text-gray-400">OR</span>
//           <div className="flex-1 h-px bg-white/20"></div>
//         </div>

//         {/* GOOGLE BUTTON */}
//         <div className="w-full flex justify-center">
//           <GoogleLogin
//             onSuccess={handleGoogleLogin}
//             onError={handleGoogleLoginError}
//             size="large"
//             text="signup_with"
//             shape="rectangular"
//           />
//         </div>

//         {/* LOGIN CTA */}
//         <div className="text-center mt-6 text-sm text-gray-400">
//           Already have an account?{" "}
//           <Link
//             href="/login"
//             className="text-blue-400 font-semibold hover:underline"
//           >
//             Login
//           </Link>
//         </div>
//       </div>

//       {isOtpOpen && (
//         <VerifyOtpModal
//           email={form.email}
//           otp={otp}
//           setOtp={setOtp}
//           isEmailMode={true}
//           verifyLoading={verifyLoading}
//           onVerify={handleVerifyOtp}
//           onResend={handleResendOtp}
//         />
//       )}
//     </div>
//   );
// }

// export default Page;

"use client";

import apiClient from "@/api/client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import VerifyOtpModal from "./../../components/Modals/VerifyOtpModal";
import useAuth from "./../../auth/useAuth";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  IoPersonOutline,
  IoMailOutline,
  IoLockClosedOutline,
} from "react-icons/io5";

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

  // OTP STATES
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [verifyLoading, setVerifyLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // REGISTER
  const registerUser = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await apiClient.post("/user/register", form);
      if (response.ok) {
        setMessage("OTP sent to your email");
        setIsOtpOpen(true);
      } else {
        toast.error(response?.data?.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setMessage(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // VERIFY OTP
  const handleVerifyOtp = async (otpValue) => {
    try {
      setVerifyLoading(true);

      const response = await apiClient.post("/user/verify", {
        email: form.email,
        otp: otpValue,
      });

      if (response?.status !== 200) {
        throw new Error(response?.data?.message);
      }
      if (response?.ok) {
        toast.success(response?.data?.message || "Registration successful");
        logIn(response?.data?.data?.accessToken);
        router.replace("/");
      } else {
        toast.error(response?.data?.message || "Verification failed");
      }
      setIsOtpOpen(false);
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Verification failed");
    } finally {
      setVerifyLoading(false);
    }
  };

  // RESEND OTP
  const handleResendOtp = async () => {
    try {
      const response = await apiClient.post("/user/send-otp", {
        email: form.email,
      });
      if (response.ok) {
        toast.success("OTP resent successfully");
      } else {
        toast.error("Failed to resend OTP");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to resend OTP");
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
        router.replace("/");
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
    <main className="bg-[var(--color-dark-100)] min-h-screen pt-20 flex items-center justify-center relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Subtle Radial Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-4xl h-[60vh] rounded-full bg-[var(--color-primary-500)]/8 blur-3xl" />

      {/* Register Card - Horizontal Layout on LG */}
      <div className="relative z-10 w-full max-w-5xl px-4 py-8 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden shadow-2xl"
        >
          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Branding */}
            <div className="flex-1 p-8 lg:p-10 bg-gradient-to-br from-[var(--color-primary-500)]/5 to-transparent border-b lg:border-b-0 lg:border-r border-white/10">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                {/* Logo */}
                <div className="mb-8">
                  <Image
                    src="/icons/vnxlogo.png"
                    alt="VNX Robotics"
                    width={100}
                    height={50}
                    className="h-auto w-auto object-contain"
                  />
                </div>

                {/* Welcome Text */}
                <h1 className="font-heading text-3xl lg:text-4xl font-bold text-white mb-4">
                  Create Account
                </h1>
                <p className="font-body text-base text-[var(--color-text-secondary)] mb-6">
                  Register to get started with VNX Robotics
                </p>

                {/* Decorative Elements */}
                <div className="hidden lg:block mt-8">
                  <div className="w-16 h-[2px] bg-gradient-to-r from-[var(--color-secondary-400)] to-transparent mb-4" />
                  <p className="font-mono text-xs text-[var(--color-text-muted)]">
                    Join the future of robotics innovation
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 p-8 lg:p-10">
              {/* Form */}
              <form
                autoComplete="off"
                onSubmit={(e) => e.preventDefault()}
                className="space-y-4"
              >
                {/* Name Field */}
                <div className="relative">
                  <IoPersonOutline
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                    size={18}
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/[0.02] font-body text-sm text-white placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-secondary-400)]/50 transition-colors"
                  />
                </div>

                {/* Email Field */}
                <div className="relative">
                  <IoMailOutline
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                    size={18}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    autoComplete="off"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/[0.02] font-body text-sm text-white placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-secondary-400)]/50 transition-colors"
                  />
                </div>

                {/* Password Field */}
                <div className="relative">
                  <IoLockClosedOutline
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                    size={18}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/[0.02] font-body text-sm text-white placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-secondary-400)]/50 transition-colors"
                  />
                </div>

                {/* Message */}
                {message && (
                  <p className="text-sm text-center text-[var(--color-secondary-400)]">
                    {message}
                  </p>
                )}

                {/* Register Button */}
                <button
                  type="button"
                  onClick={registerUser}
                  disabled={loading}
                  className="btn-primary cursor-pointer  w-full justify-center"
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </form>

              {/* Login Link */}
              <div className="text-center mt-6">
                <p className="font-body text-sm text-[var(--color-text-muted)]">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-[var(--color-secondary-400)] cursor-pointer  font-semibold hover:underline transition-colors"
                  >
                    Login
                  </Link>
                </p>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-white/10"></div>
                <span className="font-mono text-xs text-[var(--color-text-muted)]">
                  OR
                </span>
                <div className="flex-1 h-px bg-white/10"></div>
              </div>

              {/* Google Login */}
              <div className="w-full flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={handleGoogleLoginError}
                  size="large"
                  text="signup_with"
                  shape="rectangular"
                  theme="filled_black"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* OTP Modal */}
      {isOtpOpen && (
        <VerifyOtpModal
          email={form.email}
          otp={otp}
          setOtp={setOtp}
          isEmailMode={true}
          verifyLoading={verifyLoading}
          onVerify={handleVerifyOtp}
          onResend={handleResendOtp}
          onClose={() => setIsOtpOpen(false)}
        />
      )}
    </main>
  );
}

export default Page;
