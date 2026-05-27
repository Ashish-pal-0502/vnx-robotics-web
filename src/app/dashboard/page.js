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

import BlogForm from "@/components/Blogs/BlogForm";
import BlogList from "@/components/Blogs/BlogList";

import AddCareer from "@/components/Career/AddCareer";
import ListCareer from "@/components/Career/ListCareer";

import AddRobot from "@/components/Robot/AddRobot";
import ListRobot from "@/components/Robot/ListRobot";

import ProfilePage from "@/components/Profile/ProfilePage";
import UsersList from "@/components/Users/UsersList";

// SIDEBAR MENU
const menuItems = [
  { key: "dashboard", label: "Dashboard", icon: FiGrid },

  { key: "users", label: "Users", icon: FiUser },

  {
    key: "career",
    label: "Career",
    icon: FiBriefcase,

    children: [
      {
        key: "add-career",
        label: "Add Career",
        icon: FiPlusCircle,
      },

      {
        key: "list-career",
        label: "List Careers",
        icon: FiList,
      },
    ],
  },

  {
    key: "blogs",
    label: "Blogs",
    icon: FiFileText,

    children: [
      {
        key: "add-blog",
        label: "Add Blog",
        icon: FiPlusCircle,
      },

      {
        key: "list-blog",
        label: "List Blogs",
        icon: FiList,
      },
    ],
  },

  {
    key: "myrobots",
    label: "My Robots",
    icon: FiCpu,

    children: [
      {
        key: "add-robot",
        label: "Add Robot",
        icon: FiPlusCircle,
      },

      {
        key: "list-robot",
        label: "List Robots",
        icon: FiList,
      },
    ],
  },

  { key: "profile", label: "Profile", icon: FiUser },
];

const DashboardPage = () => {
  const router = useRouter();

  const { user, logOut } = useAuth();

  const [activeTab, setActiveTab] = useState("dashboard");

  // BLOG
  const [editingBlog, setEditingBlog] = useState(null);

  // CAREER
  const [editingCareer, setEditingCareer] = useState(null);

  // ROBOT
  const [editingRobot, setEditingRobot] = useState(null);

  // STATS
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBlogs: 0,
    totalCareers: 0,
    totalRobots: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);

  // MENU
  const [openMenus, setOpenMenus] = useState({
    career: false,
    blogs: false,
    myrobots: false,
  });

  // FETCH DASHBOARD STATS
  const fetchDashboardStats = async () => {
    try {
      setStatsLoading(true);
      const [usersRes, blogsRes, careersRes, robotsRes] = await Promise.all([
        apiClient.get("/user/get-users"),
        apiClient.get("/blog/get"),
        apiClient.get("/career/get-all"),
        apiClient.get("/robot/get"),
      ]);
      console.log("careers: ", careersRes);
      setStats({
        totalUsers: usersRes?.data?.data?.users?.length || 0,
        totalBlogs: blogsRes?.data?.data?.blogs?.length || 0,
        totalCareers: careersRes?.data?.data?.data?.length || 0,
        totalRobots: robotsRes?.data?.data?.robots?.length || 0,
      });
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  // TOGGLE MENU
  const toggleMenu = (key) => {
    setOpenMenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // LOGOUT
  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to logout?");

    if (!confirmed) return;

    try {
      await apiClient.post("/user/logout");
    } catch (err) {
      console.error("Logout failed:", err);
    }

    logOut();

    router.replace("/login");
  };

  // DYNAMIC STATS ARRAY
  const statsData = [
    {
      title: "Total Users",
      value: stats.totalUsers,
    },

    {
      title: "Total Robots",
      value: stats.totalRobots,
    },

    {
      title: "Total Blogs",
      value: stats.totalBlogs,
    },

    {
      title: "Total Careers",
      value: stats.totalCareers,
    },
  ];

  return (
    <div className="h-screen overflow-hidden bg-[#FAF6ED] p-4 md:p-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 h-full">
        {/* SIDEBAR */}
        <div className="w-full md:w-72 bg-white rounded-2xl p-5 shadow-sm md:h-full overflow-y-auto">
          {/* USER */}
          <div className="flex flex-col items-center border-b pb-5">
            <div className="w-16 h-16 rounded-full bg-[#1f3b57] text-white flex items-center justify-center text-2xl font-bold">
              {user?.name?.charAt(0)}
            </div>

            <h2 className="mt-3 font-semibold text-lg">{user?.name}</h2>

            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>

          {/* MENU */}
          <div className="mt-5 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              const hasChildren = item.children;

              return (
                <div key={item.key}>
                  {/* PARENT */}
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

                  {/* CHILDREN */}
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

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 text-sm"
            >
              <FiLogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 overflow-y-auto h-full pr-2">
          {/* DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {statsData.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl p-5 shadow-sm">
                  <p className="text-sm text-gray-500">{item.title}</p>

                  <h3 className="text-2xl font-bold mt-2 text-[#1f3b57]">
                    {statsLoading ? "..." : item.value}
                  </h3>
                </div>
              ))}
            </div>
          )}

          {/* USERS */}
          {activeTab === "users" && <UsersList />}

          {/* BLOGS */}
          {activeTab === "add-blog" && (
            <BlogForm
              editData={editingBlog}
              onSuccess={() => {
                setEditingBlog(null);

                fetchDashboardStats();

                setActiveTab("list-blog");
              }}
            />
          )}

          {activeTab === "list-blog" && (
            <BlogList
              onEdit={(blog) => {
                setEditingBlog(blog);

                setActiveTab("add-blog");
              }}
            />
          )}

          {/* CAREERS */}
          {activeTab === "add-career" && (
            <AddCareer
              editingCareer={editingCareer}
              onSuccess={() => {
                setEditingCareer(null);

                fetchDashboardStats();

                setActiveTab("list-career");
              }}
            />
          )}

          {activeTab === "list-career" && (
            <ListCareer
              onEdit={(career) => {
                setEditingCareer(career);

                setActiveTab("add-career");
              }}
            />
          )}

          {/* ROBOTS */}
          {activeTab === "add-robot" && (
            <AddRobot
              editData={editingRobot}
              onSuccess={() => {
                setEditingRobot(null);

                fetchDashboardStats();

                setActiveTab("list-robot");
              }}
            />
          )}

          {activeTab === "list-robot" && (
            <ListRobot
              onEdit={(robot) => {
                setEditingRobot(robot);

                setActiveTab("add-robot");
              }}
            />
          )}

          {/* PROFILE */}
          {activeTab === "profile" && <ProfilePage />}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
