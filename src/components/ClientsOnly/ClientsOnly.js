"use client";
import AuthContext from "@/auth/context";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Footer from "./../Footer/Footer";
import Header from "./../Header/Header";
import ScrollToTop from "./../Utility/ScrollToTop";

const ClientOnly = ({ children }) => {
  const [user, setUser] = useState();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    // Restore user from localStorage only on client
    const token = localStorage.getItem("token");
    if (token) {
      try {
        setUser(jwtDecode(token));
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          setUser,
        }}
      >
        <Header />
        <main className="relative overflow-hidden mt-16">
          {children}
          <ScrollToTop />
        </main>
        <Footer />
      </AuthContext.Provider>
    </>
  );
};

export default ClientOnly;
