"use client";

import React, { useState, useEffect, useRef } from "react";
import apiClient from "@/api/client";
import toast from "react-hot-toast";

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
    const res = await apiClient.post("/hero/upload-url", {
      fileName: file.name,
      fileType: file.type,
      size: file.size,
    });

    return res.data.data.data;
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

    // Validate file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      toast.error("Video size should be less than 100MB");
      // Clear the input field
      if (type === "desktop" && desktopInputRef.current) {
        desktopInputRef.current.value = "";
      } else if (type === "mobile" && mobileInputRef.current) {
        mobileInputRef.current.value = "";
      }
      return;
    }

    if (!file.type.startsWith("video/")) {
      toast.error("Please select a valid video file");
      // Clear the input field
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

  const handleSubmit = async () => {
    // Validate at least one video is provided for new creation
    if (!editData && !desktopVideo && !mobileVideo) {
      toast.error("Please select at least one video");
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

        await uploadFileToS3(desktopVideo, uploadData.uploadURL, (progress) => {
          setUploadProgress((prev) => ({ ...prev, desktop: progress }));
        });

        desktopVideoData = {
          url: uploadData.fileUrl,
          key: uploadData.key,
        };

        toast.success("Desktop video uploaded!", { id: "desktop-upload" });
      }

      // Upload mobile video if new file selected
      if (mobileVideo) {
        toast.loading("Uploading mobile video...", { id: "mobile-upload" });

        const uploadData = await getUploadUrl(mobileVideo);

        await uploadFileToS3(mobileVideo, uploadData.uploadURL, (progress) => {
          setUploadProgress((prev) => ({ ...prev, mobile: progress }));
        });

        mobileVideoData = {
          url: uploadData.fileUrl,
          key: uploadData.key,
        };

        toast.success("Mobile video uploaded!", { id: "mobile-upload" });
      }

      const payload = {
        desktopVideo: desktopVideoData,
        mobileVideo: mobileVideoData,
      };

      if (editData?._id) {
        await apiClient.put(`/hero/update/${editData._id}`, payload);
        toast.success("Hero updated successfully");
      } else {
        await apiClient.post("/hero/create", payload);
        toast.success("Hero created successfully");
      }

      // Reset form after successful submission
      if (!editData) {
        // Clean up preview URLs
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

        // Clear file input fields
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
      // Clear the file input field
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
      // Clear the file input field
      if (mobileInputRef.current) {
        mobileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">
        {editData ? "Update Hero" : "Create Hero"}
      </h2>

      <div className="space-y-6">
        {/* Desktop Video */}
        <div>
          <label className="block mb-2 font-medium">
            Desktop Video
            {!editData && <span className="text-red-500 ml-1">*</span>}
          </label>

          <input
            ref={desktopInputRef}
            type="file"
            accept="video/*"
            onChange={(e) => handleVideoChange(e, "desktop")}
            className="w-full border rounded-lg p-3"
            disabled={loading}
          />

          {uploadProgress.desktop > 0 && uploadProgress.desktop < 100 && (
            <div className="mt-2">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${uploadProgress.desktop}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Uploading: {uploadProgress.desktop}%
              </p>
            </div>
          )}

          {desktopPreview && (
            <div className="mt-3 relative">
              <video
                src={desktopPreview}
                controls
                className="w-full rounded-lg border max-h-[300px]"
              />
              {!loading && (
                <button
                  onClick={() => removeVideo("desktop")}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Mobile Video */}
        <div>
          <label className="block mb-2 font-medium">
            Mobile Video
            {!editData && <span className="text-red-500 ml-1">*</span>}
          </label>

          <input
            ref={mobileInputRef}
            type="file"
            accept="video/*"
            onChange={(e) => handleVideoChange(e, "mobile")}
            className="w-full border rounded-lg p-3"
            disabled={loading}
          />

          {uploadProgress.mobile > 0 && uploadProgress.mobile < 100 && (
            <div className="mt-2">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${uploadProgress.mobile}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Uploading: {uploadProgress.mobile}%
              </p>
            </div>
          )}

          {mobilePreview && (
            <div className="mt-3 relative">
              <video
                src={mobilePreview}
                controls
                className="w-full rounded-lg border max-h-[300px]"
              />
              {!loading && (
                <button
                  onClick={() => removeVideo("mobile")}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#1f3b57] text-white py-3 rounded-lg hover:bg-[#162e44] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
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
              Uploading...
            </span>
          ) : editData ? (
            "Update Hero"
          ) : (
            "Create Hero"
          )}
        </button>
      </div>
    </div>
  );
};

export default AddHero;
