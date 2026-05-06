"use client";
import React, { useState, useEffect } from "react";
import useAuth from "@/auth/useAuth";
import { useRouter } from "next/navigation";
import OrderPage from "@/components/Account/OrderPage";
import AddressPage from "@/components/Account/AddressPage";
import MyProfile from "@/components/Account/MyProfile";

import WishlistSection from "./../../components/Account/WishlistSection";
import {
  FiGrid,
  FiShoppingBag,
  FiHeart,
  FiMapPin,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import AccountSettings from "@/components/Settings/AccountSettings";

const Page = () => {
  const { user, logOut } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [shouldCheckAuth, setShouldCheckAuth] = useState(false);

  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: FiGrid },
    { key: "orders", label: "My orders", icon: FiShoppingBag },
    { key: "wishlist", label: "Wishlist", icon: FiHeart },
    { key: "address", label: "Addresses", icon: FiMapPin },
    { key: "profile", label: "Personal info", icon: FiUser },
    { key: "settings", label: "Settings", icon: FiSettings },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldCheckAuth(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (shouldCheckAuth && !user) {
      router.push("/");
    }
  }, [shouldCheckAuth, user]);

  if (!shouldCheckAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF6ED]">
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="w-full bg-[#FAF6ED] min-h-screen px-4 md:px-10 py-6">
      <div className="max-w-300 mx-auto flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-65 bg-[#FAF6ED] rounded-2xl p-5 border border-[#1B3A5C0F]">
          <div className="flex flex-col items-center border-b border-[#e6dfd5] pb-5">
            <div className="w-16 h-16 rounded-full bg-[#1f3b57] text-white flex items-center justify-center text-xl font-semibold">
              {user?.name?.charAt(0)}
            </div>

            <h2 className="mt-3 font-semibold text-[#2c2c2c]">{user?.name}</h2>

            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>

          <div className="mt-6 space-y-1 text-sm">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition ${
                    activeTab === item.key
                      ? "bg-[#dfe7f2] text-[#1f3b57] font-medium"
                      : "text-gray-600 hover:bg-[#eee7dd]"
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>
              );
            })}

            <div className="my-4 border-t border-[#e6dfd5]" />

            <div
              onClick={logOut}
              className="flex items-center gap-3 px-4 py-3 text-red-500 rounded-xl cursor-pointer hover:bg-red-50"
            >
              <FiLogOut size={18} />
              <span>Log out</span>
            </div>
          </div>
        </div>

        <div className="flex-1">
          {activeTab === "dashboard" && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <StatCard title="Total orders" value="12" />
                <StatCard title="Wishlist items" value="5" />
                <StatCard title="Total spent" value="₹28.4K" green />
                <StatCard title="Total saved" value="₹4.2K" red />
              </div>

              <OrderPage />
            </>
          )}

          {activeTab === "orders" && <OrderPage />}
          {activeTab === "wishlist" && <WishlistSection />}
          {activeTab === "address" && <AddressPage />}
          {activeTab === "profile" && <MyProfile />}
          {activeTab === "settings" && <AccountSettings />}
        </div>
      </div>
    </div>
  );
};

export default Page;

const StatCard = ({ title, value, green, red }) => (
  <div className="bg-[#FAF6ED] border border-[#1B3A5C0F] p-4 rounded-xl">
    <div className="text-xs text-gray-500">{title}</div>
    <div
      className={`text-lg font-semibold mt-1 ${
        green ? "text-green-600" : red ? "text-red-500" : "text-[#1f3b57]"
      }`}
    >
      {value}
    </div>
  </div>
);
