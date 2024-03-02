"use server";

import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";

import { loginSchema } from "@/validation";

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: validatedFields.error };
  }
  console.log("validatedFields", validatedFields);
  const { email, password } = validatedFields.data;

  try {
    console.log("signing in - login action");
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    // console.error("Failed to sign in", error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password" };
        default:
          return { error: "An error occurred" };
      }
    }
    throw error;
  }
};
