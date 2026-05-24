"use client";
import apiClient from "@/api/client";
import useAuth from "@/auth/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiBriefcase,
  FiChevronDown,
  FiChevronRight,
  FiCpu,
  FiFileText,
  FiGrid,
  FiList,
  FiLogOut,
  FiPlusCircle,
  FiUser,
} from "react-icons/fi";
import BlogForm from "./../../components/Blogs/BlogForm";
import BlogList from "./../../components/Blogs/BlogList";
import AddCareer from './../../components/Career/AddCareer';
import ListCareer from './../../components/Career/ListCareer';

const DashboardPage = () => {
  const router = useRouter();
  const { user, logOut } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [editingBlog, setEditingBlog] = useState(null);

  // Dropdown states
  const [openMenus, setOpenMenus] = useState({
    career: false,
    blogs: false,
    myrobots: false,
  });


  const [careers, setCareers] = useState([]);
  const [editingCareerId, setEditingCareerId] = useState(null);

  const [profile, setProfile] = useState(null);

  useEffect(() => {
 
    fetchCareers();
    fetchProfile();
  }, []);


  const fetchProfile = async () => {
    try {
      const response = await apiClient.get("/user/me");
      setProfile(response?.data?.data?.user || null);
    } catch (err) {
      console.error("Failed to load profile:", err);
    }
  };

  const fetchCareers = async () => {
    try {
      const response = await apiClient.get("/career/get-all");
      setCareers(response?.data?.data?.data || []);
    } catch (err) {
      console.error("Failed to load careers:", err);
      const serverMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message;
      setError(serverMessage || "Unable to load careers. Please try again.");
    }
  };

  const handleLogout = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout from the dashboard?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await apiClient.post("/user/logout");
    } catch (err) {
      console.error("Logout request failed:", err);
    }

    logOut();
    router.replace("/login");
  };

  const activeUser = profile ||
    user || {
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
    { title: "Total User", value: "12" },
    { title: "Wishlist Robots", value: "8" },
    { title: "Total Blogs", value: "17" },
    { title: "Total Careers/Jobs", value: "₹4" },
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
        <div className="w-full md:w-70 bg-white rounded-2xl p-5 shadow-sm">
          {/* User */}
          <div className="flex flex-col items-center border-b pb-5">
            <div className="w-16 h-16 rounded-full bg-[#1f3b57] text-white flex items-center justify-center text-2xl font-bold">
              {activeUser.name.charAt(0)}
            </div>

            <h2 className="mt-3 font-semibold text-lg">{activeUser.name}</h2>

            <p className="text-sm text-gray-500">{activeUser.email}</p>
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
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 text-sm"
            >
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

    <AddCareer
    editingCareer={editingCareerId ? careers.find(c => c._id === editingCareerId) : null}
    onSuccess={() => {
      setEditingCareerId(null);
      setActiveTab("list-career"); // Optional: redirect to list after success
    }}
  />
          )}

          {/* List Careers */}
          {activeTab === "list-career" && (

    <ListCareer
    onEdit={(career) => {
      setEditingCareerId(career._id);
      setActiveTab("add-career");
    }}
  />
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
                  <span className="font-semibold">Name:</span> {activeUser.name}
                </p>

                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {activeUser.email}
                </p>

                {activeUser.phone && (
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    {activeUser.phone}
                  </p>
                )}

                <p>
                  <span className="font-semibold">Role:</span>{" "}
                  {activeUser.role || activeUser.userType || "user"}
                </p>

                {typeof activeUser.is_verified !== "undefined" && (
                  <p>
                    <span className="font-semibold">Verified:</span>{" "}
                    {activeUser.is_verified ? "Yes" : "No"}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
