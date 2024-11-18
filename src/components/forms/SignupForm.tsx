"use client";

import * as z from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { signupSchema } from "@/validation";
import FormGroup from "./FormGroup";
import Button from "./Button";

export default function SignupForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const submitFn = (values: z.infer<typeof signupSchema>) => {
    // signupAction(values).then(() => {
    //   form.reset();
    //   router.push("/questions");
    // });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(submitFn)}>
        <div className="shadow rounded p-5 mx-auto space-y-5">
          <FormGroup name="name" label="Your full name" />
          <FormGroup name="email" type="email" label="Your email address" />
          <FormGroup name="password" type="password" label="Set password" />
          <FormGroup
            name="confirmPassword"
            type="password"
            label="Confirm password"
          />

          <Button type="submit">Create account</Button>
        </div>
      </form>
    </FormProvider>
  );
}
