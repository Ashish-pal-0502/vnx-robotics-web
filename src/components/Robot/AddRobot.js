"use client";

import React, { useEffect, useState } from "react";
import apiClient from "@/api/client";
import toast from "react-hot-toast";
import {
  FiCpu,
  FiTag,
  FiFileText,
  FiImage,
  FiPlus,
  FiTrash2,
  FiSave,
  FiCheckCircle,
  FiAlertCircle,
  FiList,
  FiGrid,
  FiInfo,
  FiVideo,
  FiToggleLeft,
  FiToggleRight,
  FiX,
} from "react-icons/fi";

const AddRobot = ({ editData = null, onSuccess }) => {
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [robotForm, setRobotForm] = useState({
    name: "",
    category: "Robots",
    description: "",
    is_development: false,
  });

  const [specifications, setSpecifications] = useState([]);
  const [keyPoints, setKeyPoints] = useState([]);
  const [applications, setApplications] = useState([]);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  // Video array state
  const [videos, setVideos] = useState([]);
  const [existingVideos, setExistingVideos] = useState([]);
  const [uploadingVideos, setUploadingVideos] = useState({});

  // Temporary inputs for adding new items
  const [newSpec, setNewSpec] = useState({ label: "", value: "" });
  const [newKeyPoint, setNewKeyPoint] = useState("");
  const [newApplication, setNewApplication] = useState("");

  // Category options
  const categoryOptions = ["Robots", "Controllers", "Equipment", "Software"];

  // Constants - Updated to 20MB
  const MIN_FILE_SIZE = 30 * 1024; // 30KB minimum
  const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB maximum
  const MAX_VIDEO_SIZE = 20 * 1024 * 1024; // 20MB maximum

  // Validation constants
  const MIN_NAME_LENGTH = 2;
  const MIN_DESCRIPTION_LENGTH = 10;

  /* =========================
     LOAD EDIT DATA
  ========================= */
  useEffect(() => {
    if (!editData) return;

    console.log("Loading edit data:", editData);

    setRobotForm({
      name: editData.name || "",
      category: editData.category || "Robots",
      description: editData.description || "",
      is_development: editData.is_development ?? false,
    });

    if (editData.specifications && editData.specifications.length > 0) {
      setSpecifications(editData.specifications);
    }

    if (editData.keyPoints && editData.keyPoints.length > 0) {
      setKeyPoints(editData.keyPoints);
    }

    if (editData.applications && editData.applications.length > 0) {
      setApplications(editData.applications);
    }

    const existingImages =
      editData?.images?.length > 0
        ? editData.images
        : editData?.image?.length > 0
          ? editData.image
          : [];

    if (existingImages.length > 0) {
      const formattedImages = existingImages.map((img) => ({
        url: img.url,
        key: img.key,
        preview: img.url,
        file: null,
        isExisting: true,
      }));

      setImages(formattedImages);
      setPreviews(formattedImages.map((img) => img.preview));
    }

    // Load existing videos (array)
    if (editData?.video && editData.video.length > 0) {
      const formattedExistingVideos = editData.video.map(
        (videoItem, index) => ({
          id: index,
          url: videoItem.url,
          key: videoItem.key,
          isExisting: true,
          preview: videoItem.url,
        }),
      );
      setExistingVideos(formattedExistingVideos);
    }
  }, [editData]);

  /* =========================
     GET PRESIGNED URL
  ========================= */
  const getPresignedUrl = async (file, type = "image") => {
    try {
      const response = await apiClient.post("/robot/upload-url", {
        fileName: file.name,
        fileType: file.type,
        size: file.size,
      });

      if (response?.data?.success === false) {
        throw new Error(response.data.message || "Server error");
      }

      let data = null;

      if (response?.data?.data) {
        data = response.data.data;
      } else if (response?.data) {
        data = response.data;
      } else {
        throw new Error("Invalid response structure from server");
      }

      if (!data) {
        throw new Error("No data received from server");
      }

      const uploadURL =
        data.uploadURL || data.uploadUrl || data.url || data.presignedUrl;
      const fileUrl =
        data.fileUrl || data.fileURL || data.publicUrl || data.location;
      const key = data.key;

      if (!uploadURL) {
        throw new Error("Upload URL missing from server response");
      }

      return {
        uploadURL,
        fileUrl: fileUrl || uploadURL.split("?")[0],
        key: key || `${type}-${Date.now()}-${file.name}`,
      };
    } catch (err) {
      console.error("Error getting presigned URL:", err);
      throw new Error(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to get upload URL",
      );
    }
  };

  /* =========================
     UPLOAD TO S3
  ========================= */
  const uploadToS3 = async (file, uploadURL) => {
    try {
      const response = await fetch(uploadURL, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }

      return true;
    } catch (err) {
      console.error("S3 Upload Error:", err);
      throw new Error("Failed to upload file to server");
    }
  };

  /* =========================
     VALIDATE SINGLE IMAGE
  ========================= */
  const validateImage = (file) => {
    const errors = [];

    if (!file.type.startsWith("image/")) {
      errors.push(`${file.name} is not an image file`);
      return errors;
    }

    if (file.size < MIN_FILE_SIZE) {
      errors.push(
        `${file.name} is too small (${formatFileSize(file.size)}). Minimum size is 30KB`,
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      errors.push(
        `${file.name} is too large (${formatFileSize(file.size)}). Maximum size is 20MB`,
      );
    }

    return errors;
  };

  /* =========================
     VALIDATE VIDEO
  ========================= */
  const validateVideo = (file) => {
    const errors = [];

    if (!file.type.startsWith("video/")) {
      errors.push(`${file.name} is not a video file`);
      return errors;
    }

    if (file.size > MAX_VIDEO_SIZE) {
      errors.push(
        `${file.name} is too large (${formatFileSize(file.size)}). Maximum size is 20MB`,
      );
    }

    return errors;
  };

  /* =========================
     VALIDATE FORM FIELDS
  ========================= */
  const validateFormFields = () => {
    const errors = [];

    if (!robotForm.name || robotForm.name.trim() === "") {
      errors.push("Robot name is required");
    } else if (robotForm.name.trim().length < MIN_NAME_LENGTH) {
      errors.push(
        `Robot name must be at least ${MIN_NAME_LENGTH} characters long`,
      );
    }

    if (!robotForm.category || robotForm.category.trim() === "") {
      errors.push("Category is required");
    }

    if (!robotForm.description || robotForm.description.trim() === "") {
      errors.push("Robot description is required");
    } else if (robotForm.description.trim().length < MIN_DESCRIPTION_LENGTH) {
      errors.push(
        `Description must be at least ${MIN_DESCRIPTION_LENGTH} characters long`,
      );
    }

    if (images.length === 0) {
      errors.push("At least one image is required");
    }

    return errors;
  };

  /* =========================
     IMAGE SELECT WITH VALIDATION
  ========================= */
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const validFiles = [];
    const errors = [];

    for (const file of files) {
      const fileErrors = validateImage(file);
      if (fileErrors.length > 0) {
        errors.push(...fileErrors);
      } else {
        validFiles.push(file);
      }
    }

    if (errors.length > 0) {
      errors.forEach((err) => toast.error(err));
    }

    if (validFiles.length === 0) return;

    setError("");

    const newImages = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      isExisting: false,
    }));

    setImages((prev) => [...prev, ...newImages]);
    setPreviews((prev) => [...prev, ...newImages.map((img) => img.preview)]);

    toast.success(`${validFiles.length} image(s) selected successfully`);
  };

  /* =========================
     VIDEO SELECT WITH VALIDATION
  ========================= */
  const handleVideoUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const validFiles = [];
    const errors = [];

    for (const file of files) {
      const videoErrors = validateVideo(file);
      if (videoErrors.length > 0) {
        errors.push(...videoErrors);
      } else {
        validFiles.push(file);
      }
    }

    if (errors.length > 0) {
      errors.forEach((err) => toast.error(err));
    }

    if (validFiles.length === 0) return;

    setError("");

    const newVideos = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      isExisting: false,
      id: Date.now() + Math.random(),
    }));

    setVideos((prev) => [...prev, ...newVideos]);

    toast.success(`${validFiles.length} video(s) selected successfully`);
  };

  /* =========================
     REMOVE VIDEO
  ========================= */
  const removeNewVideo = (id) => {
    const videoToRemove = videos.find((v) => v.id === id);
    if (
      videoToRemove &&
      videoToRemove.preview &&
      videoToRemove.preview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(videoToRemove.preview);
    }
    setVideos((prev) => prev.filter((v) => v.id !== id));
  };

  const removeExistingVideo = (index) => {
    setExistingVideos((prev) => prev.filter((_, i) => i !== index));
  };

  /* =========================
     REMOVE IMAGE
  ========================= */
  const removeImage = (index) => {
    if (previews[index] && previews[index].startsWith("blob:")) {
      URL.revokeObjectURL(previews[index]);
    }
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  /* =========================
     SPECIFICATIONS HANDLERS
  ========================= */
  const addSpecification = () => {
    if (!newSpec.label.trim() || !newSpec.value.trim()) {
      toast.error("Both label and value are required for specification");
      return;
    }
    setSpecifications([
      ...specifications,
      { label: newSpec.label, value: newSpec.value },
    ]);
    setNewSpec({ label: "", value: "" });
  };

  const removeSpecification = (index) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
  };

  const updateSpecification = (index, field, value) => {
    const updated = [...specifications];
    updated[index][field] = value;
    setSpecifications(updated);
  };

  /* =========================
     KEY POINTS HANDLERS
  ========================= */
  const addKeyPoint = () => {
    if (!newKeyPoint.trim()) {
      toast.error("Key point cannot be empty");
      return;
    }
    setKeyPoints([...keyPoints, newKeyPoint]);
    setNewKeyPoint("");
  };

  const removeKeyPoint = (index) => {
    setKeyPoints(keyPoints.filter((_, i) => i !== index));
  };

  const updateKeyPoint = (index, value) => {
    const updated = [...keyPoints];
    updated[index] = value;
    setKeyPoints(updated);
  };

  /* =========================
     APPLICATIONS HANDLERS
  ========================= */
  const addApplication = () => {
    if (!newApplication.trim()) {
      toast.error("Application cannot be empty");
      return;
    }
    setApplications([...applications, newApplication]);
    setNewApplication("");
  };

  const removeApplication = (index) => {
    setApplications(applications.filter((_, i) => i !== index));
  };

  const updateApplication = (index, value) => {
    const updated = [...applications];
    updated[index] = value;
    setApplications(updated);
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async () => {
    setError("");
    setMessage("");

    const validationErrors = validateFormFields();
    if (validationErrors.length > 0) {
      const errorMessage = validationErrors.join("\n");
      setError(errorMessage);
      toast.error(validationErrors[0]);
      return;
    }

    for (const img of images) {
      if (!img.isExisting && img.file) {
        const errors = validateImage(img.file);
        if (errors.length > 0) {
          setError(errors[0]);
          toast.error(errors[0]);
          return;
        }
      }
    }

    // Validate new videos
    for (const videoItem of videos) {
      if (videoItem.file) {
        const videoErrors = validateVideo(videoItem.file);
        if (videoErrors.length > 0) {
          setError(videoErrors[0]);
          toast.error(videoErrors[0]);
          return;
        }
      }
    }

    try {
      setSubmitting(true);
      setUploadingImage(true);

      let uploadedImages = [];

      // Upload images to S3
      for (let i = 0; i < images.length; i++) {
        const img = images[i];

        if (img.isExisting) {
          uploadedImages.push({
            url: img.url,
            key: img.key,
          });
          continue;
        }

        toast.loading(`Uploading image ${i + 1} of ${images.length}...`, {
          id: "upload-progress",
        });

        const { uploadURL, fileUrl, key } = await getPresignedUrl(
          img.file,
          "image",
        );
        await uploadToS3(img.file, uploadURL);

        uploadedImages.push({
          url: fileUrl || uploadURL.split("?")[0],
          key,
        });

        toast.success(`Image ${i + 1} uploaded`, { id: "upload-progress" });
      }

      setUploadingImage(false);

      // Handle video uploads (multiple videos)
      setUploadingVideo(true);
      const uploadedVideos = [];

      // Upload new videos
      for (let i = 0; i < videos.length; i++) {
        const videoItem = videos[i];

        toast.loading(`Uploading video ${i + 1} of ${videos.length}...`, {
          id: "video-upload-progress",
        });

        const { uploadURL, fileUrl, key } = await getPresignedUrl(
          videoItem.file,
          "video",
        );
        await uploadToS3(videoItem.file, uploadURL);

        uploadedVideos.push({
          url: fileUrl || uploadURL.split("?")[0],
          key,
        });

        toast.success(`Video ${i + 1} uploaded`, {
          id: "video-upload-progress",
        });
      }

      // Keep existing videos
      const keptExistingVideos = existingVideos.map((video) => ({
        url: video.url,
        key: video.key,
      }));

      // Combine existing and new videos
      const allVideos = [...keptExistingVideos, ...uploadedVideos];

      const payload = {
        name: robotForm.name.trim(),
        category: robotForm.category,
        description: robotForm.description.trim(),
        is_development: robotForm.is_development,
        specifications: specifications,
        keyPoints: keyPoints,
        applications: applications,
        images: uploadedImages,
        video: allVideos,
      };

      console.log("=== FINAL PAYLOAD BEING SENT ===");
      console.log("is_development value:", payload.is_development);
      console.log("videos count:", payload.video.length);

      if (editData?._id) {
        const res = await apiClient.put(
          `/robot/update/${editData._id}`,
          payload,
        );
        console.log("Update response:", res.data);
        toast.success(res?.data?.message || "Robot updated successfully");
      } else {
        const res = await apiClient.post("/robot/create", payload);
        console.log("Create response:", res.data);
        toast.success(res?.data?.message || "Robot created successfully");

        // Reset form
        setRobotForm({
          name: "",
          category: "Robots",
          description: "",
          is_development: false,
        });
        setSpecifications([]);
        setKeyPoints([]);
        setApplications([]);
        setImages([]);
        setPreviews([]);
        setVideos([]);
        setExistingVideos([]);
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error("ROBOT SUBMIT ERROR:", err);
      const serverMessage =
        err?.response?.data?.message || err?.message || "Something went wrong";
      setError(serverMessage);
      toast.error(serverMessage);
    } finally {
      setSubmitting(false);
      setUploadingImage(false);
      setUploadingVideo(false);
      toast.dismiss("upload-progress");
      toast.dismiss("video-upload-progress");
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const descriptionLength = robotForm.description.trim().length;
  const isDescriptionValid = descriptionLength >= MIN_DESCRIPTION_LENGTH;

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0b1020] to-[#050816] p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section - Responsive */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <div className="flex flex-col xs:flex-row items-start xs:items-center gap-3">
            <div className="flex items-center gap-3 w-full xs:w-auto">
              <div className="p-2.5 sm:p-3 bg-linear-to-br from-[#0088db] to-[#006db1] rounded-xl shadow-lg shrink-0">
                <FiCpu className="text-white text-lg sm:text-2xl" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-[#f3f4f6] truncate">
                  {editData ? "Update Robot" : "Add New Robot"}
                </h1>
                <p className="text-xs sm:text-sm text-[#a1a1aa] mt-0.5 sm:mt-1 truncate">
                  {editData
                    ? "Update robot details, specifications, and images"
                    : "Add a new robot with complete specifications"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-[#111827] rounded-2xl shadow-xl border border-[#27324a] overflow-hidden">
          <div className="p-4 sm:p-6 md:p-8">
            {/* Alerts - Responsive */}
            {error && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-500/10 border-l-4 border-red-500 rounded-lg flex items-start gap-2 sm:gap-3">
                <FiAlertCircle
                  className="text-red-500 mt-0.5 shrink-0"
                  size={18}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-red-400 text-sm">Error</p>
                  <p className="text-xs sm:text-sm text-red-300 whitespace-pre-line break-words">
                    {error}
                  </p>
                </div>
              </div>
            )}

            {message && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-500/10 border-l-4 border-green-500 rounded-lg flex items-start gap-2 sm:gap-3">
                <FiCheckCircle
                  className="text-green-500 mt-0.5 shrink-0"
                  size={18}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-green-400 text-sm">Success</p>
                  <p className="text-xs sm:text-sm text-green-300 break-words">
                    {message}
                  </p>
                </div>
              </div>
            )}

            {/* Basic Information Section */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-heading font-semibold text-[#f3f4f6] mb-3 sm:mb-4 flex items-center gap-2">
                <FiInfo size={16} className="text-[#0088db] shrink-0" />
                <span>Basic Information</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[#f3f4f6] mb-1.5 sm:mb-2">
                    Robot Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none">
                      <FiCpu className="text-[#71717a] text-sm sm:text-base" />
                    </div>
                    <input
                      type="text"
                      value={robotForm.name}
                      onChange={(e) =>
                        setRobotForm({ ...robotForm, name: e.target.value })
                      }
                      placeholder="Enter robot name"
                      className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-[#27324a] rounded-xl focus:ring-2 focus:ring-[#0088db]/20 focus:border-[#0088db] outline-none transition bg-[#0b1020] text-[#f3f4f6] placeholder:text-[#71717a]"
                    />
                  </div>
                  <p className="text-[10px] sm:text-xs text-[#71717a] mt-1">
                    Minimum {MIN_NAME_LENGTH} characters
                  </p>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[#f3f4f6] mb-1.5 sm:mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none">
                      <FiTag className="text-[#71717a] text-sm sm:text-base" />
                    </div>
                    <select
                      value={robotForm.category}
                      onChange={(e) =>
                        setRobotForm({ ...robotForm, category: e.target.value })
                      }
                      className="w-full pl-8 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-3 text-sm sm:text-base border border-[#27324a] rounded-xl focus:ring-2 focus:ring-[#0088db]/20 focus:border-[#0088db] outline-none transition bg-[#0b1020] text-[#f3f4f6] appearance-none cursor-pointer"
                    >
                      {categoryOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-2.5 sm:pr-3 flex items-center pointer-events-none">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-[#71717a]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-xs text-[#71717a] mt-1">
                    Select robot category
                  </p>
                </div>
              </div>

              <div className="mt-4 sm:mt-6">
                <label className="block text-xs sm:text-sm font-semibold text-[#f3f4f6] mb-1.5 sm:mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 pointer-events-none">
                    <FiFileText className="text-[#71717a] text-sm sm:text-base" />
                  </div>
                  <textarea
                    value={robotForm.description}
                    onChange={(e) =>
                      setRobotForm({
                        ...robotForm,
                        description: e.target.value,
                      })
                    }
                    placeholder="Write detailed robot description including features, capabilities, and benefits..."
                    rows={5}
                    className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-[#27324a] rounded-xl focus:ring-2 focus:ring-[#0088db]/20 focus:border-[#0088db] outline-none resize-y bg-[#0b1020] text-[#f3f4f6] placeholder:text-[#71717a]"
                  />
                </div>
                <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-1 mt-1">
                  <p className="text-[10px] sm:text-xs text-[#71717a]">
                    Minimum {MIN_DESCRIPTION_LENGTH} characters
                  </p>
                  <p
                    className={`text-[10px] sm:text-xs font-medium ${isDescriptionValid ? "text-green-400" : "text-[#ffba22]"}`}
                  >
                    {descriptionLength} / {MIN_DESCRIPTION_LENGTH} characters
                    {!isDescriptionValid &&
                      ` (need ${MIN_DESCRIPTION_LENGTH - descriptionLength} more)`}
                  </p>
                </div>
              </div>

              {/* Development Mode Toggle - Responsive */}
              <div className="mt-4 sm:mt-6">
                <label className="block text-xs sm:text-sm font-semibold text-[#f3f4f6] mb-1.5 sm:mb-2">
                  Development Mode
                </label>
                <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-3 p-3 sm:p-4 bg-[#0b1020] rounded-xl border border-[#27324a]">
                  <button
                    type="button"
                    onClick={() => {
                      setRobotForm({
                        ...robotForm,
                        is_development: !robotForm.is_development,
                      });
                    }}
                    className={`relative inline-flex h-5 w-10 sm:h-6 sm:w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#0088db]/20 shrink-0 ${
                      robotForm.is_development ? "bg-[#0088db]" : "bg-[#27324a]"
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform ${
                        robotForm.is_development
                          ? "translate-x-5.5 sm:translate-x-6"
                          : "translate-x-0.5 sm:translate-x-1"
                      }`}
                    />
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-[#f3f4f6]">
                      {robotForm.is_development
                        ? "Development Mode ON"
                        : "Development Mode OFF"}
                    </p>
                    <p className="text-[10px] sm:text-xs text-[#71717a] break-words">
                      {robotForm.is_development
                        ? "This robot is in development and may not be shown in production"
                        : "This robot is ready for production"}
                    </p>
                  </div>
                  {robotForm.is_development ? (
                    <FiToggleRight
                      className="text-[#0088db] shrink-0"
                      size={20}
                    />
                  ) : (
                    <FiToggleLeft
                      className="text-[#71717a] shrink-0"
                      size={20}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Specifications Section - Responsive */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-heading font-semibold text-[#f3f4f6] mb-3 sm:mb-4 flex items-center gap-2">
                <FiList size={16} className="text-[#0088db] shrink-0" />
                <span>Technical Specifications</span>
              </h3>

              {specifications.length > 0 && (
                <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                  {specifications.map((spec, index) => (
                    <div
                      key={index}
                      className="flex flex-col xs:flex-row gap-2 items-start xs:items-center"
                    >
                      <input
                        type="text"
                        value={spec.label}
                        onChange={(e) =>
                          updateSpecification(index, "label", e.target.value)
                        }
                        placeholder="Label"
                        className="w-full xs:flex-1 px-3 sm:px-4 py-1.5 sm:py-2 text-sm border border-[#27324a] rounded-lg focus:ring-2 focus:ring-[#0088db]/20 focus:border-[#0088db] outline-none bg-[#0b1020] text-[#f3f4f6] placeholder:text-[#71717a]"
                      />
                      <input
                        type="text"
                        value={spec.value}
                        onChange={(e) =>
                          updateSpecification(index, "value", e.target.value)
                        }
                        placeholder="Value"
                        className="w-full xs:flex-1 px-3 sm:px-4 py-1.5 sm:py-2 text-sm border border-[#27324a] rounded-lg focus:ring-2 focus:ring-[#0088db]/20 focus:border-[#0088db] outline-none bg-[#0b1020] text-[#f3f4f6] placeholder:text-[#71717a]"
                      />
                      <button
                        type="button"
                        onClick={() => removeSpecification(index)}
                        className="text-red-400 hover:text-red-300 p-1.5 sm:p-2 transition shrink-0"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-col xs:flex-row gap-2">
                <input
                  type="text"
                  value={newSpec.label}
                  onChange={(e) =>
                    setNewSpec({ ...newSpec, label: e.target.value })
                  }
                  placeholder="Label (e.g., Weight)"
                  className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 text-sm border border-[#27324a] rounded-lg focus:ring-2 focus:ring-[#0088db]/20 focus:border-[#0088db] outline-none bg-[#0b1020] text-[#f3f4f6] placeholder:text-[#71717a]"
                />
                <input
                  type="text"
                  value={newSpec.value}
                  onChange={(e) =>
                    setNewSpec({ ...newSpec, value: e.target.value })
                  }
                  placeholder="Value (e.g., 50kg)"
                  className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 text-sm border border-[#27324a] rounded-lg focus:ring-2 focus:ring-[#0088db]/20 focus:border-[#0088db] outline-none bg-[#0b1020] text-[#f3f4f6] placeholder:text-[#71717a]"
                />
                <button
                  type="button"
                  onClick={addSpecification}
                  className="bg-linear-to-r from-emerald-500 to-emerald-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg hover:shadow-lg transition flex items-center justify-center gap-1.5 sm:gap-2 text-sm shrink-0"
                >
                  <FiPlus size={14} />
                  <span>Add</span>
                </button>
              </div>
            </div>

            {/* Key Features Section - Responsive */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-heading font-semibold text-[#f3f4f6] mb-3 sm:mb-4 flex items-center gap-2">
                <FiGrid size={16} className="text-[#0088db] shrink-0" />
                <span>Key Features & Points</span>
              </h3>

              {keyPoints.length > 0 && (
                <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                  {keyPoints.map((point, index) => (
                    <div
                      key={index}
                      className="flex flex-col xs:flex-row gap-2 items-start xs:items-center"
                    >
                      <input
                        type="text"
                        value={point}
                        onChange={(e) => updateKeyPoint(index, e.target.value)}
                        className="flex-1 w-full px-3 sm:px-4 py-1.5 sm:py-2 text-sm border border-[#27324a] rounded-lg focus:ring-2 focus:ring-[#0088db]/20 focus:border-[#0088db] outline-none bg-[#0b1020] text-[#f3f4f6] placeholder:text-[#71717a]"
                      />
                      <button
                        type="button"
                        onClick={() => removeKeyPoint(index)}
                        className="text-red-400 hover:text-red-300 p-1.5 sm:p-2 transition shrink-0"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-col xs:flex-row gap-2">
                <input
                  type="text"
                  value={newKeyPoint}
                  onChange={(e) => setNewKeyPoint(e.target.value)}
                  placeholder="Enter key feature"
                  className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 text-sm border border-[#27324a] rounded-lg focus:ring-2 focus:ring-[#0088db]/20 focus:border-[#0088db] outline-none bg-[#0b1020] text-[#f3f4f6] placeholder:text-[#71717a]"
                  onKeyPress={(e) => e.key === "Enter" && addKeyPoint()}
                />
                <button
                  type="button"
                  onClick={addKeyPoint}
                  className="bg-linear-to-r from-emerald-500 to-emerald-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg hover:shadow-lg transition flex items-center justify-center gap-1.5 sm:gap-2 text-sm shrink-0"
                >
                  <FiPlus size={14} />
                  <span>Add</span>
                </button>
              </div>
            </div>

            {/* Applications Section - Responsive */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-heading font-semibold text-[#f3f4f6] mb-3 sm:mb-4 flex items-center gap-2">
                <FiGrid size={16} className="text-[#0088db] shrink-0" />
                <span>Applications & Use Cases</span>
              </h3>

              {applications.length > 0 && (
                <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                  {applications.map((app, index) => (
                    <div
                      key={index}
                      className="flex flex-col xs:flex-row gap-2 items-start xs:items-center"
                    >
                      <input
                        type="text"
                        value={app}
                        onChange={(e) =>
                          updateApplication(index, e.target.value)
                        }
                        className="flex-1 w-full px-3 sm:px-4 py-1.5 sm:py-2 text-sm border border-[#27324a] rounded-lg focus:ring-2 focus:ring-[#0088db]/20 focus:border-[#0088db] outline-none bg-[#0b1020] text-[#f3f4f6] placeholder:text-[#71717a]"
                      />
                      <button
                        type="button"
                        onClick={() => removeApplication(index)}
                        className="text-red-400 hover:text-red-300 p-1.5 sm:p-2 transition shrink-0"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-col xs:flex-row gap-2">
                <input
                  type="text"
                  value={newApplication}
                  onChange={(e) => setNewApplication(e.target.value)}
                  placeholder="Enter application"
                  className="flex-1 px-3 sm:px-4 py-1.5 sm:py-2 text-sm border border-[#27324a] rounded-lg focus:ring-2 focus:ring-[#0088db]/20 focus:border-[#0088db] outline-none bg-[#0b1020] text-[#f3f4f6] placeholder:text-[#71717a]"
                  onKeyPress={(e) => e.key === "Enter" && addApplication()}
                />
                <button
                  type="button"
                  onClick={addApplication}
                  className="bg-linear-to-r from-emerald-500 to-emerald-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg hover:shadow-lg transition flex items-center justify-center gap-1.5 sm:gap-2 text-sm shrink-0"
                >
                  <FiPlus size={14} />
                  <span>Add</span>
                </button>
              </div>
            </div>

            {/* Images Section - Responsive */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-heading font-semibold text-[#f3f4f6] mb-3 sm:mb-4 flex items-center gap-2">
                <FiImage size={16} className="text-[#0088db] shrink-0" />
                <span>
                  Robot Images <span className="text-red-500">*</span>
                </span>
              </h3>

              <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-[#0088db]/10 rounded-lg border border-[#0088db]/20">
                <p className="text-xs sm:text-sm text-[#0088db] flex items-center gap-2 font-medium">
                  <FiInfo size={14} />
                  <span>Image Requirements:</span>
                </p>
                <ul className="text-[10px] sm:text-xs text-[#a1a1aa] mt-1.5 sm:mt-2 space-y-0.5 sm:space-y-1">
                  <li>• Minimum: 30KB | Maximum: 20MB</li>
                  <li>• Supported: PNG, JPG, JPEG, WEBP</li>
                  <li>• Recommended: 1080x1080 or higher</li>
                </ul>
              </div>

              <div
                className="relative border-2 border-dashed border-[#27324a] rounded-xl p-6 sm:p-8 text-center cursor-pointer hover:border-[#0088db] hover:bg-[#1f2638] transition-all group"
                onClick={() => document.getElementById("robotImages").click()}
              >
                {uploadingImage ? (
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-[#0088db] mb-2"></div>
                    <p className="text-xs sm:text-sm text-[#a1a1aa]">
                      Uploading images...
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-[#1f2638] rounded-full flex items-center justify-center mb-2 sm:mb-3 group-hover:bg-[#0088db]/10 transition">
                      <FiImage
                        size={20}
                        className="text-[#71717a] group-hover:text-[#0088db]"
                      />
                    </div>
                    <p className="text-xs sm:text-sm text-[#a1a1aa] font-medium">
                      Click to upload images
                    </p>
                    <p className="text-[10px] sm:text-xs text-[#71717a] mt-1">
                      PNG, JPG, WEBP (Min 30KB, Max 20MB)
                    </p>
                  </div>
                )}

                <input
                  id="robotImages"
                  type="file"
                  multiple
                  accept="image/*"
                  hidden
                  onChange={handleImageUpload}
                />
              </div>

              {previews.length > 0 && (
                <div className="mt-4 sm:mt-5">
                  <h4 className="text-xs sm:text-sm font-medium text-[#a1a1aa] mb-2 sm:mb-3">
                    Image Gallery ({previews.length})
                  </h4>
                  <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4">
                    {previews.map((src, index) => (
                      <div key={index} className="relative group">
                        <div className="relative rounded-xl overflow-hidden border border-[#27324a] bg-[#0b1020] aspect-square">
                          <img
                            src={src}
                            alt={`Robot ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="bg-red-500 text-white rounded-full p-1.5 sm:p-2 hover:bg-red-600 transition transform hover:scale-110"
                            >
                              <FiTrash2 size={14} />
                            </button>
                          </div>
                        </div>
                        <p className="text-[10px] sm:text-xs text-[#71717a] text-center mt-1.5 truncate">
                          Image {index + 1}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Videos Section - Responsive */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-heading font-semibold text-[#f3f4f6] mb-3 sm:mb-4 flex items-center gap-2">
                <FiVideo size={16} className="text-[#0088db] shrink-0" />
                <span>Robot Videos (Optional)</span>
              </h3>

              <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-[#0088db]/10 rounded-lg border border-[#0088db]/20">
                <p className="text-xs sm:text-sm text-[#0088db] flex items-center gap-2 font-medium">
                  <FiInfo size={14} />
                  <span>Video Requirements:</span>
                </p>
                <ul className="text-[10px] sm:text-xs text-[#a1a1aa] mt-1.5 sm:mt-2 space-y-0.5 sm:space-y-1">
                  <li>• Maximum: 20MB per video</li>
                  <li>• Supported: MP4, MOV, AVI, WEBM</li>
                  <li>• Recommended: 1920x1080 or higher</li>
                </ul>
              </div>

              {/* Existing Videos */}
              {existingVideos.length > 0 && (
                <div className="mb-4 sm:mb-5">
                  <h4 className="text-xs sm:text-sm font-medium text-[#a1a1aa] mb-2 sm:mb-3">
                    Existing Videos ({existingVideos.length})
                  </h4>
                  <div className="space-y-3 sm:space-y-4">
                    {existingVideos.map((videoItem, index) => (
                      <div
                        key={`existing-${index}`}
                        className="relative rounded-xl overflow-hidden border border-[#27324a] bg-[#0b1020]"
                      >
                        <video
                          src={videoItem.url}
                          controls
                          className="w-full max-h-50 sm:max-h-75 object-contain"
                        />
                        <button
                          type="button"
                          onClick={() => removeExistingVideo(index)}
                          className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 bg-red-500 text-white rounded-full p-1.5 sm:p-2 hover:bg-red-600 transition transform hover:scale-110 shadow-lg"
                        >
                          <FiTrash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Videos */}
              {videos.length > 0 && (
                <div className="mb-4 sm:mb-5">
                  <h4 className="text-xs sm:text-sm font-medium text-[#a1a1aa] mb-2 sm:mb-3">
                    New Videos ({videos.length})
                  </h4>
                  <div className="space-y-3 sm:space-y-4">
                    {videos.map((videoItem) => (
                      <div
                        key={videoItem.id}
                        className="relative rounded-xl overflow-hidden border border-[#27324a] bg-[#0b1020]"
                      >
                        <video
                          src={videoItem.preview}
                          controls
                          className="w-full max-h-50 sm:max-h-75 object-contain"
                        />
                        <button
                          type="button"
                          onClick={() => removeNewVideo(videoItem.id)}
                          className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 bg-red-500 text-white rounded-full p-1.5 sm:p-2 hover:bg-red-600 transition transform hover:scale-110 shadow-lg"
                        >
                          <FiTrash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload Button */}
              <div
                className="relative border-2 border-dashed border-[#27324a] rounded-xl p-6 sm:p-8 text-center cursor-pointer hover:border-[#0088db] hover:bg-[#1f2638] transition-all group"
                onClick={() => document.getElementById("robotVideo").click()}
              >
                {uploadingVideo ? (
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-[#0088db] mb-2"></div>
                    <p className="text-xs sm:text-sm text-[#a1a1aa]">
                      Uploading videos...
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-[#1f2638] rounded-full flex items-center justify-center mb-2 sm:mb-3 group-hover:bg-[#0088db]/10 transition">
                      <FiVideo
                        size={20}
                        className="text-[#71717a] group-hover:text-[#0088db]"
                      />
                    </div>
                    <p className="text-xs sm:text-sm text-[#a1a1aa] font-medium">
                      Click to upload videos (Optional)
                    </p>
                    <p className="text-[10px] sm:text-xs text-[#71717a] mt-1">
                      MP4, MOV, AVI, WEBM (Max 20MB each)
                    </p>
                  </div>
                )}

                <input
                  id="robotVideo"
                  type="file"
                  multiple
                  accept="video/*"
                  hidden
                  onChange={handleVideoUpload}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons - Responsive */}
          <div className="border-t border-[#27324a] bg-[#0b1020] px-4 sm:px-6 md:px-8 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting || uploadingImage}
                className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-linear-to-r from-[#0088db] to-[#006db1] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <FiSave size={16} />
                    <span>{editData ? "Update Robot" : "Add Robot"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRobot;
