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
  FiMenu,
  FiPlusCircle,
  FiUser,
  FiUsers,
  FiVideo,
  FiX,
  FiHome,
} from "react-icons/fi";

import BlogForm from "@/components/Blogs/BlogForm";
import BlogList from "@/components/Blogs/BlogList";
import AddCareer from "@/components/Career/AddCareer";
import ListCareer from "@/components/Career/ListCareer";
import AddRobot from "@/components/Robot/AddRobot";
import ListRobot from "@/components/Robot/ListRobot";
import ProfilePage from "@/components/Profile/ProfilePage";
import UsersList from "@/components/Users/UsersList";
import AddHero from "@/components/Hero/AddHero";

// SIDEBAR MENU
const menuItems = [
  { key: "dashboard", label: "Dashboard", icon: FiGrid },
  {
    key: "hero",
    label: "Hero",
    icon: FiVideo,
  },
  { key: "users", label: "Users", icon: FiUsers },
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
    label: "Robots",
    icon: FiCpu,
    children: [
      { key: "add-robot", label: "Add Robot", icon: FiPlusCircle },
      { key: "list-robot", label: "List Robots", icon: FiList },
    ],
  },
  { key: "profile", label: "Profile", icon: FiUser },
];

const DashboardPage = () => {
  const router = useRouter();
  const { user, logOut } = useAuth();

  // State
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Edit states
  const [editingBlog, setEditingBlog] = useState(null);
  const [editingCareer, setEditingCareer] = useState(null);
  const [editingRobot, setEditingRobot] = useState(null);
  const [editingHero, setEditingHero] = useState(null);

  // Stats
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBlogs: 0,
    totalCareers: 0,
    totalRobots: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);

  // Menu open states
  const [openMenus, setOpenMenus] = useState({
    career: false,
    blogs: false,
    myrobots: false,
  });

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // On desktop, sidebar is always open
      // On mobile, sidebar is closed by default
      if (!mobile) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobile, sidebarOpen]);

  // Fetch dashboard stats
  const fetchDashboardStats = async () => {
    try {
      setStatsLoading(true);
      const [usersRes, blogsRes, careersRes, robotsRes] = await Promise.all([
        apiClient.get("/user/get-users"),
        apiClient.get("/blog/get"),
        apiClient.get("/career/get-all"),
        apiClient.get("/robot/get"),
      ]);

      setStats({
        totalUsers: usersRes?.data?.users?.length || 0,
        totalBlogs: blogsRes?.data?.blogs?.length || 0,
        totalCareers: careersRes?.data?.data?.length || 0,
        totalRobots:
          robotsRes?.data?.data?.robots?.length ||
          robotsRes?.data?.robots?.length ||
          0,
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

  const toggleMenu = (key) => {
    setOpenMenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) return;

    try {
      await apiClient.post("/user/logout");
    } catch (err) {
      console.error("Logout failed:", err);
    }

    logOut();
    router.replace("/");
  };

  const handleBackToHome = () => {
    router.push("/");
  };

  const statsData = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      gradient: "from-blue-500 to-blue-600",
      icon: "👥",
    },
    {
      title: "Total Robots",
      value: stats.totalRobots,
      gradient: "from-purple-500 to-purple-600",
      icon: "🤖",
    },
    {
      title: "Total Blogs",
      value: stats.totalBlogs,
      gradient: "from-green-500 to-green-600",
      icon: "📝",
    },
    {
      title: "Total Careers",
      value: stats.totalCareers,
      gradient: "from-orange-500 to-orange-600",
      icon: "💼",
    },
  ];

  // Sidebar component (Dark Theme)
  const Sidebar = () => (
    <>
      {/* Sidebar */}
      <div
        className={`
          fixed md:relative 
          top-0 left-0 
          h-full 
          w-72 
          bg-[#111827] 
          rounded-r-2xl md:rounded-2xl 
          shadow-xl 
          overflow-y-auto 
          no-scrollbar 
          shrink-0
          transition-transform 
          duration-300 
          ease-in-out
          z-30
          border-r border-[#27324a]
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="p-5 flex flex-col h-full">
          {/* Close button for mobile */}
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-[#1f2638] transition-colors"
            >
              <FiX size={20} className="text-[#a1a1aa]" />
            </button>
          )}

          {/* User Profile */}
          <div className="flex flex-col items-center border-b border-[#27324a] pb-5">
            <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#0088db] to-[#006db1] text-white flex items-center justify-center text-2xl font-heading font-bold shadow-lg">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
            <h2 className="mt-3 font-heading font-semibold text-lg text-[#f3f4f6] truncate max-w-full px-2">
              {user?.name}
            </h2>
            <p className="text-sm text-[#a1a1aa] truncate max-w-full px-2">
              {user?.email}
            </p>
          </div>

          {/* Menu Items */}
          <div className="mt-5 flex-1">
            <div className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const hasChildren = item.children;

                return (
                  <div key={item.key}>
                    <button
                      onClick={() => {
                        if (hasChildren) {
                          toggleMenu(item.key);
                        } else {
                          setActiveTab(item.key);
                          if (isMobile) setSidebarOpen(false);
                        }
                      }}
                      className={`w-full cursor-pointer flex items-center justify-between px-4 py-3 rounded-xl transition-all text-sm ${
                        activeTab === item.key
                          ? "bg-linear-to-r from-[#0088db] to-[#006db1] text-white shadow-md"
                          : "text-[#a1a1aa] hover:bg-[#1f2638]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {hasChildren &&
                        (openMenus[item.key] ? (
                          <FiChevronDown size={16} />
                        ) : (
                          <FiChevronRight size={16} />
                        ))}
                    </button>

                    {hasChildren && openMenus[item.key] && (
                      <div className="ml-6 mt-2 space-y-1 border-l-2 border-[#27324a] pl-3">
                        {item.children.map((child) => {
                          const ChildIcon = child.icon;
                          return (
                            <button
                              key={child.key}
                              onClick={() => {
                                setActiveTab(child.key);
                                if (isMobile) setSidebarOpen(false);
                              }}
                              className={`w-full flex items-center cursor-pointer gap-3 px-4 py-2 rounded-lg text-sm transition-all ${
                                activeTab === child.key
                                  ? "bg-linear-to-r from-[#0088db] to-[#006db1] text-white"
                                  : "text-[#a1a1aa] hover:bg-[#1f2638]"
                              }`}
                            >
                              <ChildIcon size={16} />
                              <span>{child.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Buttons Section */}
          <div className="mt-6 pt-4 border-t border-[#27324a] space-y-2">
            {/* Back to Home Button */}
            <button
              onClick={handleBackToHome}
              className="w-full flex cursor-pointer items-center gap-3 px-4 py-3 rounded-xl text-emerald-400 hover:bg-emerald-500/10 text-sm transition-all"
            >
              <FiHome size={18} />
              <span className="font-medium">Back to Home</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex cursor-pointer items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 text-sm transition-all"
            >
              <FiLogOut size={18} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="h-screen overflow-hidden font-body bg-linear-to-br from-[#0b1020] to-[#050816] p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 md:gap-6 h-full relative">
        {/* Mobile Menu Button - Only show when sidebar is closed on mobile */}
        {isMobile && !sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="fixed bottom-4 right-4 z-20 bg-linear-to-r from-[#0088db] to-[#006db1] text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <FiMenu size={24} />
          </button>
        )}

        {/* Overlay for mobile - Only show when sidebar is open */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-20 transition-opacity duration-300"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div
          className={`
            flex-1 
            overflow-y-auto 
            h-full 
            transition-all 
            duration-300
            ${isMobile ? "w-full" : "w-auto"}
            pb-20 md:pb-0
          `}
        >
          {/* Dashboard Stats */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {statsData.map((item, index) => (
                  <div
                    key={index}
                    className="bg-[#111827] rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#27324a]"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs sm:text-sm text-[#a1a1aa] font-medium">
                        {item.title}
                      </p>
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold mt-2 text-[#f3f4f6]">
                      {statsLoading ? (
                        <span className="inline-block w-8 h-8 border-2 border-[#0088db] border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        item.value
                      )}
                    </h3>
                    <div
                      className={`mt-2 h-1 w-full bg-linear-to-r ${item.gradient} rounded-full opacity-70`}
                    />
                  </div>
                ))}
              </div>

              {/* Welcome Section */}
              <div className="bg-linear-to-r from-[#0088db] to-[#006db1] rounded-xl sm:rounded-2xl p-5 sm:p-6 text-white shadow-xl">
                <h2 className="text-lg sm:text-xl font-heading font-bold mb-2">
                  Welcome back, {user?.name?.split(" ")[0]}! 👋
                </h2>
                <p className="text-sm sm:text-base opacity-95">
                  Here's what's happening with your platform today.
                </p>
              </div>
            </div>
          )}

          {/* Hero Section */}
          {activeTab === "hero" && (
            <div className="animate-fadeIn">
              <AddHero
                editData={editingHero}
                onSuccess={() => setEditingHero(null)}
              />
            </div>
          )}

          {/* Users */}
          {activeTab === "users" && (
            <div className="animate-fadeIn">
              <UsersList />
            </div>
          )}

          {/* Blogs */}
          {activeTab === "add-blog" && (
            <div className="animate-fadeIn">
              <BlogForm
                editData={editingBlog}
                onSuccess={() => {
                  setEditingBlog(null);
                  fetchDashboardStats();
                  setActiveTab("list-blog");
                }}
              />
            </div>
          )}

          {activeTab === "list-blog" && (
            <div className="animate-fadeIn">
              <BlogList
                onEdit={(blog) => {
                  setEditingBlog(blog);
                  setActiveTab("add-blog");
                }}
              />
            </div>
          )}

          {/* Careers */}
          {activeTab === "add-career" && (
            <div className="animate-fadeIn">
              <AddCareer
                editingCareer={editingCareer}
                onSuccess={() => {
                  setEditingCareer(null);
                  fetchDashboardStats();
                  setActiveTab("list-career");
                }}
                onCancel={() => setActiveTab("list-career")}
              />
            </div>
          )}

          {activeTab === "list-career" && (
            <div className="animate-fadeIn">
              <ListCareer
                onEdit={(career) => {
                  setEditingCareer(career);
                  setActiveTab("add-career");
                }}
              />
            </div>
          )}

          {/* Robots */}
          {activeTab === "add-robot" && (
            <div className="animate-fadeIn">
              <AddRobot
                editData={editingRobot}
                onSuccess={() => {
                  setEditingRobot(null);
                  fetchDashboardStats();
                  setActiveTab("list-robot");
                }}
              />
            </div>
          )}

          {activeTab === "list-robot" && (
            <div className="animate-fadeIn">
              <ListRobot
                onEdit={(robot) => {
                  setEditingRobot(robot);
                  setActiveTab("add-robot");
                }}
              />
            </div>
          )}

          {/* Profile */}
          {activeTab === "profile" && (
            <div className="animate-fadeIn">
              <ProfilePage />
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;
