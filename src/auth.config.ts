import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import RESTAdapter from "./RESTAdapter";
import { apiAdminClient } from "@/apiClient";
import type { NextAuthConfig } from "next-auth";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Facebook({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
  ],
  adapter: RESTAdapter(apiAdminClient),
} satisfies NextAuthConfig;
