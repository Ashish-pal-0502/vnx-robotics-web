"use client";
import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import apiClient from "@/api/client";
import toast from "react-hot-toast";

function AddCareer({ onSuccess, editingCareer }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    applyLink: "",
  });

  // title editor
  const titleEditor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder: "Enter job title...",
      }),
    ],
    content: formData.title,
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({
        ...prev,
        title: editor.getHTML(),
      }));
    },
  });

  //description editor
  const descriptionEditor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder: "Write job description...",
      }),
    ],
    content: formData.description,
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({
        ...prev,
        description: editor.getHTML(),
      }));
    },
  });

  //load edit data
  useEffect(() => {
    if (editingCareer) {
      setFormData({
        title: editingCareer?.title || "",
        description: editingCareer?.description || "",
        applyLink: editingCareer?.applyLink || "",
      });

      if (titleEditor && editingCareer?.title) {
        titleEditor.commands.setContent(editingCareer.title);
      }

      if (descriptionEditor && editingCareer?.description) {
        descriptionEditor.commands.setContent(editingCareer.description);
      }
    }
  }, [editingCareer, titleEditor, descriptionEditor]);

  //validate
  const validateForm = () => {
    if (
      !formData.title ||
      formData.title === "<p></p>" ||
      formData.title === "<p><br></p>"
    ) {
      setError("Job title is required.");
      return false;
    }
    if (
      !formData.description ||
      formData.description === "<p></p>" ||
      formData.description === "<p><br></p>"
    ) {
      setError("Job description is required.");
      return false;
    }
    return true;
  };

  //submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!validateForm()) return;
    const payload = {
      title: formData.title,
      description: formData.description,
      applyLink: formData.applyLink,
    };
    try {
      setLoading(true);

      if (editingCareer?._id) {
        const res = await apiClient.put(
          `/career/update/${editingCareer._id}`,
          payload,
        );
        toast.success(res?.data?.message);
      } else {
        const res = await apiClient.post("/career/create", payload);
        toast.success(res?.data?.message);
        setFormData({
          title: "",
          description: "",
          applyLink: "",
        });
        titleEditor?.commands.clearContent();
        descriptionEditor?.commands.clearContent();
      }
      if (onSuccess) {
        onSuccess();
      }
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (err) {
      toast.error("Submit career failed. Please try again.");
      const serverMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message;
      setError(serverMessage || "Unable to save career. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  //tebular button
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

  //toolbar
  const Toolbar = ({ editor }) => {
    if (!editor) return null;

    return (
      <div className="flex gap-1 mb-2 p-1 border border-gray-200 rounded-lg bg-gray-50 flex-wrap">
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
        {editingCareer?._id ? "Update Career" : "Add Career"}
      </h2>

      <div className="space-y-6">
        {/* ERROR */}
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>
        )}

        {/* SUCCESS */}
        {message && (
          <div className="p-3 bg-green-100 text-green-700 rounded-lg">
            {message}
          </div>
        )}

        {/* TITLE */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Title <span className="text-red-500">*</span>
          </label>

          <Toolbar editor={titleEditor} />

          <div className="border border-gray-300 rounded-lg overflow-hidden overflow-y-hidden focus-within:ring-2 focus-within:ring-[#1f3b57] focus-within:border-transparent">
            <EditorContent
              editor={titleEditor}
              className="prose max-w-none p-4 min-h-[120px] overflow-y-hidden"
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Description <span className="text-red-500">*</span>
          </label>

          <Toolbar editor={descriptionEditor} />

          <div className="border border-gray-300 rounded-lg overflow-hidden overflow-y-hidden focus-within:ring-2 focus-within:ring-[#1f3b57] focus-within:border-transparent">
            <EditorContent
              editor={descriptionEditor}
              className="prose max-w-none p-4 min-h-[350px] overflow-y-hidden"
            />
          </div>
        </div>

        {/* APPLY LINK */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Apply Link
          </label>

          <input
            type="url"
            value={formData.applyLink}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                applyLink: e.target.value,
              }))
            }
            placeholder="https://example.com"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#1f3b57]"
          />
        </div>

        {/* SUBMIT */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#1f3b57] text-white px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2a4d72] transition font-medium"
        >
          {loading
            ? "Saving..."
            : editingCareer?._id
              ? "Update Career"
              : "Add Career"}
        </button>
      </div>

      {/* GLOBAL STYLES */}
      <style jsx global>{`
        .ProseMirror {
          outline: none;
          overflow-y: hidden;
        }

        .ProseMirror::-webkit-scrollbar {
          display: none;
        }

        .ProseMirror p {
          margin: 0 0 0.5em 0;
        }

        .ProseMirror h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.67em 0;
        }

        .ProseMirror h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.83em 0;
        }

        .ProseMirror h3 {
          font-size: 1.17em;
          font-weight: bold;
          margin: 1em 0;
        }

        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 1.5em;
          margin: 0.5em 0;
        }

        .ProseMirror code {
          background-color: #f3f4f6;
          padding: 0.2em 0.4em;
          border-radius: 3px;
          font-family: monospace;
        }

        .ProseMirror pre {
          background-color: #1f2937;
          color: #e5e7eb;
          padding: 1em;
          border-radius: 0.5em;
          overflow-x: auto;
        }

        .ProseMirror pre code {
          background-color: transparent;
          color: inherit;
          padding: 0;
        }

        .ProseMirror[contenteditable="true"] {
          min-height: 100px;
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
}

export default AddCareer;
