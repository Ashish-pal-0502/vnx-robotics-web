import { GoogleOAuthProvider } from "@react-oauth/google";
import { Figtree } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import GoogleAuthProvider from "./googleAuthProvider";
import ClientOnly from "./../components/ClientsOnly/ClientsOnly";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_CLIENT || "http://localhost:3000",
  ),

  title: "VNX Robotics – Advanced Robotics & Automation Solutions",

  description:
    "VNX Robotics delivers cutting-edge robotics, automation systems, and AI-driven solutions. Explore innovative technologies, 3D prototyping, and smart industrial automation.",

  keywords: [
    "VNX Robotics",
    "Robotics Company",
    "Automation Solutions",
    "AI Robotics",
    "Industrial Automation",
    "3D Prototyping",
    "Smart Technology",
  ],

  icons: {
    icon: "/vnxlogo.png",
  },

  openGraph: {
    title: "VNX Robotics – Advanced Robotics & Automation",
    description:
      "Discover next-gen robotics, automation, and AI solutions with VNX Robotics.",
    url: process.env.NEXT_PUBLIC_CLIENT || "http://localhost:3000",
    siteName: "VNX Robotics",
    images: [
      {
        url: "/vnxlogo.png",
        width: 1200,
        height: 630,
        alt: "VNX Robotics",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "VNX Robotics – Advanced Robotics & Automation",
    description:
      "Explore robotics, AI, and automation solutions by VNX Robotics.",
    images: ["/vnxlogo.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={figtree.variable}>
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
