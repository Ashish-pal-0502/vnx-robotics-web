"use client";

import React, { useEffect, useState } from "react";
import apiClient from "@/api/client";
import toast from "react-hot-toast";

const AddRobot = ({ editData = null, onSuccess }) => {
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [robotForm, setRobotForm] = useState({
    name: "",
    category: "",
    description: "",
  });

  const [specifications, setSpecifications] = useState([]);
  const [keyPoints, setKeyPoints] = useState([]);
  const [applications, setApplications] = useState([]);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  // Temporary inputs for adding new items
  const [newSpec, setNewSpec] = useState({ label: "", value: "" });
  const [newKeyPoint, setNewKeyPoint] = useState("");
  const [newApplication, setNewApplication] = useState("");

  /* =========================
     LOAD EDIT DATA
  ========================= */
  useEffect(() => {
    if (!editData) return;

    setRobotForm({
      name: editData.name || "",
      category: editData.category || "",
      description: editData.description || "",
    });

    // Load specifications
    if (editData.specifications && editData.specifications.length > 0) {
      setSpecifications(editData.specifications);
    }

    // Load key points
    if (editData.keyPoints && editData.keyPoints.length > 0) {
      setKeyPoints(editData.keyPoints);
    }

    // Load applications
    if (editData.applications && editData.applications.length > 0) {
      setApplications(editData.applications);
    }

    // Load images
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
  }, [editData]);

  /* =========================
     GET PRESIGNED URL
  ========================= */
  const getPresignedUrl = async (file) => {
    try {
      const response = await apiClient.post("/robot/upload-url", {
        fileName: file.name,
        fileType: file.type,
        size: file.size,
      });

      const data = response?.data?.data || response?.data;

      if (!data) {
        throw new Error("No data received from server");
      }

      const uploadURL =
        data.uploadURL || data.uploadUrl || data.url || data.presignedUrl;
      const fileUrl =
        data.fileUrl || data.fileURL || data.publicUrl || data.location;
      const key = data.key;

      if (!uploadURL) {
        console.error("Invalid upload response:", data);
        throw new Error("Upload URL missing from server response");
      }

      return {
        uploadURL,
        fileUrl,
        key,
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
      throw new Error("Failed to upload image");
    }
  };

  /* =========================
     IMAGE SELECT
  ========================= */
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    const validFiles = files.filter((file) => {
      const isImage = file.type.startsWith("image/");
      const isValidSize = file.size <= 5 * 1024 * 1024;

      if (!isImage) {
        setError("Only image files are allowed");
        return false;
      }

      if (!isValidSize) {
        setError("Image size should be less than 5MB");
        return false;
      }

      return true;
    });

    if (validFiles.length === 0) return;

    setError("");

    const newImages = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      isExisting: false,
    }));

    setImages((prev) => [...prev, ...newImages]);
    setPreviews((prev) => [...prev, ...newImages.map((img) => img.preview)]);
  };

  /* =========================
     REMOVE IMAGE
  ========================= */
  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  /* =========================
     SPECIFICATIONS HANDLERS
  ========================= */
  const addSpecification = () => {
    if (!newSpec.label.trim() || !newSpec.value.trim()) {
      setError("Both label and value are required for specification");
      return;
    }
    setSpecifications([
      ...specifications,
      { label: newSpec.label, value: newSpec.value },
    ]);
    setNewSpec({ label: "", value: "" });
    setError("");
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
      setError("Key point cannot be empty");
      return;
    }
    setKeyPoints([...keyPoints, newKeyPoint]);
    setNewKeyPoint("");
    setError("");
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
      setError("Application cannot be empty");
      return;
    }
    setApplications([...applications, newApplication]);
    setNewApplication("");
    setError("");
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
     VALIDATE FORM
  ========================= */
  const validateForm = () => {
    if (!robotForm.name || robotForm.name.trim() === "") {
      setError("Robot name is required");
      return false;
    }

    if (!robotForm.category || robotForm.category.trim() === "") {
      setError("Category is required");
      return false;
    }

    if (!robotForm.description || robotForm.description.trim() === "") {
      setError("Robot description is required");
      return false;
    }

    if (images.length === 0) {
      setError("At least one image is required");
      return false;
    }

    return true;
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async () => {
    setError("");
    setMessage("");

    if (!validateForm()) return;

    try {
      setSubmitting(true);
      setUploadingImage(true);

      let uploadedImages = [];

      for (const img of images) {
        if (img.isExisting) {
          uploadedImages.push({
            url: img.url,
            key: img.key,
          });
          continue;
        }

        const { uploadURL, fileUrl, key } = await getPresignedUrl(img.file);
        await uploadToS3(img.file, uploadURL);

        uploadedImages.push({
          url: fileUrl || uploadURL.split("?")[0],
          key,
        });
      }

      const payload = {
        name: robotForm.name,
        category: robotForm.category,
        description: robotForm.description,
        specifications: specifications,
        keyPoints: keyPoints,
        applications: applications,
        images: uploadedImages,
      };

      console.log("ROBOT PAYLOAD:", payload);

      if (editData?._id) {
        const res = await apiClient.put(
          `/robot/update/${editData._id}`,
          payload,
        );
        toast.success(res?.data?.message || "Robot updated successfully");
      } else {
        const res = await apiClient.post("/robot/create", payload);
        toast.success(res?.data?.message || "Robot created successfully");

        // Reset form
        setRobotForm({
          name: "",
          category: "",
          description: "",
        });
        setSpecifications([]);
        setKeyPoints([]);
        setApplications([]);
        setImages([]);
        setPreviews([]);
      }

      if (onSuccess) {
        onSuccess();
      }

      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("ROBOT SUBMIT ERROR:", err);
      const serverMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message;
      setError(serverMessage || "Something went wrong");
      setTimeout(() => setError(""), 3000);
    } finally {
      setSubmitting(false);
      setUploadingImage(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">
        {editData ? "Update Robot" : "Add Robot"}
      </h2>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>
        )}

        {message && (
          <div className="p-3 bg-green-100 text-green-700 rounded-lg">
            {message}
          </div>
        )}

        {/* NAME */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Robot Name *
          </label>
          <input
            type="text"
            value={robotForm.name}
            onChange={(e) =>
              setRobotForm({ ...robotForm, name: e.target.value })
            }
            placeholder="Enter robot name"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1f3b57] focus:border-transparent outline-none"
          />
        </div>

        {/* CATEGORY */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <input
            type="text"
            value={robotForm.category}
            onChange={(e) =>
              setRobotForm({ ...robotForm, category: e.target.value })
            }
            placeholder="e.g., Industrial, Medical, Service, Educational"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1f3b57] focus:border-transparent outline-none"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Robot Description *
          </label>
          <textarea
            value={robotForm.description}
            onChange={(e) =>
              setRobotForm({ ...robotForm, description: e.target.value })
            }
            placeholder="Write robot description..."
            rows={8}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1f3b57] focus:border-transparent outline-none resize-y"
          />
        </div>

        {/* SPECIFICATIONS */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Technical Specifications
          </label>

          {/* Specifications List */}
          {specifications.length > 0 && (
            <div className="space-y-2 mb-3">
              {specifications.map((spec, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <input
                    type="text"
                    value={spec.label}
                    onChange={(e) =>
                      updateSpecification(index, "label", e.target.value)
                    }
                    placeholder="Label (e.g., Weight)"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f3b57] focus:border-transparent outline-none"
                  />
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) =>
                      updateSpecification(index, "value", e.target.value)
                    }
                    placeholder="Value (e.g., 50kg)"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f3b57] focus:border-transparent outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => removeSpecification(index)}
                    className="text-red-500 hover:text-red-700 px-3 py-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add New Specification */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newSpec.label}
              onChange={(e) =>
                setNewSpec({ ...newSpec, label: e.target.value })
              }
              placeholder="Label (e.g., Weight, Dimensions)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f3b57] focus:border-transparent outline-none"
            />
            <input
              type="text"
              value={newSpec.value}
              onChange={(e) =>
                setNewSpec({ ...newSpec, value: e.target.value })
              }
              placeholder="Value (e.g., 50kg, 30x20x15cm)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f3b57] focus:border-transparent outline-none"
            />
            <button
              type="button"
              onClick={addSpecification}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Add
            </button>
          </div>
        </div>

        {/* KEY POINTS */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Key Features / Points
          </label>

          {/* Key Points List */}
          {keyPoints.length > 0 && (
            <div className="space-y-2 mb-3">
              {keyPoints.map((point, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={point}
                    onChange={(e) => updateKeyPoint(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f3b57] focus:border-transparent outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => removeKeyPoint(index)}
                    className="text-red-500 hover:text-red-700 px-3 py-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add New Key Point */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newKeyPoint}
              onChange={(e) => setNewKeyPoint(e.target.value)}
              placeholder="Enter key feature (e.g., Autonomous Navigation)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f3b57] focus:border-transparent outline-none"
              onKeyPress={(e) => e.key === "Enter" && addKeyPoint()}
            />
            <button
              type="button"
              onClick={addKeyPoint}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Add
            </button>
          </div>
        </div>

        {/* APPLICATIONS */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Applications / Use Cases
          </label>

          {/* Applications List */}
          {applications.length > 0 && (
            <div className="space-y-2 mb-3">
              {applications.map((app, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={app}
                    onChange={(e) => updateApplication(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f3b57] focus:border-transparent outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => removeApplication(index)}
                    className="text-red-500 hover:text-red-700 px-3 py-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add New Application */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newApplication}
              onChange={(e) => setNewApplication(e.target.value)}
              placeholder="Enter application (e.g., Warehouse Automation)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f3b57] focus:border-transparent outline-none"
              onKeyPress={(e) => e.key === "Enter" && addApplication()}
            />
            <button
              type="button"
              onClick={addApplication}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Add
            </button>
          </div>
        </div>

        {/* IMAGES */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Robot Images *
          </label>

          <div
            className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#1f3b57] transition bg-gray-50"
            onClick={() => document.getElementById("robotImages").click()}
          >
            {uploadingImage ? (
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-[#1f3b57] mb-2"></div>
                <p className="text-gray-500">Uploading images...</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-3xl mb-2">🤖</div>
                <p className="text-gray-500">Click to upload robot images</p>
                <p className="text-xs text-gray-400 mt-1">
                  PNG, JPG, WEBP up to 5MB
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

          {/* PREVIEW */}
          {previews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {previews.map((src, index) => (
                <div key={index} className="relative group">
                  <img
                    src={src}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SUBMIT */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting || uploadingImage}
          className="w-full bg-[#1f3b57] text-white px-6 py-3 rounded-xl disabled:opacity-50 hover:bg-[#2a4d72] transition font-medium"
        >
          {submitting ? "Saving..." : editData ? "Update Robot" : "Add Robot"}
        </button>
      </form>
    </div>
  );
};

export default AddRobot;
