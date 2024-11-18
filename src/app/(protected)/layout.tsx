"use client";
import { loadQuestions, loadTags } from "@/utilities/loaders";
import { useQuestionStore } from "@/store";

export default function Layout({ children }: { children: React.ReactNode }) {
  const questions = useQuestionStore((s) => s.questions);
  const tags = useQuestionStore((s) => s.tags);

  if (!questions.length) {
    loadQuestions();
  }
  if (!tags.length) {
    loadTags();
  }

  return <>{children}</>;
}
