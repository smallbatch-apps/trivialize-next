import NextAuth, { User, NextAuthConfig } from "next-auth";

export const BASE_PATH = "/api/auth";

const authOptions: NextAuthConfig = {
  providers: [],
  basePath: BASE_PATH,
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);

// import Credentials from "next-auth/providers/credentials";
// Your own logic for dealing with plaintext password strings; be careful!

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     Credentials({
//       // You can specify which fields should be submitted, by adding keys to the `credentials` object.
//       // e.g. domain, username, password, 2FA token, etc.
//       credentials: {
//         email: {},
//         password: {},
//       },
//       authorize: async (credentials) => {
//         let user = null;
//         const res = await fetch(
//           process.env.NEXT_PUBLIC_API_HOST + "/api/login",
//           {
//             method: "POST",
//             body: JSON.stringify({
//               email: credentials.email,
//               password: credentials.password,
//             }),
//             headers: {
//               Accept: "application/json",
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         return await res.json();
//         // fetch()
//         // logic to salt and hash password
//         // const pwHash = saltAndHashPassword(credentials.password);

//         // // logic to verify if user exists
//         // user = await getUserFromDb(credentials.email, pwHash);

//         // if (!user) {
//         //   // No user found, so this is their first attempt to login
//         //   // meaning this is also the place you could do registration
//         //   throw new Error("User not found.");
//         // }

//         // return user object with the their profile data
//       },
//     }),
//   ],
//   callbacks: {
//     jwt({ token, user }) {
//       if (user) token.id = user.id;
//       return token;
//     },
//   },
// });
