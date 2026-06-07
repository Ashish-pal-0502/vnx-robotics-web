"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import apiClient from "./../../api/client";

export default function HeroHome() {
  const [videoSrc, setVideoSrc] = useState("");
  const [heroData, setHeroData] = useState(null);
  const videoRef = useRef(null);
  const isResizing = useRef(false);
  const currentVideoSrc = useRef("");
  const { t } = useTranslation();

  const getVideoLink = async () => {
    try {
      const response = await apiClient.get("/hero/get");

      if (response.ok && response.data?.success) {
        const data = response.data.data;
        if (data && data.length > 0) {
          setHeroData(data[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  useEffect(() => {
    getVideoLink();
  }, []);

  // Memoize the update function to avoid recreating on each render
  const updateVideoSource = useCallback(() => {
    if (!heroData || isResizing.current) return;

    const isMobile = window.innerWidth < 768;
    // Ensure we're getting the URL string, not the whole object
    let newVideoUrl = isMobile
      ? heroData.mobileVideo?.url || heroData.mobileVideo
      : heroData.desktopVideo?.url || heroData.desktopVideo;

    // If it's still an object, stringify won't help - log error
    if (newVideoUrl && typeof newVideoUrl !== "string") {
      console.error("Video URL is not a string:", newVideoUrl);
      return;
    }

    if (newVideoUrl && newVideoUrl !== currentVideoSrc.current) {
      currentVideoSrc.current = newVideoUrl;
      setVideoSrc(newVideoUrl);
    }
  }, [heroData]);

  // Handle resize with debounce to prevent multiple updates
  useEffect(() => {
    if (!heroData) return;

    let resizeTimer;
    const handleResize = () => {
      isResizing.current = true;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        isResizing.current = false;
        updateVideoSource();
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, [heroData, updateVideoSource]);

  // Initial video source setup
  useEffect(() => {
    if (heroData) {
      updateVideoSource();
    }
  }, [heroData, updateVideoSource]);

  // Handle video source change without disrupting playback
  useEffect(() => {
    if (videoSrc && videoRef.current && typeof videoSrc === "string") {
      const video = videoRef.current;

      // Only update if src is different
      if (video.src !== videoSrc && !video.src.includes(videoSrc)) {
        console.log("Setting video src to:", videoSrc);
        video.src = videoSrc;
        video.load();

        video.play().catch((e) => console.log("Play failed:", e));
      }
    }
  }, [videoSrc]);

  console.log("Current videoSrc state:", videoSrc, "Type:", typeof videoSrc);

  return (
    <main className="text-white bg-black/70">
      <section className="relative h-screen w-full flex items-center">
        {/* VIDEO BACKGROUND */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            console.error("Video error:", e);
            console.log("Current video src:", videoRef.current?.src);
          }}
        />

        {/* Fallback gradient while video loads */}
        {!videoSrc && (
          <div className="absolute inset-0 bg-linear-to-br from-[#0a0a0a] to-[#1a1a2e]" />
        )}

        {/* CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-10 md:pt-20 w-full">
          <div className="max-w-2xl">
            {/* TRUST BADGE */}
            <div className="flex items-center gap-3 mb-6 md:mb-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-[#083427] rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-[#083427] rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-[#083427] rounded-full border-2 border-white"></div>
              </div>
              <p className="text-sm font-heading text-white">
                {t("heroHome.trustedCustomers")}
              </p>
            </div>

            {/* HEADING */}
            <h1 className="text-3xl font-logo uppercase md:text-4xl font-medium leading-tight mb-6 md:mb-2">
              {t("heroHome.heading")}
            </h1>

            {/* DESCRIPTION */}
            <p className="text-gray-300 mb-6 font-mono text-xl md:text-base">
              {t("heroHome.description")}
            </p>

            {/* BUTTON */}
            <Link href="/contact" className="btn-primary">
              {t("heroHome.getStarted")} →
            </Link>
          </div>
        </div>

        <div className="absolute right-6 md:right-10 bottom-8 md:bottom-20 hidden md:flex flex-col items-center">
          <div className="flex items-center justify-center animate-bounce cursor-pointer">
            <Image
              src="/icons/scrolldown.png"
              alt={t("heroHome.scrollDown")}
              width={100}
              height={100}
              className="w-12 h-12 md:w-32 md:h-32"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
