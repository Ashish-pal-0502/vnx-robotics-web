// "use client";

// import apiClient from "@/api/client";
// import React, { useState } from "react";
// import Link from "next/link";
// import useAuth from './../../auth/useAuth';
// import { GoogleLogin } from "@react-oauth/google";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";

// function Page() {
//   const router = useRouter()
//    const {logIn} = useAuth()
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const loginUser = async () => {
//     try {
//       setLoading(true);

//       // console.log("LOGIN DATA:", form);

//       const response = await apiClient.post("/user/login", {
//         email: form.email,
//         password: form.password,
//       });

//       // console.log("response", response);
//     if (response?.ok) {
//       toast.success(response?.data?.message || "Login successful");

//       logIn(response?.data?.data?.accessToken);

//       router.replace("/"); //  redirect to home
//     } else {
//       toast.error(response?.data?.message || "Login failed");
//     }

//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = async (credentialResponse) => {
//     const idToken = credentialResponse?.credential;
//     // console.log("payload",  {
//     //     client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
//     //     tokenId: idToken,
//     //   })
//     try {
//       const response = await apiClient.post(`/user/google-auth`, {
//         client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
//         tokenId: idToken,

//       });

//       // console.log("response of gogole", response )

//     if (response?.ok) {
//   toast.success(response?.data?.message || "Login successful");

//   logIn(response?.data?.data?.accessToken);

//   router.replace("/"); //  redirect here also
// } else {
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
//       {/* 🔥 BACKGROUND GRADIENT */}
//       <div className="absolute inset-0 bg-linear-to-br from-blue-900 via-black to-yellow-600 opacity-90"></div>

//       {/* ✨ GLOW EFFECTS (premium touch) */}
//       <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/30 blur-3xl rounded-full"></div>
//       <div className="absolute bottom-20 right-10 w-72 h-72 bg-yellow-400/30 blur-3xl rounded-full"></div>

//       {/* CARD */}
//       <div className="relative z-10 w-full max-w-md mt-28 mb-10 p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
//         {/* HEADER */}
//         <div className="text-center mb-8">
//           <h1 className="text-2xl font-semibold text-white">Welcome Back</h1>
//           <p className="text-gray-400 text-sm mt-2">
//             Login to continue to VNX Robotics
//           </p>
//         </div>

//         {/* FORM */}
//         <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
//           <div className="space-y-5">
//             {/* EMAIL */}
//             <input
//               type="email"
//               name="email"
//               autoComplete="off"
//               placeholder="Email address"
//               value={form.email}
//               onChange={handleChange}
//               className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//             />

//             {/* PASSWORD */}
//             <input
//               type="password"
//               name="password"
//               autoComplete="new-password"
//               placeholder="Password"
//               value={form.password}
//               onChange={handleChange}
//               className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
//             />
//           </div>

//           {/* LOGIN BUTTON */}
//           <button
//             type="button"
//             onClick={loginUser}
//             disabled={loading}
//             className="w-full mt-6 py-3 rounded-xl bg-white text-black font-semibold cursor-pointer hover:bg-gray-200 transition disabled:opacity-50"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         {/* SIGNUP CTA */}
//         <div className="text-center mt-6 text-sm text-gray-400">
//           Don’t have an account?{" "}
//           <Link
//             href="/register"
//             className="text-yellow-400 font-semibold hover:underline cursor-pointer"
//           >
//             Sign up
//           </Link>
//         </div>

//         {/* DIVIDER */}
//         <div className="flex items-center gap-3 my-6">
//           <div className="flex-1 h-px bg-white/20"></div>
//           <span className="text-xs text-gray-400">OR</span>
//           <div className="flex-1 h-px bg-white/20"></div>
//         </div>

//         {/* GOOGLE BUTTON */}
//         {/* <button className="w-full py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition cursor-pointer">
//           Continue with Google
//         </button> */}
//            <div className="w-full flex justify-center">
//             <GoogleLogin
//               onSuccess={handleGoogleLogin}
//               onError={handleGoogleLoginError}
//               size="large"
//               text="signin_with"
//               shape="rectangular"
//             />
//           </div>
//       </div>
//     </div>
//   );
// }

// export default Page;

"use client";

import apiClient from "@/api/client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import useAuth from "./../../auth/useAuth";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IoMailOutline, IoLockClosedOutline } from "react-icons/io5";

function Page() {
  const router = useRouter();
  const { logIn } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = async () => {
    try {
      setLoading(true);

      const response = await apiClient.post("/user/login", {
        email: form.email,
        password: form.password,
      });

      if (response?.ok) {
        toast.success(response?.data?.message || "Login successful");
        logIn(response?.data?.data?.accessToken);
        router.replace("/");
      } else {
        toast.error(response?.data?.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
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

      {/* Login Card - Horizontal Layout on LG */}
      <div className="relative z-10 w-full max-w-5xl px-4 py-8 md:px-6">
        <motion.div
          ref={sectionRef}
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
                  Welcome Back
                </h1>
                <p className="font-body text-base text-[var(--color-text-secondary)] mb-6">
                  Login to continue to VNX Robotics
                </p>

                {/* Decorative Elements */}
                <div className="hidden lg:block mt-8">
                  <div className="w-16 h-[2px] bg-gradient-to-r from-[var(--color-secondary-400)] to-transparent mb-4" />
                  <p className="font-mono text-xs text-[var(--color-text-muted)]">
                    Secure access to your robotics platform
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
                className="space-y-5"
              >
                {/* Email Field */}
                <div className="relative">
                  <IoMailOutline
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                    size={18}
                  />
                  <input
                    type="email"
                    name="email"
                    autoComplete="off"
                    placeholder="Email address"
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
                    autoComplete="new-password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/[0.02] font-body text-sm text-white placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-secondary-400)]/50 transition-colors"
                  />
                </div>

                {/* Login Button */}
                <button
                  type="button"
                  onClick={loginUser}
                  disabled={loading}
                  className="btn-primary cursor-pointer  w-full justify-center"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>

              {/* Signup Link */}
              <div className="text-center mt-6">
                <p className="font-body text-sm text-[var(--color-text-muted)]">
                  Don't have an account?{" "}
                  <Link
                    href="/register"
                    className="text-[var(--color-secondary-400)] cursor-pointer  font-semibold hover:underline transition-colors"
                  >
                    Sign up
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
                  text="signin_with"
                  shape="rectangular"
                  theme="filled_black"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default Page;
