// "use client";

// import React, { useEffect, useState } from "react";

// function VerifyOtpModal({
//   email,
//   mobile,
//   isEmailMode = true,
//   otp,
//   setOtp,
//   onVerify,
//   onResend,
//   verifyLoading,
// }) {
//   const [resendTimer, setResendTimer] = useState(0);

//   useEffect(() => {
//     let interval;
//     if (resendTimer > 0) {
//       interval = setInterval(() => {
//         setResendTimer((prev) => prev - 1);
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [resendTimer]);

//   const handleChange = (value, index) => {
//     if (!/^[0-9]?$/.test(value)) return;

//     const updatedOtp = [...otp];
//     updatedOtp[index] = value;
//     setOtp(updatedOtp);

//     if (value && index < otp.length - 1) {
//       document.getElementById(`otp-${index + 1}`)?.focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace") {
//       const updatedOtp = [...otp];

//       if (!otp[index] && index > 0) {
//         updatedOtp[index - 1] = "";
//         document.getElementById(`otp-${index - 1}`)?.focus();
//       } else {
//         updatedOtp[index] = "";
//       }
//       setOtp(updatedOtp);
//     }
//   };

//   const otpValue = otp.join("");

//   const handleVerify = () => {
//     if (otpValue.length !== 4) return;
//     onVerify(otpValue);
//   };

//   const handleResend = async () => {
//     await onResend();
//     setResendTimer(60);
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
//       {/* 🔥 BACKGROUND */}
//       <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

//       {/* ✨ GLOW */}
//       <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>
//       <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full"></div>

//       {/* MODAL */}
//       <div className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
//         {/* HEADER */}
//         <div className="text-center mb-6">
//           <h2 className="text-2xl font-semibold text-white">
//             {isEmailMode ? "Email Verification" : "Mobile Verification"}
//           </h2>
//           <p className="text-gray-400 text-sm mt-2">
//             Enter the 4-digit code sent to{" "}
//             <span className="text-white font-medium">
//               {isEmailMode ? email : mobile}
//             </span>
//           </p>
//         </div>

//         {/* OTP INPUTS */}
//         <div className="flex justify-center gap-3 mb-8">
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               id={`otp-${index}`}
//               type="text"
//               inputMode="numeric"
//               maxLength="1"
//               value={digit}
//               onChange={(e) => handleChange(e.target.value, index)}
//               onKeyDown={(e) => handleKeyDown(e, index)}
//               className="w-12 h-14 text-center text-xl font-semibold rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//             />
//           ))}
//         </div>

//         {/* VERIFY BUTTON */}
//         <button
//           onClick={handleVerify}
//           disabled={verifyLoading}
//           className={`w-full py-3 rounded-xl font-semibold text-black transition flex items-center justify-center gap-2
//             ${
//               verifyLoading
//                 ? "bg-gray-300 cursor-not-allowed"
//                 : "bg-white hover:bg-gray-200 cursor-pointer"
//             }`}
//         >
//           {verifyLoading ? (
//             <>
//               <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
//               Verifying...
//             </>
//           ) : (
//             "Verify"
//           )}
//         </button>

//         {/* RESEND */}
//         <div className="mt-6 text-sm text-center text-gray-400">
//           Didn’t receive the code?{" "}
//           {resendTimer > 0 ? (
//             <span className="text-gray-500">Resend in {resendTimer}s</span>
//           ) : (
//             <button
//               onClick={handleResend}
//               className="text-blue-400 hover:underline cursor-pointer"
//             >
//               Resend
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default VerifyOtpModal;

"use client";

import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

function VerifyOtpModal({
  email,
  mobile,
  isEmailMode = true,
  otp,
  setOtp,
  onVerify,
  onResend,
  verifyLoading,
  onClose, // Add onClose prop to handle modal closing
}) {
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const updatedOtp = [...otp];

      if (!otp[index] && index > 0) {
        updatedOtp[index - 1] = "";
        document.getElementById(`otp-${index - 1}`)?.focus();
      } else {
        updatedOtp[index] = "";
      }
      setOtp(updatedOtp);
    }
  };

  const otpValue = otp.join("");

  const handleVerify = () => {
    if (otpValue.length !== 4) return;
    onVerify(otpValue);
  };

  const handleResend = async () => {
    await onResend();
    setResendTimer(60);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-2xl border border-white/10 bg-[var(--color-dark-200)]/95 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 cursor-pointer rounded-lg text-[var(--color-text-muted)] hover:text-white hover:bg-white/10 transition-colors z-20"
          >
            <IoCloseOutline size={20} />
          </button>

          {/* Content */}
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-secondary-400)]/20 bg-[var(--color-secondary-400)]/5 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary-400)]" />
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-secondary-400)]">
                  Verification Required
                </span>
              </div>

              <h2 className="font-heading text-2xl font-bold text-white mb-2">
                {isEmailMode ? "Email Verification" : "Mobile Verification"}
              </h2>

              <p className="font-body text-sm text-[var(--color-text-secondary)]">
                Enter the 4-digit code sent to{" "}
                <span className="text-[var(--color-secondary-400)] font-medium">
                  {isEmailMode ? email : mobile}
                </span>
              </p>
            </div>

            {/* OTP Inputs */}
            <div className="flex justify-center gap-3 mb-8">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-14 h-14 text-center text-xl font-semibold rounded-xl border border-white/10 bg-white/[0.02] text-white focus:outline-none focus:border-[var(--color-secondary-400)]/50 focus:ring-2 focus:ring-[var(--color-secondary-400)]/20 transition-all"
                />
              ))}
            </div>

            {/* Verify Button */}
            <button
              onClick={handleVerify}
              disabled={verifyLoading || otpValue.length !== 4}
              className={`btn-primary w-full cursor-pointer justify-center ${
                (verifyLoading || otpValue.length !== 4) &&
                "opacity-50 cursor-not-allowed"
              }`}
            >
              {verifyLoading ? (
                <>
                  <span className="w-5 h-5 border-2  border-white border-t-transparent rounded-full animate-spin"></span>
                  Verifying...
                </>
              ) : (
                "Verify Code"
              )}
            </button>

            {/* Resend Section */}
            <div className="mt-6 text-center">
              <p className="font-body text-sm text-[var(--color-text-muted)]">
                Didn't receive the code?{" "}
                {resendTimer > 0 ? (
                  <span className="text-[var(--color-text-muted)]">
                    Resend in {resendTimer}s
                  </span>
                ) : (
                  <button
                    onClick={handleResend}
                    className="text-[var(--color-secondary-400)] cursor-pointer hover:underline font-semibold transition-colors"
                  >
                    Resend Code
                  </button>
                )}
              </p>
            </div>

            {/* Hint */}
            <div className="mt-4 text-center">
              <p className="font-mono text-[10px] text-[var(--color-text-muted)]">
                Check your spam folder if you don't see the email
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtpModal;
