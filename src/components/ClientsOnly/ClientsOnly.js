"use client";
import AuthContext from "@/auth/context";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Footer from "./../Footer/Footer";
import Header from "./../Header/Header";
import ScrollToTop from "./../Utility/ScrollToTop";
import "../../app/i18n";
const ClientOnly = ({ children }) => {
  const pathname = usePathname();
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
  const showHeader = !pathname?.startsWith("/dashboard");
  const showFooter = !pathname?.startsWith("/dashboard");
  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          setUser,
        }}
      >
        {showHeader && <Header />}
        <main className="relative overflow-hidden">
          {children}
          <ScrollToTop />
        </main>
        {showFooter && <Footer />}
      </AuthContext.Provider>
    </>
  );
};

export default ClientOnly;
