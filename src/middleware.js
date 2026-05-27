// import { NextResponse } from "next/server";
// import { jwtDecode } from "jwt-decode";

// export function middleware(request) {
//   const token = request.cookies.get("token")?.value;

//   const protectedRoutes = ["/dashboard"];
//   const { pathname } = request.nextUrl;

//   const isProtected = protectedRoutes.some((route) =>
//     pathname.startsWith(route),
//   );

//   if (isProtected && !token) {
//     const loginUrl = new URL("/", request.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   // Check if user is admin
//   if (isProtected && token) {
//     try {
//       const decoded = jwtDecode(token);
//       // Assuming your token has userType or type field
//       if (decoded.userType !== "admin" && decoded.type !== "admin") {
//         const homeUrl = new URL("/", request.url);
//         return NextResponse.redirect(homeUrl);
//       }
//     } catch (error) {
//       console.error("Token decode error:", error);
//       const homeUrl = new URL("/", request.url);
//       return NextResponse.redirect(homeUrl);
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*"],
// };

import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  // Routes that should NOT be accessible when logged in
  const authRoutes = ["/login", "/register"];
  // Routes that require admin access
  const adminRoutes = ["/dashboard"];

  const { pathname } = request.nextUrl;

  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // If logged in and trying to access login/register, redirect to home
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // For admin routes, check if user is admin
  if (isAdminRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    try {
      const decoded = jwtDecode(token);
      // Check if user type is admin (adjust field name based on your token)
      if (decoded.type !== "admin" && decoded.userType !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      console.error("Token decode error:", error);
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
