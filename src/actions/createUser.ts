"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { signupSchema } from "@/validation";
// import { users, companies } from "@/db/schema";

export default async function createUser(values: z.infer<typeof signupSchema>) {
  const validatedFields = signupSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: validatedFields.error };
  }

  const { email, password, name } = validatedFields.data;

  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "User already exists" };
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const company = await db.company.create({ data: { name: "" } });

  const user = await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      company: {
        connect: { id: company.id },
      },
    },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  return { status: "ok", data: user };
}
