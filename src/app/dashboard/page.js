"use client";

import React, { useEffect, useState } from "react";
import {
  FiGrid,
  FiUser,
  FiLogOut,
  FiChevronDown,
  FiChevronRight,
  FiPlusCircle,
  FiList,
  FiBriefcase,
  FiCpu,
  FiFileText,
} from "react-icons/fi";
import apiClient from "@/api/client";
import BlogForm from './../../components/Blogs/BlogForm';
import BlogList from './../../components/Blogs/BlogList';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [editingBlog, setEditingBlog] = useState(null);

  // Dropdown states
  const [openMenus, setOpenMenus] = useState({
    career: false,
    blogs: false,
    myrobots: false,
  });

  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [blogForm, setBlogForm] = useState({
    heading: "",
    content: "",
    mtitle: "",
    mdesc: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAuthenticated(!!localStorage.getItem("token"));
    }
    fetchBlogs();
  }, []);

  const resetBlogForm = () => {
    setBlogForm({
      heading: "",
      content: "",
      mtitle: "",
      mdesc: "",
      imageUrl: "",
    });
    setEditingBlogId(null);
    setError("");
    setMessage("");
  };

  const fetchBlogs = async () => {
    try {
      setLoadingBlogs(true);
      const response = await apiClient.get("/blog/get", {
        params: { page: 1, limit: 20 },
      });
      setBlogs(response?.data?.data?.blogs || []);
    } catch (err) {
      console.error("Failed to load blogs:", err);
      const serverMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message;
      setError(serverMessage || "Unable to load blogs. Please try again.");
    } finally {
      setLoadingBlogs(false);
    }
  };

  const handleBlogFormChange = (event) => {
    const { name, value } = event.target;
    setBlogForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStartEditBlog = (blog) => {
    setActiveTab("add-blog");
    setEditingBlogId(blog._id);
    setBlogForm({
      heading: blog.heading || "",
      content: blog.content || "",
      mtitle: blog.mtitle || "",
      mdesc: blog.mdesc || "",
      imageUrl: blog.image?.[0]?.url || "",
    });
    setMessage("");
    setError("");
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) {
      return;
    }

    try {
      await apiClient.delete(`/blog/delete/${id}`);
      setMessage("Blog deleted successfully.");
      fetchBlogs();
    } catch (err) {
      console.error("Delete blog failed:", err);
      setError("Unable to delete blog. Please try again.");
    }
  };

  const handleSubmitBlog = async () => {
    if (!blogForm.heading || !blogForm.content) {
      setError("Heading and content are required.");
      return;
    }

    if (!editingBlogId && !blogForm.imageUrl) {
      setError("Image URL is required for a new blog.");
      return;
    }

    const payload = {
      heading: blogForm.heading,
      content: blogForm.content,
      mtitle: blogForm.mtitle,
      mdesc: blogForm.mdesc,
    };

    if (blogForm.imageUrl) {
      payload.images = [
        {
          url: blogForm.imageUrl,
          key: `dashboard-${Date.now()}`,
        },
      ];
    }

    try {
      setSubmitting(true);
      if (editingBlogId) {
        await apiClient.put(`/blog/update/${editingBlogId}`, payload);
        setMessage("Blog updated successfully.");
      } else {
        await apiClient.post("/blog/create", payload);
        setMessage("Blog created successfully.");
      }
      resetBlogForm();
      fetchBlogs();
    } catch (err) {
      console.error("Submit blog failed:", err);
      const serverMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message;
      setError(
        serverMessage ||
          "Unable to save blog. Please check your inputs and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Dummy User
  const user = {
    name: "Dharmendra Kumar",
    email: "dharmendra@gmail.com",
  };

  // Sidebar Menu
  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: FiGrid },

    {
      key: "career",
      label: "Career",
      icon: FiBriefcase,
      children: [
        { key: "add-career", label: "Add Career", icon: FiPlusCircle },
        { key: "list-career", label: "List Careers", icon: FiList },
      ],
    },

    {
      key: "blogs",
      label: "Blogs",
      icon: FiFileText,
      children: [
        { key: "add-blog", label: "Add Blog", icon: FiPlusCircle },
        { key: "list-blog", label: "List Blogs", icon: FiList },
      ],
    },

    {
      key: "myrobots",
      label: "My Robots",
      icon: FiCpu,
      children: [
        { key: "add-robot", label: "Add Robot", icon: FiPlusCircle },
        { key: "list-robot", label: "List Robots", icon: FiList },
      ],
    },

    { key: "profile", label: "Profile", icon: FiUser },
  ];

  // Dummy Stats
  const stats = [
    { title: "Total Orders", value: "12" },
    { title: "Wishlist Items", value: "8" },
    { title: "Total Spent", value: "₹28,400" },
    { title: "Saved", value: "₹4,200" },
  ];

  // Dummy Orders
  const orders = [
    {
      id: "#12345",
      product: "Nike Shoes",
      status: "Delivered",
      amount: "₹4,999",
    },
    {
      id: "#12346",
      product: "T-Shirt",
      status: "Pending",
      amount: "₹999",
    },
    {
      id: "#12347",
      product: "Headphones",
      status: "Shipped",
      amount: "₹2,499",
    },
  ];

  // Dummy Career Data
  const careers = [
    {
      id: 1,
      title: "Frontend Developer",
      type: "Full Time",
    },
    {
      id: 2,
      title: "UI/UX Designer",
      type: "Remote",
    },
  ];

  // Dummy Robot Data
  const robots = [
    {
      id: 1,
      name: "Robo Alpha",
      status: "Active",
    },
    {
      id: 2,
      name: "Mecha Bot",
      status: "Inactive",
    },
  ];

  // Toggle dropdown
  const toggleMenu = (key) => {
    setOpenMenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="min-h-screen bg-[#FAF6ED] p-4 md:p-8 ">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-[280px] bg-white rounded-2xl p-5 shadow-sm">
          {/* User */}
          <div className="flex flex-col items-center border-b pb-5">
            <div className="w-16 h-16 rounded-full bg-[#1f3b57] text-white flex items-center justify-center text-2xl font-bold">
              {user.name.charAt(0)}
            </div>

            <h2 className="mt-3 font-semibold text-lg">{user.name}</h2>

            <p className="text-sm text-gray-500">{user.email}</p>
          </div>

          {/* Menu */}
          <div className="mt-5 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const hasChildren = item.children;

              return (
                <div key={item.key}>
                  {/* Parent Menu */}
                  <button
                    onClick={() => {
                      if (hasChildren) {
                        toggleMenu(item.key);
                      } else {
                        setActiveTab(item.key);
                      }
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition text-sm ${
                      activeTab === item.key
                        ? "bg-[#1f3b57] text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} />
                      {item.label}
                    </div>

                    {hasChildren &&
                      (openMenus[item.key] ? (
                        <FiChevronDown size={16} />
                      ) : (
                        <FiChevronRight size={16} />
                      ))}
                  </button>

                  {/* Dropdown Items */}
                  {hasChildren && openMenus[item.key] && (
                    <div className="ml-6 mt-2 space-y-1">
                      {item.children.map((child) => {
                        const ChildIcon = child.icon;

                        return (
                          <button
                            key={child.key}
                            onClick={() => setActiveTab(child.key)}
                            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition ${
                              activeTab === child.key
                                ? "bg-[#1f3b57] text-white"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            <ChildIcon size={16} />
                            {child.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Logout */}
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 text-sm">
              <FiLogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Dashboard */}
          {activeTab === "dashboard" && (
            <>
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {stats.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-5 shadow-sm"
                  >
                    <p className="text-sm text-gray-500">{item.title}</p>

                    <h3 className="text-2xl font-bold mt-2 text-[#1f3b57]">
                      {item.value}
                    </h3>
                  </div>
                ))}
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3">Order ID</th>
                        <th className="text-left py-3">Product</th>
                        <th className="text-left py-3">Status</th>
                        <th className="text-left py-3">Amount</th>
                      </tr>
                    </thead>

                    <tbody>
                      {orders.map((order, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-4">{order.id}</td>
                          <td>{order.product}</td>
                          <td>
                            <span className="px-3 py-1 rounded-full text-xs bg-gray-100">
                              {order.status}
                            </span>
                          </td>
                          <td>{order.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Add Blog */}
          {activeTab === "add-blog" && (
             <BlogForm
    editData={editingBlog}
    onSuccess={() => {
      setEditingBlog(null);
    }}
  />
          )}

          {/* List Blogs */}
          {activeTab === "list-blog" && (
             <BlogList
    onEdit={(blog) => {
      setEditingBlog(blog);
      setActiveTab("add-blog");
    }}
  />
          )}

          {/* Add Career */}
          {activeTab === "add-career" && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">Add Career</h2>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Job Title"
                  className="w-full border rounded-xl px-4 py-3 outline-none"
                />

                <input
                  type="text"
                  placeholder="Job Type"
                  className="w-full border rounded-xl px-4 py-3 outline-none"
                />

                <button className="bg-[#1f3b57] text-white px-6 py-3 rounded-xl">
                  Add Career
                </button>
              </div>
            </div>
          )}

          {/* List Careers */}
          {activeTab === "list-career" && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">Career Listings</h2>

              <div className="space-y-4">
                {careers.map((career) => (
                  <div
                    key={career.id}
                    className="border rounded-xl p-4 flex items-center justify-between"
                  >
                    <div>
                      <h3 className="font-semibold">{career.title}</h3>
                      <p className="text-sm text-gray-500">{career.type}</p>
                    </div>

                    <button className="text-sm px-4 py-2 rounded-lg bg-gray-100">
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add Robot */}
          {activeTab === "add-robot" && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">Add Robot</h2>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Robot Name"
                  className="w-full border rounded-xl px-4 py-3 outline-none"
                />

                <input
                  type="text"
                  placeholder="Robot Status"
                  className="w-full border rounded-xl px-4 py-3 outline-none"
                />

                <button className="bg-[#1f3b57] text-white px-6 py-3 rounded-xl">
                  Add Robot
                </button>
              </div>
            </div>
          )}

          {/* List Robots */}
          {activeTab === "list-robot" && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">Robot List</h2>

              <div className="space-y-4">
                {robots.map((robot) => (
                  <div
                    key={robot.id}
                    className="border rounded-xl p-4 flex items-center justify-between"
                  >
                    <div>
                      <h3 className="font-semibold">{robot.name}</h3>
                      <p className="text-sm text-gray-500">{robot.status}</p>
                    </div>

                    <button className="text-sm px-4 py-2 rounded-lg bg-gray-100">
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Profile */}
          {activeTab === "profile" && (
            <div className="bg-white rounded-2xl p-10 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Profile Page</h2>

              <div className="space-y-3">
                <p>
                  <span className="font-semibold">Name:</span> {user.name}
                </p>

                <p>
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
