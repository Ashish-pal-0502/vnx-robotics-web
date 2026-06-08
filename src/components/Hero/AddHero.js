"use client";

import React, { useState, useEffect, useRef } from "react";
import apiClient from "@/api/client";
import toast from "react-hot-toast";
import {
  FiUpload,
  FiTrash2,
  FiVideo,
  FiMonitor,
  FiSmartphone,
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
} from "react-icons/fi";

const AddHero = ({ editData = null, onSuccess }) => {
  const [desktopVideo, setDesktopVideo] = useState(null);
  const [mobileVideo, setMobileVideo] = useState(null);
  const [desktopPreview, setDesktopPreview] = useState("");
  const [mobilePreview, setMobilePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({
    desktop: 0,
    mobile: 0,
  });

  // Refs for file inputs
  const desktopInputRef = useRef(null);
  const mobileInputRef = useRef(null);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (desktopPreview && desktopPreview.startsWith("blob:")) {
        URL.revokeObjectURL(desktopPreview);
      }
      if (mobilePreview && mobilePreview.startsWith("blob:")) {
        URL.revokeObjectURL(mobilePreview);
      }
    };
  }, [desktopPreview, mobilePreview]);

  // Set previews when editData changes
  useEffect(() => {
    if (editData) {
      setDesktopPreview(editData?.desktopVideo?.url || "");
      setMobilePreview(editData?.mobileVideo?.url || "");
    }
  }, [editData]);

  const getUploadUrl = async (file) => {
    try {
      const res = await apiClient.post("/hero/upload-url", {
        fileName: file.name,
        fileType: file.type,
        size: file.size,
      });

      console.log("Full API Response:", res);
      console.log("Response data:", res.data);

      let uploadData;

      if (res.data?.data?.data) {
        uploadData = res.data.data.data;
      } else if (res.data?.data) {
        uploadData = res.data.data;
      } else if (res.data) {
        uploadData = res.data;
      } else {
        throw new Error("Invalid response structure from server");
      }

      if (!uploadData) {
        throw new Error("No data received from server");
      }

      if (!uploadData.uploadURL) {
        console.error("Upload data missing uploadURL:", uploadData);
        throw new Error("Server response missing uploadURL field");
      }

      if (!uploadData.fileUrl) {
        console.warn("Upload data missing fileUrl:", uploadData);
      }

      if (!uploadData.key) {
        console.warn("Upload data missing key:", uploadData);
      }

      return uploadData;
    } catch (error) {
      console.error("Error in getUploadUrl:", error);
      throw error;
    }
  };

  const uploadFileToS3 = async (file, uploadURL, onProgress) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open("PUT", uploadURL, true);
      xhr.setRequestHeader("Content-Type", file.type);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && onProgress) {
          const percentComplete = Math.round(
            (event.loaded / event.total) * 100,
          );
          onProgress(percentComplete);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve();
        } else {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      };

      xhr.onerror = () => reject(new Error("Network error during upload"));
      xhr.send(file);
    });
  };

  const handleVideoChange = (e, type) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Validate file size (max 20MB)
    if (file.size > 20 * 1024 * 1024) {
      toast.error("Video size should be less than 20MB");
      if (type === "desktop" && desktopInputRef.current) {
        desktopInputRef.current.value = "";
      } else if (type === "mobile" && mobileInputRef.current) {
        mobileInputRef.current.value = "";
      }
      return;
    }

    if (!file.type.startsWith("video/")) {
      toast.error("Please select a valid video file");
      if (type === "desktop" && desktopInputRef.current) {
        desktopInputRef.current.value = "";
      } else if (type === "mobile" && mobileInputRef.current) {
        mobileInputRef.current.value = "";
      }
      return;
    }

    // Clean up old preview URL
    if (
      type === "desktop" &&
      desktopPreview &&
      desktopPreview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(desktopPreview);
    }
    if (
      type === "mobile" &&
      mobilePreview &&
      mobilePreview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(mobilePreview);
    }

    const preview = URL.createObjectURL(file);

    if (type === "desktop") {
      setDesktopVideo(file);
      setDesktopPreview(preview);
      setUploadProgress((prev) => ({ ...prev, desktop: 0 }));
    } else {
      setMobileVideo(file);
      setMobilePreview(preview);
      setUploadProgress((prev) => ({ ...prev, mobile: 0 }));
    }
  };

  const validateBothVideos = () => {
    // For edit mode
    if (editData) {
      const hasDesktopVideo = editData?.desktopVideo?.url || desktopVideo;
      const hasMobileVideo = editData?.mobileVideo?.url || mobileVideo;

      if (!hasDesktopVideo) {
        toast.error("Desktop video is required!");
        return false;
      }
      if (!hasMobileVideo) {
        toast.error("Mobile video is required!");
        return false;
      }
    } else {
      // For create mode
      if (!desktopVideo) {
        toast.error("Please select desktop video!");
        return false;
      }
      if (!mobileVideo) {
        toast.error("Please select mobile video!");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    // Validate both videos are provided
    if (!validateBothVideos()) {
      return;
    }

    try {
      setLoading(true);

      let desktopVideoData = editData?.desktopVideo || null;
      let mobileVideoData = editData?.mobileVideo || null;

      // Upload desktop video if new file selected
      if (desktopVideo) {
        toast.loading("Uploading desktop video...", { id: "desktop-upload" });

        const uploadData = await getUploadUrl(desktopVideo);

        console.log("Desktop upload data received:", uploadData);

        await uploadFileToS3(desktopVideo, uploadData.uploadURL, (progress) => {
          setUploadProgress((prev) => ({ ...prev, desktop: progress }));
        });

        desktopVideoData = {
          url: uploadData.fileUrl || uploadData.url,
          key: uploadData.key,
        };

        toast.success("Desktop video uploaded!", { id: "desktop-upload" });
      }

      // Upload mobile video if new file selected
      if (mobileVideo) {
        toast.loading("Uploading mobile video...", { id: "mobile-upload" });

        const uploadData = await getUploadUrl(mobileVideo);

        console.log("Mobile upload data received:", uploadData);

        await uploadFileToS3(mobileVideo, uploadData.uploadURL, (progress) => {
          setUploadProgress((prev) => ({ ...prev, mobile: progress }));
        });

        mobileVideoData = {
          url: uploadData.fileUrl || uploadData.url,
          key: uploadData.key,
        };

        toast.success("Mobile video uploaded!", { id: "mobile-upload" });
      }

      const payload = {
        desktopVideo: desktopVideoData,
        mobileVideo: mobileVideoData,
      };

      console.log("Final payload:", payload);

      if (editData?._id) {
        await apiClient.put(`/hero/update/${editData._id}`, payload);
        toast.success("Hero updated successfully");
      } else {
        await apiClient.post("/hero/create", payload);
        toast.success("Hero created successfully");
      }

      // Reset form after successful submission
      if (!editData) {
        if (desktopPreview && desktopPreview.startsWith("blob:")) {
          URL.revokeObjectURL(desktopPreview);
        }
        if (mobilePreview && mobilePreview.startsWith("blob:")) {
          URL.revokeObjectURL(mobilePreview);
        }

        setDesktopVideo(null);
        setMobileVideo(null);
        setDesktopPreview("");
        setMobilePreview("");
        setUploadProgress({ desktop: 0, mobile: 0 });

        if (desktopInputRef.current) {
          desktopInputRef.current.value = "";
        }
        if (mobileInputRef.current) {
          mobileInputRef.current.value = "";
        }
      }

      onSuccess?.();
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  const removeVideo = (type) => {
    if (type === "desktop") {
      if (desktopPreview && desktopPreview.startsWith("blob:")) {
        URL.revokeObjectURL(desktopPreview);
      }
      setDesktopVideo(null);
      setDesktopPreview("");
      setUploadProgress((prev) => ({ ...prev, desktop: 0 }));
      if (desktopInputRef.current) {
        desktopInputRef.current.value = "";
      }
    } else {
      if (mobilePreview && mobilePreview.startsWith("blob:")) {
        URL.revokeObjectURL(mobilePreview);
      }
      setMobileVideo(null);
      setMobilePreview("");
      setUploadProgress((prev) => ({ ...prev, mobile: 0 }));
      if (mobileInputRef.current) {
        mobileInputRef.current.value = "";
      }
    }
  };

  // Check if both videos are selected
  const isBothVideosSelected = () => {
    if (editData) {
      const hasDesktop = editData?.desktopVideo?.url || desktopVideo;
      const hasMobile = editData?.mobileVideo?.url || mobileVideo;
      return hasDesktop && hasMobile;
    }
    return desktopVideo && mobileVideo;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0b1020] to-[#050816] p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-linear-to-br from-[#0088db] to-[#006db1] rounded-xl shadow-lg">
              <FiVideo className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-[#f3f4f6]">
                {editData ? "Update Hero Section" : "Create New Hero"}
              </h1>
              <p className="text-sm text-[#a1a1aa] mt-1">
                {editData
                  ? "Update your hero videos for desktop and mobile devices"
                  : "Add hero videos for desktop and mobile devices to showcase your brand"}
              </p>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-[#111827] rounded-2xl shadow-xl border border-[#27324a] overflow-hidden">
          <div className="p-6 md:p-8">
            {/* Warning message if both videos not selected */}
            {!isBothVideosSelected() && (
              <div className="mb-6 p-4 bg-amber-500/10 border-l-4 border-amber-500 rounded-lg flex items-start gap-3">
                <FiAlertCircle
                  className="text-amber-500 mt-0.5 shrink-0"
                  size={20}
                />
                <div>
                  <p className="text-amber-500 font-medium">
                    Both desktop and mobile videos are required!
                  </p>
                  <p className="text-amber-500/70 text-sm mt-1">
                    Please select both videos to continue.
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Desktop Video Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-linear-to-br from-[#0088db] to-[#006db1] rounded-lg text-white">
                    <FiMonitor size={18} />
                  </div>
                  <div>
                    <label className="font-heading font-semibold text-[#f3f4f6]">
                      Desktop Video <span className="text-red-500">*</span>
                    </label>
                    <p className="text-xs text-[#71717a]">
                      MP4, WebM, MOV (Max 20MB)
                    </p>
                  </div>
                </div>

                <input
                  ref={desktopInputRef}
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleVideoChange(e, "desktop")}
                  className="w-full border border-[#27324a] rounded-xl p-3 text-sm bg-[#0b1020] text-[#f3f4f6] focus:ring-2 focus:ring-[#0088db]/20 focus:border-[#0088db] outline-none transition"
                  disabled={loading}
                />

                {uploadProgress.desktop > 0 && uploadProgress.desktop < 100 && (
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#a1a1aa]">Uploading...</span>
                      <span className="font-medium text-[#ffba22]">
                        {uploadProgress.desktop}%
                      </span>
                    </div>
                    <div className="h-2 bg-[#27324a] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-[#ffba22] to-[#ffc93d] transition-all duration-300 rounded-full"
                        style={{ width: `${uploadProgress.desktop}%` }}
                      />
                    </div>
                  </div>
                )}

                {desktopPreview && (
                  <div className="mt-3 relative group">
                    <div className="relative rounded-xl overflow-hidden bg-black/20">
                      <video
                        src={desktopPreview}
                        controls
                        className="w-full rounded-xl max-h-75 object-contain"
                      />
                      {!loading && (
                        <button
                          onClick={() => removeVideo("desktop")}
                          className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      )}
                    </div>
                    <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur text-white px-3 py-1 rounded-full text-xs flex items-center gap-2">
                      <FiCheckCircle size={12} className="text-green-400" />
                      Video ready
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Video Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-linear-to-br from-[#0088db] to-[#006db1] rounded-lg text-white">
                    <FiSmartphone size={18} />
                  </div>
                  <div>
                    <label className="font-heading font-semibold text-[#f3f4f6]">
                      Mobile Video <span className="text-red-500">*</span>
                    </label>
                    <p className="text-xs text-[#71717a]">
                      MP4, WebM, MOV (Max 20MB)
                    </p>
                  </div>
                </div>

                <input
                  ref={mobileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleVideoChange(e, "mobile")}
                  className="w-full border border-[#27324a] rounded-xl p-3 text-sm bg-[#0b1020] text-[#f3f4f6] focus:ring-2 focus:ring-[#0088db]/20 focus:border-[#0088db] outline-none transition"
                  disabled={loading}
                />

                {uploadProgress.mobile > 0 && uploadProgress.mobile < 100 && (
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#a1a1aa]">Uploading...</span>
                      <span className="font-medium text-[#ffba22]">
                        {uploadProgress.mobile}%
                      </span>
                    </div>
                    <div className="h-2 bg-[#27324a] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-[#ffba22] to-[#ffc93d] transition-all duration-300 rounded-full"
                        style={{ width: `${uploadProgress.mobile}%` }}
                      />
                    </div>
                  </div>
                )}

                {mobilePreview && (
                  <div className="mt-3 relative group">
                    <div className="relative rounded-xl overflow-hidden bg-black/20">
                      <video
                        src={mobilePreview}
                        controls
                        className="w-full rounded-xl max-h-75 object-contain"
                      />
                      {!loading && (
                        <button
                          onClick={() => removeVideo("mobile")}
                          className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      )}
                    </div>
                    <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur text-white px-3 py-1 rounded-full text-xs flex items-center gap-2">
                      <FiCheckCircle size={12} className="text-green-400" />
                      Video ready
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Guidelines Section */}
            <div className="mt-8 p-4 bg-[#0088db]/10 rounded-xl border border-[#0088db]/20">
              <div className="flex items-start gap-3">
                <FiInfo className="text-[#0088db] mt-0.5 shrink-0" size={18} />
                <div className="text-sm text-[#a1a1aa]">
                  <p className="font-medium mb-2 text-[#f3f4f6]">
                    Video Guidelines:
                  </p>
                  <ul className="space-y-1">
                    <li>
                      • Recommended resolution: Desktop (1920x1080), Mobile
                      (1080x1920)
                    </li>
                    <li>• Maximum file size: 20MB per video</li>
                    <li>• Supported formats: MP4, WebM, MOV</li>
                    <li>
                      • For best performance, keep videos under 30 seconds
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="border-t border-[#27324a] bg-[#0b1020] px-6 md:px-8 py-6">
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={handleSubmit}
                disabled={loading || !isBothVideosSelected()}
                className={`w-full sm:w-auto px-8 py-3 rounded-full transition-all font-heading font-medium flex items-center justify-center gap-2 ${
                  !isBothVideosSelected()
                    ? "bg-[#27324a] text-[#71717a] cursor-not-allowed"
                    : "btn-primary"
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <FiUpload size={18} />
                    {editData ? "Update Hero" : "Create Hero"}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        {(desktopPreview || mobilePreview) && (
          <div className="mt-8">
            <h3 className="text-lg font-heading font-semibold text-[#f3f4f6] mb-4 flex items-center gap-2">
              <FiVideo size={20} />
              Video Preview
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {desktopPreview && (
                <div className="bg-[#111827] rounded-xl overflow-hidden shadow-lg border border-[#27324a]">
                  <div className="bg-linear-to-r from-[#0088db] to-[#006db1] px-4 py-2">
                    <p className="text-sm font-medium text-white flex items-center gap-2">
                      <FiMonitor size={14} />
                      Desktop Preview
                    </p>
                  </div>
                  <video src={desktopPreview} controls className="w-full" />
                </div>
              )}
              {mobilePreview && (
                <div className="bg-[#111827] rounded-xl overflow-hidden shadow-lg border border-[#27324a]">
                  <div className="bg-linear-to-r from-[#0088db] to-[#006db1] px-4 py-2">
                    <p className="text-sm font-medium text-white flex items-center gap-2">
                      <FiSmartphone size={14} />
                      Mobile Preview
                    </p>
                  </div>
                  <video
                    src={mobilePreview}
                    controls
                    className="w-full max-h-100"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddHero;
