// // "use client";

// // import React, { useEffect, useState } from "react";
// // import apiClient from "@/api/client";

// // const BlogForm = ({ editData = null, onSuccess }) => {
// //   const [submitting, setSubmitting] = useState(false);

// //   const [message, setMessage] = useState("");
// //   const [error, setError] = useState("");

// //   const [blogForm, setBlogForm] = useState({
// //     heading: "",
// //     content: "",
// //     mtitle: "",
// //     mdesc: "",
// //     imageUrl: "",
// //   });

// //   useEffect(() => {
// //     if (editData) {
// //       setBlogForm({
// //         heading: editData.heading || "",
// //         content: editData.content || "",
// //         mtitle: editData.mtitle || "",
// //         mdesc: editData.mdesc || "",
// //         imageUrl: editData.image?.[0]?.url || "",
// //       });
// //     }
// //   }, [editData]);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;

// //     setBlogForm((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   const resetForm = () => {
// //     setBlogForm({
// //       heading: "",
// //       content: "",
// //       mtitle: "",
// //       mdesc: "",
// //       imageUrl: "",
// //     });
// //   };

// //   const handleSubmit = async () => {
// //     setError("");
// //     setMessage("");

// //     if (!blogForm.heading || !blogForm.content) {
// //       setError("Heading and content are required.");
// //       return;
// //     }

// //     const payload = {
// //       heading: blogForm.heading,
// //       content: blogForm.content,
// //       mtitle: blogForm.mtitle,
// //       mdesc: blogForm.mdesc,
// //     };

// //     if (blogForm.imageUrl) {
// //       payload.images = [
// //         {
// //           url: blogForm.imageUrl,
// //           key: `blog-${Date.now()}`,
// //         },
// //       ];
// //     }

// //     try {
// //       setSubmitting(true);

// //       if (editData?._id) {
// //         await apiClient.put(
// //           `/blog/update/${editData._id}`,
// //           payload
// //         );

// //         setMessage("Blog updated successfully.");
// //       } else {
// //         await apiClient.post("/blog/create", payload);

// //         setMessage("Blog created successfully.");

// //         resetForm();
// //       }

// //       if (onSuccess) {
// //         onSuccess();
// //       }
// //     } catch (err) {
// //       console.error(err);

// //       const serverMessage =
// //         err?.response?.data?.message ||
// //         err?.response?.data?.error ||
// //         err?.message;

// //       setError(serverMessage || "Something went wrong.");
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   return (
// //     <div className="bg-white rounded-2xl p-6 shadow-sm">
// //       <h2 className="text-2xl font-semibold mb-6">
// //         {editData ? "Update Blog" : "Add Blog"}
// //       </h2>

// //       <div className="space-y-4">
// //         {error && (
// //           <p className="text-sm text-red-500">{error}</p>
// //         )}

// //         {message && (
// //           <p className="text-sm text-green-600">{message}</p>
// //         )}

// //         <input
// //           type="text"
// //           name="heading"
// //           value={blogForm.heading}
// //           onChange={handleChange}
// //           placeholder="Blog Title"
// //           className="w-full border rounded-xl px-4 py-3 outline-none"
// //         />

// //         <textarea
// //           rows="5"
// //           name="content"
// //           value={blogForm.content}
// //           onChange={handleChange}
// //           placeholder="Write blog content..."
// //           className="w-full border rounded-xl px-4 py-3 outline-none"
// //         />

// //         <input
// //           type="text"
// //           name="mtitle"
// //           value={blogForm.mtitle}
// //           onChange={handleChange}
// //           placeholder="Meta Title"
// //           className="w-full border rounded-xl px-4 py-3 outline-none"
// //         />

// //         <input
// //           type="text"
// //           name="mdesc"
// //           value={blogForm.mdesc}
// //           onChange={handleChange}
// //           placeholder="Meta Description"
// //           className="w-full border rounded-xl px-4 py-3 outline-none"
// //         />

// //         <input
// //           type="text"
// //           name="imageUrl"
// //           value={blogForm.imageUrl}
// //           onChange={handleChange}
// //           placeholder="Image URL"
// //           className="w-full border rounded-xl px-4 py-3 outline-none"
// //         />

// //         <button
// //           onClick={handleSubmit}
// //           disabled={submitting}
// //           className="bg-[#1f3b57] text-white px-6 py-3 rounded-xl disabled:opacity-50"
// //         >
// //           {submitting
// //             ? "Submitting..."
// //             : editData
// //             ? "Update Blog"
// //             : "Publish Blog"}
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default BlogForm;



// "use client";

// import React, { useEffect, useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { FiUpload, FiX, FiLoader } from "react-icons/fi";
// import apiClient from "@/api/client";

// const BlogForm = ({ editData = null, onSuccess }) => {
//   const [submitting, setSubmitting] = useState(false);
//   const [uploadingImage, setUploadingImage] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const [blogForm, setBlogForm] = useState({
//     heading: "",
//     content: "",
//     mtitle: "",
//     mdesc: "",
//   });

//   const [images, setImages] = useState([]);
//   const [previews, setPreviews] = useState([]);

//   useEffect(() => {
//     if (editData) {
//       setBlogForm({
//         heading: editData.heading || "",
//         content: editData.content || "",
//         mtitle: editData.mtitle || "",
//         mdesc: editData.mdesc || "",
//       });

//       // Load existing images
//       if (editData.image && editData.image.length > 0) {
//         const existingImages = editData.image.map((img, index) => ({
//           url: img.url,
//           key: img.key,
//           file: null,
//           isExisting: true,
//         }));
//         setImages(existingImages);
//         setPreviews(existingImages.map(img => img.url));
//       }
//     }
//   }, [editData]);

//   const handleInputChange = (value, field) => {
//     setBlogForm((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   // Get presigned URL from backend
//   const getPresignedUrl = async (file) => {
//     try {
//       const response = await apiClient.post("/blog/upload-url", {
//         fileName: file.name,
//         fileType: file.type,
//         size: file.size,
//       });

//       if (response.data?.data?.data) {
//         return response.data.data.data;
//       }
//       throw new Error("Failed to get upload URL");
//     } catch (err) {
//       console.error("Error getting presigned URL:", err);
//       throw new Error(err?.response?.data?.message || "Failed to get upload URL");
//     }
//   };

//   // Upload file to S3 using presigned URL
//   const uploadToS3 = async (file, uploadURL) => {
//     try {
//       const response = await fetch(uploadURL, {
//         method: "PUT",
//         body: file,
//         headers: {
//           "Content-Type": file.type,
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`Upload failed: ${response.statusText}`);
//       }

//       return true;
//     } catch (err) {
//       console.error("Error uploading to S3:", err);
//       throw new Error("Failed to upload file to storage");
//     }
//   };

//   // Handle image selection
//   const handleImageUpload = async (e) => {
//     const files = Array.from(e.target.files);
    
//     // Validate file types and sizes
//     const validFiles = files.filter(file => {
//       const isValidType = file.type.startsWith('image/');
//       const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      
//       if (!isValidType) {
//         setError("Only image files are allowed");
//         return false;
//       }
//       if (!isValidSize) {
//         setError("Image size should be less than 5MB");
//         return false;
//       }
//       return true;
//     });

//     if (validFiles.length === 0) return;

//     setUploadingImage(true);
//     setError("");

//     try {
//       const uploadedImages = [];

//       for (const file of validFiles) {
//         // Step 1: Get presigned URL
//         const { uploadURL, key, fileUrl } = await getPresignedUrl(file);
        
//         // Step 2: Upload to S3
//         await uploadToS3(file, uploadURL);
        
//         // Step 3: Store image info
//         uploadedImages.push({
//           url: fileUrl,
//           key: key,
//           file: file,
//           isExisting: false,
//         });
//       }

//       // Update state with new images
//       setImages(prev => [...prev, ...uploadedImages]);
//       setPreviews(prev => [...prev, ...uploadedImages.map(img => img.url)]);
      
//       setMessage(`${uploadedImages.length} image(s) uploaded successfully`);
//       setTimeout(() => setMessage(""), 3000);
      
//     } catch (err) {
//       console.error("Image upload failed:", err);
//       setError(err.message || "Failed to upload images");
//       setTimeout(() => setError(""), 3000);
//     } finally {
//       setUploadingImage(false);
//     }
//   };

//   // Remove image
//   const removeImage = (index) => {
//     setImages(prev => prev.filter((_, i) => i !== index));
//     setPreviews(prev => prev.filter((_, i) => i !== index));
//   };

//   const validateForm = () => {
//     if (!blogForm.heading || blogForm.heading === "<p><br></p>") {
//       setError("Blog heading is required");
//       return false;
//     }
//     if (!blogForm.content || blogForm.content === "<p><br></p>") {
//       setError("Blog content is required");
//       return false;
//     }
//     if (images.length === 0) {
//       setError("At least one image is required");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async () => {
//     setError("");
//     setMessage("");

//     if (!validateForm()) {
//       return;
//     }

//     // Prepare images array for API
//     const imagesPayload = images.map(img => ({
//       url: img.url,
//       key: img.key,
//     }));

//     const payload = {
//       heading: blogForm.heading,
//       content: blogForm.content,
//       mtitle: blogForm.mtitle || "",
//       mdesc: blogForm.mdesc || "",
//       images: imagesPayload,
//     };

//     try {
//       setSubmitting(true);

//       if (editData?._id) {
//         await apiClient.put(`/blog/update/${editData._id}`, payload);
//         setMessage("Blog updated successfully.");
//       } else {
//         await apiClient.post("/blog/create", payload);
//         setMessage("Blog created successfully.");
        
//         // Reset form for new blog
//         setBlogForm({
//           heading: "",
//           content: "",
//           mtitle: "",
//           mdesc: "",
//         });
//         setImages([]);
//         setPreviews([]);
//       }

//       if (onSuccess) {
//         onSuccess();
//       }

//       setTimeout(() => setMessage(""), 3000);
      
//     } catch (err) {
//       console.error(err);
//       const serverMessage =
//         err?.response?.data?.message ||
//         err?.response?.data?.error ||
//         err?.message;
//       setError(serverMessage || "Something went wrong.");
//       setTimeout(() => setError(""), 3000);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Quill modules configuration
//   const modules = {
//     toolbar: [
//       [{ header: [1, 2, 3, false] }],
//       ["bold", "italic", "underline", "strike"],
//       [{ list: "ordered" }, { list: "bullet" }],
//       ["link", "clean"],
//     ],
//   };

//   return (
//     <div className="bg-white rounded-2xl p-6 shadow-sm">
//       <h2 className="text-2xl font-semibold mb-6">
//         {editData ? "Update Blog" : "Add Blog"}
//       </h2>

//       <div className="space-y-6">
//         {/* Error and Success Messages */}
//         {error && (
//           <div className="p-3 bg-red-100 text-red-700 rounded-lg">
//             {error}
//           </div>
//         )}
//         {message && (
//           <div className="p-3 bg-green-100 text-green-700 rounded-lg">
//             {message}
//           </div>
//         )}

//         {/* Blog Heading with Rich Text Editor */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Blog Heading <span className="text-red-500">*</span>
//           </label>
//           <ReactQuill
//             theme="snow"
//             value={blogForm.heading}
//             onChange={(value) => handleInputChange(value, "heading")}
//             modules={modules}
//             className="bg-white"
//           />
//         </div>

//         {/* Blog Content with Rich Text Editor */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Blog Content <span className="text-red-500">*</span>
//           </label>
//           <ReactQuill
//             theme="snow"
//             value={blogForm.content}
//             onChange={(value) => handleInputChange(value, "content")}
//             modules={modules}
//             className="bg-white"
//             style={{ height: "300px", marginBottom: "50px" }}
//           />
//         </div>

//         {/* SEO Fields */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Meta Title
//             </label>
//             <input
//               type="text"
//               name="mtitle"
//               value={blogForm.mtitle}
//               onChange={(e) => handleInputChange(e.target.value, "mtitle")}
//               placeholder="SEO Meta Title"
//               className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#1f3b57]"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Meta Description
//             </label>
//             <input
//               type="text"
//               name="mdesc"
//               value={blogForm.mdesc}
//               onChange={(e) => handleInputChange(e.target.value, "mdesc")}
//               placeholder="SEO Meta Description"
//               className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#1f3b57]"
//             />
//           </div>
//         </div>

//         {/* Image Upload Section */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Blog Images <span className="text-red-500">*</span>
//           </label>
          
//           <div
//             className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#1f3b57] transition"
//             onClick={() => document.getElementById("blogImages").click()}
//           >
//             {uploadingImage ? (
//               <div className="text-center">
//                 <FiLoader className="animate-spin text-2xl text-[#1f3b57] mx-auto mb-2" />
//                 <p className="text-gray-500">Uploading image...</p>
//               </div>
//             ) : (
//               <div className="text-center">
//                 <FiUpload className="text-3xl text-[#1f3b57] mx-auto mb-2" />
//                 <p className="text-gray-500">Click to upload images</p>
//                 <p className="text-xs text-gray-400 mt-1">
//                   PNG, JPG, GIF up to 5MB
//                 </p>
//               </div>
//             )}
//             <input
//               id="blogImages"
//               type="file"
//               multiple
//               accept="image/*"
//               style={{ display: "none" }}
//               onChange={handleImageUpload}
//               disabled={uploadingImage}
//             />
//           </div>

//           {/* Image Previews */}
//           {previews.length > 0 && (
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
//               {previews.map((src, index) => (
//                 <div key={index} className="relative group">
//                   <img
//                     src={src}
//                     alt={`Preview ${index + 1}`}
//                     className="w-full h-32 object-cover rounded-lg border"
//                   />
//                   <button
//                     onClick={() => removeImage(index)}
//                     className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
//                   >
//                     <FiX size={16} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Submit Button */}
//         <button
//           onClick={handleSubmit}
//           disabled={submitting || uploadingImage}
//           className="w-full bg-[#1f3b57] text-white px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2a4d72] transition"
//         >
//           {submitting
//             ? "Publishing..."
//             : editData
//             ? "Update Blog"
//             : "Publish Blog"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BlogForm;



"use client";

import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import apiClient from "@/api/client";

const BlogForm = ({ editData = null, onSuccess }) => {
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [blogForm, setBlogForm] = useState({
    heading: "",
    content: "",
    mtitle: "",
    mdesc: "",
  });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  // TipTap editor for heading
  const headingEditor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder: "Enter blog heading...",
      }),
    ],
    content: blogForm.heading,
    onUpdate: ({ editor }) => {
      setBlogForm((prev) => ({
        ...prev,
        heading: editor.getHTML(),
      }));
    },
  });

  // TipTap editor for content
  const contentEditor = useEditor({
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
        placeholder: "Write your blog content here...",
      }),
    ],
    content: blogForm.content,
    onUpdate: ({ editor }) => {
      setBlogForm((prev) => ({
        ...prev,
        content: editor.getHTML(),
      }));
    },
  });

  useEffect(() => {
    if (editData) {
      setBlogForm({
        heading: editData.heading || "",
        content: editData.content || "",
        mtitle: editData.mtitle || "",
        mdesc: editData.mdesc || "",
      });

      // Update editors with new content
      if (headingEditor && editData.heading) {
        headingEditor.commands.setContent(editData.heading);
      }
      if (contentEditor && editData.content) {
        contentEditor.commands.setContent(editData.content);
      }

      // Load existing images
      if (editData.image && editData.image.length > 0) {
        const existingImages = editData.image.map((img, index) => ({
          url: img.url,
          key: img.key,
          file: null,
          isExisting: true,
        }));
        setImages(existingImages);
        setPreviews(existingImages.map(img => img.url));
      }
    }
  }, [editData, headingEditor, contentEditor]);

  // Get presigned URL from backend
  const getPresignedUrl = async (file) => {
    try {
      const response = await apiClient.post("/blog/upload-url", {
        fileName: file.name,
        fileType: file.type,
        size: file.size,
      });

      if (response.data?.data?.data) {
        return response.data.data.data;
      }
      throw new Error("Failed to get upload URL");
    } catch (err) {
      console.error("Error getting presigned URL:", err);
      throw new Error(err?.response?.data?.message || "Failed to get upload URL");
    }
  };

  // Upload file to S3 using presigned URL
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
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      return true;
    } catch (err) {
      console.error("Error uploading to S3:", err);
      throw new Error("Failed to upload file to storage");
    }
  };

  // Handle image selection
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    
    // Validate file types and sizes
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      
      if (!isValidType) {
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

    setUploadingImage(true);
    setError("");

    try {
      const uploadedImages = [];

      for (const file of validFiles) {
        // Step 1: Get presigned URL
        const { uploadURL, key, fileUrl } = await getPresignedUrl(file);
        
        // Step 2: Upload to S3
        await uploadToS3(file, uploadURL);
        
        // Step 3: Store image info
        uploadedImages.push({
          url: fileUrl,
          key: key,
          file: file,
          isExisting: false,
        });
      }

      // Update state with new images
      setImages(prev => [...prev, ...uploadedImages]);
      setPreviews(prev => [...prev, ...uploadedImages.map(img => img.url)]);
      
      setMessage(`${uploadedImages.length} image(s) uploaded successfully`);
      setTimeout(() => setMessage(""), 3000);
      
    } catch (err) {
      console.error("Image upload failed:", err);
      setError(err.message || "Failed to upload images");
      setTimeout(() => setError(""), 3000);
    } finally {
      setUploadingImage(false);
    }
  };

  // Remove image
  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    if (!blogForm.heading || blogForm.heading === "<p></p>" || blogForm.heading === "<p><br></p>") {
      setError("Blog heading is required");
      return false;
    }
    if (!blogForm.content || blogForm.content === "<p></p>" || blogForm.content === "<p><br></p>") {
      setError("Blog content is required");
      return false;
    }
    if (images.length === 0) {
      setError("At least one image is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    setError("");
    setMessage("");

    if (!validateForm()) {
      return;
    }

    // Prepare images array for API
    const imagesPayload = images.map(img => ({
      url: img.url,
      key: img.key,
    }));

    const payload = {
      heading: blogForm.heading,
      content: blogForm.content,
      mtitle: blogForm.mtitle || "",
      mdesc: blogForm.mdesc || "",
      images: imagesPayload,
    };

    try {
      setSubmitting(true);

      if (editData?._id) {
        await apiClient.put(`/blog/update/${editData._id}`, payload);
        setMessage("Blog updated successfully.");
      } else {
        await apiClient.post("/blog/create", payload);
        setMessage("Blog created successfully.");
        
        // Reset form for new blog
        setBlogForm({
          heading: "",
          content: "",
          mtitle: "",
          mdesc: "",
        });
        setImages([]);
        setPreviews([]);
        
        // Clear editors
        if (headingEditor) headingEditor.commands.clearContent();
        if (contentEditor) contentEditor.commands.clearContent();
      }

      if (onSuccess) {
        onSuccess();
      }

      setTimeout(() => setMessage(""), 3000);
      
    } catch (err) {
      console.error(err);
      const serverMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message;
      setError(serverMessage || "Something went wrong.");
      setTimeout(() => setError(""), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  // Toolbar button component
  const ToolbarButton = ({ onClick, active, children, title }) => (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded transition text-sm font-medium ${
        active 
          ? "bg-[#1f3b57] text-white" 
          : "text-gray-600 hover:bg-gray-100"
      }`}
      title={title}
      type="button"
    >
      {children}
    </button>
  );

  // Toolbar for heading editor
  const HeadingToolbar = () => {
    if (!headingEditor) return null;

    return (
      <div className="flex gap-1 mb-2 p-1 border border-gray-200 rounded-lg bg-gray-50">
        <ToolbarButton
          onClick={() => headingEditor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={headingEditor.isActive('heading', { level: 1 })}
          title="Heading 1"
        >
          H1
        </ToolbarButton>
        <ToolbarButton
          onClick={() => headingEditor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={headingEditor.isActive('heading', { level: 2 })}
          title="Heading 2"
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          onClick={() => headingEditor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={headingEditor.isActive('heading', { level: 3 })}
          title="Heading 3"
        >
          H3
        </ToolbarButton>
        <div className="w-px bg-gray-300 mx-1" />
        <ToolbarButton
          onClick={() => headingEditor.chain().focus().toggleBold().run()}
          active={headingEditor.isActive('bold')}
          title="Bold"
        >
          Bold
        </ToolbarButton>
        <ToolbarButton
          onClick={() => headingEditor.chain().focus().toggleItalic().run()}
          active={headingEditor.isActive('italic')}
          title="Italic"
        >
          Italic
        </ToolbarButton>
      </div>
    );
  };

  // Toolbar for content editor
  const ContentToolbar = () => {
    if (!contentEditor) return null;

    return (
      <div className="flex gap-1 mb-2 p-1 border border-gray-200 rounded-lg bg-gray-50 flex-wrap">
        <ToolbarButton
          onClick={() => contentEditor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={contentEditor.isActive('heading', { level: 1 })}
          title="Heading 1"
        >
          H1
        </ToolbarButton>
        <ToolbarButton
          onClick={() => contentEditor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={contentEditor.isActive('heading', { level: 2 })}
          title="Heading 2"
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          onClick={() => contentEditor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={contentEditor.isActive('heading', { level: 3 })}
          title="Heading 3"
        >
          H3
        </ToolbarButton>
        <div className="w-px bg-gray-300 mx-1" />
        <ToolbarButton
          onClick={() => contentEditor.chain().focus().toggleBold().run()}
          active={contentEditor.isActive('bold')}
          title="Bold"
        >
          Bold
        </ToolbarButton>
        <ToolbarButton
          onClick={() => contentEditor.chain().focus().toggleItalic().run()}
          active={contentEditor.isActive('italic')}
          title="Italic"
        >
          Italic
        </ToolbarButton>
        <div className="w-px bg-gray-300 mx-1" />
        <ToolbarButton
          onClick={() => contentEditor.chain().focus().toggleBulletList().run()}
          active={contentEditor.isActive('bulletList')}
          title="Bullet List"
        >
          • List
        </ToolbarButton>
        <ToolbarButton
          onClick={() => contentEditor.chain().focus().toggleOrderedList().run()}
          active={contentEditor.isActive('orderedList')}
          title="Numbered List"
        >
          1. List
        </ToolbarButton>
        <div className="w-px bg-gray-300 mx-1" />
        <ToolbarButton
          onClick={() => contentEditor.chain().focus().toggleCodeBlock().run()}
          active={contentEditor.isActive('codeBlock')}
          title="Code Block"
        >
          {'</>'}
        </ToolbarButton>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">
        {editData ? "Update Blog" : "Add Blog"}
      </h2>

      <div className="space-y-6">
        {/* Error and Success Messages */}
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        {message && (
          <div className="p-3 bg-green-100 text-green-700 rounded-lg">
            {message}
          </div>
        )}

        {/* Blog Heading with TipTap */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Blog Heading <span className="text-red-500">*</span>
          </label>
          <HeadingToolbar />
          <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#1f3b57] focus-within:border-transparent">
            <EditorContent editor={headingEditor} className="prose max-w-none p-4 min-h-[100px]" />
          </div>
        </div>

        {/* Blog Content with TipTap */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Blog Content <span className="text-red-500">*</span>
          </label>
          <ContentToolbar />
          <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#1f3b57] focus-within:border-transparent">
            <EditorContent editor={contentEditor} className="prose max-w-none p-4 min-h-[400px]" />
          </div>
        </div>

        {/* SEO Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meta Title
            </label>
            <input
              type="text"
              name="mtitle"
              value={blogForm.mtitle}
              onChange={(e) => setBlogForm(prev => ({ ...prev, mtitle: e.target.value }))}
              placeholder="SEO Meta Title"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#1f3b57]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meta Description
            </label>
            <input
              type="text"
              name="mdesc"
              value={blogForm.mdesc}
              onChange={(e) => setBlogForm(prev => ({ ...prev, mdesc: e.target.value }))}
              placeholder="SEO Meta Description"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#1f3b57]"
            />
          </div>
        </div>

        {/* Image Upload Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Blog Images <span className="text-red-500">*</span> (Minimum 1 image required)
          </label>
          
          <div
            className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#1f3b57] transition bg-gray-50"
            onClick={() => document.getElementById("blogImages").click()}
          >
            {uploadingImage ? (
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-[#1f3b57] mb-2"></div>
                <p className="text-gray-500">Uploading image to S3...</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-3xl mb-2">📷</div>
                <p className="text-gray-500">Click to upload images</p>
                <p className="text-xs text-gray-400 mt-1">
                  PNG, JPG, GIF up to 5MB
                </p>
              </div>
            )}
            <input
              id="blogImages"
              type="file"
              multiple
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
              disabled={uploadingImage}
            />
          </div>

          {/* Image Previews */}
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

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={submitting || uploadingImage}
          className="w-full bg-[#1f3b57] text-white px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2a4d72] transition font-medium"
        >
          {submitting
            ? "Publishing..."
            : editData
            ? "Update Blog"
            : "Publish Blog"}
        </button>
      </div>

      {/* Custom CSS for TipTap editor */}
      <style jsx global>{`
        .ProseMirror {
          outline: none;
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
        .ProseMirror img {
          max-width: 100%;
          height: auto;
          margin: 1em 0;
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
};

export default BlogForm;