// import { NextAuthConfig } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { db } from "@/db";
// // import { PrismaClient } from "@prisma/client";
// import { getUserByEmail } from "@/db/services/user";
// import { loginSchema } from "../validation";
// import bcrypt from "bcryptjs";

// export default {
//   providers: [
//     Credentials({
//       async authorize(credentials) {
//         const validatedFields = loginSchema.safeParse(credentials);
//         if (!validatedFields.success) return null;
//         const { email, password } = validatedFields.data;

//         const user = await getUserByEmail(email);

//         if (!user || !user.password) return null;
//         const passwordsMatch = await bcrypt.compare(password, user.password!);
//         console.log({ passwordsMatch });
//         if (passwordsMatch) return user;
//       },
//     }),
//   ],
// } satisfies NextAuthConfig;
