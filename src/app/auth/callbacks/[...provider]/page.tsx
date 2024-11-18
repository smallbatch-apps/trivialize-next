"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { clientPost } from "@/utilities/queries";
import { loadUser, loadQuestions, loadTags } from "@/utilities/loaders";

export default function page({
  params: { provider },
  searchParams: { code },
}: {
  params: { provider: string[] };
  searchParams: { [key: string]: string };
}) {
  const router = useRouter();
  console.log("THIS SHOULD NEVER RUN ON THE SERVER");

  useEffect(() => {
    // login(provider, code);

    clientPost("auth/callbacks/" + provider[0], { code }).then(async (res) => {
      if (res.ok) {
        const jwtToken =
          res.headers.get("Authorization")?.replace("bearer", "").trim() ?? "";

        console.log(jwtToken);

        localStorage.setItem("token", jwtToken);

        loadUser();
        loadQuestions();
        loadTags();

        router.push("/questions");
      } else {
        throw new Error("Failed to login");
      }
    });
  }, []);
  return <></>;
}
