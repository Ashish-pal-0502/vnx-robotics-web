

import { GoogleOAuthProvider } from "@react-oauth/google";
import {
  Orbitron,
  Sora,
  Roboto_Slab,
  Roboto_Mono,
} from "next/font/google";

import { Toaster } from "react-hot-toast";
import "./globals.css";
import GoogleAuthProvider from "./googleAuthProvider";
import ClientOnly from "./../components/ClientsOnly/ClientsOnly";

/* =========================
   FONTS
========================= */

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-roboto-slab",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_CLIENT || "http://localhost:3000",
  ),

  title: "VNX Robotics – Advanced Robotics & Automation Solutions",

  description:
    "VNX Robotics delivers cutting-edge robotics, automation systems, and AI-driven solutions.",

  icons: {
    icon: "/vnxlogo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`
        ${orbitron.variable}
        ${sora.variable}
        ${robotoSlab.variable}
        ${robotoMono.variable}
      `}
    >
      <body suppressHydrationWarning>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        >
          <GoogleAuthProvider>
            <ClientOnly>{children}</ClientOnly>
            <Toaster position="bottom-right" reverseOrder={false} />
          </GoogleAuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}