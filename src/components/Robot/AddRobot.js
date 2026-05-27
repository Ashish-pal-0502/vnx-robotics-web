"use client";

import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import apiClient from "@/api/client";
import toast from "react-hot-toast";

const AddRobot = ({ editData = null, onSuccess }) => {
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [robotForm, setRobotForm] = useState({
    name: "",
    status: "",
    description: "",
  });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  /* =========================
     NAME EDITOR
  ========================= */
  const nameEditor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),

      Placeholder.configure({
        placeholder: "Enter robot name...",
      }),
    ],

    content: "",

    onUpdate: ({ editor }) => {
      setRobotForm((prev) => ({
        ...prev,
        name: editor.getHTML(),
      }));
    },
  });

  /* =========================
     DESCRIPTION EDITOR
  ========================= */
  const descriptionEditor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),

      Image.configure({
        inline: true,
        allowBase64: false,
      }),

      Placeholder.configure({
        placeholder: "Write robot description...",
      }),
    ],

    content: "",

    onUpdate: ({ editor }) => {
      setRobotForm((prev) => ({
        ...prev,
        description: editor.getHTML(),
      }));
    },
  });

  /* =========================
     LOAD EDIT DATA
  ========================= */
  useEffect(() => {
    if (!editData) return;

    setRobotForm({
      name: editData.name || "",
      status: editData.status || "",
      description: editData.description || "",
    });

    if (nameEditor && editData.name) {
      nameEditor.commands.setContent(editData.name);
    }

    if (descriptionEditor && editData.description) {
      descriptionEditor.commands.setContent(editData.description);
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
  }, [editData, nameEditor, descriptionEditor]);

  /* =========================
     GET PRESIGNED URL
  ========================= */
  const getPresignedUrl = async (file) => {
    try {
      const response = await apiClient.post("/robot/upload-url", {
        fileName: file.name,
        fileType: file.type,
      });

      console.log("UPLOAD URL RESPONSE:", response.data);

      // handle every backend response shape
      const data =
        response?.data?.data?.data || response?.data?.data || response?.data;

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
     VALIDATE FORM
  ========================= */
  const validateForm = () => {
    if (
      !robotForm.name ||
      robotForm.name === "<p></p>" ||
      robotForm.name === "<p><br></p>"
    ) {
      setError("Robot name is required");

      return false;
    }

    if (
      !robotForm.description ||
      robotForm.description === "<p></p>" ||
      robotForm.description === "<p><br></p>"
    ) {
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
        // existing image
        if (img.isExisting) {
          uploadedImages.push({
            url: img.url,
            key: img.key,
          });

          continue;
        }

        // new image
        const { uploadURL, fileUrl, key } = await getPresignedUrl(img.file);

        await uploadToS3(img.file, uploadURL);

        uploadedImages.push({
          url: fileUrl || uploadURL.split("?")[0],
          key,
        });
      }

      const payload = {
        name: robotForm.name,
        status: robotForm.status,
        description: robotForm.description,
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
        // reset
        setRobotForm({
          name: "",
          status: "",
          description: "",
        });

        setImages([]);
        setPreviews([]);

        nameEditor?.commands.clearContent();
        descriptionEditor?.commands.clearContent();
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

  /* =========================
     TOOLBAR BUTTON
  ========================= */
  const ToolbarButton = ({ onClick, active, children, title }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`px-3 py-1.5 rounded transition text-sm font-medium ${
        active ? "bg-[#1f3b57] text-white" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );

  /* =========================
     TOOLBAR
  ========================= */
  const Toolbar = ({ editor }) => {
    if (!editor) return null;

    return (
      <div className="flex gap-1 flex-wrap mb-2 p-2 border border-gray-200 rounded-lg bg-gray-50">
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          active={editor.isActive("heading", {
            level: 1,
          })}
          title="Heading 1"
        >
          H1
        </ToolbarButton>

        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          active={editor.isActive("heading", {
            level: 2,
          })}
          title="Heading 2"
        >
          H2
        </ToolbarButton>

        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          active={editor.isActive("heading", {
            level: 3,
          })}
          title="Heading 3"
        >
          H3
        </ToolbarButton>

        <div className="w-px bg-gray-300 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Bold"
        >
          Bold
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Italic"
        >
          Italic
        </ToolbarButton>

        <div className="w-px bg-gray-300 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="Bullet List"
        >
          • List
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="Ordered List"
        >
          1. List
        </ToolbarButton>

        <div className="w-px bg-gray-300 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive("codeBlock")}
          title="Code Block"
        >
          {"</>"}
        </ToolbarButton>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">
        {editData ? "Update Robot" : "Add Robot"}
      </h2>

      <div className="space-y-6">
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

          <Toolbar editor={nameEditor} />

          <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#1f3b57] focus-within:border-transparent">
            <EditorContent
              editor={nameEditor}
              className="prose max-w-none p-4 min-h-[120px]"
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Robot Description *
          </label>

          <Toolbar editor={descriptionEditor} />

          <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#1f3b57] focus-within:border-transparent">
            <EditorContent
              editor={descriptionEditor}
              className="prose max-w-none p-4 min-h-[350px]"
            />
          </div>
        </div>

        {/* IMAGE */}
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
          onClick={handleSubmit}
          disabled={submitting || uploadingImage}
          className="w-full bg-[#1f3b57] text-white px-6 py-3 rounded-xl disabled:opacity-50 hover:bg-[#2a4d72] transition"
        >
          {submitting ? "Saving..." : editData ? "Update Robot" : "Add Robot"}
        </button>
      </div>

      {/* GLOBAL TIPTAP STYLES */}
      <style jsx global>{`
        .ProseMirror {
          outline: none;
          min-height: 100px;
        }

        .ProseMirror p {
          margin: 0 0 0.75rem 0;
        }

        .ProseMirror h1 {
          font-size: 2rem;
          font-weight: 700;
          margin: 1rem 0;
          line-height: 1.2;
        }

        .ProseMirror h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0.8rem 0;
          line-height: 1.3;
        }

        .ProseMirror h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0.6rem 0;
          line-height: 1.4;
        }

        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 1.5rem;
          margin: 0.75rem 0;
        }

        .ProseMirror li {
          margin-bottom: 0.25rem;
        }

        .ProseMirror code {
          background: #f3f4f6;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-size: 0.9rem;
        }

        .ProseMirror pre {
          background: #111827;
          color: #f9fafb;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1rem 0;
        }

        .ProseMirror pre code {
          background: transparent;
          padding: 0;
          color: inherit;
        }

        .ProseMirror img {
          max-width: 100%;
          border-radius: 10px;
          margin: 1rem 0;
        }

        .ProseMirror blockquote {
          border-left: 4px solid #d1d5db;
          padding-left: 1rem;
          color: #6b7280;
          margin: 1rem 0;
        }

        .ProseMirror:focus {
          outline: none;
        }

        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #9ca3af;
          pointer-events: none;
          height: 0;
        }
      `}</style>
    </div>
  );
};

export default AddRobot;
