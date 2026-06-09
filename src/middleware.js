// import { NextResponse } from "next/server";
// import { jwtDecode } from "jwt-decode";

// export function middleware(request) {
//   // const token = request.cookies.get("token")?.value;
//   const token =
//     request.cookies.get("token")?.value ||
//     request.cookies.get("accessToken")?.value;

//   // Routes that should NOT be accessible when logged in
//   const authRoutes = ["/login", "/register"];
//   // Routes that require admin access
//   const adminRoutes = ["/dashboard"];

//   const { pathname } = request.nextUrl;

//   const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

//   const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

//   // If logged in and trying to access login/register, redirect to home
//   if (token && isAuthRoute) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   // For admin routes, check if user is admin
//   if (isAdminRoute) {
//     if (!token) {
//       return NextResponse.redirect(new URL("/", request.url));
//     }

//     try {
//       const decoded = jwtDecode(token);
//       // Check if user type is admin (adjust field name based on your token)
//       if (decoded.type !== "admin" && decoded.userType !== "admin") {
//         return NextResponse.redirect(new URL("/", request.url));
//       }
//     } catch (error) {
//       console.error("Token decode error:", error);
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/login", "/register"],
// };

import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(request) {
  // ❌ REMOVE cookie check - middleware can't access localStorage anyway
  // Just check the URL path

  const { pathname } = request.nextUrl;

  // Routes that require admin access
  const adminRoutes = ["/dashboard"];
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  // For admin routes, we can't check localStorage in middleware
  // So either:
  // Option 1: Remove middleware protection and protect in component
  // Option 2: Use a header or URL param (not recommended)

  // SIMPLEST: Remove middleware protection entirely
  // Let your components handle auth checks

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
