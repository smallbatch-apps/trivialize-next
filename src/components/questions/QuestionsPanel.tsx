import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { questionsQuery, tagsQuery } from "@/utilities/queries";

import NewQuestionForm from "./NewQuestionForm";
import QuestionList from "./QuestionList";
import QuestionDetail from "./QuestionDetail";

export default function QuestionsPanel() {
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const { data: questions } = useQuery({
    queryKey: ["questions"],
    queryFn: questionsQuery,
  });
  const { data: tags } = useQuery({ queryKey: ["tags"], queryFn: tagsQuery });

  if (!questions || !tags) return <></>;

  const question = questions.find(({ id }) => id === activeQuestion) ?? null;

  return (
    <div className="flex">
      <div className="flex-1">
        <QuestionList
          tags={tags}
          questions={questions}
          activeQuestion={activeQuestion}
          setActiveQuestion={setActiveQuestion}
        />
        <NewQuestionForm tags={tags} />
      </div>
      <div className="flex-1">
        <QuestionDetail question={question} tags={tags} />
      </div>
    </div>
  );
}
