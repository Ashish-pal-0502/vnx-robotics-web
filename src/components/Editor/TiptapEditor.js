"use client";

import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

function TiptapEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || "",
    immediatelyRender: false,

    editorProps: {
      attributes: {
        class:
          "min-h-[220px] border rounded-xl px-4 py-3 focus:outline-none prose max-w-none",
      },
    },

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="border rounded-xl overflow-hidden">
      {/* Toolbar */}
      <div className="border-b p-3 flex flex-wrap gap-2 bg-gray-50">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded-lg border text-sm ${
            editor.isActive("bold") ? "bg-black text-white" : "bg-white"
          }`}
        >
          Bold
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded-lg border text-sm ${
            editor.isActive("italic") ? "bg-black text-white" : "bg-white"
          }`}
        >
          Italic
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 rounded-lg border text-sm ${
            editor.isActive("bulletList") ? "bg-black text-white" : "bg-white"
          }`}
        >
          Bullet List
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1 rounded-lg border text-sm ${
            editor.isActive("orderedList") ? "bg-black text-white" : "bg-white"
          }`}
        >
          Ordered List
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`px-3 py-1 rounded-lg border text-sm ${
            editor.isActive("heading", { level: 2 })
              ? "bg-black text-white"
              : "bg-white"
          }`}
        >
          H2
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className="p-4" />
    </div>
  );
}

export default TiptapEditor;
