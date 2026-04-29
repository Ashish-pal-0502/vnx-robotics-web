"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import apiClient from "@/api/client";

function Page() {
  const { accessToken } = useParams();

  const router = useRouter();

  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    if (!accessToken) return;

    const verifyUser = async () => {
      try {
        const res = await apiClient.get(`/verify/${accessToken}`);

        console.log("verify res", res);

        setStatus("✅ Email verified successfully!");

        // redirect after 2 sec
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } catch (err) {
        console.error(err);
        setStatus(err?.response?.data?.message || "❌ Verification failed");
      }
    };

    verifyUser();
  }, [accessToken]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-400 font-primary px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
        <h1 className="text-xl font-semibold text-accent-400">{status}</h1>
      </div>
    </div>
  );
}

export default Page;
