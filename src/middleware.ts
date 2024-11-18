import NextAuth from "next-auth";
import { NextRequest } from "next/server";
import { apiClient } from "@/apiClient";

import authConfig from "@/auth.config";
import {
  authRoutes,
  publicRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req: NextRequest) => {
  // if (!req.auth && req.nextUrl.pathname !== "/login") {
  //   const newUrl = new URL("/login", req.nextUrl.origin);
  //   return Response.redirect(newUrl);
  // }
});

// export default auth((req) => {
//   const { nextUrl } = req;
//   const isLoggedIn = !!req.auth;
//   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
//   const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
//   const isAuthRoute = authRoutes.includes(nextUrl.pathname);

//   if (isApiAuthRoute) {
//     return null;
//   }
//   if (isAuthRoute) {
//     if (isLoggedIn) {
//       return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//     }
//     return null;
//   }

//   if (!isLoggedIn && !isPublicRoute) {
//     return Response.redirect(new URL("/login", nextUrl));
//   }

//   return null;
// });

export const handleAuthLogin = async (req: NextRequest) => {
  const provider = req.nextUrl.pathname.split("/").pop();
  const code = req.nextUrl.searchParams.get("code");
  const response = await apiClient.post("/auth/login", { provider, code });

  if (response.status !== 200) {
    return req;
  }
  const token = response.headers["authorization"]
    .replaceInsensitive("bearer", "")
    .trim();

  return req;
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.icon).*)"],
};
