"use client";
import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import apiClient from "@/api/client";
import toast from "react-hot-toast";
import {
  FiBold,
  FiItalic,
  FiUnderline,
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiList,
  FiCode,
  FiLink,
  FiImage,
  FiType,
  FiSave,
  FiEdit2,
  FiX,
  FiPlus,
  FiTrash2,
  FiMinimize2,
  FiMaximize2,
} from "react-icons/fi";

const BlogForm = ({ editData = null, onSuccess }) => {
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [activeEditor, setActiveEditor] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);

  const [blogForm, setBlogForm] = useState({
    heading: "",
    content: "",
    mtitle: "",
    mdesc: "",
  });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  /* =========================
     HEADING EDITOR
  ========================= */
  const headingEditor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-[#0088db] underline hover:text-[#006db1]",
        },
      }),
      Placeholder.configure({
        placeholder: "Enter an engaging blog heading...",
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setBlogForm((prev) => ({
        ...prev,
        heading: editor.getHTML(),
      }));
    },
  });

  /* =========================
     CONTENT EDITOR (Enhanced)
  ========================= */
  const contentEditor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image.configure({
        inline: false,
        allowBase64: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-[#0088db] underline hover:text-[#006db1]",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      Placeholder.configure({
        placeholder: "Write your amazing blog content here...",
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setBlogForm((prev) => ({
        ...prev,
        content: editor.getHTML(),
      }));
    },
  });

  /* =========================
     LOAD EDIT DATA
  ========================= */
  useEffect(() => {
    if (!editData) return;

    setBlogForm({
      heading: editData.heading || "",
      content: editData.content || "",
      mtitle: editData.mtitle || "",
      mdesc: editData.mdesc || "",
    });

    if (headingEditor && editData.heading) {
      headingEditor.commands.setContent(editData.heading);
    }

    if (contentEditor && editData.content) {
      contentEditor.commands.setContent(editData.content);
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
  }, [editData, headingEditor, contentEditor]);

  /* =========================
     GET PRESIGNED URL
  ========================= */
  const getPresignedUrl = async (file) => {
    try {
      const response = await apiClient.post("/blog/upload-url", {
        fileName: file.name,
        fileType: file.type,
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
        throw new Error("Upload URL missing from server response");
      }

      return { uploadURL, fileUrl, key };
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
     ADD LINK
  ========================= */
  const addLink = () => {
    if (!linkUrl) return;

    if (activeEditor === "content") {
      contentEditor?.chain().focus().setLink({ href: linkUrl }).run();
    } else if (activeEditor === "heading") {
      headingEditor?.chain().focus().setLink({ href: linkUrl }).run();
    }

    setShowLinkModal(false);
    setLinkUrl("");
  };

  /* =========================
     IMAGE SELECT
  ========================= */
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    const validFiles = files.filter((file) => {
      const isValidType = file.type.startsWith("image/");
      const isValidSize = file.size <= 5 * 1024 * 1024;

      if (!isValidType) {
        toast.error("Only image files are allowed");
        return false;
      }

      if (!isValidSize) {
        toast.error("Image size should be less than 5MB");
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
      !blogForm.heading ||
      blogForm.heading === "<p></p>" ||
      blogForm.heading === "<p><br></p>"
    ) {
      setError("Blog heading is required");
      return false;
    }

    if (
      !blogForm.content ||
      blogForm.content === "<p></p>" ||
      blogForm.content === "<p><br></p>"
    ) {
      setError("Blog content is required");
      return false;
    }

    if (images.length === 0) {
      setError("At least one image is required");
      return false;
    }

    return true;
  };

  /* =========================
     SUBMIT BLOG
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
          uploadedImages.push({ url: img.url, key: img.key });
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
        heading: blogForm.heading,
        content: blogForm.content,
        mtitle: blogForm.mtitle,
        mdesc: blogForm.mdesc,
        images: uploadedImages,
      };

      if (editData?._id) {
        await apiClient.put(`/blog/update/${editData._id}`, payload);
        toast.success("Blog updated successfully");
        setMessage("Blog updated successfully");
      } else {
        await apiClient.post("/blog/create", payload);
        toast.success("Blog created successfully");

        setBlogForm({ heading: "", content: "", mtitle: "", mdesc: "" });
        setImages([]);
        setPreviews([]);
        headingEditor?.commands.clearContent();
        contentEditor?.commands.clearContent();
      }

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("BLOG SUBMIT ERROR:", err);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Something went wrong";
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
      setUploadingImage(false);
    }
  };

  /* =========================
     TOOLBAR BUTTON (Dark Theme)
  ========================= */
  const ToolbarButton = ({ onClick, active, children, icon: Icon, title }) => (
    <button
      onClick={onClick}
      type="button"
      title={title}
      className={`p-2 rounded-lg transition-all text-sm font-medium ${
        active
          ? "bg-linear-to-r from-[#0088db] to-[#006db1] text-white shadow-md"
          : "text-[#a1a1aa] hover:bg-[#1f2638] hover:text-[#f3f4f6]"
      }`}
    >
      {Icon ? <Icon size={18} /> : children}
    </button>
  );

  /* =========================
     HEADING TOOLBAR
  ========================= */
  const HeadingToolbar = () => {
    if (!headingEditor) return null;

    return (
      <div className="flex flex-wrap gap-1 mb-3 p-2 border border-[#27324a] rounded-xl bg-[#0b1020]">
        <div className="flex items-center gap-1 border-r border-[#27324a] pr-2 mr-1">
          <ToolbarButton
            onClick={() =>
              headingEditor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            active={headingEditor.isActive("heading", { level: 1 })}
            children="H1"
            title="Heading 1"
          />
          <ToolbarButton
            onClick={() =>
              headingEditor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            active={headingEditor.isActive("heading", { level: 2 })}
            children="H2"
            title="Heading 2"
          />
          <ToolbarButton
            onClick={() =>
              headingEditor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            active={headingEditor.isActive("heading", { level: 3 })}
            children="H3"
            title="Heading 3"
          />
        </div>

        <div className="flex items-center gap-1">
          <ToolbarButton
            onClick={() => headingEditor.chain().focus().toggleBold().run()}
            active={headingEditor.isActive("bold")}
            icon={FiBold}
            title="Bold"
          />
          <ToolbarButton
            onClick={() => headingEditor.chain().focus().toggleItalic().run()}
            active={headingEditor.isActive("italic")}
            icon={FiItalic}
            title="Italic"
          />
          <ToolbarButton
            onClick={() => {
              setActiveEditor("heading");
              setShowLinkModal(true);
            }}
            active={headingEditor.isActive("link")}
            icon={FiLink}
            title="Add Link"
          />
        </div>
      </div>
    );
  };

  /* =========================
     ENHANCED CONTENT TOOLBAR (Dark Theme)
  ========================= */
  const ContentToolbar = () => {
    if (!contentEditor) return null;

    return (
      <div className="flex flex-wrap gap-1 mb-3 p-2 border border-[#27324a] rounded-xl bg-[#0b1020] sticky top-0 z-10">
        {/* Text Formatting */}
        <div className="flex items-center gap-1 border-r border-[#27324a] pr-2 mr-1">
          <ToolbarButton
            onClick={() => contentEditor.chain().focus().toggleBold().run()}
            active={contentEditor.isActive("bold")}
            icon={FiBold}
            title="Bold"
          />
          <ToolbarButton
            onClick={() => contentEditor.chain().focus().toggleItalic().run()}
            active={contentEditor.isActive("italic")}
            icon={FiItalic}
            title="Italic"
          />
          <ToolbarButton
            onClick={() =>
              contentEditor.chain().focus().toggleUnderline().run()
            }
            active={contentEditor.isActive("underline")}
            icon={FiUnderline}
            title="Underline"
          />
        </div>

        {/* Headings */}
        <div className="flex items-center gap-1 border-r border-[#27324a] pr-2 mr-1">
          <ToolbarButton
            onClick={() =>
              contentEditor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            active={contentEditor.isActive("heading", { level: 1 })}
            children="H1"
            title="Heading 1"
          />
          <ToolbarButton
            onClick={() =>
              contentEditor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            active={contentEditor.isActive("heading", { level: 2 })}
            children="H2"
            title="Heading 2"
          />
          <ToolbarButton
            onClick={() =>
              contentEditor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            active={contentEditor.isActive("heading", { level: 3 })}
            children="H3"
            title="Heading 3"
          />
        </div>

        {/* Alignment */}
        <div className="flex items-center gap-1 border-r border-[#27324a] pr-2 mr-1">
          <ToolbarButton
            onClick={() =>
              contentEditor.chain().focus().setTextAlign("left").run()
            }
            active={contentEditor.isActive({ textAlign: "left" })}
            icon={FiAlignLeft}
            title="Align Left"
          />
          <ToolbarButton
            onClick={() =>
              contentEditor.chain().focus().setTextAlign("center").run()
            }
            active={contentEditor.isActive({ textAlign: "center" })}
            icon={FiAlignCenter}
            title="Align Center"
          />
          <ToolbarButton
            onClick={() =>
              contentEditor.chain().focus().setTextAlign("right").run()
            }
            active={contentEditor.isActive({ textAlign: "right" })}
            icon={FiAlignRight}
            title="Align Right"
          />
        </div>

        {/* Lists */}
        <div className="flex items-center gap-1 border-r border-[#27324a] pr-2 mr-1">
          <ToolbarButton
            onClick={() =>
              contentEditor.chain().focus().toggleBulletList().run()
            }
            active={contentEditor.isActive("bulletList")}
            icon={FiList}
            title="Bullet List"
          />
          <ToolbarButton
            onClick={() =>
              contentEditor.chain().focus().toggleOrderedList().run()
            }
            active={contentEditor.isActive("orderedList")}
            children="1."
            title="Numbered List"
          />
        </div>

        {/* Advanced */}
        <div className="flex items-center gap-1">
          <ToolbarButton
            onClick={() =>
              contentEditor.chain().focus().toggleCodeBlock().run()
            }
            active={contentEditor.isActive("codeBlock")}
            icon={FiCode}
            title="Code Block"
          />
          <ToolbarButton
            onClick={() =>
              contentEditor.chain().focus().toggleBlockquote().run()
            }
            active={contentEditor.isActive("blockquote")}
            children="Quote"
            title="Blockquote"
          />
          <ToolbarButton
            onClick={() => {
              setActiveEditor("content");
              setShowLinkModal(true);
            }}
            active={contentEditor.isActive("link")}
            icon={FiLink}
            title="Add Link"
          />
        </div>
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen bg-linear-to-br from-[#0b1020] to-[#050816] p-4 md:p-6 lg:p-8 ${fullscreen ? "fixed inset-0 z-50 overflow-auto" : ""}`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-linear-to-br from-[#0088db] to-[#006db1] rounded-xl shadow-lg">
                <FiEdit2 className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-[#f3f4f6]">
                  {editData ? "Update Blog Post" : "Create New Blog"}
                </h1>
                <p className="text-sm text-[#a1a1aa] mt-1">
                  {editData
                    ? "Edit your existing blog post"
                    : "Write an engaging blog post with rich formatting"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setFullscreen(!fullscreen)}
              className="p-2 text-[#a1a1aa] hover:text-[#0088db] hover:bg-[#1f2638] rounded-lg transition"
              title={fullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {fullscreen ? (
                <FiMinimize2 size={20} />
              ) : (
                <FiMaximize2 size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-[#111827] rounded-2xl shadow-xl border border-[#27324a] overflow-hidden">
          <div className="p-6 md:p-8">
            {/* Alerts */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border-l-4 border-red-500 rounded-lg flex items-start gap-3">
                <FiX className="text-red-500 mt-0.5" size={20} />
                <div>
                  <p className="font-medium text-red-400">Error</p>
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              </div>
            )}

            {message && (
              <div className="mb-6 p-4 bg-green-500/10 border-l-4 border-green-500 rounded-lg flex items-start gap-3">
                <FiSave className="text-green-500 mt-0.5" size={20} />
                <div>
                  <p className="font-medium text-green-400">Success</p>
                  <p className="text-sm text-green-300">{message}</p>
                </div>
              </div>
            )}

            <div className="space-y-8">
              {/* Heading Section */}
              <div>
                <label className="block text-sm font-semibold text-[#f3f4f6] mb-2">
                  Blog Heading <span className="text-red-500">*</span>
                </label>
                <HeadingToolbar />
                <div className="border border-[#27324a] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#0088db]/20 focus-within:border-[#0088db] transition bg-[#0b1020]">
                  <EditorContent
                    editor={headingEditor}
                    className="prose max-w-none p-4 min-h-[120px] text-[#f3f4f6]"
                  />
                </div>
                <p className="text-xs text-[#71717a] mt-2">
                  Tip: Use a compelling heading that grabs attention
                </p>
              </div>

              {/* Content Section */}
              <div>
                <label className="block text-sm font-semibold text-[#f3f4f6] mb-2">
                  Blog Content <span className="text-red-500">*</span>
                </label>
                <ContentToolbar />
                <div className="border border-[#27324a] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#0088db]/20 focus-within:border-[#0088db] transition bg-[#0b1020]">
                  <EditorContent
                    editor={contentEditor}
                    className="prose max-w-none p-4 min-h-[500px] text-[#f3f4f6]"
                  />
                </div>
                <p className="text-xs text-[#71717a] mt-2">
                  Tip: Use the toolbar above to format your content. Add
                  headings, lists, links, and more!
                </p>
              </div>

              {/* SEO Section */}
              <div className="bg-linear-to-r from-[#0b1020] to-[#050816] rounded-xl p-5 border border-[#27324a]">
                <h3 className="text-md font-heading font-semibold text-[#f3f4f6] mb-4 flex items-center gap-2">
                  <FiType size={18} className="text-[#0088db]" />
                  SEO & Meta Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#a1a1aa] mb-2">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter meta title for SEO"
                      value={blogForm.mtitle}
                      onChange={(e) =>
                        setBlogForm((prev) => ({
                          ...prev,
                          mtitle: e.target.value,
                        }))
                      }
                      className="w-full border border-[#27324a] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0088db]/20 focus:border-[#0088db] transition bg-[#0b1020] text-[#f3f4f6] placeholder:text-[#71717a]"
                    />
                    <p className="text-xs text-[#71717a] mt-1">
                      Recommended: 50-60 characters
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#a1a1aa] mb-2">
                      Meta Description
                    </label>
                    <input
                      type="text"
                      placeholder="Enter meta description for SEO"
                      value={blogForm.mdesc}
                      onChange={(e) =>
                        setBlogForm((prev) => ({
                          ...prev,
                          mdesc: e.target.value,
                        }))
                      }
                      className="w-full border border-[#27324a] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0088db]/20 focus:border-[#0088db] transition bg-[#0b1020] text-[#f3f4f6] placeholder:text-[#71717a]"
                    />
                    <p className="text-xs text-[#71717a] mt-1">
                      Recommended: 150-160 characters
                    </p>
                  </div>
                </div>
              </div>

              {/* Images Section */}
              <div>
                <label className="block text-sm font-semibold text-[#f3f4f6] mb-2">
                  Blog Images <span className="text-red-500">*</span>
                </label>

                <div
                  className="relative border-2 border-dashed border-[#27324a] rounded-xl p-8 text-center cursor-pointer hover:border-[#0088db] hover:bg-[#1f2638] transition-all group"
                  onClick={() => document.getElementById("blogImages").click()}
                >
                  {uploadingImage ? (
                    <div className="text-center">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#0088db] mb-3"></div>
                      <p className="text-[#a1a1aa]">Uploading images...</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto bg-[#1f2638] rounded-full flex items-center justify-center mb-3 group-hover:bg-[#0088db]/10 transition">
                        <FiImage
                          size={28}
                          className="text-[#71717a] group-hover:text-[#0088db]"
                        />
                      </div>
                      <p className="text-[#a1a1aa] font-medium">
                        Click to upload images
                      </p>
                      <p className="text-xs text-[#71717a] mt-2">
                        PNG, JPG, WEBP up to 5MB each
                      </p>
                    </div>
                  )}

                  <input
                    id="blogImages"
                    type="file"
                    multiple
                    accept="image/*"
                    hidden
                    onChange={handleImageUpload}
                  />
                </div>

                {/* Image Gallery */}
                {previews.length > 0 && (
                  <div className="mt-5">
                    <h4 className="text-sm font-medium text-[#a1a1aa] mb-3">
                      Image Gallery ({previews.length})
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {previews.map((src, index) => (
                        <div key={index} className="relative group">
                          <div className="relative rounded-xl overflow-hidden border border-[#27324a] bg-[#0b1020] aspect-square">
                            <img
                              src={src}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition transform hover:scale-110"
                              >
                                <FiTrash2 size={16} />
                              </button>
                            </div>
                          </div>
                          <p className="text-xs text-[#71717a] text-center mt-2 truncate">
                            Image {index + 1}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="border-t border-[#27324a] bg-[#0b1020] px-6 md:px-8 py-6">
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={handleSubmit}
                disabled={submitting || uploadingImage}
                className="px-8 py-3 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#050816]"></div>
                    Publishing...
                  </>
                ) : (
                  <>
                    <FiSave size={18} />
                    {editData ? "Update Blog" : "Publish Blog"}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Link Modal - Dark Theme */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] rounded-2xl p-6 max-w-md w-full shadow-2xl border border-[#27324a]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-heading font-semibold text-[#f3f4f6]">
                Add Link
              </h3>
              <button
                onClick={() => setShowLinkModal(false)}
                className="text-[#71717a] hover:text-[#a1a1aa]"
              >
                <FiX size={24} />
              </button>
            </div>
            <input
              type="url"
              placeholder="Enter URL (e.g., https://example.com)"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="w-full border border-[#27324a] rounded-xl px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-[#0088db]/20 bg-[#0b1020] text-[#f3f4f6] placeholder:text-[#71717a]"
              autoFocus
            />
            <div className="flex gap-3">
              <button onClick={addLink} className="flex-1 btn-primary py-3">
                Add Link
              </button>
              <button
                onClick={() => setShowLinkModal(false)}
                className="flex-1 border border-[#27324a] text-[#a1a1aa] py-3 rounded-xl hover:bg-[#1f2638] transition font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Styles - Dark Theme */}
      <style jsx global>{`
        .ProseMirror {
          outline: none;
          min-height: 100px;
        }

        .ProseMirror p {
          margin: 0 0 0.75rem 0;
          line-height: 1.6;
          color: #f3f4f6;
        }

        .ProseMirror h1 {
          font-size: 2rem;
          font-weight: 700;
          margin: 1rem 0;
          line-height: 1.2;
          background: linear-gradient(135deg, #0088db 0%, #ffba22 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .ProseMirror h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0.8rem 0;
          line-height: 1.3;
          color: #0088db;
        }

        .ProseMirror h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0.6rem 0;
          line-height: 1.4;
          color: #ffba22;
        }

        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 1.5rem;
          margin: 0.75rem 0;
          color: #f3f4f6;
        }

        .ProseMirror li {
          margin-bottom: 0.25rem;
          color: #a1a1aa;
        }

        .ProseMirror code {
          background: #1f2638;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-size: 0.9rem;
          font-family: monospace;
          color: #ffba22;
        }

        .ProseMirror pre {
          background: #050816;
          color: #f9fafb;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1rem 0;
          border: 1px solid #27324a;
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
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
        }

        .ProseMirror blockquote {
          border-left: 4px solid #ffba22;
          padding-left: 1rem;
          color: #a1a1aa;
          margin: 1rem 0;
          font-style: italic;
        }

        .ProseMirror a {
          color: #0088db;
          text-decoration: underline;
        }

        .ProseMirror a:hover {
          color: #ffba22;
        }

        .ProseMirror:focus {
          outline: none;
        }

        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #71717a;
          pointer-events: none;
          height: 0;
        }
      `}</style>
    </div>
  );
};

export default BlogForm;
