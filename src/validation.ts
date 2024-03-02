import * as z from "zod";
import { QuestionTypes } from "@/utilities/enums";

export const signupSchema = z
  .object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(8).max(255),
    confirmPassword: z.string().min(8).max(255),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(255),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(8).max(255),
  token: z.string(),
});

export const newQuestionSchema = z.object({
  text: z.string().min(3).max(255),
  type: z.nativeEnum(QuestionTypes),
  tags: z.array(z.string().uuid()),
});

export const newAnswerSchema = z.object({
  questionId: z.string().uuid(),
  text: z.string().min(3).max(255),
  points: z.number().min(0).max(100),
});

export const newSeriesSchema = z.object({
  text: z.string().min(3).max(255),
  points: z.number().min(0).max(100),
});

export const newEventSchema = z.object({
  seriesId: z.string().uuid(),
  text: z.string().min(3).max(255),
  points: z.number().min(0).max(100),
});
