"use client";

import { loginSchema } from "@/validation";
import * as z from "zod";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormGroup from "./FormGroup";
import Button from "./Button";

// import { useRouter } from "next/navigation";

export default function LoginForm() {
  // const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const { handleSubmit } = form;

  const submitFn = (payload: z.infer<typeof loginSchema>) => {
    console.log("submitting");
    // login(payload).then(() => form.reset());
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(submitFn)}>
        <div className="shadow rounded p-5 w-1/2 mx-auto space-y-5">
          <FormGroup
            name="email"
            type="email"
            label="Your email address"
            placeholder="matt@example.com"
          />

          <FormGroup name="password" type="password" label="Your password" />
          <div className="flex justify-end">
            <Button type="submit">Log In</Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
